# Block Editor Architecture

## Overview

The block editor converts visual blocks into Kaka Lang code and executes it using the same interpreter as the text editor.

## Data Flow

```
User Action → Block State → Code Generation → Tokenizer → Parser → AST → Interpreter → Output
```

## Components

### 1. Block State Management
- Each block has: `id`, `type`, `params`, `children`
- State stored in React useState
- Blocks can be nested (if/while/function containers)

### 2. Block Types
Defined in `BLOCK_TYPES` constant:
- Output blocks (print)
- Variable blocks (declare/assign)
- Control blocks (if/while)
- Function blocks (define/return)

### 3. Code Generation
`blocksToCode()` function:
- Traverses block tree recursively
- Generates Kaka Lang syntax
- Handles indentation and nesting
- Wraps in `ও কাকা` ... `আসি কাকা`

### 4. Execution Pipeline
Same as text editor:
1. Tokenizer: Code → Tokens
2. Parser: Tokens → AST
3. Interpreter: AST → Execution

## Key Features

### Drag and Drop
- HTML5 drag events
- `draggedBlock` state tracks current drag
- Drop zones in container blocks
- Automatic nesting on drop

### Block Operations
- Add: Create new block with unique ID
- Update: Modify block parameters
- Delete: Remove block and children
- Move: Change block position/nesting

### Code Preview
- Toggle between blocks and code view
- Real-time code generation
- Helps users learn syntax

## File Structure

```
BlockEditor.tsx
├── State Management
│   ├── blocks: Block[]
│   ├── output: string[]
│   ├── draggedBlock: string | null
│   └── showCode: boolean
├── Block Operations
│   ├── addBlock()
│   ├── updateBlockParam()
│   ├── deleteBlock()
│   └── moveBlockToContainer()
├── Code Generation
│   └── blocksToCode()
├── Execution
│   └── runCode()
└── Rendering
    └── renderBlock()
```

## Integration with Kaka Lang

The block editor uses the same core modules:
- `tokenizer.ts` - Lexical analysis
- `parser.ts` - Syntax analysis
- `interpreter.ts` - Execution
- `types.ts` - Type definitions

This ensures consistency between text and block modes.

## Future Enhancements

Potential improvements:
- Undo/redo functionality
- Block search and filtering
- Save/load programs
- More block types (arrays, logical operators)
- Inline expression blocks
- Block validation before execution
- Syntax highlighting in code preview
