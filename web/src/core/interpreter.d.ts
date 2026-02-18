import { Program } from "./types.js";
export declare class Interpreter {
    private globalEnv;
    constructor();
    interpret(program: Program): void;
    private executeBlock;
    private execute;
    private visitVariableDeclaration;
    private visitPrintStatement;
    private visitIfStatement;
    private visitWhileStatement;
    private visitBlockStatement;
    private evaluateExpression;
    private lookupVariable;
    private assignVariable;
    private evaluateAssignment;
    private evaluateBinaryExpression;
}
//# sourceMappingURL=interpreter.d.ts.map