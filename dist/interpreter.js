"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
class Interpreter {
    constructor() {
        this.globalEnv = { values: new Map() };
    }
    interpret(program) {
        try {
            this.executeBlock(program.body, this.globalEnv);
        }
        catch (e) {
            console.error("Runtime error:", e.message);
        }
    }
    executeBlock(statements, env) {
        for (const stmt of statements) {
            const result = this.execute(stmt, env);
            if (result === "BREAK" || result === "CONTINUE")
                return result;
            if (result && result.type === "RETURN")
                return result;
        }
    }
    execute(stmt, env) {
        switch (stmt.type) {
            case "VariableDeclaration":
                return this.visitVariableDeclaration(stmt, env);
            case "PrintStatement":
                return this.visitPrintStatement(stmt, env);
            case "IfStatement":
                return this.visitIfStatement(stmt, env);
            case "WhileStatement":
                return this.visitWhileStatement(stmt, env);
            case "BlockStatement":
                return this.visitBlockStatement(stmt, env);
            case "ExpressionStatement":
                this.evaluateExpression(stmt.expression, env);
                return;
            case "BreakStatement":
                return "BREAK";
            case "ContinueStatement":
                return "CONTINUE";
            case "FunctionDeclaration":
                return this.visitFunctionDeclaration(stmt, env);
            case "ReturnStatement":
                return { type: "RETURN", value: this.visitReturnStatement(stmt, env) };
            default:
                throw new Error(`Unknown statement type: ${stmt.type}`);
        }
    }
    visitVariableDeclaration(stmt, env) {
        const value = this.evaluateExpression(stmt.value, env);
        env.values.set(stmt.identifier, value);
    }
    visitPrintStatement(stmt, env) {
        const value = this.evaluateExpression(stmt.expression, env);
        console.log(value);
    }
    visitIfStatement(stmt, env) {
        const condition = this.evaluateExpression(stmt.condition, env);
        if (condition) {
            this.visitBlockStatement(stmt.consequent, env);
        }
        else if (stmt.alternate) {
            this.visitBlockStatement(stmt.alternate, env);
        }
    }
    visitWhileStatement(stmt, env) {
        while (this.evaluateExpression(stmt.condition, env)) {
            const result = this.visitBlockStatement(stmt.body, env);
            if (result === "BREAK")
                break;
            if (result === "CONTINUE")
                continue;
        }
    }
    visitBlockStatement(stmt, env) {
        const newEnv = { values: new Map(), parent: env };
        for (const statement of stmt.body) {
            const result = this.execute(statement, newEnv);
            if (result === "BREAK" || result === "CONTINUE")
                return result;
        }
    }
    evaluateExpression(expr, env) {
        switch (expr.type) {
            case "Literal":
                return expr.value;
            case "Identifier":
                return this.lookupVariable(expr.name, env);
            case "BinaryExpression":
                return this.evaluateBinaryExpression(expr, env);
            case "AssignmentExpression":
                return this.evaluateAssignment(expr, env);
            case "LogicalExpression":
                return this.evaluateLogicalExpression(expr, env);
            case "InputExpression":
                return this.evaluateInputExpression();
            case "CallExpression":
                return this.evaluateCallExpression(expr, env);
            case "ArrayLiteral":
                return this.evaluateArrayLiteral(expr, env);
            case "MemberExpression":
                return this.evaluateMemberExpression(expr, env);
            default:
                // Use `as any` to avoid 'never' type error if all cases are covered
                throw new Error(`Unknown expression type: ${expr.type}`);
        }
    }
    lookupVariable(name, env) {
        if (env.values.has(name))
            return env.values.get(name);
        if (env.parent)
            return this.lookupVariable(name, env.parent);
        throw new Error(`Variable '${name}' not defined.`);
    }
    assignVariable(name, value, env) {
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
    evaluateAssignment(expr, env) {
        const value = this.evaluateExpression(expr.right, env);
        this.assignVariable(expr.left.name, value, env);
        return value;
    }
    evaluateBinaryExpression(expr, env) {
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
    evaluateLogicalExpression(expr, env) {
        const left = this.evaluateExpression(expr.left, env);
        if (expr.operator === "AND_KAKA") {
            // Short-circuit AND: if left is false, return left (false)
            if (!left)
                return left;
            return this.evaluateExpression(expr.right, env);
        }
        else {
            // Short-circuit OR: if left is true, return left (true)
            if (left)
                return left;
            return this.evaluateExpression(expr.right, env);
        }
    }
    evaluateInputExpression() {
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
        }
        else {
            // Node.js environment
            try {
                // Dynamic require to avoid bundling issues
                const readlineSync = require("readline-sync");
                const result = readlineSync.question("কাকা কিছু বলো (Input): ");
                if (!isNaN(Number(result)) && result.trim() !== "") {
                    return Number(result);
                }
                return result;
            }
            catch (e) {
                console.warn("Input not supported in this environment without readline-sync");
                return null;
            }
        }
    }
    visitFunctionDeclaration(stmt, env) {
        env.values.set(stmt.name, stmt);
    }
    visitReturnStatement(stmt, env) {
        if (stmt.argument) {
            return this.evaluateExpression(stmt.argument, env);
        }
        return null;
    }
    evaluateCallExpression(expr, env) {
        const callee = this.evaluateExpression(expr.callee, env);
        const args = expr.arguments.map(arg => this.evaluateExpression(arg, env));
        // Native functions logic (e.g. array.push) 
        if (typeof callee === 'function') {
            return callee(...args);
        }
        if (callee && callee.type === "FunctionDeclaration") {
            const func = callee;
            const scope = {
                values: new Map(),
                parent: this.globalEnv // Functions are global in this toy lang scope
            };
            func.params.forEach((param, index) => {
                scope.values.set(param.name, args[index]);
            });
            const result = this.executeBlock(func.body.body, scope);
            if (result && result.type === "RETURN") {
                return result.value;
            }
            return null;
        }
        throw new Error("Can only call functions.");
    }
    evaluateArrayLiteral(expr, env) {
        return expr.elements.map(e => this.evaluateExpression(e, env));
    }
    evaluateMemberExpression(expr, env) {
        const object = this.evaluateExpression(expr.object, env);
        const property = this.evaluateExpression(expr.property, env);
        if (Array.isArray(object)) {
            if (typeof property === 'number') {
                return object[property];
            }
            // Array methods
            if (typeof property === 'string') {
                if (property === 'length')
                    return object.length;
                if (property === 'push')
                    return (...args) => object.push(...args);
                if (property === 'pop')
                    return () => object.pop();
            }
        }
        throw new Error("Only arrays and their methods are supported.");
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map