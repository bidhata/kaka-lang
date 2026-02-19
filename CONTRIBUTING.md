# Contributing to Kaka Lang

Thank you for your interest in contributing to Kaka Lang! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- This is an educational project - all skill levels welcome!

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

Feature suggestions are welcome! Please include:
- Clear description of the feature
- Use cases and benefits
- Examples of how it would work
- Any relevant mockups or diagrams

### Code Contributions

#### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/kaka-lang.git
   cd kaka-lang
   ```

3. Install dependencies:
   ```bash
   npm install
   cd web
   npm install
   cd ..
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

**Code Style:**
- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

**Testing:**
- Test your changes in both text and block editor modes
- Test with various example programs
- Verify no console errors
- Check that existing features still work

**Documentation:**
- Update relevant documentation files
- Add examples for new features
- Update both English and Bengali docs if applicable
- Add comments in code for complex logic

#### Making Changes

**For Language Features:**
1. Update `src/types.ts` with new AST types
2. Update `src/tokenizer.ts` for new keywords
3. Update `src/parser.ts` for new syntax
4. Update `src/interpreter.ts` for execution
5. Copy changes to `web/src/core/`
6. Add examples to `examples/`
7. Update documentation

**For Block Editor Features:**
1. Update `web/src/BlockEditor.tsx`
2. Update `web/src/BlockEditor.css` for styling
3. Test drag-and-drop functionality
4. Test code generation and parsing
5. Update documentation

**For UI/UX Improvements:**
1. Update relevant component files
2. Update CSS files
3. Test responsiveness
4. Ensure accessibility
5. Update screenshots in docs if needed

#### Commit Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples:
git commit -m "Add array slice operation support"
git commit -m "Fix block deletion in nested if-else"
git commit -m "Update Bengali documentation for arrays"

# Bad examples:
git commit -m "fix bug"
git commit -m "update"
git commit -m "changes"
```

#### Pull Request Process

1. Update documentation for your changes
2. Test thoroughly in both modes
3. Commit your changes with clear messages
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Screenshots/GIFs for UI changes
   - Reference any related issues

6. Wait for review and address feedback

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed project organization.

## Development Setup

### CLI Development
```bash
# Run a .kaka file
npx ts-node src/index.ts examples/example.kaka

# Build
npm run build
```

### Web Development
```bash
cd web
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Areas for Contribution

### Easy (Good First Issues)
- Add more example programs
- Improve documentation
- Fix typos
- Add Bengali translations
- Improve error messages

### Medium
- Add new block types
- Improve UI/UX
- Add keyboard shortcuts
- Improve code editor features
- Add more language features

### Advanced
- Optimize interpreter performance
- Add debugging features
- Implement code formatter
- Add syntax error recovery
- Create VS Code extension

## Questions?

- Check existing documentation
- Look at example code
- Create an issue for questions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to Kaka Lang! 🎉
