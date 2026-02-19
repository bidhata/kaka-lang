# Kaka Lang Block Editor (ব্লক এডিটর)

A Scratch-like visual programming interface for Kaka Lang, designed to help beginners learn programming concepts through drag-and-drop blocks.

## Features

### 🧩 Visual Programming
- Drag and drop blocks to create programs
- No typing required - perfect for beginners
- Color-coded blocks by category
- Nested blocks for control structures

### 📦 Block Categories

#### আউটপুট (Output)
- **কাকা বলো** - Print values to console

#### ভেরিয়েবল (Variables)
- **কাকা রাখো** - Declare and assign variables

#### কন্ট্রোল (Control Flow)
- **যদি কাকা** - If statements with condition
- **যতক্ষণ কাকা** - While loops with condition

#### ফাংশন (Functions)
- **ফাংশন কাকা** - Define functions with parameters
- **ফেরত নাও** - Return values from functions

## How to Use

### 1. Adding Blocks
Click on any block button in the left palette to add it to the workspace.

### 2. Configuring Blocks
Each block has input fields for:
- **নাম (Name)**: Variable or function names
- **মান (Value)**: Values or expressions
- **শর্ত (Condition)**: Conditions for if/while statements
- **প্যারামিটার (Parameters)**: Function parameters

### 3. Nesting Blocks
Blocks with containers (if, while, functions) can hold other blocks:
1. Drag a block from the workspace
2. Drop it into the container area of another block
3. The block will nest inside

### 4. Running Code
Click the **▶ চালাও** button to execute your program. Output appears in the right panel.

### 5. Deleting Blocks
Click the **×** button on any block to remove it.

## Example Programs

### Hello World
1. Add a **কাকা বলো** block
2. Set value to `"Hello World"`
3. Click Run

### Counter Loop
1. Add a **কাকা রাখো** block, set name to `i`, value to `0`
2. Add a **যতক্ষণ কাকা** block, set condition to `i < 5`
3. Drag a **কাকা বলো** block inside the loop, set value to `i`
4. Drag another **কাকা রাখো** block inside, set name to `i`, value to `i + 1`
5. Click Run

### Simple Function
1. Add a **ফাংশন কাকা** block, set name to `add`, params to `a, b`
2. Drag a **ফেরত নাও** block inside, set value to `a + b`
3. Add a **কাকা রাখো** block, set name to `result`, value to `add(5, 3)`
4. Add a **কাকা বলো** block, set value to `result`
5. Click Run

## Tips

- Use Bengali or English variable names
- Expressions in value fields support math operators: `+`, `-`, `*`, `/`, `%`
- Conditions support comparisons: `>`, `<`, `>=`, `<=`, `==`, `!=`
- Use `ঠিক` for true, `ভুল` for false
- String values need quotes: `"text"`

## Switching Modes

- Click **🧩 Block Mode** in the text editor to switch to blocks
- Click **← Text Mode** in the block editor to return to text editing

## Technical Details

The block editor generates Kaka Lang code from the visual blocks and executes it using the same interpreter as the text editor. This ensures consistency between both modes.

## Future Enhancements

Planned features:
- More block types (arrays, logical operators)
- Block search and filtering
- Save/load block programs
- Export to text code
- Undo/redo functionality
- Block duplication
- Inline expression blocks
