
import type {
    Program, ASTNode, Expression, BinaryExpression,
    Identifier, Literal, AssignmentExpression,
    IfStatement, WhileStatement, BlockStatement,
    VariableDeclaration, PrintStatement,
    LogicalExpression, InputExpression,
    FunctionDeclaration, ReturnStatement, CallExpression,
    ArrayLiteral, MemberExpression
} from "./types";
// Use require for readline-sync to avoid type issues in web context
// We will handle web polyfill separately
// import readlineSync from "readline-sync";

interface Environment {
    values: Map<string, any>;
    parent?: Environment;
}

export class Interpreter {
    private globalEnv: Environment;

    constructor() {
        this.globalEnv = { values: new Map() };
    }

    interpret(program: Program) {
        try {
            this.executeBlock(program.body, this.globalEnv);
        } catch (e: any) {
            console.error("Runtime error:", e.message);
        }
    }

    private executeBlock(statements: ASTNode[], env: Environment) {
        for (const stmt of statements) {
            const result = this.execute(stmt, env);
            if (result === "BREAK" || result === "CONTINUE") return result;
            if (result && typeof result === 'object' && result.type === "RETURN") return result;
        }
    }

    private execute(stmt: ASTNode, env: Environment): any {
        switch (stmt.type) {
            case "VariableDeclaration":
                return this.visitVariableDeclaration(stmt as VariableDeclaration, env);
            case "PrintStatement":
                return this.visitPrintStatement(stmt as PrintStatement, env);
            case "IfStatement":
                return this.visitIfStatement(stmt as IfStatement, env);
            case "WhileStatement":
                return this.visitWhileStatement(stmt as WhileStatement, env);
            case "BlockStatement":
                return this.visitBlockStatement(stmt as BlockStatement, env);
            case "ExpressionStatement":
                this.evaluateExpression((stmt as any).expression, env);
                return;
            case "BreakStatement":
                return "BREAK";
            case "ContinueStatement":
                return "CONTINUE";
            case "FunctionDeclaration":
                return this.visitFunctionDeclaration(stmt as FunctionDeclaration, env);
            case "ReturnStatement":
                return { type: "RETURN", value: this.visitReturnStatement(stmt as ReturnStatement, env) };
            default:
                throw new Error(`Unknown statement type: ${stmt.type}`);
        }
    }

    private visitVariableDeclaration(stmt: VariableDeclaration, env: Environment) {
        const value = this.evaluateExpression(stmt.value, env);
        env.values.set(stmt.identifier, value);
    }

    private visitPrintStatement(stmt: PrintStatement, env: Environment) {
        const value = this.evaluateExpression(stmt.expression, env);
        console.log(value);
    }

    private visitIfStatement(stmt: IfStatement, env: Environment) {
        const condition = this.evaluateExpression(stmt.condition, env);
        if (condition) {
            return this.visitBlockStatement(stmt.consequent, env);
        } else if (stmt.alternate) {
            return this.visitBlockStatement(stmt.alternate, env);
        }
    }

    private visitWhileStatement(stmt: WhileStatement, env: Environment) {
        while (this.evaluateExpression(stmt.condition, env)) {
            const result = this.visitBlockStatement(stmt.body, env);
            if (result === "BREAK") break;
            if (result === "CONTINUE") continue;
            if (result && typeof result === 'object' && result.type === "RETURN") return result;
        }
    }

    private visitBlockStatement(stmt: BlockStatement, env: Environment) {
        const newEnv: Environment = { values: new Map(), parent: env };
        for (const statement of stmt.body) {
            const result = this.execute(statement, newEnv);
            if (result === "BREAK" || result === "CONTINUE") return result;
            if (result && typeof result === 'object' && result.type === "RETURN") return result;
        }
    }

    private evaluateExpression(expr: Expression, env: Environment): any {
        switch (expr.type) {
            case "Literal":
                return (expr as Literal).value;
            case "Identifier":
                return this.lookupVariable((expr as Identifier).name, env);
            case "BinaryExpression":
                return this.evaluateBinaryExpression(expr as BinaryExpression, env);
            case "AssignmentExpression":
                return this.evaluateAssignment(expr as AssignmentExpression, env);
            case "LogicalExpression":
                return this.evaluateLogicalExpression(expr as LogicalExpression, env);
            case "InputExpression":
                return this.evaluateInputExpression();
            case "CallExpression":
                return this.evaluateCallExpression(expr as CallExpression, env);
            case "ArrayLiteral":
                return this.evaluateArrayLiteral(expr as ArrayLiteral, env);
            case "MemberExpression":
                return this.evaluateMemberExpression(expr as MemberExpression, env);
            default:
                // Use `as any` to avoid 'never' type error if all cases are covered
                throw new Error(`Unknown expression type: ${(expr as any).type}`);
        }
    }

    private lookupVariable(name: string, env: Environment): any {
        if (env.values.has(name)) return env.values.get(name);
        if (env.parent) return this.lookupVariable(name, env.parent);

        // Final fallback to global env just in case (though parent chain should hit it)
        if (this.globalEnv.values.has(name)) return this.globalEnv.values.get(name);

        throw new Error(`Variable '${name}' not defined.`);
    }

    private assignVariable(name: string, value: any, env: Environment): void {
        if (env.values.has(name)) {
            env.values.set(name, value);
            return;
        }
        if (env.parent) {
            this.assignVariable(name, value, env.parent);
            return;
        }
        throw new Error(`Variable '${name}' not defined.`);
    }

    private evaluateAssignment(expr: AssignmentExpression, env: Environment): any {
        const value = this.evaluateExpression(expr.right, env);
        this.assignVariable(expr.left.name, value, env);
        return value;
    }

    private evaluateBinaryExpression(expr: BinaryExpression, env: Environment): any {
        const left = this.evaluateExpression(expr.left, env);
        const right = this.evaluateExpression(expr.right, env);

        switch (expr.operator) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
            case "%": return left % right;
            case ">": return left > right;
            case "<": return left < right;
            case ">=": return left >= right;
            case "<=": return left <= right;
            case "==": return left === right;
            case "!=": return left !== right;
            default: throw new Error(`Unknown operator: ${expr.operator}`);
        }
    }

    private evaluateLogicalExpression(expr: LogicalExpression, env: Environment): any {
        const left = this.evaluateExpression(expr.left, env);

        if (expr.operator === "AND_KAKA") {
            // Short-circuit AND: if left is false, return left (false)
            if (!left) return left;
            return this.evaluateExpression(expr.right, env);
        } else {
            // Short-circuit OR: if left is true, return left (true)
            if (left) return left;
            return this.evaluateExpression(expr.right, env);
        }
    }

    private evaluateInputExpression(): any {
        // Check if we are in browser
        // @ts-ignore
        if (typeof window !== 'undefined') {
            // @ts-ignore
            const result = window.prompt("কাকা কিছু বলো (Input):");
            // Try to parse number if possible, else return string
            if (result !== null && !isNaN(Number(result)) && result.trim() !== "") {
                return Number(result);
            }
            return result;
        } else {
            // Node.js environment
            try {
                // Dynamic require to avoid bundling issues
                const readlineSync = require("readline-sync");
                const result = readlineSync.question("কাকা কিছু বলো (Input): ");
                if (!isNaN(Number(result)) && result.trim() !== "") {
                    return Number(result);
                }
                return result;
            } catch (e) {
                console.warn("Input not supported in this environment without readline-sync");
                return null;
            }
        }
    }

    private visitFunctionDeclaration(stmt: FunctionDeclaration, env: Environment) {
        env.values.set(stmt.name, stmt);
    }

    private visitReturnStatement(stmt: ReturnStatement, env: Environment): any {
        if (stmt.argument) {
            return this.evaluateExpression(stmt.argument, env);
        }
        return null;
    }

    private evaluateCallExpression(expr: CallExpression, env: Environment): any {
        const callee = this.evaluateExpression(expr.callee, env);
        const args = expr.arguments.map(arg => this.evaluateExpression(arg, env));

        // Native functions logic (e.g. array.push) 
        if (typeof callee === 'function') {
            return callee(...args);
        }

        if (callee && callee.type === "FunctionDeclaration") {
            const func = callee as FunctionDeclaration;
            const scope: Environment = {
                values: new Map(),
                parent: this.globalEnv // Functions are global, capturing global env
            };
            // Note: In real languages, we use lexical scope (closure) which captures definition environment.
            // Here, for recursion to work, the function name itself must be available in the scope or globalEnv.
            // Since we added function to globalEnv in visitFunctionDeclaration, it should be fine.

            func.params.forEach((param, index) => {
                scope.values.set(param.name, args[index]);
            });

            const result = this.executeBlock(func.body.body, scope);
            if (result && typeof result === 'object' && result.type === "RETURN") {
                return result.value;
            }
            return result; // Should determine if function returns undefined implicitly
        }

        throw new Error("Can only call functions.");
    }

    private evaluateArrayLiteral(expr: ArrayLiteral, env: Environment): any {
        return expr.elements.map(e => this.evaluateExpression(e, env));
    }

    private evaluateMemberExpression(expr: MemberExpression, env: Environment): any {
        const object = this.evaluateExpression(expr.object, env);
        const property = this.evaluateExpression(expr.property, env);

        if (Array.isArray(object)) {
            if (typeof property === 'number') {
                return object[property];
            }
            // Array methods
            if (typeof property === 'string') {
                if (property === 'length') return object.length;
                if (property === 'push') return (...args: any[]) => object.push(...args);
                if (property === 'pop') return () => object.pop();
            }
        }

        throw new Error("Only arrays and their methods are supported.");
    }
}
