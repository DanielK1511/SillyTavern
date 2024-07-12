const TestUtils = {
    async waitForAppReady(page) {
        await page.goto(global.ST_URL);
        await page.waitForFunction('document.getElementById("preloader") === null', { timeout: 0 });
    },
}


module.exports = { TestUtils };
