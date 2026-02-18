# Kaka Lang (কাকা ল্যাঙ্গুয়েজ) - The Complete Coding Guide

Welcome to **Kaka Lang**, a fun toy programming language based on Bengali slang and casual conversation styles. This guide will teach you everything you need to know to become a Kaka Lang developer!

## 1. Getting Started

### Web Compiler (Recommended)
The easiest way to run Kaku-lang is using the built-in web compiler.
1.  Navigate to the `web` directory.
2.  Run `npm install` and `npm run dev`.
3.  Open `http://localhost:5173` in your browser.
4.  Use the **Virtual Keyboard** to type keywords easily!

### Command Line Interface (CLI)
You can also run Kaku-lang files (`.kaka`) using Node.js.
```bash
# Run a file
npx ts-node src/index.ts your_file.kaka
```

---

## 2. Program Structure

Every Kaku-lang program must start with greeting the uncle (**Kaku**) and end by saying goodbye.

```javascript
ও কাকা
  // Your code goes here...
আসি কাকা
```

- **Start**: `ও কাকা` (O Kaka / Hi Uncle)
- **End**: `আসি কাকা` (Ashi Kaka / Bye Uncle)
- **Comments**: Use `//` for single-line comments.

---

## 3. Variables & Data Types

Use `কাকা রাখো` (Kaka Rakho / Uncle keep this) to declare variables.

```javascript
কাকা রাখো name = "Rahul";
কাকা রাখো age = 25;
কাকা রাখো isStudent = ঠিক; // true
কাকা রাখো job = ফালতু;     // null
```

### Data Types
- **Numbers**: Function with both English (`123`) and Bengali (`১২৩`) digits!
- **Strings**: Text inside `"double quotes"` or `'single quotes'`.
- **Booleans**: `ঠিক` (True) and `ভুল` (False).
- **Null**: `ফালতু` (Useless/Null).

---

## 4. Input & Output

### Printing
Ask Kaku to speak using `কাকা বলো` (Kaka Bolo).

```javascript
কাকা বলো "Hello World!";
কাকা বলো 10 + 20;
```

### Input
Ask Kaku to listen using `কাকা শোনো` (Kaka Shono).

```javascript
কাকা রাখো name = কাকা শোনো;
কাকা বলো name;
```

---

## 5. Control Flow

### If / Else
Make decisions with `যদি কাকা` (Jodi Kaka) and `নাহলে কাকা` (Nahole Kaka).

```javascript
কাকা রাখো marks = 80;

যদি কাকা (marks > 33) {
   কাকা বলো "Pass korechi!";
} নাহলে কাকা {
   কাকা বলো "Fail!";
}
```

### Logical Operators
- **AND**: `এবং` (Ebong) -> Returns true if BOTH are true.
- **OR**: `অথবা` (Othoba) -> Returns true if ANY is true.

```javascript
যদি কাকা (age > 18 এবং hasID == ঠিক) {
   কাকা বলো "Vote dite parbe";
}
```

### Loops (While)
Repeat things with `যতক্ষণ কাকা` (Jotokhon Kaka).

```javascript
কাকা রাখো i = 0;
যতক্ষণ কাকা (i < 5) {
   কাকা বলো i;
   i = i + 1;
}
```
- **Break**: `ব্যাস কাকা` (Bas Kaka - Stop)
- **Continue**: `পরেরটা কাকা` (Porerta Kaka - Next)

---

## 6. Functions (ফাংশন)

Define reusable blocks of code using `ফাংশন কাকা`. Use `ফেরত নাও` to return values.

```javascript
ফাংশন কাকা jogfol(a, b) {
   ফেরত নাও a + b;
}

কাকা রাখো result = jogfol(10, 20);
কাকা বলো result; // 30
```

---

## 7. Arrays (লিস্ট)

Store multiple values in a list. Indices start at **0**.

```javascript
কাকা রাখো numbers = [১০, ২০, ৩০];

// Access
কাকা বলো numbers[0]; // 10

// Length
কাকা বলো numbers["length"]; // 3

// Push (Add to end)
numbers["push"](40);

// Pop (Remove from end)
numbers["pop"]();
```

---

## 8. Example Project: Factorial Calculator

```javascript
ও কাকা
  ফাংশন কাকা factorial(n) {
     যদি কাকা (n == 0) {
        ফেরত নাও 1;
     }
     ফেরত নাও n * factorial(n - 1);
  }

  কাকা বলো "Enter a number:";
  কাকা রাখো num = কাকা শোনো;
  
  কাকা বলো factorial(num);
আসি কাকা
```

---
Happy Coding with Kaku!
