import { CstParser } from './lib.js';
import { macroToken } from './MacroLexer.js';


class MacroParser extends CstParser {
    constructor() {
        super(Object.values(macroToken));

        const $ = this;

        // Rule for parsing plain text
        $.RULE('text', () => {
            $.CONSUME(macroToken.Text);
        });

        // Rule for parsing a basic macro
        $.RULE('macro', () => {
            $.CONSUME(macroToken.MacroStart);
            $.CONSUME(macroToken.Identifier);
            $.OPTION(() => {
                $.OR([
                    { ALT: () => $.CONSUME(macroToken.DoubleColon) },
                    { ALT: () => $.CONSUME(macroToken.SingleColon) },
                ]);
                $.CONSUME2(macroToken.Identifier);
            });
            $.CONSUME(macroToken.MacroEnd);
        });

        this.performSelfAnalysis();
    }
}

// Create an instance of the parser
const parserInstance = new MacroParser();

export { parserInstance, MacroParser };
