# Kaka Lang Web Compiler

This is the web interface for **Kaka Lang**, a toy programming language written in Bengali.

**📖 [Read in Bengali (বাংলায় পড়ুন) →](./README_BN.md)**

## Features

### Two Programming Modes

#### 1. Text Editor Mode
- Interactive code editor with syntax highlighting
- Virtual Keyboard: One-click typing for Bengali keywords
- Real-time code execution
- Integrated output console

#### 2. Block Editor Mode (NEW! 🧩)
- Scratch-like visual programming interface
- Drag-and-drop blocks to create programs
- Perfect for beginners learning to code
- Color-coded blocks by category
- Toggle to view generated code
- No typing required!

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and start coding!

### First Program (30 seconds)
1. Click **🧩 Block Mode** button
2. Click **কাকা বলো** (purple button)
3. Type `"Hello World!"`
4. Click **▶ চালাও**
5. See the output! 🎉

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Get started in 5 minutes
- [BLOCK_EDITOR.md](./BLOCK_EDITOR.md) - Complete block editor guide
- [FEATURES.md](./FEATURES.md) - Full feature list
- [../examples/block_tutorial.md](../examples/block_tutorial.md) - Step-by-step tutorials
- [../examples/block_examples.txt](../examples/block_examples.txt) - Example programs

## Build

```bash
npm run build
```
Build files will be in the `dist/` directory.

## Technology Stack

- React 19
- TypeScript
- Vite
- Custom Kaka Lang interpreter

## Project Structure

```
web/
├── src/
│   ├── App.tsx              # Text editor mode
│   ├── BlockEditor.tsx      # Block editor mode
│   ├── core/                # Kaka Lang interpreter
│   └── ...
├── QUICKSTART.md            # Quick start guide
├── BLOCK_EDITOR.md          # Block editor documentation
└── FEATURES.md              # Feature overview
```

## Contributing

This is an educational project. Feel free to explore and learn!
