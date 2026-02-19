# Testing Checklist for Block Editor

## Setup Test
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts development server
- [ ] Browser opens to `http://localhost:5173`
- [ ] No console errors on page load

## Text Editor Mode Tests
- [ ] Text editor displays with sample code
- [ ] Virtual keyboard buttons work
- [ ] Code can be typed/edited
- [ ] Run button executes code
- [ ] Output appears in console
- [ ] Errors display correctly

## Mode Switching Tests
- [ ] "🧩 Block Mode" button visible
- [ ] Clicking switches to block editor
- [ ] "← Text Mode" button visible in block mode
- [ ] Clicking returns to text editor
- [ ] No errors during mode switch

## Block Editor - Basic Tests
- [ ] Three panels visible (palette, workspace, output)
- [ ] All block buttons render correctly
- [ ] Clicking block button adds to workspace
- [ ] Block appears with correct color
- [ ] Input fields are editable

## Block Editor - Interaction Tests
- [ ] Blocks can be dragged
- [ ] Delete button (×) removes blocks
- [ ] Parameters can be typed
- [ ] Run button executes blocks
- [ ] Output displays correctly

## Block Editor - Nesting Tests
- [ ] If block has container area
- [ ] While block has container area
- [ ] Function block has container area
- [ ] Blocks can be dragged into containers
- [ ] Nested blocks display with indentation
- [ ] Nested blocks execute correctly

## Code Generation Tests
- [ ] "📝 Code" button toggles view
- [ ] Generated code is valid Kaka Lang
- [ ] Code includes `ও কাকা` and `আসি কাকা`
- [ ] Indentation is correct
- [ ] Nested blocks generate nested code

## Example Programs
Test these programs work:

### Hello World
- [ ] Add print block
- [ ] Set value to "Hello World!"
- [ ] Run shows output

### Counter Loop
- [ ] Create variable i = 0
- [ ] Add while loop (i < 5)
- [ ] Nest print(i) inside
- [ ] Nest i = i + 1 inside
- [ ] Run shows 0,1,2,3,4

### Function
- [ ] Create function add(a, b)
- [ ] Add return a + b inside
- [ ] Create variable result = add(5, 3)
- [ ] Print result
- [ ] Run shows 8

## Error Handling Tests
- [ ] Empty workspace runs without crash
- [ ] Invalid condition shows error
- [ ] Undefined variable shows error
- [ ] Error messages are readable

## UI/UX Tests
- [ ] Colors are distinct and readable
- [ ] Buttons have hover effects
- [ ] Drag feedback is clear
- [ ] Layout is responsive
- [ ] Scrolling works in all panels

## Documentation Tests
- [ ] README.md is clear
- [ ] QUICKSTART.md is accurate
- [ ] BLOCK_EDITOR.md is comprehensive
- [ ] Examples in block_tutorial.md work
- [ ] Links between docs work

## Browser Compatibility
Test in:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

## Performance Tests
- [ ] Adding 10+ blocks is smooth
- [ ] Dragging is responsive
- [ ] Code execution is fast
- [ ] No memory leaks on repeated runs

## Known Limitations
Document any issues found:
- Input blocks not yet implemented
- Array blocks not yet implemented
- Else blocks not yet implemented
- No undo/redo functionality
