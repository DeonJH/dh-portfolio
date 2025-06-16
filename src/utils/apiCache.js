/**
 * API Cache Manager
 * Sophisticated caching system with TTL, memory management, and persistence
 */

// Cache configuration
const CACHE_CONFIG = {
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    MAX_CACHE_SIZE: 100, // Maximum number of cached items
    STORAGE_KEY_PREFIX: 'api_cache_',
    ENABLE_PERSISTENCE: true,
    CLEANUP_INTERVAL: 60 * 1000, // 1 minute
};

/**
 * Cache entry structure
 */
class CacheEntry {
    constructor(data, ttl = CACHE_CONFIG.DEFAULT_TTL) {
        this.data = data;
        this.timestamp = Date.now();
        this.ttl = ttl;
        this.expiresAt = this.timestamp + ttl;
        this.accessCount = 0;
        this.lastAccessed = this.timestamp;
    }

    isExpired() {
        return Date.now() > this.expiresAt;
    }

    isValid() {
        return !this.isExpired();
    }

    access() {
        this.accessCount++;
        this.lastAccessed = Date.now();
        return this.data;
    }

    getRemainingTTL() {
        return Math.max(0, this.expiresAt - Date.now());
    }

    getAge() {
        return Date.now() - this.timestamp;
    }
}

/**
 * Main Cache Manager Class
 */
class APICache {
    constructor(config = {}) {
        this.config = { ...CACHE_CONFIG, ...config };
        this.cache = new Map();
        this.stats = {
            hits: 0,
            misses: 0,
            sets: 0,
            deletes: 0,
            cleanups: 0
        };

        // Start cleanup interval if enabled
        if (this.config.CLEANUP_INTERVAL > 0) {
            this.startCleanupInterval();
        }

        // Load persisted cache if enabled
        if (this.config.ENABLE_PERSISTENCE) {
            this.loadFromStorage();
        }
    }

    /**
     * Generate cache key from parameters
     */
    generateKey(namespace, ...params) {
        const keyString = params
            .map(param => {
                if (typeof param === 'object') {
                    return JSON.stringify(param);
                }
                return String(param);
            })
            .join('|');
        
        return `${namespace}:${keyString}`;
    }

    /**
     * Set cache entry
     */
    set(key, data, ttl = this.config.DEFAULT_TTL) {
        try {
            // Remove expired entries if cache is full
            if (this.cache.size >= this.config.MAX_CACHE_SIZE) {
                this.cleanup();
                
                // If still full after cleanup, remove oldest entries
                if (this.cache.size >= this.config.MAX_CACHE_SIZE) {
                    this.evictOldest();
                }
            }

            const entry = new CacheEntry(data, ttl);
            this.cache.set(key, entry);
            this.stats.sets++;

            // Persist to storage if enabled
            if (this.config.ENABLE_PERSISTENCE) {
                this.persistToStorage(key, entry);
            }

            console.log(`📦 Cache SET: ${key} (TTL: ${ttl}ms)`);
            return true;
        } catch (error) {
            console.error('❌ Cache SET error:', error);
            return false;
        }
    }

    /**
     * Get cache entry
     */
    get(key) {
        try {
            const entry = this.cache.get(key);
            
            if (!entry) {
                this.stats.misses++;
                console.log(`📦 Cache MISS: ${key}`);
                return null;
            }

            if (entry.isExpired()) {
                this.delete(key);
                this.stats.misses++;
                console.log(`📦 Cache EXPIRED: ${key}`);
                return null;
            }

            this.stats.hits++;
            console.log(`📦 Cache HIT: ${key} (age: ${entry.getAge()}ms, TTL remaining: ${entry.getRemainingTTL()}ms)`);
            return entry.access();
        } catch (error) {
            console.error('❌ Cache GET error:', error);
            this.stats.misses++;
            return null;
        }
    }

    /**
     * Delete cache entry
     */
    delete(key) {
        try {
            const deleted = this.cache.delete(key);
            if (deleted) {
                this.stats.deletes++;
                console.log(`📦 Cache DELETE: ${key}`);
                
                // Remove from storage if enabled
                if (this.config.ENABLE_PERSISTENCE) {
                    this.removeFromStorage(key);
                }
            }
            return deleted;
        } catch (error) {
            console.error('❌ Cache DELETE error:', error);
            return false;
        }
    }

    /**
     * Check if key exists and is valid
     */
    has(key) {
        const entry = this.cache.get(key);
        return entry && entry.isValid();
    }

    /**
     * Clear all cache entries
     */
    clear() {
        try {
            const size = this.cache.size;
            this.cache.clear();
            console.log(`📦 Cache CLEARED: ${size} entries removed`);
            
            // Clear storage if enabled
            if (this.config.ENABLE_PERSISTENCE) {
                this.clearStorage();
            }
            
            return true;
        } catch (error) {
            console.error('❌ Cache CLEAR error:', error);
            return false;
        }
    }

    /**
     * Cleanup expired entries
     */
    cleanup() {
        try {
            let cleanedCount = 0;
            const now = Date.now();
            
            for (const [key, entry] of this.cache.entries()) {
                if (entry.isExpired()) {
                    this.cache.delete(key);
                    cleanedCount++;
                    
                    // Remove from storage if enabled
                    if (this.config.ENABLE_PERSISTENCE) {
                        this.removeFromStorage(key);
                    }
                }
            }
            
            if (cleanedCount > 0) {
                this.stats.cleanups++;
                console.log(`📦 Cache CLEANUP: ${cleanedCount} expired entries removed`);
            }
            
            return cleanedCount;
        } catch (error) {
            console.error('❌ Cache CLEANUP error:', error);
            return 0;
        }
    }

    /**
     * Evict oldest entries when cache is full
     */
    evictOldest(count = 1) {
        try {
            const entries = Array.from(this.cache.entries());
            entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
            
            let evictedCount = 0;
            for (let i = 0; i < Math.min(count, entries.length); i++) {
                const [key] = entries[i];
                if (this.delete(key)) {
                    evictedCount++;
                }
            }
            
            console.log(`📦 Cache EVICTED: ${evictedCount} oldest entries`);
            return evictedCount;
        } catch (error) {
            console.error('❌ Cache EVICT error:', error);
            return 0;
        }
    }

    /**
     * Get cache statistics
     */
    getStats() {
        const totalRequests = this.stats.hits + this.stats.misses;
        const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests * 100).toFixed(2) : 0;
        
        return {
            ...this.stats,
            size: this.cache.size,
            hitRate: `${hitRate}%`,
            totalRequests
        };
    }

    /**
     * Get cache info for debugging
     */
    getInfo() {
        const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
            key,
            age: entry.getAge(),
            remainingTTL: entry.getRemainingTTL(),
            accessCount: entry.accessCount,
            isExpired: entry.isExpired()
        }));

        return {
            config: this.config,
            stats: this.getStats(),
            entries
        };
    }

    /**
     * Start automatic cleanup interval
     */
    startCleanupInterval() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }

        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, this.config.CLEANUP_INTERVAL);
        
        console.log(`📦 Cache cleanup interval started (${this.config.CLEANUP_INTERVAL}ms)`);
    }

    /**
     * Stop automatic cleanup interval
     */
    stopCleanupInterval() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
            console.log('📦 Cache cleanup interval stopped');
        }
    }

    /**
     * Persist cache entry to localStorage
     */
    persistToStorage(key, entry) {
        try {
            if (typeof localStorage === 'undefined') return;
            
            const storageKey = `${this.config.STORAGE_KEY_PREFIX}${key}`;
            const serialized = JSON.stringify({
                data: entry.data,
                timestamp: entry.timestamp,
                ttl: entry.ttl,
                expiresAt: entry.expiresAt
            });
            
            localStorage.setItem(storageKey, serialized);
        } catch (error) {
            console.warn('⚠️ Cache persistence failed:', error);
        }
    }

    /**
     * Load cache from localStorage
     */
    loadFromStorage() {
        try {
            if (typeof localStorage === 'undefined') return;
            
            let loadedCount = 0;
            const now = Date.now();
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                
                if (key && key.startsWith(this.config.STORAGE_KEY_PREFIX)) {
                    try {
                        const serialized = localStorage.getItem(key);
                        const parsed = JSON.parse(serialized);
                        
                        // Check if entry is still valid
                        if (parsed.expiresAt > now) {
                            const cacheKey = key.replace(this.config.STORAGE_KEY_PREFIX, '');
                            const entry = new CacheEntry(parsed.data, parsed.ttl);
                            entry.timestamp = parsed.timestamp;
                            entry.expiresAt = parsed.expiresAt;
                            
                            this.cache.set(cacheKey, entry);
                            loadedCount++;
                        } else {
                            // Remove expired entry from storage
                            localStorage.removeItem(key);
                        }
                    } catch (parseError) {
                        // Remove corrupted entry
                        localStorage.removeItem(key);
                    }
                }
            }
            
            if (loadedCount > 0) {
                console.log(`📦 Cache loaded from storage: ${loadedCount} entries`);
            }
        } catch (error) {
            console.warn('⚠️ Cache loading from storage failed:', error);
        }
    }

    /**
     * Remove cache entry from localStorage
     */
    removeFromStorage(key) {
        try {
            if (typeof localStorage === 'undefined') return;
            
            const storageKey = `${this.config.STORAGE_KEY_PREFIX}${key}`;
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.warn('⚠️ Cache removal from storage failed:', error);
        }
    }

    /**
     * Clear all cache entries from localStorage
     */
    clearStorage() {
        try {
            if (typeof localStorage === 'undefined') return;
            
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.config.STORAGE_KEY_PREFIX)) {
                    keysToRemove.push(key);
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            console.log(`📦 Cache storage cleared: ${keysToRemove.length} entries`);
        } catch (error) {
            console.warn('⚠️ Cache storage clearing failed:', error);
        }
    }

    /**
     * Destroy cache instance
     */
    destroy() {
        this.stopCleanupInterval();
        this.clear();
        console.log('📦 Cache instance destroyed');
    }
}

// Create singleton instance
const apiCache = new APICache();

// Helper functions for easy usage
export const cacheGet = (namespace, ...params) => {
    const key = apiCache.generateKey(namespace, ...params);
    return apiCache.get(key);
};

export const cacheSet = (namespace, data, ttl, ...params) => {
    const key = apiCache.generateKey(namespace, ...params);
    return apiCache.set(key, data, ttl);
};

export const cacheDelete = (namespace, ...params) => {
    const key = apiCache.generateKey(namespace, ...params);
    return apiCache.delete(key);
};

export const cacheHas = (namespace, ...params) => {
    const key = apiCache.generateKey(namespace, ...params);
    return apiCache.has(key);
};

// Export the cache instance and utilities
export { APICache, apiCache };
export default apiCache; 