import React from 'react';
import { AlertTriangle, RefreshCw, Bug, ExternalLink } from 'lucide-react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree and displays a fallback UI
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorId: null,
            retryCount: 0
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { 
            hasError: true,
            errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
        };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error details
        console.error('🚨 Error Boundary caught an error:', error);
        console.error('📍 Error Info:', errorInfo);
        
        this.setState({
            error,
            errorInfo
        });

        // Log to external service in production
        this.logErrorToService(error, errorInfo);
    }

    logErrorToService = (error, errorInfo) => {
        try {
            // In a real app, you would send this to an error tracking service
            // like Sentry, LogRocket, or Bugsnag
            const errorData = {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo.componentStack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href,
                errorId: this.state.errorId
            };

            // For now, just log to console
            console.log('📊 Error data for logging service:', errorData);
            
            // You could also store in localStorage for debugging
            if (typeof localStorage !== 'undefined') {
                const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
                errors.push(errorData);
                // Keep only last 10 errors
                if (errors.length > 10) {
                    errors.splice(0, errors.length - 10);
                }
                localStorage.setItem('error_logs', JSON.stringify(errors));
            }
        } catch (loggingError) {
            console.error('Failed to log error:', loggingError);
        }
    };

    handleRetry = () => {
        this.setState(prevState => ({
            hasError: false,
            error: null,
            errorInfo: null,
            errorId: null,
            retryCount: prevState.retryCount + 1
        }));
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            const { 
                title = "Something went wrong",
                subtitle = "An unexpected error occurred",
                showDetails = process.env.NODE_ENV === 'development',
                showRetry = true,
                showReload = true,
                customFallback,
                className = ""
            } = this.props;

            // If custom fallback is provided, use it
            if (customFallback) {
                return customFallback(this.state.error, this.state.errorInfo, this.handleRetry);
            }

            return (
                <div className={`min-h-[400px] flex items-center justify-center p-6 ${className}`}>
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-8">
                            {/* Error Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="p-3 bg-red-500/20 rounded-full">
                                    <AlertTriangle className="w-8 h-8 text-red-400" />
                                </div>
                            </div>

                            {/* Error Title */}
                            <h2 className="text-2xl font-bold text-red-400 mb-4">
                                {title}
                            </h2>

                            {/* Error Subtitle */}
                            <p className="text-gray-300 mb-6">
                                {subtitle}
                            </p>

                            {/* Error ID */}
                            {this.state.errorId && (
                                <p className="text-xs text-gray-500 mb-6">
                                    Error ID: {this.state.errorId}
                                </p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                                {showRetry && (
                                    <button
                                        onClick={this.handleRetry}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Try Again
                                        {this.state.retryCount > 0 && (
                                            <span className="text-xs opacity-75">
                                                ({this.state.retryCount + 1})
                                            </span>
                                        )}
                                    </button>
                                )}

                                {showReload && (
                                    <button
                                        onClick={this.handleReload}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Reload Page
                                    </button>
                                )}
                            </div>

                            {/* Development Error Details */}
                            {showDetails && this.state.error && (
                                <details className="text-left mt-6">
                                    <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 flex items-center gap-2 mb-3">
                                        <Bug className="w-4 h-4" />
                                        Technical Details (Development Only)
                                    </summary>
                                    
                                    <div className="bg-black/50 rounded-lg p-4 text-xs">
                                        <div className="mb-4">
                                            <strong className="text-red-400">Error Message:</strong>
                                            <pre className="mt-1 text-gray-300 whitespace-pre-wrap">
                                                {this.state.error.message}
                                            </pre>
                                        </div>
                                        
                                        {this.state.error.stack && (
                                            <div className="mb-4">
                                                <strong className="text-red-400">Stack Trace:</strong>
                                                <pre className="mt-1 text-gray-300 whitespace-pre-wrap overflow-x-auto">
                                                    {this.state.error.stack}
                                                </pre>
                                            </div>
                                        )}
                                        
                                        {this.state.errorInfo?.componentStack && (
                                            <div>
                                                <strong className="text-red-400">Component Stack:</strong>
                                                <pre className="mt-1 text-gray-300 whitespace-pre-wrap overflow-x-auto">
                                                    {this.state.errorInfo.componentStack}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </details>
                            )}

                            {/* Help Text */}
                            <p className="text-xs text-gray-500 mt-6">
                                If this problem persists, please contact support with the Error ID above.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Higher-order component to wrap components with error boundary
 */
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
    const WrappedComponent = (props) => (
        <ErrorBoundary {...errorBoundaryProps}>
            <Component {...props} />
        </ErrorBoundary>
    );

    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
};

/**
 * Hook to get error boundary context (for functional components)
 */
export const useErrorHandler = () => {
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return setError;
};

/**
 * Simple error boundary for specific components
 */
export const SimpleErrorBoundary = ({ children, fallback, onError }) => (
    <ErrorBoundary
        customFallback={(error, errorInfo, retry) => {
            if (onError) {
                onError(error, errorInfo);
            }
            
            if (fallback) {
                return typeof fallback === 'function' 
                    ? fallback(error, errorInfo, retry)
                    : fallback;
            }

            return (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">
                        Something went wrong. Please try again.
                    </p>
                    <button 
                        onClick={retry}
                        className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                    >
                        Retry
                    </button>
                </div>
            );
        }}
    >
        {children}
    </ErrorBoundary>
);

export default ErrorBoundary; 