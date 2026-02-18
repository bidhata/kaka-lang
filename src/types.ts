
export enum TokenType {
    // Keywords
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
    INPUT_KAKA = "INPUT_KAKA",
    AND_KAKA = "AND_KAKA",
    OR_KAKA = "OR_KAKA",
    FUNCTION_KAKA = "FUNCTION_KAKA",
    RETURN_KAKA = "RETURN_KAKA",
    OPEN_BRACKET = "OPEN_BRACKET",
    CLOSE_BRACKET = "CLOSE_BRACKET",

    // Data Types
    NUMBER = "NUMBER",
    STRING = "STRING",
    IDENTIFIER = "IDENTIFIER",

    // Operators
    EQUALS = "EQUALS",
    PLUS = "PLUS",
    MINUS = "MINUS",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE",
    MODULO = "MODULO",

    // Logical/Comparison
    EE = "EE", // ==
    NE = "NE", // !=
    GT = "GT", // >
    LT = "LT", // <
    GTE = "GTE", // >=
    LTE = "LTE", // <=

    // Punctuation
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

export type ASTNode =
    | Program
    | VariableDeclaration
    | PrintStatement
    | IfStatement
    | WhileStatement
    | BlockStatement
    | ExpressionStatement
    | BreakStatement
    | BreakStatement
    | ContinueStatement
    | FunctionDeclaration
    | ReturnStatement;

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

export type Expression =
    | BinaryExpression
    | Literal
    | Identifier
    | AssignmentExpression
    | LogicalExpression
    | Identifier
    | AssignmentExpression
    | LogicalExpression
    | InputExpression
    | CallExpression
    | ArrayLiteral
    | MemberExpression
    | FunctionExpression;

export interface FunctionDeclaration {
    type: "FunctionDeclaration";
    name: string;
    params: Identifier[];
    body: BlockStatement;
}

export interface ReturnStatement {
    type: "ReturnStatement";
    argument?: Expression;
}

export interface CallExpression {
    type: "CallExpression";
    callee: Expression;
    arguments: Expression[];
}

export interface ArrayLiteral {
    type: "ArrayLiteral";
    elements: Expression[];
}

export interface MemberExpression {
    type: "MemberExpression";
    object: Expression;
    property: Expression;
    computed: boolean; // true for array[index], false for obj.prop
}

export interface FunctionExpression {
    type: "FunctionExpression";
    params: Identifier[];
    body: BlockStatement;
}

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

export interface LogicalExpression {
    type: "LogicalExpression";
    left: Expression;
    right: Expression;
    operator: string;
}

export interface InputExpression {
    type: "InputExpression";
    prompt?: string;
}
