# Legacy: Google Sheets–backed Weekly Tech News

This documents an earlier implementation of the **Weekly Tech News** section that
fetched its content live from the Google Sheets API in the browser. It has since
been replaced by a build-time generated digest. The code described here was
removed from the source tree to keep it lean; the full implementation is
preserved in git history and linked below.

## What it was

The Weekly Tech News content used to be pulled at runtime from a public Google
Sheet. Three modules made that work:

- **`useGoogleSheets`** — a React hook wrapping the fetch lifecycle: loading and
  error state, an `AbortController` to cancel in-flight requests, retry with
  exponential backoff, and a client-side cache layer.
- **`googleSheetsAPI`** — a service layer over the Sheets REST API with typed
  errors, a request timeout (via `Promise.race`), HTTP-status-to-error mapping,
  and response validation/parsing.
- **`apiCache`** — a TTL cache (in-memory `Map`) with `localStorage` persistence,
  size-bounded eviction, and periodic cleanup of expired entries.

### Full source (git permalinks)

The files were removed at the commit that introduced this doc. Their last
committed state lives here:

- [`src/hooks/useGoogleSheets.js`](https://github.com/DeonJH/dh-portfolio/blob/d296d58e12f68a677e019f2a0b0829aba87d0fc7/src/hooks/useGoogleSheets.js)
- [`src/utils/googleSheetsAPI.js`](https://github.com/DeonJH/dh-portfolio/blob/d296d58e12f68a677e019f2a0b0829aba87d0fc7/src/utils/googleSheetsAPI.js)
- [`src/utils/apiCache.js`](https://github.com/DeonJH/dh-portfolio/blob/d296d58e12f68a677e019f2a0b0829aba87d0fc7/src/utils/apiCache.js)

## Why it was replaced

The section now reads from a static `tech-news.json` that is generated at build
time by [`scripts/generate-digest.js`](../../scripts/generate-digest.js) (run on
a schedule by the `tech-news.yml` GitHub Action). The component fetches that file
directly:

```js
fetch(`${import.meta.env.BASE_URL}tech-news.json?v=${Date.now()}`)
```

The build-time approach won out because:

- **No client-side API key.** The Sheets approach needed a Google API key in the
  browser bundle; the generated JSON needs none at runtime.
- **No runtime quota or latency.** Content is precomputed, so there are no live
  API calls, rate limits, or retry/backoff to manage on the client.
- **Static-host friendly.** It works on GitHub Pages with no server or secrets.
- **Simpler data flow.** A single `fetch` of a local file replaced the hook +
  service + cache stack.

## Representative excerpts

Kept here as a snapshot of the engineering in the legacy version.

### Retry with exponential backoff (`useGoogleSheets`)

```js
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
```

### Request timeout + typed errors (`googleSheetsAPI`)

```js
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

// Core fetch with a hard timeout that races the request against a rejecting timer
const fetchWithTimeout = async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await Promise.race([
            fetch(url, { ...options, signal: controller.signal }),
            createTimeoutPromise(API_CONFIG.TIMEOUT)
        ]);
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new GoogleSheetsAPIError('Request was aborted due to timeout', API_ERRORS.TIMEOUT_ERROR);
        }
        throw error;
    }
};
```

### TTL cache entry + localStorage persistence (`apiCache`)

```js
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

    getRemainingTTL() {
        return Math.max(0, this.expiresAt - Date.now());
    }
}

// Entries survive reloads by serializing to localStorage
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
```
