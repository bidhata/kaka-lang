# Quick Start Guide - Kaka Lang Block Editor

Get started with visual programming in 5 minutes!

## Installation

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Your First Program (30 seconds)

1. Click **🧩 Block Mode** button (top right)
2. Click the purple **কাকা বলো** button (left panel)
3. Type `"Hello World!"` in the input field
4. Click **▶ চালাও** (Run button)
5. See output on the right! 🎉

## Second Program: Count to 5 (2 minutes)

### Step 1: Create a counter
- Click **কাকা রাখো** (red button)
- Name: `i`
- Value: `0`

### Step 2: Add a loop
- Click **যতক্ষণ কাকা** (green button)
- Condition: `i < 5`

### Step 3: Add blocks inside the loop
Drag these blocks INTO the green loop container:

1. **কাকা বলো** (print)
   - Value: `i`

2. **কাকা রাখো** (variable)
   - Name: `i`
   - Value: `i + 1`

### Step 4: Run it!
- Click **▶ চালাও**
- You should see: 0, 1, 2, 3, 4

## Understanding the Interface

### Left Panel: Block Palette
- **আউটপুট** (Purple): Print to console
- **ভেরিয়েবল** (Red): Create/modify variables
- **কন্ট্রোল** (Orange/Green): If statements and loops
- **ফাংশন** (Pink): Define and return from functions

### Center Panel: Workspace
- Your program lives here
- Drag blocks to rearrange
- Drop blocks into containers (if/while/function)
- Click × to delete blocks

### Right Panel: Output
- Shows program results
- Displays errors in red

## Key Features

### 📝 View Generated Code
Click **📝 Code** button to see the Kaka Lang code your blocks create. Great for learning!

### 🔄 Switch Modes
- **Block Mode**: Visual programming
- **Text Mode**: Write code directly

### 🎨 Color Coding
- Purple: Output operations
- Red: Variables
- Orange: Conditionals (if)
- Green: Loops (while)
- Pink: Functions

## Common Blocks Explained

### কাকা বলো (Print)
Displays values in the output console.
- Example: `"Hello"` or `x + 5`

### কাকা রাখো (Variable)
Creates or updates a variable.
- Name: Variable identifier
- Value: What to store

### যদি কাকা (If)
Runs blocks inside only if condition is true.
- Condition: `x > 10`, `name == "Kaka"`, etc.

### যতক্ষণ কাকা (While)
Repeats blocks inside while condition is true.
- Condition: `i < 10`, `count != 0`, etc.

### ফাংশন কাকা (Function)
Defines reusable code.
- Name: Function identifier
- Parameters: Comma-separated names

### ফেরত নাও (Return)
Returns a value from a function.
- Value: What to return

## Tips for Success

1. **Start Simple**: Begin with one or two blocks
2. **Test Often**: Run your code frequently
3. **Use Variables**: Store values for reuse
4. **Check Conditions**: Make sure comparisons use `>`, `<`, `==`, etc.
5. **Nest Carefully**: Drag blocks fully into containers
6. **View Code**: Toggle to code view to learn syntax

## Example Programs

### Hello World
```
[কাকা বলো] value: "Hello World!"
```

### Add Two Numbers
```
[কাকা রাখো] name: a, value: 10
[কাকা রাখো] name: b, value: 20
[কাকা বলো] value: a + b
```

### Count to 3
```
[কাকা রাখো] name: i, value: 0
[যতক্ষণ কাকা] condition: i < 3
  └─ [কাকা বলো] value: i
  └─ [কাকা রাখো] name: i, value: i + 1
```

### Simple Function
```
[ফাংশন কাকা] name: double, params: x
  └─ [ফেরত নাও] value: x * 2
[কাকা রাখো] name: result, value: double(5)
[কাকা বলো] value: result
```

## Troubleshooting

### "Variable not defined" error
- Make sure you created the variable with **কাকা রাখো** first
- Check spelling matches exactly

### Loop runs forever
- Verify your condition eventually becomes false
- Make sure you update the counter inside the loop

### Nothing happens when I run
- Check if you have any blocks in the workspace
- Look for error messages in the output panel

### Blocks won't nest
- Drag the block completely into the colored container area
- Only if/while/function blocks can contain other blocks

## Next Steps

1. Complete the [Block Tutorial](../examples/block_tutorial.md)
2. Try the challenge projects
3. Switch to Text Mode to see real code
4. Learn Kaka Lang syntax from [GUIDE.md](../GUIDE.md)

## Need Help?

- Check [BLOCK_EDITOR.md](./BLOCK_EDITOR.md) for detailed documentation
- Review [block_tutorial.md](../examples/block_tutorial.md) for step-by-step lessons
- Experiment! You can't break anything 😊

Happy coding! 🚀
