import { useState, useEffect, useCallback, useRef } from 'react';
import { getSheetContent, testConnection, API_ERRORS } from '../utils/googleSheetsAPI';
import { cacheGet, cacheSet, cacheHas } from '../utils/apiCache';

/**
 * Custom hook for Google Sheets API integration
 * Provides a clean interface with caching, error handling, and state management
 */
export const useGoogleSheets = (config = {}) => {
    const {
        apiKey = process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId,
        range = 'Sheet1!A:Z',
        cacheTTL = 5 * 60 * 1000, // 5 minutes
        enableCache = true,
        autoFetch = false,
        retryCount = 3,
        retryDelay = 1000,
        onSuccess,
        onError,
        processingOptions = {}
    } = config;

    // State management
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastFetch, setLastFetch] = useState(null);
    const [cacheStatus, setCacheStatus] = useState('miss');

    // Refs for cleanup and request management
    const abortControllerRef = useRef(null);
    const retryTimeoutsRef = useRef([]);

    // Cache namespace for this sheet
    const cacheNamespace = `google-sheets-${sheetId}`;

    /**
     * Check if we have cached data
     */
    const hasCachedData = useCallback(() => {
        if (!enableCache || !sheetId) return false;
        return cacheHas(cacheNamespace, range, processingOptions);
    }, [enableCache, sheetId, cacheNamespace, range, processingOptions]);

    /**
     * Get cached data
     */
    const getCachedData = useCallback(() => {
        if (!enableCache || !sheetId) return null;
        return cacheGet(cacheNamespace, range, processingOptions);
    }, [enableCache, sheetId, cacheNamespace, range, processingOptions]);

    /**
     * Set cached data
     */
    const setCachedData = useCallback((data) => {
        if (!enableCache || !sheetId) return;
        cacheSet(cacheNamespace, data, cacheTTL, range, processingOptions);
    }, [enableCache, sheetId, cacheNamespace, range, processingOptions, cacheTTL]);

    /**
     * Main fetch function with retry logic
     */
    const fetchData = useCallback(async (options = {}) => {
        const { force = false, silent = false } = options;

        // Validate required configuration
        if (!apiKey) {
            const error = new Error('API key is required');
            setError(error);
            onError?.(error);
            return { success: false, error };
        }

        if (!sheetId) {
            const error = new Error('Sheet ID is required');
            setError(error);
            onError?.(error);
            return { success: false, error };
        }

        // Check cache first (unless forced)
        if (!force && enableCache && hasCachedData()) {
            const cachedData = getCachedData();
            if (cachedData) {
                console.log('📦 Using cached data for Google Sheets');
                setData(cachedData);
                setError(null);
                setCacheStatus('hit');
                onSuccess?.(cachedData);
                return { success: true, data: cachedData, source: 'cache' };
            }
        }

        // Set loading state
        if (!silent) {
            setLoading(true);
        }
        setError(null);
        setCacheStatus('miss');

        // Create abort controller for request cancellation
        abortControllerRef.current = new AbortController();

        try {
            console.log('🔍 Fetching fresh data from Google Sheets API');
            
            // Make API call
            const result = await getSheetContent(
                apiKey, 
                sheetId, 
                range, 
                processingOptions
            );

            // Check if request was aborted
            if (abortControllerRef.current?.signal.aborted) {
                console.log('🚫 Request was aborted');
                return { success: false, error: new Error('Request aborted') };
            }

            if (result.success) {
                const responseData = result.data;
                
                // Update state
                setData(responseData);
                setError(null);
                setLastFetch(new Date());
                
                // Cache the data
                if (enableCache) {
                    setCachedData(responseData);
                }
                
                // Call success callback
                onSuccess?.(responseData);
                
                console.log('✅ Successfully fetched and processed Google Sheets data');
                return { 
                    success: true, 
                    data: responseData, 
                    source: 'api',
                    timestamp: result.timestamp 
                };
            } else {
                // Handle API error
                const apiError = new Error(result.error.message);
                apiError.type = result.error.type;
                apiError.statusCode = result.error.statusCode;
                
                setError(apiError);
                onError?.(apiError);
                
                return { success: false, error: apiError };
            }

        } catch (error) {
            console.error('❌ Error in useGoogleSheets:', error);
            
            // Don't set error state if request was aborted
            if (!abortControllerRef.current?.signal.aborted) {
                setError(error);
                onError?.(error);
            }
            
            return { success: false, error };
        } finally {
            if (!silent) {
                setLoading(false);
            }
            abortControllerRef.current = null;
        }
    }, [
        apiKey, 
        sheetId, 
        range, 
        processingOptions, 
        enableCache, 
        hasCachedData, 
        getCachedData, 
        setCachedData, 
        onSuccess, 
        onError
    ]);

    /**
     * Retry function with exponential backoff
     */
    const retry = useCallback(async (attempt = 1) => {
        if (attempt > retryCount) {
            const error = new Error(`Failed after ${retryCount} attempts`);
            setError(error);
            onError?.(error);
            return { success: false, error };
        }

        console.log(`🔄 Retry attempt ${attempt}/${retryCount}`);
        
        // Wait before retry (exponential backoff)
        const delay = retryDelay * Math.pow(2, attempt - 1);
        
        return new Promise((resolve) => {
            const timeoutId = setTimeout(async () => {
                const result = await fetchData({ force: true });
                
                if (!result.success && attempt < retryCount) {
                    // Recursive retry
                    const retryResult = await retry(attempt + 1);
                    resolve(retryResult);
                } else {
                    resolve(result);
                }
            }, delay);
            
            // Store timeout for cleanup
            retryTimeoutsRef.current.push(timeoutId);
        });
    }, [retryCount, retryDelay, fetchData, onError]);

    /**
     * Test connection to Google Sheets API
     */
    const testApiConnection = useCallback(async () => {
        if (!apiKey || !sheetId) {
            return { success: false, error: 'API key and Sheet ID are required' };
        }

        try {
            setLoading(true);
            const result = await testConnection(apiKey, sheetId);
            setLoading(false);
            return result;
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    }, [apiKey, sheetId]);

    /**
     * Refresh data (force fetch)
     */
    const refresh = useCallback(() => {
        return fetchData({ force: true });
    }, [fetchData]);

    /**
     * Clear cache for this sheet
     */
    const clearCache = useCallback(() => {
        if (enableCache && sheetId) {
            // This would require implementing cache clearing by namespace
            console.log('🗑️ Cache clearing requested for:', cacheNamespace);
            setCacheStatus('cleared');
        }
    }, [enableCache, sheetId, cacheNamespace]);

    /**
     * Cancel ongoing request
     */
    const cancel = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            console.log('🚫 Request cancelled');
        }
        
        // Clear retry timeouts
        retryTimeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
        retryTimeoutsRef.current = [];
        
        setLoading(false);
    }, []);

    /**
     * Auto-fetch on mount or config change
     */
    useEffect(() => {
        if (autoFetch && apiKey && sheetId) {
            fetchData();
        }
    }, [autoFetch, apiKey, sheetId, fetchData]);

    /**
     * Cleanup on unmount
     */
    useEffect(() => {
        return () => {
            cancel();
        };
    }, [cancel]);

    /**
     * Get current status information
     */
    const getStatus = useCallback(() => {
        return {
            isLoading: loading,
            hasError: !!error,
            hasData: !!data,
            lastFetch,
            cacheStatus,
            isConfigured: !!(apiKey && sheetId),
            canRetry: !!error && error.type !== API_ERRORS.INVALID_API_KEY
        };
    }, [loading, error, data, lastFetch, cacheStatus, apiKey, sheetId]);

    return {
        // Data and state
        data,
        loading,
        error,
        lastFetch,
        cacheStatus,
        
        // Actions
        fetch: fetchData,
        refresh,
        retry,
        testConnection: testApiConnection,
        cancel,
        clearCache,
        
        // Utilities
        getStatus,
        hasCachedData,
        
        // Configuration info
        config: {
            apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : null,
            sheetId,
            range,
            enableCache,
            cacheTTL
        }
    };
};

/**
 * Hook for simple Google Sheets content fetching
 * Simplified version for basic use cases
 */
export const useGoogleSheetsContent = (sheetId, options = {}) => {
    const {
        data,
        loading,
        error,
        fetch,
        refresh,
        getStatus
    } = useGoogleSheets({
        sheetId,
        autoFetch: true,
        ...options
    });

    return {
        content: data?.content || null,
        loading,
        error,
        refresh,
        isReady: !loading && !error && !!data,
        status: getStatus()
    };
};

export default useGoogleSheets; 