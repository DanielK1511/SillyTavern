// const testCases = [
//     {
//         input: "Hello, {{user}}!",
//         tokens: [
//             { name: "Text", value: "Hello, " },
//             { name: "MacroStart", value: "{{" },
//             { name: "Identifier", value: "user" },
//             { name: "MacroEnd", value: "}}" },
//             { name: "Text", value: "!" },
//         ]
//     },
//     {
//         input: "{{roll:1d6}}",
//         tokens: [
//             { name: "MacroStart", value: "{{" },
//             { name: "Identifier", value: "roll" },
//             { name: "SingleColon", value: ":" },
//             { name: "Identifier", value: "1d6" },
//             { name: "MacroEnd", value: "}}" },
//         ]
//     }
// ];


// // Helper function to run lexer tests
// function runLexerTest(input, expectedTokens) {
//     const lexingResult = MacroLexer.tokenize(input);
//     assert.deepStrictEqual(
//         lexingResult.tokens.map(token => ({ name: token.tokenType.name, value: token.image })),
//         expectedTokens
//     );
// }

// // Run the tests
// testCases.forEach(testCase => {
//     runLexerTest(testCase.input, testCase.tokens);
//     console.log(`Test passed for input: ${testCase.input}`);
// });

describe("MacroParser", () => {
    beforeAll(async () => {
        await page.goto(global.ST_URL);
        await page.waitForFunction('document.getElementById("preloader") === null', { timeout: 0 });
    });

    it("should parse plain text", async () => {

        const result = await page.evaluate(async () => {
            const { MacroLexer } = await import('./scripts/macros/MacroLexer.js');
            const input = "Hello, {{user}}!";
            const tokens = MacroLexer.tokenize(input);
            return tokens;
        });


        const tokenResults = result.tokens.map(token => ({ name: token.tokenType.name, value: token.image }));
        await expect(tokenResults).toBe([
            { name: "Text", value: "Hello, " },
            { name: "MacroStart", value: "{{" },
            { name: "Identifier", value: "user" },
            { name: "MacroEnd", value: "}}" },
            { name: "Text", value: "!" },
        ]);
    });
});
