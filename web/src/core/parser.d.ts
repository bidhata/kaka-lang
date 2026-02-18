import { Token, Program } from "./types.js";
export declare class Parser {
    private tokens;
    private current;
    constructor(tokens: Token[]);
    parse(): Program;
    private parseStatement;
    private parseVariableDeclaration;
    private parsePrintStatement;
    private parseIfStatement;
    private parseWhileStatement;
    private parseBlock;
    private parseBreak;
    private parseContinue;
    private parseExpressionStatement;
    private parseExpression;
    private parseAssignment;
    private parseEquality;
    private parseComparison;
    private parseTerm;
    private parseFactor;
    private parsePrimary;
    private match;
    private check;
    private advance;
    private isAtEnd;
    private peek;
    private previous;
    private consume;
}
//# sourceMappingURL=parser.d.ts.map