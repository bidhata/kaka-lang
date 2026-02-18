#!/usr/bin/env node
import fs from "fs";
import { tokenize } from "./tokenizer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

const args = process.argv.slice(2);
if (args.length < 1) {
    console.log("ব্যবহার: kaku <filename>");
    process.exit(1);
}

const filename = args[0];
try {
    const source = fs.readFileSync(filename, "utf-8");
    const tokens = tokenize(source);
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    interpreter.interpret(ast);
} catch (e: any) {
    console.error("ভুল হয়েছে কাকা (Error):", e.message);
}
