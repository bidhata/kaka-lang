"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = tokenize;
const types_1 = require("./types");
const KEYWORDS = {
    "ও কাকা": types_1.TokenType.HI_KAKA,
    "আসি কাকা": types_1.TokenType.BYE_KAKA,
    "কাকা রাখো": types_1.TokenType.VAR_KAKA,
    "কাকা বলো": types_1.TokenType.PRINT_KAKA,
    "যদি কাকা": types_1.TokenType.IF_KAKA,
    "নাহলে কাকা": types_1.TokenType.ELSE_KAKA,
    "যতক্ষণ কাকা": types_1.TokenType.WHILE_KAKA,
    "ব্যাস কাকা": types_1.TokenType.BREAK_KAKA,
    "পরেরটা কাকা": types_1.TokenType.CONTINUE_KAKA,
    "ঠিক": types_1.TokenType.TRUE_KAKA,
    "ভুল": types_1.TokenType.FALSE_KAKA,
    "ফালতু": types_1.TokenType.NULL_KAKA,
    "কাকা শোনো": types_1.TokenType.INPUT_KAKA,
    "এবং": types_1.TokenType.AND_KAKA,
    "অথবা": types_1.TokenType.OR_KAKA,
    "ফাংশন কাকা": types_1.TokenType.FUNCTION_KAKA,
    "ফেরত নাও": types_1.TokenType.RETURN_KAKA,
};
const SORTED_KEYWORDS = Object.keys(KEYWORDS).sort((a, b) => b.length - a.length);
function tokenize(source) {
    const tokens = [];
    let current = 0;
    let line = 1;
    while (current < source.length) {
        let char = source[current];
        if (char === undefined)
            break; // Should not happen given loop condition but safe check
        // Whitespace
        if (/\s/.test(char)) {
            if (char === '\n')
                line++;
            current++;
            continue;
        }
        // Comments //
        if (char === '/' && source[current + 1] === '/') {
            current += 2;
            while (current < source.length && source[current] !== '\n') {
                current++;
            }
            continue;
        }
        // Check for Keywords first (Longest match)
        let matchedKeyword = false;
        for (const keyword of SORTED_KEYWORDS) {
            if (source.substring(current, current + keyword.length) === keyword) {
                // Ensure it's not part of a longer identifier
                const nextChar = source[current + keyword.length];
                if (!nextChar || /[\s\(\)\{\};,]/.test(nextChar)) {
                    const type = KEYWORDS[keyword];
                    tokens.push({ type, value: keyword, line });
                    current += keyword.length;
                    matchedKeyword = true;
                    break;
                }
            }
        }
        if (matchedKeyword)
            continue;
        // Numbers (ASCII and Bengali)
        if (/[0-9০-৯]/.test(char)) {
            let value = "";
            while (current < source.length) {
                const c = source[current];
                if (c && /[0-9০-৯.]/.test(c)) {
                    value += c;
                    current++;
                }
                else {
                    break;
                }
            }
            tokens.push({ type: types_1.TokenType.NUMBER, value, line });
            continue;
        }
        // Strings
        if (char === '"' || char === "'") {
            let value = "";
            const quote = char;
            current++; // skip open quote
            while (current < source.length) {
                const c = source[current];
                if (c === quote) {
                    break;
                }
                if (c)
                    value += c;
                current++;
            }
            current++; // skip close quote
            tokens.push({ type: types_1.TokenType.STRING, value, line });
            continue;
        }
        // Operators and Punctuation
        if (char === '+') {
            tokens.push({ type: types_1.TokenType.PLUS, value: "+", line });
            current++;
            continue;
        }
        if (char === '-') {
            tokens.push({ type: types_1.TokenType.MINUS, value: "-", line });
            current++;
            continue;
        }
        if (char === '*') {
            tokens.push({ type: types_1.TokenType.MULTIPLY, value: "*", line });
            current++;
            continue;
        }
        if (char === '/') {
            tokens.push({ type: types_1.TokenType.DIVIDE, value: "/", line });
            current++;
            continue;
        }
        if (char === '%') {
            tokens.push({ type: types_1.TokenType.MODULO, value: "%", line });
            current++;
            continue;
        }
        if (char === ';') {
            tokens.push({ type: types_1.TokenType.SEMICOLON, value: ";", line });
            current++;
            continue;
        }
        if (char === ',') {
            tokens.push({ type: types_1.TokenType.COMMA, value: ",", line });
            current++;
            continue;
        }
        if (char === '(') {
            tokens.push({ type: types_1.TokenType.OPEN_PAREN, value: "(", line });
            current++;
            continue;
        }
        if (char === ')') {
            tokens.push({ type: types_1.TokenType.CLOSE_PAREN, value: ")", line });
            current++;
            continue;
        }
        if (char === '{') {
            tokens.push({ type: types_1.TokenType.OPEN_BRACE, value: "{", line });
            current++;
            continue;
        }
        if (char === '}') {
            tokens.push({ type: types_1.TokenType.CLOSE_BRACE, value: "}", line });
            current++;
            continue;
        }
        if (char === '[') {
            tokens.push({ type: types_1.TokenType.OPEN_BRACKET, value: "[", line });
            current++;
            continue;
        }
        if (char === ']') {
            tokens.push({ type: types_1.TokenType.CLOSE_BRACKET, value: "]", line });
            current++;
            continue;
        }
        // Multi-char operators
        if (char === '=') {
            if (source[current + 1] === '=') {
                tokens.push({ type: types_1.TokenType.EE, value: "==", line });
                current += 2;
            }
            else {
                tokens.push({ type: types_1.TokenType.EQUALS, value: "=", line });
                current++;
            }
            continue;
        }
        if (char === '!') {
            if (source[current + 1] === '=') {
                tokens.push({ type: types_1.TokenType.NE, value: "!=", line });
                current += 2;
            }
            else {
                current++;
            }
            continue;
        }
        if (char === '>') {
            if (source[current + 1] === '=') {
                tokens.push({ type: types_1.TokenType.GTE, value: ">=", line });
                current += 2;
            }
            else {
                tokens.push({ type: types_1.TokenType.GT, value: ">", line });
                current++;
            }
            continue;
        }
        if (char === '<') {
            if (source[current + 1] === '=') {
                tokens.push({ type: types_1.TokenType.LTE, value: "<=", line });
                current += 2;
            }
            else {
                tokens.push({ type: types_1.TokenType.LT, value: "<", line });
                current++;
            }
            continue;
        }
        // Identifiers
        // Ensure we match Bengali characters properly
        if (/[a-zA-Z_\u0980-\u09FF]/.test(char)) {
            let value = "";
            while (current < source.length) {
                const c = source[current];
                if (c && /[a-zA-Z_0-9\u0980-\u09FF]/.test(c)) {
                    value += c;
                    current++;
                }
                else {
                    break;
                }
            }
            // Check for exact keyword match (though loop above handles most, simple 'thik' might be caught here)
            const type = KEYWORDS[value];
            if (type) {
                tokens.push({ type, value, line });
            }
            else {
                tokens.push({ type: types_1.TokenType.IDENTIFIER, value, line });
            }
            continue;
        }
        // Unknown character
        throw new Error(`অচেনা অক্ষর (Unknown character): ${char} at line ${line}`);
    }
    tokens.push({ type: types_1.TokenType.EOF, value: "EOF", line });
    return tokens;
}
//# sourceMappingURL=tokenizer.js.map