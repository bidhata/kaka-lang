# Kaka Lang - Project Structure

## Overview
This document describes the organization of the Kaka Lang project.

## Directory Structure

```
kaka-lang/
├── src/                      # Core language implementation (CLI)
│   ├── index.ts             # CLI entry point
│   ├── tokenizer.ts         # Lexical analysis
│   ├── parser.ts            # Syntax analysis
│   ├── interpreter.ts       # Code execution
│   └── types.ts             # Type definitions
│
├── web/                      # Web interface
│   ├── src/
│   │   ├── App.tsx          # Text editor mode
│   │   ├── App.css          # Text editor styles
│   │   ├── BlockEditor.tsx  # Block editor mode
│   │   ├── BlockEditor.css  # Block editor styles
│   │   ├── main.tsx         # React entry point
│   │   ├── index.css        # Global styles
│   │   └── core/            # Language core (copied from src/)
│   │       ├── tokenizer.ts
│   │       ├── parser.ts
│   │       ├── interpreter.ts
│   │       └── types.ts
│   │
│   ├── public/              # Static assets
│   ├── dist/                # Build output (generated)
│   │
│   ├── index.html           # HTML template
│   ├── vite.config.ts       # Vite configuration
│   ├── tsconfig.json        # TypeScript config
│   ├── package.json         # Dependencies
│   │
│   └── Documentation:
│       ├── README.md        # Web interface overview
│       ├── README_BN.md     # Bengali version
│       ├── QUICKSTART.md    # Quick start guide
│       ├── INDEX.md         # Complete documentation index
│       ├── BLOCK_EDITOR.md  # Block editor guide
│       ├── FEATURES.md      # Feature list
│       ├── INTERFACE_GUIDE.md
│       ├── ARCHITECTURE.md
│       ├── ENHANCED_FEATURES.md
│       ├── SCRATCH_COMPARISON.md
│       └── TESTING.md
│
├── examples/                 # Example programs
│   ├── example.kaka         # Basic example
│   ├── input_test.kaka      # Input example
│   ├── test_func_array.kaka # Functions and arrays
│   ├── array_test.kaka      # Array operations
│   ├── block_examples.txt   # Block editor examples
│   └── block_tutorial.md    # Block editor tutorial
│
├── dist/                     # CLI build output (generated)
├── node_modules/             # Dependencies (generated)
│
├── Documentation:
│   ├── README.md            # Main project README
│   ├── README_BN.md         # Bengali version
│   ├── GUIDE.md             # Complete language guide
│   ├── GUIDE_BN.md          # Bengali version
│   ├── DEPLOYMENT.md        # Deployment instructions
│   ├── PROJECT_STRUCTURE.md # This file
│   └── BLOCK_EDITOR_SUMMARY.md
│
├── Configuration:
│   ├── package.json         # Root dependencies
│   ├── tsconfig.json        # TypeScript config
│   ├── vercel.json          # Vercel deployment config
│   ├── .gitignore           # Git ignore rules
│   └── .vercelignore        # Vercel ignore rules
│
└── .git/                     # Git repository
```

## Key Components

### Core Language (src/)
- **tokenizer.ts**: Converts source code into tokens
- **parser.ts**: Builds Abstract Syntax Tree (AST) from tokens
- **interpreter.ts**: Executes the AST
- **types.ts**: TypeScript type definitions for AST nodes
- **index.ts**: CLI interface for running .kaka files

### Web Interface (web/src/)
- **App.tsx**: Text editor mode with syntax highlighting
- **BlockEditor.tsx**: Visual block-based programming interface
- **core/**: Copy of language implementation for browser use

### Documentation
- **Root level**: Project overview, guides, deployment
- **web/**: Web interface specific documentation
- **examples/**: Tutorial and example programs

## Build Outputs (Generated - Not in Git)
- `dist/` - CLI build output
- `web/dist/` - Web build output
- `node_modules/` - Dependencies
- `web/node_modules/` - Web dependencies

## Configuration Files

### TypeScript
- `tsconfig.json` - Root TypeScript configuration
- `web/tsconfig.json` - Web TypeScript configuration
- `web/tsconfig.app.json` - App-specific config
- `web/tsconfig.node.json` - Node-specific config

### Build Tools
- `package.json` - Root package configuration
- `web/package.json` - Web package configuration
- `web/vite.config.ts` - Vite bundler configuration
- `web/eslint.config.js` - ESLint configuration

### Deployment
- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment
- `.gitignore` - Files to exclude from Git

## Development Workflow

### CLI Development
```bash
# Install dependencies
npm install

# Run a .kaka file
npx ts-node src/index.ts examples/example.kaka
```

### Web Development
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Adding New Features

### Adding a New Language Feature
1. Update `src/types.ts` with new AST node types
2. Update `src/tokenizer.ts` to recognize new keywords
3. Update `src/parser.ts` to parse new syntax
4. Update `src/interpreter.ts` to execute new feature
5. Copy changes to `web/src/core/`
6. Update documentation

### Adding a New Block Type
1. Add block definition to `BLOCK_TYPES` in `BlockEditor.tsx`
2. Add rendering logic in `renderBlock()` function
3. Add code generation in `blocksToCode()` function
4. Add parsing logic in `convertCodeToBlocks()` function
5. Update block palette UI
6. Update documentation

## Testing
- Manual testing through web interface
- CLI testing with example files
- See `web/TESTING.md` for detailed testing guide

## Deployment
- See `DEPLOYMENT.md` for deployment instructions
- Configured for Vercel deployment
- Can be deployed to any static hosting service
