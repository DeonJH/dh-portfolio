import { describe, it, expect } from 'vitest';
import { parseDigest } from './WeeklyTechNews.jsx';

/*
 * parseDigest turns the AI-generated, weekly-regenerated digest text into
 * structured sections. The input format can drift, so these tests pin down the
 * two category regexes and the title/intro/closing assignment rules.
 */
describe('parseDigest', () => {
    it('extracts the title with and without leading bold markers', () => {
        expect(parseDigest('Weekly Tech News for May 2026').title)
            .toBe('Weekly Tech News for May 2026');
        expect(parseDigest('**Weekly Tech News for May 2026**').title)
            .toBe('Weekly Tech News for May 2026');
    });

    it('parses the bold-header category form "1. **Name**: body"', () => {
        const { categories } = parseDigest('1. **React 20**: A new compiler landed.');
        expect(categories).toEqual([{ name: 'React 20', body: 'A new compiler landed.' }]);
    });

    it('parses the plain category form with colon, en-dash, and em-dash separators', () => {
        expect(parseDigest('1. React 20: compiler news').categories[0])
            .toEqual({ name: 'React 20', body: 'compiler news' });
        expect(parseDigest('1. React 20 – compiler news').categories[0])
            .toEqual({ name: 'React 20', body: 'compiler news' });
        expect(parseDigest('1. React 20 — compiler news').categories[0])
            .toEqual({ name: 'React 20', body: 'compiler news' });
    });

    it('collects multiple categories in order, including multi-digit numbering', () => {
        const text = [
            '1. **One**: first',
            '2. **Two**: second',
            '10. **Ten**: tenth',
        ].join('\n\n');
        const { categories } = parseDigest(text);
        expect(categories.map(c => c.name)).toEqual(['One', 'Two', 'Ten']);
    });

    it('captures the intro before any category and trailing prose as closing', () => {
        const text = [
            '**Weekly Tech News for May 2026**',
            'Here is what happened this week.',
            '1. **React 20**: compiler news',
            'That is all for this week.',
        ].join('\n\n');
        const result = parseDigest(text);
        expect(result.title).toBe('Weekly Tech News for May 2026');
        expect(result.intro).toBe('Here is what happened this week.');
        expect(result.categories).toEqual([{ name: 'React 20', body: 'compiler news' }]);
        expect(result.closing).toBe('That is all for this week.');
    });

    it('does not treat post-category prose as a second intro and keeps the last as closing', () => {
        const text = [
            'First paragraph intro.',
            '1. **A**: body',
            'Some prose after.',
            'More prose after.',
        ].join('\n\n');
        const result = parseDigest(text);
        expect(result.intro).toBe('First paragraph intro.');
        expect(result.closing).toBe('More prose after.');
    });

    it('drops a numbered line that matches neither category format without crashing', () => {
        // An ASCII hyphen is not an accepted separator and there is no bold/colon,
        // so neither regex matches and the line is skipped rather than throwing.
        expect(parseDigest('1. React 20 - compiler news').categories).toEqual([]);
    });

    it('returns empty-string fields (never undefined) for empty or whitespace input', () => {
        for (const input of ['', '   ', '\n\n  \n\n']) {
            expect(parseDigest(input)).toEqual({
                title: '',
                intro: '',
                categories: [],
                closing: '',
            });
        }
    });
});
