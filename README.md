# Kaka Lang (কাকা ল্যাঙ্গুয়েজ)

Made by **Krishnendu Paul** ([@bidhata](https://krishnendu.com))  
**Website**: [krishnendu.com](https://krishnendu.com)  
**GitHub**: [github.com/bidhata/kaka-lang](https://github.com/bidhata/kaka-lang)

A toy programming language written in Bengali, inspired by [bhai-lang](https://github.com/DulLabs/bhai-lang).
Code starts with `ও কাকা` (O Kaka) and ends with `আসি কাকা` (Ashi Kaka).

## Installation

```bash
npm install -g kaku-lang
# or run directly
npx ts-node src/index.ts <filename>
```

## Syntax

### Entry/Exit
- Start: `ও কাকা`
- End: `আসি কাকা`

### Variables
- Declare: `কাকা রাখো <var> = <value>;`
  - Example: `কাকা রাখো a = 10;`

### Printing
- Print: `কাকা বলো <expression>;`
  - Example: `কাকা বলো "Hello World";`

### Conditionals
- If: `যদি কাকা (condition) { ... }`
- Else: `নাহলে কাকা { ... }`

```
যদি কাকা (a > 10) {
  কাকা বলো "a is big";
} Nahole Kaka {
  কাকা বলো "a is small";
}
```

### Loops
- While: `যতক্ষণ কাকা (condition) { ... }`

```
যতক্ষণ কাকা (i < 5) {
  কাকা বলো i;
  i = i + 1;
}
```

### Data Types
- Numbers: `0-9` and Bengali digits `০-৯`.
- Strings: `"text"` or `'text'`.
- Booleans: `ঠিক` (true), `ভুল` (false).
- Null: `ফালতু`.

### Keywords Mapping

| English | Kaku-lang | Meaning |
|---|---|---|
| hi bhai | ও কাকা | Hello Uncle |
| bye bhai | আসি কাকা | Bye Uncle |
| bol bhai | কাকা বলো | Uncle Speak |
| bhai ye hai | কাকা রাখো | Uncle Keep |
| agar bhai | যদি কাকা | If Uncle |
| warna bhai | নাহলে কাকা | Else Uncle |
| jab tak bhai | যতক্ষণ কাকা | Until Uncle |
| bas kar bhai | ব্যাস কাকা | Stop Uncle (Break) |
| agla dekh bhai | পরেরটা কাকা | Next Uncle (Continue) |
| sun bhai | কাকা শোনো | Uncle Listen (Input) |
| aur bhai | এবং | And |
| ya bhai | অথবা | Or |
| function bhai | ফাংশন কাকা | Function |
| wapas le bhai | ফেরত নাও | Return |

### Input
- `কাকা শোনো` (Input): Pauses execution and returns input.
  - Example: `কাকা রাখো name = কাকা শোনো;`

### Functions (ফাংশন)
- Define: `ফাংশন কাকা <name>(args) { ... }`
- Return: `ফেরত নাও <value>;`
- Call: `name(args);`

### Arrays (তালিকা)
- Create: `[val1, val2]`
- Access: `list[0]`
- Methods: `list["push"](val)`, `list["length"]`

## Web Compiler
Run the web-based IDE with:
```bash
cd web
npm install
npm run dev
```
Features:
- Syntax highlighting (basic editor)
- **Virtual Keyboard**: Click buttons to insert Kaku keywords easily!
- Output console integrated.

## Documentation
For a full coding guide, check out [GUIDE.md](./GUIDE.md).
