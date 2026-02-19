# Kaka Lang Block Editor Tutorial

This tutorial will guide you through creating programs using the visual block editor.

## Getting Started

1. Open the web interface: `cd web && npm run dev`
2. Click the **🧩 Block Mode** button in the top right
3. You'll see three panels:
   - Left: Block Palette (available blocks)
   - Center: Workspace (your program)
   - Right: Output Console

## Tutorial 1: Hello World

**Goal**: Print "Hello Kaka Lang!" to the console

**Steps**:
1. Click the **কাকা বলো** button in the "আউটপুট" section
2. A purple block appears in the workspace
3. In the input field, type: `"Hello Kaka Lang!"`
4. Click **▶ চালাও** (Run)
5. See the output in the right panel!

**What you learned**: Basic output using print blocks

---

## Tutorial 2: Variables and Math

**Goal**: Calculate the sum of two numbers

**Steps**:
1. Click **কাকা রাখো** (Variables section) - this creates variable `a`
   - Name field: `a`
   - Value field: `10`

2. Click **কাকা রাখো** again for variable `b`
   - Name field: `b`
   - Value field: `20`

3. Click **কাকা রাখো** again for the sum
   - Name field: `sum`
   - Value field: `a + b`

4. Click **কাকা বলো** to print the result
   - Value field: `sum`

5. Click **▶ চালাও**

**What you learned**: Variables, assignment, and arithmetic

---

## Tutorial 3: Conditional Logic

**Goal**: Check if a number is positive or negative

**Steps**:
1. Create a variable:
   - Click **কাকা রাখো**
   - Name: `num`
   - Value: `15`

2. Add an if statement:
   - Click **যদি কাকা** (Control section)
   - Condition field: `num > 0`

3. Add a print block INSIDE the if block:
   - Click **কাকা বলো**
   - DRAG it into the yellow container area of the if block
   - Value: `"Positive number!"`

4. Click **▶ চালাও**

**What you learned**: Conditional statements and block nesting

---

## Tutorial 4: Loops

**Goal**: Count from 0 to 4

**Steps**:
1. Create counter variable:
   - Click **কাকা রাখো**
   - Name: `i`
   - Value: `0`

2. Add a while loop:
   - Click **যতক্ষণ কাকা**
   - Condition: `i < 5`

3. Inside the loop, add two blocks by dragging them into the green container:
   
   a. Print the counter:
      - Click **কাকা বলো**
      - Drag into loop
      - Value: `i`
   
   b. Increment counter:
      - Click **কাকা রাখো**
      - Drag into loop (below the print block)
      - Name: `i`
      - Value: `i + 1`

4. Click **▶ চালাও**

**What you learned**: Loops, nested blocks, and counter patterns

---

## Tutorial 5: Functions

**Goal**: Create a function that adds two numbers

**Steps**:
1. Define the function:
   - Click **ফাংশন কাকা**
   - Name: `add`
   - Parameters: `a, b`

2. Add return statement inside the function:
   - Click **ফেরত নাও**
   - Drag into the function's pink container
   - Value: `a + b`

3. Call the function:
   - Click **কাকা রাখো**
   - Name: `result`
   - Value: `add(5, 3)`

4. Print the result:
   - Click **কাকা বলো**
   - Value: `result`

5. Click **▶ চালাও**

**What you learned**: Function definition, parameters, return values, and function calls

---

## Tutorial 6: Nested Conditions

**Goal**: Grade calculator based on score

**Steps**:
1. Create score variable:
   - **কাকা রাখো**: name=`score`, value=`85`

2. First condition (A grade):
   - **যদি কাকা**: condition=`score >= 90`
   - Inside: **কাকা বলো**: value=`"Grade: A"`

3. Second condition (B grade):
   - **যদি কাকা**: condition=`score >= 80`
   - Inside: **কাকা বলো**: value=`"Grade: B"`

4. Third condition (C grade):
   - **যদি কাকা**: condition=`score >= 70`
   - Inside: **কাকা বলো**: value=`"Grade: C"`

5. Default case:
   - **কাকা বলো**: value=`"Grade: F"`

6. Click **▶ চালাও**

**What you learned**: Multiple conditions and decision trees

---

## Tips and Tricks

### Drag and Drop
- Click and hold on any block in the workspace to drag it
- Drop blocks into colored container areas to nest them
- Blocks automatically organize inside containers

### Deleting Blocks
- Click the **×** button on any block to remove it
- Deleting a container block removes all nested blocks too

### Expressions
You can use these in value/condition fields:
- Math: `+`, `-`, `*`, `/`, `%`
- Comparison: `>`, `<`, `>=`, `<=`, `==`, `!=`
- Variables: Just type the variable name
- Strings: Use quotes `"text"`
- Numbers: Type directly `42`

### Common Patterns

**Increment**: `i = i + 1`
**Decrement**: `i = i - 1`
**Multiply by 2**: `x = x * 2`
**Check equality**: `x == 10`
**Check not equal**: `x != 0`

### Debugging
- Check the output console for errors
- Make sure variable names match exactly
- Ensure conditions use comparison operators
- Verify string values have quotes

---

## Challenge Projects

Try building these on your own:

1. **Multiplication Table**: Print the 5 times table (5, 10, 15, ... 50)

2. **Even/Odd Checker**: Check if a number is even or odd

3. **Factorial Calculator**: Calculate factorial using a function

4. **Countdown Timer**: Count down from 10 to 0

5. **Temperature Converter**: Convert Celsius to Fahrenheit using a function

---

## Next Steps

Once you're comfortable with blocks:
- Switch to **Text Mode** to see the generated code
- Learn how blocks translate to Kaka Lang syntax
- Try writing code directly in text mode
- Combine both modes for learning

Happy coding with Kaka Lang! 🎉
