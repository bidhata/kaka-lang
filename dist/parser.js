"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const types_1 = require("./types");
class Parser {
    constructor(tokens) {
        this.current = 0;
        this.tokens = tokens;
    }
    parse() {
        const body = [];
        if (this.peek().type !== types_1.TokenType.HI_KAKA) {
            throw new Error(`শুরুতে 'ও কাকা' বলো! (Program must start with 'O Kaka') at line ${this.peek().line}`);
        }
        this.consume(types_1.TokenType.HI_KAKA);
        while (!this.isAtEnd() && this.peek().type !== types_1.TokenType.BYE_KAKA) {
            body.push(this.parseStatement());
        }
        if (this.peek().type === types_1.TokenType.BYE_KAKA) {
            this.consume(types_1.TokenType.BYE_KAKA);
        }
        else {
            throw new Error(`শেষে 'আসি কাকা' বলো! (Program must end with 'Ashi Kaka') at line ${this.peek().line}`);
        }
        return { type: "Program", body };
    }
    parseStatement() {
        const type = this.peek().type;
        switch (type) {
            case types_1.TokenType.VAR_KAKA:
                return this.parseVariableDeclaration();
            case types_1.TokenType.PRINT_KAKA:
                return this.parsePrintStatement();
            case types_1.TokenType.IF_KAKA:
                return this.parseIfStatement();
            case types_1.TokenType.WHILE_KAKA:
                return this.parseWhileStatement();
            case types_1.TokenType.OPEN_BRACE:
                return this.parseBlock();
            case types_1.TokenType.BREAK_KAKA:
                return this.parseBreak();
            case types_1.TokenType.CONTINUE_KAKA:
                return this.parseContinue();
            case types_1.TokenType.FUNCTION_KAKA:
                return this.parseFunctionDeclaration();
            case types_1.TokenType.RETURN_KAKA:
                return this.parseReturnStatement();
            default:
                return this.parseExpressionStatement();
        }
    }
    parseFunctionDeclaration() {
        this.consume(types_1.TokenType.FUNCTION_KAKA);
        const name = this.consume(types_1.TokenType.IDENTIFIER, "Function must have a name").value;
        this.consume(types_1.TokenType.OPEN_PAREN);
        const params = [];
        if (!this.check(types_1.TokenType.CLOSE_PAREN)) {
            do {
                const paramName = this.consume(types_1.TokenType.IDENTIFIER, "Parameter name expected").value;
                params.push({ type: "Identifier", name: paramName });
            } while (this.match(types_1.TokenType.COMMA));
        }
        this.consume(types_1.TokenType.CLOSE_PAREN);
        const body = this.parseBlock();
        return { type: "FunctionDeclaration", name, params, body };
    }
    parseReturnStatement() {
        this.consume(types_1.TokenType.RETURN_KAKA);
        let argument;
        if (!this.check(types_1.TokenType.SEMICOLON)) {
            argument = this.parseExpression();
        }
        this.consume(types_1.TokenType.SEMICOLON);
        return { type: "ReturnStatement", argument };
    }
    parseVariableDeclaration() {
        this.consume(types_1.TokenType.VAR_KAKA);
        const identifier = this.consume(types_1.TokenType.IDENTIFIER).value;
        this.consume(types_1.TokenType.EQUALS, "Variable assignment must use '='");
        const value = this.parseExpression();
        this.consume(types_1.TokenType.SEMICOLON, "Statement must end with ';'");
        return { type: "VariableDeclaration", identifier, value };
    }
    parsePrintStatement() {
        this.consume(types_1.TokenType.PRINT_KAKA);
        const expression = this.parseExpression();
        this.consume(types_1.TokenType.SEMICOLON, "Statement must end with ';'");
        return { type: "PrintStatement", expression };
    }
    parseIfStatement() {
        this.consume(types_1.TokenType.IF_KAKA);
        this.consume(types_1.TokenType.OPEN_PAREN);
        const condition = this.parseExpression();
        this.consume(types_1.TokenType.CLOSE_PAREN);
        const consequent = this.parseBlock();
        let alternate;
        if (this.match(types_1.TokenType.ELSE_KAKA)) {
            alternate = this.parseBlock();
        }
        return { type: "IfStatement", condition, consequent, alternate };
    }
    parseWhileStatement() {
        this.consume(types_1.TokenType.WHILE_KAKA);
        this.consume(types_1.TokenType.OPEN_PAREN);
        const condition = this.parseExpression();
        this.consume(types_1.TokenType.CLOSE_PAREN);
        const body = this.parseBlock();
        return { type: "WhileStatement", condition, body };
    }
    parseBlock() {
        this.consume(types_1.TokenType.OPEN_BRACE);
        const body = [];
        while (!this.check(types_1.TokenType.CLOSE_BRACE) && !this.isAtEnd()) {
            body.push(this.parseStatement());
        }
        this.consume(types_1.TokenType.CLOSE_BRACE);
        return { type: "BlockStatement", body };
    }
    parseBreak() {
        this.consume(types_1.TokenType.BREAK_KAKA);
        this.consume(types_1.TokenType.SEMICOLON);
        return { type: "BreakStatement" };
    }
    parseContinue() {
        this.consume(types_1.TokenType.CONTINUE_KAKA);
        this.consume(types_1.TokenType.SEMICOLON);
        return { type: "ContinueStatement" };
    }
    parseExpressionStatement() {
        const expression = this.parseExpression();
        this.consume(types_1.TokenType.SEMICOLON);
        return { type: "ExpressionStatement", expression };
    }
    parseExpression() {
        return this.parseAssignment();
    }
    parseAssignment() {
        const expr = this.parseLogicalOr();
        if (this.match(types_1.TokenType.EQUALS)) {
            const operator = this.previous().value;
            const right = this.parseAssignment();
            if (expr.type === "Identifier") {
                return { type: "AssignmentExpression", left: expr, right, operator };
            }
            throw new Error(`Invalid assignment target at line ${this.peek().line}`);
        }
        return expr;
    }
    parseLogicalOr() {
        let expr = this.parseLogicalAnd();
        while (this.match(types_1.TokenType.OR_KAKA)) {
            const operator = this.previous().value;
            const right = this.parseLogicalAnd();
            expr = { type: "LogicalExpression", left: expr, right, operator };
        }
        return expr;
    }
    parseLogicalAnd() {
        let expr = this.parseEquality();
        while (this.match(types_1.TokenType.AND_KAKA)) {
            const operator = this.previous().value;
            const right = this.parseEquality();
            expr = { type: "LogicalExpression", left: expr, right, operator };
        }
        return expr;
    }
    parseEquality() {
        let expr = this.parseComparison();
        while (this.match(types_1.TokenType.EE, types_1.TokenType.NE)) {
            const operator = this.previous().value; // == or !=
            const right = this.parseComparison();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }
        return expr;
    }
    parseComparison() {
        let expr = this.parseTerm();
        while (this.match(types_1.TokenType.GT, types_1.TokenType.GTE, types_1.TokenType.LT, types_1.TokenType.LTE)) {
            const operator = this.previous().value;
            const right = this.parseTerm();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }
        return expr;
    }
    parseTerm() {
        let expr = this.parseFactor();
        while (this.match(types_1.TokenType.PLUS, types_1.TokenType.MINUS)) {
            const operator = this.previous().value;
            const right = this.parseFactor();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }
        return expr;
    }
    parseFactor() {
        let expr = this.parseCallMember();
        while (this.match(types_1.TokenType.MULTIPLY, types_1.TokenType.DIVIDE, types_1.TokenType.MODULO)) {
            const operator = this.previous().value;
            const right = this.parseCallMember();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }
        return expr;
    }
    parseCallMember() {
        let expr = this.parsePrimary();
        while (true) {
            if (this.match(types_1.TokenType.OPEN_PAREN)) {
                expr = this.parseCall(expr);
            }
            else if (this.match(types_1.TokenType.OPEN_BRACKET)) {
                expr = this.parseMember(expr);
            }
            else {
                break;
            }
        }
        return expr;
    }
    parseCall(callee) {
        const args = [];
        if (!this.check(types_1.TokenType.CLOSE_PAREN)) {
            do {
                args.push(this.parseExpression());
            } while (this.match(types_1.TokenType.COMMA));
        }
        this.consume(types_1.TokenType.CLOSE_PAREN);
        return { type: "CallExpression", callee, arguments: args };
    }
    parseMember(object) {
        const property = this.parseExpression();
        this.consume(types_1.TokenType.CLOSE_BRACKET);
        return { type: "MemberExpression", object, property, computed: true };
    }
    parsePrimary() {
        if (this.match(types_1.TokenType.FALSE_KAKA))
            return { type: "Literal", value: false, raw: "false" };
        if (this.match(types_1.TokenType.TRUE_KAKA))
            return { type: "Literal", value: true, raw: "true" };
        if (this.match(types_1.TokenType.NULL_KAKA))
            return { type: "Literal", value: null, raw: "null" };
        if (this.match(types_1.TokenType.INPUT_KAKA)) {
            return { type: "InputExpression" };
        }
        if (this.match(types_1.TokenType.NUMBER)) {
            const raw = this.previous().value;
            const value = parseBengaliNumber(raw);
            return { type: "Literal", value, raw };
        }
        if (this.match(types_1.TokenType.STRING)) {
            return { type: "Literal", value: this.previous().value, raw: this.previous().value };
        }
        if (this.match(types_1.TokenType.OPEN_BRACKET)) {
            const elements = [];
            if (!this.check(types_1.TokenType.CLOSE_BRACKET)) {
                do {
                    elements.push(this.parseExpression());
                } while (this.match(types_1.TokenType.COMMA));
            }
            this.consume(types_1.TokenType.CLOSE_BRACKET);
            return { type: "ArrayLiteral", elements };
        }
        if (this.match(types_1.TokenType.IDENTIFIER)) {
            return { type: "Identifier", name: this.previous().value };
        }
        if (this.match(types_1.TokenType.OPEN_PAREN)) {
            const expr = this.parseExpression();
            this.consume(types_1.TokenType.CLOSE_PAREN);
            return expr;
        }
        throw new Error(`অপ্রত্যাশিত টোকেন (Unexpected token): ${this.peek().value} at line ${this.peek().line}`);
    }
    // Helpers
    match(...types) {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
    check(type) {
        if (this.isAtEnd())
            return false;
        return this.peek().type === type;
    }
    advance() {
        if (!this.isAtEnd())
            this.current++;
        return this.previous();
    }
    isAtEnd() {
        return this.peek().type === types_1.TokenType.EOF;
    }
    peek() {
        return this.tokens[this.current];
    }
    previous() {
        return this.tokens[this.current - 1];
    }
    consume(type, message) {
        if (this.check(type))
            return this.advance();
        throw new Error(message || `Expected ${type} but got ${this.peek().type} at line ${this.peek().line}`);
    }
}
exports.Parser = Parser;
function parseBengaliNumber(str) {
    const map = {
        '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
        '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };
    const englishStr = str.replace(/[০-৯]/g, (match) => map[match]);
    return Number(englishStr);
}
//# sourceMappingURL=parser.js.map