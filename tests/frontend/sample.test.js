const { escapeHtml, isValidUrl, isDigitsOnly } = require('../../public/scripts/utils.js');
const { TestUtils } = require('../test-utils.js');

describe('sample', () => {
    beforeAll(async () => await TestUtils.waitForAppReady(page));

    it('should be titled "SillyTavern"', async () => {
        await expect(page.title()).resolves.toMatch('SillyTavern');
    });

    // Describe a test suite for escapeHtml function
    describe('escapeHtml', () => {
        test('should escape special HTML characters', () => {
            const input = '<div class="test">Hello & Welcome, "user"!</div>';
            const expectedOutput = '&lt;div class=&quot;test&quot;&gt;Hello &amp; Welcome, &quot;user&quot;!&lt;/div&gt;';
            expect(escapeHtml(input)).toBe(expectedOutput);
        });

        test('should return an empty string if input is empty', () => {
            expect(escapeHtml('')).toBe('');
        });
    });

    // Describe a test suite for isValidUrl function
    describe('isValidUrl', () => {
        test('should return true for a valid URL', () => {
            const validUrl = 'https://www.example.com';
            expect(isValidUrl(validUrl)).toBe(true);
        });

        test('should return false for an invalid URL', () => {
            const invalidUrl = 'htp:/invalid-url';
            expect(isValidUrl(invalidUrl)).toBe(false);
        });
    });

    // Describe a test suite for isDigitsOnly function
    describe('isDigitsOnly', () => {
        test('should return true for a string containing only digits', () => {
            const digitsOnly = '1234567890';
            expect(isDigitsOnly(digitsOnly)).toBe(true);
        });

        test('should return false for a string containing non-digit characters', () => {
            const notDigitsOnly = '123abc';
            expect(isDigitsOnly(notDigitsOnly)).toBe(false);
        });
    });
});
