import { describe, it, expect, beforeEach } from 'vitest';
import { buildParticles } from './AnimatedBackground.jsx';

/*
 * buildParticles seeds the floating tech-icon background. Counts switch on the
 * mobile breakpoint (< 768) and every property is derived from Math.random
 * within fixed bounds, so we assert count and range rather than exact values.
 */
describe('buildParticles', () => {
    beforeEach(() => {
        // jsdom defaults innerWidth to 1024 (desktop); reset before each test.
        window.innerWidth = 1024;
    });

    it('builds 16 particles on desktop widths', () => {
        window.innerWidth = 1024;
        expect(buildParticles()).toHaveLength(16);
    });

    it('builds 8 particles on mobile widths (< 768)', () => {
        window.innerWidth = 500;
        expect(buildParticles()).toHaveLength(8);
    });

    it('gives every particle the expected shape with values in range', () => {
        const particles = buildParticles();

        particles.forEach((p, i) => {
            expect(p.id).toBe(i); // ids are sequential
            expect(typeof p.name).toBe('string');
            expect(p.color).toMatch(/^#/);
            expect(p.icon).toBeDefined();

            // opacity = Math.random() * 0.4 + 0.2
            expect(p.opacity).toBeGreaterThanOrEqual(0.2);
            expect(p.opacity).toBeLessThanOrEqual(0.6);

            // size = Math.random() * 16 + 24
            expect(p.size).toBeGreaterThanOrEqual(24);
            expect(p.size).toBeLessThanOrEqual(40);

            // rotation = Math.random() * 360
            expect(p.rotation).toBeGreaterThanOrEqual(0);
            expect(p.rotation).toBeLessThanOrEqual(360);

            // duration = 20 + Math.random() * 10
            expect(p.duration).toBeGreaterThanOrEqual(20);
            expect(p.duration).toBeLessThanOrEqual(30);

            // speed = (Math.random() - 0.5) * 0.5  ->  |speed| <= 0.25
            expect(Math.abs(p.speedX)).toBeLessThanOrEqual(0.25);
            expect(Math.abs(p.speedY)).toBeLessThanOrEqual(0.25);
        });
    });
});
