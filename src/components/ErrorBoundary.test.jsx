import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary.jsx';

// A child that throws during render so the boundary catches it.
function Boom() {
    throw new Error('kaboom');
}

describe('ErrorBoundary', () => {
    beforeEach(() => {
        localStorage.clear();
        // React and the boundary both log the caught error; silence them so the
        // test output stays readable (the throw is expected).
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders the fallback UI instead of the crashing child', () => {
        render(
            <ErrorBoundary>
                <Boom />
            </ErrorBoundary>
        );
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('renders children unchanged when nothing throws', () => {
        render(
            <ErrorBoundary>
                <p>healthy content</p>
            </ErrorBoundary>
        );
        expect(screen.getByText('healthy content')).toBeInTheDocument();
        expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('appends a caught error to the localStorage error log', () => {
        render(
            <ErrorBoundary>
                <Boom />
            </ErrorBoundary>
        );
        const logs = JSON.parse(localStorage.getItem('error_logs'));
        expect(logs).toHaveLength(1);
        expect(logs[0].message).toBe('kaboom');
        expect(logs[0].errorId).toBeTruthy();
    });

    it('caps the stored error log at the last 10 entries', () => {
        for (let i = 0; i < 11; i++) {
            const { unmount } = render(
                <ErrorBoundary>
                    <Boom />
                </ErrorBoundary>
            );
            unmount();
        }
        const logs = JSON.parse(localStorage.getItem('error_logs'));
        expect(logs).toHaveLength(10);
    });
});
