
import type {
    Token, Program, ASTNode, Expression,
    VariableDeclaration, PrintStatement, IfStatement,
    WhileStatement, BlockStatement, ExpressionStatement,
    BinaryExpression, Identifier, Literal, BreakStatement, ContinueStatement,
    LogicalExpression, InputExpression, FunctionDeclaration, ReturnStatement,
    CallExpression, ArrayLiteral, MemberExpression
} from "./types";
import { TokenType } from "./types";

export class Parser {
    private tokens: Token[];
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse(): Program {
        const body: ASTNode[] = [];

        if (this.peek().type !== TokenType.HI_KAKA) {
            throw new Error(`শুরুতে 'ও কাকা' বলো! (Program must start with 'O Kaka') at line ${this.peek().line}`);
        }
        this.consume(TokenType.HI_KAKA);

        while (!this.isAtEnd() && this.peek().type !== TokenType.BYE_KAKA) {
            body.push(this.parseStatement());
        }

        if (this.peek().type === TokenType.BYE_KAKA) {
            this.consume(TokenType.BYE_KAKA);
        } else {
            throw new Error(`শেষে 'আসি কাকা' বলো! (Program must end with 'Ashi Kaka') at line ${this.peek().line}`);
        }

        return { type: "Program", body };
    }

    private parseStatement(): ASTNode {
        const type = this.peek().type;

        switch (type) {
            case TokenType.VAR_KAKA:
                return this.parseVariableDeclaration();
            case TokenType.PRINT_KAKA:
                return this.parsePrintStatement();
            case TokenType.IF_KAKA:
                return this.parseIfStatement();
            case TokenType.WHILE_KAKA:
                return this.parseWhileStatement();
            case TokenType.OPEN_BRACE:
                return this.parseBlock();
            case TokenType.BREAK_KAKA:
                return this.parseBreak();
            case TokenType.CONTINUE_KAKA:
                return this.parseContinue();
            case TokenType.FUNCTION_KAKA:
                return this.parseFunctionDeclaration();
            case TokenType.RETURN_KAKA:
                return this.parseReturnStatement();
            default:
                return this.parseExpressionStatement();
        }
    }

    private parseFunctionDeclaration(): FunctionDeclaration {
        this.consume(TokenType.FUNCTION_KAKA);
        const name = this.consume(TokenType.IDENTIFIER, "Function must have a name").value;
        this.consume(TokenType.OPEN_PAREN);

        const params: Identifier[] = [];
        if (!this.check(TokenType.CLOSE_PAREN)) {
            do {
                const paramName = this.consume(TokenType.IDENTIFIER, "Parameter name expected").value;
                params.push({ type: "Identifier", name: paramName });
            } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.CLOSE_PAREN);

        const body = this.parseBlock();
        return { type: "FunctionDeclaration", name, params, body };
    }

    private parseReturnStatement(): ReturnStatement {
        this.consume(TokenType.RETURN_KAKA);
        let argument: Expression | undefined;
        if (!this.check(TokenType.SEMICOLON)) {
            argument = this.parseExpression();
        }
        this.consume(TokenType.SEMICOLON);
        return { type: "ReturnStatement", argument };
    }

    private parseVariableDeclaration(): VariableDeclaration {
        this.consume(TokenType.VAR_KAKA);
        const identifier = this.consume(TokenType.IDENTIFIER).value;

        this.consume(TokenType.EQUALS, "Variable assignment must use '='");

        const value = this.parseExpression();
        this.consume(TokenType.SEMICOLON, "Statement must end with ';'");

        return { type: "VariableDeclaration", identifier, value };
    }

    private parsePrintStatement(): PrintStatement {
        this.consume(TokenType.PRINT_KAKA);
        const expression = this.parseExpression();
        this.consume(TokenType.SEMICOLON, "Statement must end with ';'");
        return { type: "PrintStatement", expression };
    }

    private parseIfStatement(): IfStatement {
        this.consume(TokenType.IF_KAKA);
        this.consume(TokenType.OPEN_PAREN);
        const condition = this.parseExpression();
        this.consume(TokenType.CLOSE_PAREN);

        const consequent = this.parseBlock();
        let alternate: BlockStatement | undefined;

        if (this.match(TokenType.ELSE_KAKA)) {
            alternate = this.parseBlock();
        }

        return { type: "IfStatement", condition, consequent, alternate };
    }

    private parseWhileStatement(): WhileStatement {
        this.consume(TokenType.WHILE_KAKA);
        this.consume(TokenType.OPEN_PAREN);
        const condition = this.parseExpression();
        this.consume(TokenType.CLOSE_PAREN);
        const body = this.parseBlock();
        return { type: "WhileStatement", condition, body };
    }

    private parseBlock(): BlockStatement {
        this.consume(TokenType.OPEN_BRACE);
        const body: ASTNode[] = [];
        while (!this.check(TokenType.CLOSE_BRACE) && !this.isAtEnd()) {
            body.push(this.parseStatement());
        }
        this.consume(TokenType.CLOSE_BRACE);
        return { type: "BlockStatement", body };
    }

    private parseBreak(): BreakStatement {
        this.consume(TokenType.BREAK_KAKA);
        this.consume(TokenType.SEMICOLON);
        return { type: "BreakStatement" };
    }

    private parseContinue(): ContinueStatement {
        this.consume(TokenType.CONTINUE_KAKA);
        this.consume(TokenType.SEMICOLON);
        return { type: "ContinueStatement" };
    }

    private parseExpressionStatement(): ExpressionStatement {
        const expression = this.parseExpression();
        this.consume(TokenType.SEMICOLON);
        return { type: "ExpressionStatement", expression };
    }

    private parseExpression(): Expression {
        return this.parseAssignment();
    }

    private parseAssignment(): Expression {
        const expr = this.parseLogicalOr();

        if (this.match(TokenType.EQUALS)) {
            const operator = this.previous().value;
            const right = this.parseAssignment();

            if (expr.type === "Identifier") {
                return { type: "AssignmentExpression", left: expr as Identifier, right, operator };
            }
            throw new Error(`Invalid assignment target at line ${this.peek().line}`);
        }

        return expr;
    }

    private parseLogicalOr(): Expression {
        let expr = this.parseLogicalAnd();

        while (this.match(TokenType.OR_KAKA)) {
            const operator = this.previous().value;
            const right = this.parseLogicalAnd();
            expr = { type: "LogicalExpression", left: expr, right, operator } as LogicalExpression;
        }

        return expr;
    }

    private parseLogicalAnd(): Expression {
        let expr = this.parseEquality();

        while (this.match(TokenType.AND_KAKA)) {
            const operator = this.previous().value;
            const right = this.parseEquality();
            expr = { type: "LogicalExpression", left: expr, right, operator } as LogicalExpression;
        }

        return expr;
    }

    private parseEquality(): Expression {
        let expr = this.parseComparison();

        while (this.match(TokenType.EE, TokenType.NE)) {
            const operator = this.previous().value; // == or !=
            const right = this.parseComparison();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }

        return expr;
    }

    private parseComparison(): Expression {
        let expr = this.parseTerm();

        while (this.match(TokenType.GT, TokenType.GTE, TokenType.LT, TokenType.LTE)) {
            const operator = this.previous().value;
            const right = this.parseTerm();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }

        return expr;
    }

    private parseTerm(): Expression {
        let expr = this.parseFactor();

        while (this.match(TokenType.PLUS, TokenType.MINUS)) {
            const operator = this.previous().value;
            const right = this.parseFactor();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }

        return expr;
    }

    private parseFactor(): Expression {
        let expr = this.parseCallMember();

        while (this.match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
            const operator = this.previous().value;
            const right = this.parseCallMember();
            expr = { type: "BinaryExpression", left: expr, right, operator };
        }

        return expr;
    }

    private parseCallMember(): Expression {
        let expr = this.parsePrimary();

        while (true) {
            if (this.match(TokenType.OPEN_PAREN)) {
                expr = this.parseCall(expr);
            } else if (this.match(TokenType.OPEN_BRACKET)) {
                expr = this.parseMember(expr);
            } else {
                break;
            }
        }
        return expr;
    }

    private parseCall(callee: Expression): CallExpression {
        const args: Expression[] = [];
        if (!this.check(TokenType.CLOSE_PAREN)) {
            do {
                args.push(this.parseExpression());
            } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.CLOSE_PAREN);
        return { type: "CallExpression", callee, arguments: args };
    }

    private parseMember(object: Expression): MemberExpression {
        const property = this.parseExpression();
        this.consume(TokenType.CLOSE_BRACKET);
        return { type: "MemberExpression", object, property, computed: true };
    }

    private parsePrimary(): Expression {
        if (this.match(TokenType.FALSE_KAKA)) return { type: "Literal", value: false, raw: "false" };
        if (this.match(TokenType.TRUE_KAKA)) return { type: "Literal", value: true, raw: "true" };
        if (this.match(TokenType.NULL_KAKA)) return { type: "Literal", value: null, raw: "null" };

        if (this.match(TokenType.INPUT_KAKA)) {
            return { type: "InputExpression" };
        }

        if (this.match(TokenType.NUMBER)) {
            const raw = this.previous().value;
            const value = parseBengaliNumber(raw);
            return { type: "Literal", value, raw };
        }

        if (this.match(TokenType.STRING)) {
            return { type: "Literal", value: this.previous().value, raw: this.previous().value };
        }


        if (this.match(TokenType.OPEN_BRACKET)) {
            const elements: Expression[] = [];
            if (!this.check(TokenType.CLOSE_BRACKET)) {
                do {
                    elements.push(this.parseExpression());
                } while (this.match(TokenType.COMMA));
            }
            this.consume(TokenType.CLOSE_BRACKET);
            return { type: "ArrayLiteral", elements };
        }

        if (this.match(TokenType.IDENTIFIER)) {
            return { type: "Identifier", name: this.previous().value };
        }

        if (this.match(TokenType.OPEN_PAREN)) {
            const expr = this.parseExpression();
            this.consume(TokenType.CLOSE_PAREN);
            return expr;
        }

        throw new Error(`অপ্রত্যাশিত টোকেন (Unexpected token): ${this.peek().value} at line ${this.peek().line}`);
    }

    // Helpers
    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    private check(type: TokenType): boolean {
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }

    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    private isAtEnd(): boolean {
        return this.peek().type === TokenType.EOF;
    }

    private peek(): Token {
        return this.tokens[this.current] as Token;
    }

    private previous(): Token {
        return this.tokens[this.current - 1] as Token;
    }

    private consume(type: TokenType, message?: string): Token {
        if (this.check(type)) return this.advance();
        throw new Error(message || `Expected ${type} but got ${this.peek().type} at line ${this.peek().line}`);
    }
}

function parseBengaliNumber(str: string): number {
    const map: { [key: string]: string } = {
        '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
        '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };
    const englishStr = str.replace(/[০-৯]/g, (match) => map[match]);
    return Number(englishStr);
}
