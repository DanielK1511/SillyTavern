import { createToken, Lexer } from '../../lib/chevrotain.min.mjs';

// Define the tokens
const MacroStart = createToken({ name: 'MacroStart', pattern: /{{/ });
const MacroEnd = createToken({ name: 'MacroEnd', pattern: /}}/ });
const DoubleColon = createToken({ name: 'DoubleColon', pattern: /::/ });
const SingleColon = createToken({ name: 'SingleColon', pattern: /:/ });
const Identifier = createToken({ name: 'Identifier', pattern: /\w+/ });
const StringLiteral = createToken({ name: 'StringLiteral', pattern: /"[^"]*"|{:.*?:}/ });
const WhiteSpace = createToken({ name: 'WhiteSpace', pattern: /\s+/, group: Lexer.SKIPPED });
const Text = createToken({ name: 'Text', pattern: /[^{}:]+/ }); // Place Text last to avoid overshadowing other tokens

// Add all tokens to an array
export const macroToken = {
    WhiteSpace,
    MacroStart,
    MacroEnd,
    DoubleColon,
    SingleColon,
    Identifier,
    StringLiteral,
    Text,
};

// Create the lexer instance
export const MacroLexer = new Lexer(Object.values(macroToken));
