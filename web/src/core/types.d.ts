export declare enum TokenType {
    HI_KAKA = "HI_KAKA",
    BYE_KAKA = "BYE_KAKA",
    VAR_KAKA = "VAR_KAKA",
    PRINT_KAKA = "PRINT_KAKA",
    IF_KAKA = "IF_KAKA",
    ELSE_KAKA = "ELSE_KAKA",
    WHILE_KAKA = "WHILE_KAKA",
    BREAK_KAKA = "BREAK_KAKA",
    CONTINUE_KAKA = "CONTINUE_KAKA",
    TRUE_KAKA = "TRUE_KAKA",
    FALSE_KAKA = "FALSE_KAKA",
    NULL_KAKA = "NULL_KAKA",
    NUMBER = "NUMBER",
    STRING = "STRING",
    IDENTIFIER = "IDENTIFIER",
    EQUALS = "EQUALS",
    PLUS = "PLUS",
    MINUS = "MINUS",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE",
    MODULO = "MODULO",
    EE = "EE",// ==
    NE = "NE",// !=
    GT = "GT",// >
    LT = "LT",// <
    GTE = "GTE",// >=
    LTE = "LTE",// <=
    SEMICOLON = "SEMICOLON",
    OPEN_BRACE = "OPEN_BRACE",
    CLOSE_BRACE = "CLOSE_BRACE",
    OPEN_PAREN = "OPEN_PAREN",
    CLOSE_PAREN = "CLOSE_PAREN",
    COMMA = "COMMA",
    EOF = "EOF"
}
export interface Token {
    type: TokenType;
    value: string;
    line: number;
}
export type ASTNode = Program | VariableDeclaration | PrintStatement | IfStatement | WhileStatement | BlockStatement | ExpressionStatement | BreakStatement | ContinueStatement;
export interface Program {
    type: "Program";
    body: ASTNode[];
}
export interface VariableDeclaration {
    type: "VariableDeclaration";
    identifier: string;
    value: Expression;
}
export interface PrintStatement {
    type: "PrintStatement";
    expression: Expression;
}
export interface IfStatement {
    type: "IfStatement";
    condition: Expression;
    consequent: BlockStatement;
    alternate?: BlockStatement;
}
export interface WhileStatement {
    type: "WhileStatement";
    condition: Expression;
    body: BlockStatement;
}
export interface BlockStatement {
    type: "BlockStatement";
    body: ASTNode[];
}
export interface BreakStatement {
    type: "BreakStatement";
}
export interface ContinueStatement {
    type: "ContinueStatement";
}
export interface ExpressionStatement {
    type: "ExpressionStatement";
    expression: Expression;
}
export type Expression = BinaryExpression | Literal | Identifier | AssignmentExpression;
export interface BinaryExpression {
    type: "BinaryExpression";
    left: Expression;
    right: Expression;
    operator: string;
}
export interface AssignmentExpression {
    type: "AssignmentExpression";
    left: Identifier;
    right: Expression;
    operator: string;
}
export interface Literal {
    type: "Literal";
    value: any;
    raw: string;
}
export interface Identifier {
    type: "Identifier";
    name: string;
}
//# sourceMappingURL=types.d.ts.map