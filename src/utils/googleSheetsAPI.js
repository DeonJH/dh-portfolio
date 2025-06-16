/**
 * Google Sheets API Service
 * Professional service layer for interacting with Google Sheets API
 */

// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://sheets.googleapis.com/v4/spreadsheets',
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
    TIMEOUT: 10000, // 10 seconds
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// Error types for better error handling
export const API_ERRORS = {
    INVALID_API_KEY: 'INVALID_API_KEY',
    SHEET_NOT_FOUND: 'SHEET_NOT_FOUND',
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    PARSING_ERROR: 'PARSING_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

/**
 * Custom API Error class with structured error information
 */
export class GoogleSheetsAPIError extends Error {
    constructor(message, type = API_ERRORS.UNKNOWN_ERROR, statusCode = null, originalError = null) {
        super(message);
        this.name = 'GoogleSheetsAPIError';
        this.type = type;
        this.statusCode = statusCode;
        this.originalError = originalError;
        this.timestamp = new Date().toISOString();
    }
}

/**
 * Utility function to create timeout promise
 */
const createTimeoutPromise = (timeout) => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new GoogleSheetsAPIError(
                `Request timed out after ${timeout}ms`,
                API_ERRORS.TIMEOUT_ERROR
            ));
        }, timeout);
    });
};

/**
 * Utility function to wait/delay execution
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Validates API configuration
 */
const validateConfig = (apiKey, sheetId) => {
    if (!apiKey) {
        throw new GoogleSheetsAPIError(
            'Google API key not found. Please add REACT_APP_GOOGLE_API_KEY to your .env file.',
            API_ERRORS.INVALID_API_KEY
        );
    }

    if (!sheetId) {
        throw new GoogleSheetsAPIError(
            'Sheet ID is required',
            API_ERRORS.VALIDATION_ERROR
        );
    }

    // Basic API key format validation
    if (typeof apiKey !== 'string' || apiKey.length < 20) {
        throw new GoogleSheetsAPIError(
            'Invalid API key format',
            API_ERRORS.INVALID_API_KEY
        );
    }
};

/**
 * Maps HTTP status codes to API error types
 */
const mapHttpStatusToErrorType = (status) => {
    switch (status) {
        case 400:
            return API_ERRORS.VALIDATION_ERROR;
        case 403:
            return API_ERRORS.PERMISSION_DENIED;
        case 404:
            return API_ERRORS.SHEET_NOT_FOUND;
        case 429:
            return API_ERRORS.NETWORK_ERROR; // Rate limiting
        default:
            return API_ERRORS.NETWORK_ERROR;
    }
};

/**
 * Core fetch function with timeout and error handling
 */
const fetchWithTimeout = async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await Promise.race([
            fetch(url, {
                ...options,
                signal: controller.signal
            }),
            createTimeoutPromise(API_CONFIG.TIMEOUT)
        ]);

        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new GoogleSheetsAPIError(
                'Request was aborted due to timeout',
                API_ERRORS.TIMEOUT_ERROR
            );
        }
        
        throw error;
    }
};

/**
 * Main function to fetch data from Google Sheets with retry logic
 */
const fetchFromGoogleSheets = async (apiKey, sheetId, range, attempt = 1) => {
    const url = `${API_CONFIG.BASE_URL}/${sheetId}/values/${range}?key=${apiKey}`;
    
    console.log(`🔍 Fetching from Google Sheets API (attempt ${attempt}/${API_CONFIG.MAX_RETRIES})`);
    console.log('📄 Sheet ID:', sheetId);
    console.log('🔑 API Key (first 10 chars):', apiKey.substring(0, 10) + '...');
    console.log('📊 Range:', range);
    console.log('🌐 URL:', url);

    try {
        const response = await fetchWithTimeout(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ API Response failed:', response.status, response.statusText);
            console.error('📝 Error details:', errorData);

            const errorType = mapHttpStatusToErrorType(response.status);
            let errorMessage = `API request failed: ${response.status}`;

            switch (response.status) {
                case 403:
                    errorMessage = 'API key invalid or Google Sheets API not enabled. Check your API key and enable the Google Sheets API in Google Cloud Console.';
                    break;
                case 404:
                    errorMessage = 'Sheet not found. Make sure the sheet ID is correct and the sheet is shared publicly.';
                    break;
                case 400:
                    errorMessage = 'Bad request. Check the sheet range or API parameters.';
                    break;
                default:
                    errorMessage = `${errorMessage} - ${errorData.error?.message || 'Unknown error'}`;
            }

            throw new GoogleSheetsAPIError(
                errorMessage,
                errorType,
                response.status,
                errorData
            );
        }

        const data = await response.json();
        console.log('✅ API Response received, rows:', data.values?.length || 0);
        
        return data;

    } catch (error) {
        // If it's already our custom error, re-throw it
        if (error instanceof GoogleSheetsAPIError) {
            throw error;
        }

        // Handle network errors with retry logic
        if (attempt < API_CONFIG.MAX_RETRIES) {
            console.warn(`⚠️ Request failed, retrying in ${API_CONFIG.RETRY_DELAY}ms...`);
            await delay(API_CONFIG.RETRY_DELAY * attempt); // Exponential backoff
            return fetchFromGoogleSheets(apiKey, sheetId, range, attempt + 1);
        }

        // Max retries exceeded
        throw new GoogleSheetsAPIError(
            `Network error after ${API_CONFIG.MAX_RETRIES} attempts: ${error.message}`,
            API_ERRORS.NETWORK_ERROR,
            null,
            error
        );
    }
};

/**
 * Validates and processes sheet data
 */
const processSheetData = (data, options = {}) => {
    const { 
        contentColumns = ['content', 'summary', 'digest', 'text', 'description'],
        minContentLength = 20,
        requireHeaders = true 
    } = options;

    // Validate data structure
    if (!data.values || !Array.isArray(data.values)) {
        throw new GoogleSheetsAPIError(
            'No data found in the sheet. Make sure your sheet has content.',
            API_ERRORS.PARSING_ERROR
        );
    }

    if (data.values.length === 0) {
        throw new GoogleSheetsAPIError(
            'Sheet is empty. Make sure your sheet has content.',
            API_ERRORS.PARSING_ERROR
        );
    }

    if (requireHeaders && data.values.length < 2) {
        throw new GoogleSheetsAPIError(
            'Sheet only has headers. Make sure there is data in the rows below the headers.',
            API_ERRORS.PARSING_ERROR
        );
    }

    // Get headers and find content column
    const headers = data.values[0];
    console.log('📋 Headers found:', headers);

    const contentIndex = headers.findIndex(header => 
        header && typeof header === 'string' && 
        contentColumns.some(col => header.toLowerCase().includes(col.toLowerCase()))
    );

    if (contentIndex === -1) {
        throw new GoogleSheetsAPIError(
            `Content column not found. Available columns: ${headers.join(', ')}. Looking for columns containing: ${contentColumns.join(', ')}`,
            API_ERRORS.PARSING_ERROR
        );
    }

    // Get content from first data row
    const firstDataRow = data.values[1];
    if (!firstDataRow || !firstDataRow[contentIndex]) {
        throw new GoogleSheetsAPIError(
            `No content found in the first data row at column "${headers[contentIndex]}"`,
            API_ERRORS.PARSING_ERROR
        );
    }

    const contentText = firstDataRow[contentIndex].toString().trim();
    
    if (contentText.length < minContentLength) {
        throw new GoogleSheetsAPIError(
            `Content too short (${contentText.length} characters). Expected at least ${minContentLength} characters.`,
            API_ERRORS.VALIDATION_ERROR
        );
    }

    console.log('✅ Successfully processed content, length:', contentText.length);

    return {
        content: contentText,
        headers,
        rowCount: data.values.length,
        contentColumn: headers[contentIndex],
        rawData: data
    };
};

/**
 * Main public API function to get content from Google Sheets
 * @param {string} apiKey - Google API key
 * @param {string} sheetId - Google Sheet ID
 * @param {string} range - Sheet range (e.g., 'Sheet1!A:Z')
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} Processed sheet data
 */
export const getSheetContent = async (apiKey, sheetId, range = 'Sheet1!A:Z', options = {}) => {
    try {
        // Validate inputs
        validateConfig(apiKey, sheetId);

        // Fetch data from Google Sheets
        const rawData = await fetchFromGoogleSheets(apiKey, sheetId, range);

        // Process and validate the data
        const processedData = processSheetData(rawData, options);

        return {
            success: true,
            data: processedData,
            timestamp: new Date().toISOString(),
            source: 'google-sheets-api'
        };

    } catch (error) {
        console.error('🚨 Google Sheets API Error:', error);

        // Return structured error response
        return {
            success: false,
            error: {
                message: error.message,
                type: error.type || API_ERRORS.UNKNOWN_ERROR,
                statusCode: error.statusCode,
                timestamp: error.timestamp || new Date().toISOString(),
                originalError: error.originalError
            },
            data: null
        };
    }
};

/**
 * Utility function to test API connectivity
 */
export const testConnection = async (apiKey, sheetId) => {
    console.log('🧪 Testing Google Sheets API connection...');
    
    try {
        const result = await getSheetContent(apiKey, sheetId, 'Sheet1!A1:A1');
        
        if (result.success) {
            console.log('✅ Connection test successful');
            return { success: true, message: 'Connection successful' };
        } else {
            console.log('❌ Connection test failed:', result.error.message);
            return { success: false, error: result.error };
        }
    } catch (error) {
        console.log('❌ Connection test failed with exception:', error.message);
        return { 
            success: false, 
            error: { 
                message: error.message, 
                type: API_ERRORS.UNKNOWN_ERROR 
            } 
        };
    }
};

export default {
    getSheetContent,
    testConnection,
    API_ERRORS,
    GoogleSheetsAPIError
}; 