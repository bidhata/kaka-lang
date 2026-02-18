#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const tokenizer_1 = require("./tokenizer");
const parser_1 = require("./parser");
const interpreter_1 = require("./interpreter");
const args = process.argv.slice(2);
if (args.length < 1) {
    console.log("ব্যবহার: kaku <filename>");
    process.exit(1);
}
const filename = args[0];
try {
    const source = fs_1.default.readFileSync(filename, "utf-8");
    const tokens = (0, tokenizer_1.tokenize)(source);
    const parser = new parser_1.Parser(tokens);
    const ast = parser.parse();
    const interpreter = new interpreter_1.Interpreter();
    interpreter.interpret(ast);
}
catch (e) {
    console.error("ভুল হয়েছে কাকা (Error):", e.message);
}
//# sourceMappingURL=index.js.map