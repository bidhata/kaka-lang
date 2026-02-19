import { useState, useRef } from 'react';
import './BlockEditor.css';
import { tokenize } from './core/tokenizer';
import { Parser } from './core/parser';
import { Interpreter } from './core/interpreter';

interface Block {
  id: string;
  type: string;
  params: Record<string, any>;
  children?: Block[];
  elseChildren?: Block[];
}

interface BlockEditorProps {
  onBackToText: () => void;
}

const BLOCK_TYPES = {
  // Output
  print: { label: 'কাকা বলো', color: '#9966FF', hasValue: true, icon: '💬' },
  
  // Variables
  variable: { label: 'কাকা রাখো', color: '#FF6680', hasName: true, hasValue: true, icon: '📦' },
  variable_change: { label: 'পরিবর্তন করো', color: '#FF6680', hasName: true, hasValue: true, icon: '🔄' },
  
  // Control Flow
  if: { label: 'যদি কাকা', color: '#FFAB19', hasCondition: true, hasChildren: true, icon: '🔀' },
  if_else: { label: 'যদি-নাহলে', color: '#FFAB19', hasCondition: true, hasChildren: true, hasElse: true, icon: '⚡' },
  while: { label: 'যতক্ষণ কাকা', color: '#0FBD8C', hasCondition: true, hasChildren: true, icon: '🔁' },
  repeat: { label: 'পুনরাবৃত্তি', color: '#0FBD8C', hasTimes: true, hasChildren: true, icon: '🔂' },
  break: { label: 'ব্যাস কাকা', color: '#0FBD8C', icon: '🛑' },
  continue: { label: 'পরেরটা কাকা', color: '#0FBD8C', icon: '⏭️' },
  
  // Input
  input: { label: 'কাকা শোনো', color: '#4C97FF', hasPrompt: true, icon: '⌨️' },
  
  // Math Operations
  math_op: { label: 'গণিত', color: '#59C059', hasLeft: true, hasOperator: true, hasRight: true, icon: '➕' },
  
  // Comparison
  compare: { label: 'তুলনা', color: '#5CB1D6', hasLeft: true, hasOperator: true, hasRight: true, icon: '⚖️' },
  
  // Logic
  logic_and: { label: 'এবং', color: '#5CB1D6', hasLeft: true, hasRight: true, icon: '🔗' },
  logic_or: { label: 'অথবা', color: '#5CB1D6', hasLeft: true, hasRight: true, icon: '🔀' },
  logic_not: { label: 'নয়', color: '#5CB1D6', hasValue: true, icon: '❌' },
  
  // Values
  number: { label: 'সংখ্যা', color: '#59C059', hasValue: true, inline: true, icon: '🔢' },
  string: { label: 'টেক্সট', color: '#59C059', hasValue: true, inline: true, icon: '📝' },
  boolean_true: { label: 'ঠিক', color: '#59C059', inline: true, icon: '✅' },
  boolean_false: { label: 'ভুল', color: '#59C059', inline: true, icon: '❌' },
  
  // Functions
  function: { label: 'ফাংশন কাকা', color: '#FF6680', hasName: true, hasParams: true, hasChildren: true, icon: '⚙️' },
  return: { label: 'ফেরত নাও', color: '#FF6680', hasValue: true, icon: '↩️' },
  call: { label: 'কল করো', color: '#9966FF', hasName: true, hasArgs: true, icon: '📞' },
  
  // Arrays
  array_create: { label: 'তালিকা তৈরি', color: '#FF8C1A', hasElements: true, icon: '📋' },
  array_get: { label: 'তালিকা থেকে নাও', color: '#FF8C1A', hasArray: true, hasIndex: true, icon: '📌' },
  array_set: { label: 'তালিকায় রাখো', color: '#FF8C1A', hasArray: true, hasIndex: true, hasValue: true, icon: '📍' },
  array_length: { label: 'তালিকার দৈর্ঘ্য', color: '#FF8C1A', hasArray: true, icon: '📏' },
  array_push: { label: 'তালিকায় যোগ করো', color: '#FF8C1A', hasArray: true, hasValue: true, icon: '➕' },
  
  // Comments
  comment: { label: 'মন্তব্য', color: '#FFDA6A', hasText: true, icon: '💭' },
  
  // Wait/Delay (for fun animations)
  wait: { label: 'অপেক্ষা করো', color: '#CF63CF', hasSeconds: true, icon: '⏱️' },
};

export default function BlockEditor({ onBackToText }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedBlock, setCopiedBlock] = useState<Block | null>(null);
  const [showPasteDialog, setShowPasteDialog] = useState(false);
  const [pasteCodeText, setPasteCodeText] = useState('');
  const blockIdCounter = useRef(0);

  const generateId = () => `block-${blockIdCounter.current++}`;

  const addBlock = (type: string) => {
    const blockType = BLOCK_TYPES[type as keyof typeof BLOCK_TYPES];
    const hasChildren = blockType && 'hasChildren' in blockType && blockType.hasChildren;
    const hasElse = blockType && 'hasElse' in blockType && blockType.hasElse;
    const newBlock: Block = {
      id: generateId(),
      type,
      params: {},
      children: hasChildren ? [] : undefined,
      elseChildren: hasElse ? [] : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockParam = (id: string, param: string, value: any) => {
    const updateBlock = (blocks: Block[]): Block[] => {
      return blocks.map(block => {
        if (block.id === id) {
          return { ...block, params: { ...block.params, [param]: value } };
        }
        if (block.children) {
          return { ...block, children: updateBlock(block.children) };
        }
        return block;
      });
    };
    setBlocks(updateBlock(blocks));
  };

  const deleteBlock = (id: string) => {
    const removeBlock = (blocks: Block[]): Block[] => {
      return blocks.filter(block => {
        if (block.id === id) return false;
        if (block.children) {
          block.children = removeBlock(block.children);
        }
        if (block.elseChildren) {
          block.elseChildren = removeBlock(block.elseChildren);
        }
        return true;
      });
    };
    setBlocks(removeBlock(blocks));
  };

  const clearWorkspace = () => {
    if (blocks.length > 0) {
      const confirmed = window.confirm('সব ব্লক মুছে ফেলতে চান? (Clear all blocks?)');
      if (confirmed) {
        setBlocks([]);
        setOutput(['🗑️ সব ব্লক মুছে ফেলা হয়েছে']);
      }
    }
  };

  const copyBlock = (id: string) => {
    const findBlock = (blocks: Block[]): Block | null => {
      for (const block of blocks) {
        if (block.id === id) return block;
        if (block.children) {
          const found = findBlock(block.children);
          if (found) return found;
        }
        if (block.elseChildren) {
          const found = findBlock(block.elseChildren);
          if (found) return found;
        }
      }
      return null;
    };
    
    const blockToCopy = findBlock(blocks);
    if (blockToCopy) {
      setCopiedBlock(JSON.parse(JSON.stringify(blockToCopy))); // Deep clone
    }
  };

  const pasteBlock = () => {
    if (!copiedBlock) return;
    
    const assignNewIds = (block: Block): Block => {
      const newBlock = { ...block, id: generateId() };
      if (newBlock.children) {
        newBlock.children = newBlock.children.map(assignNewIds);
      }
      if (newBlock.elseChildren) {
        newBlock.elseChildren = newBlock.elseChildren.map(assignNewIds);
      }
      return newBlock;
    };
    
    const newBlock = assignNewIds(copiedBlock);
    setBlocks([...blocks, newBlock]);
  };

  const duplicateBlock = (id: string) => {
    copyBlock(id);
    setTimeout(() => pasteBlock(), 0);
  };

  const convertCodeToBlocks = (code: string) => {
    try {
      // Remove ও কাকা and আসি কাকা if present
      let cleanCode = code.trim();
      cleanCode = cleanCode.replace(/^ও কাকা\s*/i, '');
      cleanCode = cleanCode.replace(/\s*আসি কাকা\s*$/i, '');
      
      const lines = cleanCode.split('\n').map(l => l.trim()).filter(l => l);
      
      // Warning for complex code
      if (lines.length > 100) {
        setOutput(['⚠️ সতর্কতা: অনেক বেশি লাইন। শুধুমাত্র প্রথম 100 লাইন রূপান্তরিত হবে।']);
        lines.splice(100);
      }
      
      const parseBlocks = (lines: string[], startIndex: number = 0): { blocks: Block[], endIndex: number } => {
        const blocks: Block[] = [];
        let i = startIndex;
        
        while (i < lines.length) {
          const line = lines[i];
          
          // Skip empty lines and comments at this level
          if (!line || line.startsWith('//')) {
            i++;
            continue;
          }
          
          // End of block
          if (line === '}') {
            return { blocks, endIndex: i };
          }
          
          // Print statement
          if (line.includes('কাকা বলো') && line.includes(';')) {
            const match = line.match(/কাকা বলো\s+(.+?);/);
            if (match) {
              blocks.push({
                id: generateId(),
                type: 'print',
                params: { value: match[1].trim() }
              });
            }
            i++;
          }
          // Variable declaration
          else if (line.includes('কাকা রাখো') && line.includes(';')) {
            const match = line.match(/কাকা রাখো\s+(\w+)\s*=\s*(.+?);/);
            if (match) {
              const varName = match[1].trim();
              const varValue = match[2].trim();
              
              // Check if it's an array literal
              if (varValue.startsWith('[') && varValue.endsWith(']')) {
                blocks.push({
                  id: generateId(),
                  type: 'variable',
                  params: { name: varName, value: varValue }
                });
              } else {
                blocks.push({
                  id: generateId(),
                  type: 'variable',
                  params: { name: varName, value: varValue }
                });
              }
            }
            i++;
          }
          // Variable change
          else if (line.match(/^\w+\s*=\s*.+;$/)) {
            const match = line.match(/^(\w+)\s*=\s*(.+);$/);
            if (match) {
              blocks.push({
                id: generateId(),
                type: 'variable_change',
                params: { name: match[1].trim(), value: match[2].trim() }
              });
            }
            i++;
          }
          // Array push
          else if (line.match(/^\w+\["push"\]\(.+\);$/)) {
            const match = line.match(/^(\w+)\["push"\]\((.+)\);$/);
            if (match) {
              blocks.push({
                id: generateId(),
                type: 'array_push',
                params: { array: match[1].trim(), value: match[2].trim() }
              });
            }
            i++;
          }
          // If statement with else
          else if (line.includes('যদি কাকা') && line.includes('(') && line.includes(')')) {
            const match = line.match(/যদি কাকা\s*\((.+?)\)\s*\{?/);
            if (match) {
              const condition = match[1].trim();
              i++;
              
              // Skip opening brace if on same line
              if (line.endsWith('{')) {
                // Already incremented
              } else if (i < lines.length && lines[i] === '{') {
                i++;
              }
              
              // Parse if body
              const ifResult = parseBlocks(lines, i);
              i = ifResult.endIndex + 1; // Skip closing brace
              
              // Check for else
              let elseChildren: Block[] | undefined;
              if (i < lines.length && lines[i].includes('নাহলে কাকা')) {
                i++;
                if (i < lines.length && lines[i] === '{') {
                  i++;
                }
                const elseResult = parseBlocks(lines, i);
                elseChildren = elseResult.blocks;
                i = elseResult.endIndex + 1;
              }
              
              blocks.push({
                id: generateId(),
                type: elseChildren ? 'if_else' : 'if',
                params: { condition },
                children: ifResult.blocks,
                elseChildren
              });
            } else {
              i++;
            }
          }
          // While loop
          else if (line.includes('যতক্ষণ কাকা') && line.includes('(') && line.includes(')')) {
            const match = line.match(/যতক্ষণ কাকা\s*\((.+?)\)\s*\{?/);
            if (match) {
              const condition = match[1].trim();
              i++;
              
              // Skip opening brace
              if (line.endsWith('{')) {
                // Already incremented
              } else if (i < lines.length && lines[i] === '{') {
                i++;
              }
              
              // Parse loop body
              const loopResult = parseBlocks(lines, i);
              i = loopResult.endIndex + 1;
              
              blocks.push({
                id: generateId(),
                type: 'while',
                params: { condition },
                children: loopResult.blocks
              });
            } else {
              i++;
            }
          }
          // Function declaration
          else if (line.includes('ফাংশন কাকা')) {
            const match = line.match(/ফাংশন কাকা\s+(\w+)\s*\(([^)]*)\)\s*\{?/);
            if (match) {
              const name = match[1].trim();
              const params = match[2].trim();
              i++;
              
              // Skip opening brace
              if (line.endsWith('{')) {
                // Already incremented
              } else if (i < lines.length && lines[i] === '{') {
                i++;
              }
              
              // Parse function body
              const funcResult = parseBlocks(lines, i);
              i = funcResult.endIndex + 1;
              
              blocks.push({
                id: generateId(),
                type: 'function',
                params: { name, params },
                children: funcResult.blocks
              });
            } else {
              i++;
            }
          }
          // Return statement
          else if (line.includes('ফেরত নাও') && line.includes(';')) {
            const match = line.match(/ফেরত নাও\s+(.+?);/);
            blocks.push({
              id: generateId(),
              type: 'return',
              params: { value: match ? match[1].trim() : '' }
            });
            i++;
          }
          // Break
          else if (line.includes('ব্যাস কাকা')) {
            blocks.push({
              id: generateId(),
              type: 'break',
              params: {}
            });
            i++;
          }
          // Continue
          else if (line.includes('পরেরটা কাকা')) {
            blocks.push({
              id: generateId(),
              type: 'continue',
              params: {}
            });
            i++;
          }
          // Comment
          else if (line.startsWith('//')) {
            blocks.push({
              id: generateId(),
              type: 'comment',
              params: { text: line.replace('//', '').trim() }
            });
            i++;
          }
          else {
            // Skip unknown lines
            i++;
          }
        }
        
        return { blocks, endIndex: i };
      };
      
      const result = parseBlocks(lines);
      const newBlocks = result.blocks;
      
      if (newBlocks.length > 0) {
        setBlocks([...blocks, ...newBlocks]);
        setShowPasteDialog(false);
        setPasteCodeText('');
        setOutput(['✅ কোড সফলভাবে ব্লকে রূপান্তরিত হয়েছে! (' + newBlocks.length + ' টি ব্লক তৈরি হয়েছে)', '✨ লুপ, if স্টেটমেন্ট এবং তালিকা সহ সম্পূর্ণ কোড রূপান্তরিত হয়েছে!']);
      } else {
        setOutput(['⚠️ কোন ব্লক তৈরি করা যায়নি। অনুগ্রহ করে বৈধ কাকা ল্যাং কোড পেস্ট করুন।']);
      }
    } catch (error: any) {
      setOutput(['❌ কোড রূপান্তরে ত্রুটি: ' + error.message]);
    }
  };

  const moveBlockToContainer = (blockId: string, containerId: string) => {
    let movedBlock: Block | null = null;
    
    const removeBlock = (blocks: Block[]): Block[] => {
      return blocks.filter(block => {
        if (block.id === blockId) {
          movedBlock = block;
          return false;
        }
        if (block.children) {
          block.children = removeBlock(block.children);
        }
        if (block.elseChildren) {
          block.elseChildren = removeBlock(block.elseChildren);
        }
        return true;
      });
    };

    const addToContainer = (blocks: Block[]): Block[] => {
      return blocks.map(block => {
        if (block.id === containerId && block.children && movedBlock) {
          return { ...block, children: [...block.children, movedBlock] };
        }
        if (block.children) {
          return { ...block, children: addToContainer(block.children) };
        }
        if (block.elseChildren) {
          return { ...block, elseChildren: addToContainer(block.elseChildren) };
        }
        return block;
      });
    };

    let newBlocks = removeBlock([...blocks]);
    if (movedBlock) {
      newBlocks = addToContainer(newBlocks);
    }
    setBlocks(newBlocks);
  };

  const moveBlockToElseContainer = (blockId: string, containerId: string) => {
    let movedBlock: Block | null = null;
    
    const removeBlock = (blocks: Block[]): Block[] => {
      return blocks.filter(block => {
        if (block.id === blockId) {
          movedBlock = block;
          return false;
        }
        if (block.children) {
          block.children = removeBlock(block.children);
        }
        if (block.elseChildren) {
          block.elseChildren = removeBlock(block.elseChildren);
        }
        return true;
      });
    };

    const addToElseContainer = (blocks: Block[]): Block[] => {
      return blocks.map(block => {
        if (block.id === containerId && block.elseChildren && movedBlock) {
          return { ...block, elseChildren: [...block.elseChildren, movedBlock] };
        }
        if (block.children) {
          return { ...block, children: addToElseContainer(block.children) };
        }
        if (block.elseChildren) {
          return { ...block, elseChildren: addToElseContainer(block.elseChildren) };
        }
        return block;
      });
    };

    let newBlocks = removeBlock([...blocks]);
    if (movedBlock) {
      newBlocks = addToElseContainer(newBlocks);
    }
    setBlocks(newBlocks);
  };

  const blocksToCode = (blocks: Block[], indent = 1): string => {
    const indentStr = '  '.repeat(indent);
    let code = '';

    for (const block of blocks) {
      const blockType = BLOCK_TYPES[block.type as keyof typeof BLOCK_TYPES];
      
      switch (block.type) {
        case 'print':
          code += `${indentStr}কাকা বলো ${block.params.value || '""'};\n`;
          break;
        case 'variable':
          code += `${indentStr}কাকা রাখো ${block.params.name || 'x'} = ${block.params.value || '0'};\n`;
          break;
        case 'variable_change':
          code += `${indentStr}${block.params.name || 'x'} = ${block.params.value || '0'};\n`;
          break;
        case 'if':
          code += `${indentStr}যদি কাকা (${block.params.condition || 'ঠিক'}) {\n`;
          if (block.children) {
            code += blocksToCode(block.children, indent + 1);
          }
          code += `${indentStr}}\n`;
          break;
        case 'if_else':
          code += `${indentStr}যদি কাকা (${block.params.condition || 'ঠিক'}) {\n`;
          if (block.children) {
            code += blocksToCode(block.children, indent + 1);
          }
          code += `${indentStr}} নাহলে কাকা {\n`;
          if (block.elseChildren) {
            code += blocksToCode(block.elseChildren, indent + 1);
          }
          code += `${indentStr}}\n`;
          break;
        case 'while':
          code += `${indentStr}যতক্ষণ কাকা (${block.params.condition || 'ঠিক'}) {\n`;
          if (block.children) {
            code += blocksToCode(block.children, indent + 1);
          }
          code += `${indentStr}}\n`;
          break;
        case 'repeat':
          const times = block.params.times || '10';
          const timesNum = parseInt(times);
          // Limit repeat times to prevent hanging
          const safeTimes = Math.min(timesNum, 1000);
          if (timesNum > 1000) {
            code += `${indentStr}// Warning: Repeat count limited to 1000\n`;
          }
          code += `${indentStr}কাকা রাখো _repeat_${block.id} = 0;\n`;
          code += `${indentStr}যতক্ষণ কাকা (_repeat_${block.id} < ${safeTimes}) {\n`;
          if (block.children) {
            code += blocksToCode(block.children, indent + 1);
          }
          code += `${indentStr}  _repeat_${block.id} = _repeat_${block.id} + 1;\n`;
          code += `${indentStr}}\n`;
          break;
        case 'break':
          code += `${indentStr}ব্যাস কাকা;\n`;
          break;
        case 'continue':
          code += `${indentStr}পরেরটা কাকা;\n`;
          break;
        case 'function':
          const params = block.params.params || '';
          code += `${indentStr}ফাংশন কাকা ${block.params.name || 'myFunc'}(${params}) {\n`;
          if (block.children) {
            code += blocksToCode(block.children, indent + 1);
          }
          code += `${indentStr}}\n`;
          break;
        case 'return':
          code += `${indentStr}ফেরত নাও ${block.params.value || 'ফালতু'};\n`;
          break;
        case 'comment':
          code += `${indentStr}// ${block.params.text || 'মন্তব্য'}\n`;
          break;
        case 'array_create':
          // Array creation is an expression, typically used in variable assignment
          break;
        case 'array_push':
          code += `${indentStr}${block.params.array || 'arr'}["push"](${block.params.value || '0'});\n`;
          break;
        case 'array_get':
          // Array get is an expression, typically used in variable assignment or print
          break;
        case 'array_length':
          // Array length is an expression
          break;
        case 'input':
          // Input is an expression, not a statement
          break;
      }
    }

    return code;
  };

  const runCode = () => {
    try {
      const code = `ও কাকা\n${blocksToCode(blocks)}আসি কাকা`;
      
      // Capture console.log
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        logs.push(args.map(String).join(' '));
        // Limit output to prevent hanging
        if (logs.length > 1000) {
          throw new Error('আউটপুট সীমা অতিক্রম করেছে (Output limit exceeded - possible infinite loop)');
        }
      };

      // Add timeout to prevent infinite loops
      const timeoutId = setTimeout(() => {
        console.log = originalLog;
        throw new Error('কোড চালানো বন্ধ করা হয়েছে (Execution timeout - possible infinite loop)');
      }, 5000); // 5 second timeout

      const tokens = tokenize(code);
      const parser = new Parser(tokens);
      const ast = parser.parse();
      const interpreter = new Interpreter();
      interpreter.interpret(ast);

      clearTimeout(timeoutId);
      console.log = originalLog;
      setOutput(logs);
    } catch (error: any) {
      setOutput([`Error: ${error.message}`]);
    }
  };

  const renderBlock = (block: Block, depth = 0): React.ReactElement => {
    const blockType = BLOCK_TYPES[block.type as keyof typeof BLOCK_TYPES];
    const color = blockType?.color || '#888';
    const icon = blockType && 'icon' in blockType ? blockType.icon : '🔷';

    return (
      <div
        key={block.id}
        className="block"
        style={{ backgroundColor: color, marginLeft: depth * 20 }}
        draggable
        onDragStart={() => setDraggedBlock(block.id)}
        onDragEnd={() => setDraggedBlock(null)}
      >
        <div className="block-header">
          <span className="block-icon">{icon}</span>
          <span className="block-label">{blockType?.label || block.type}</span>
          <div className="block-actions">
            <button className="block-copy" onClick={() => copyBlock(block.id)} title="কপি করো">
              📋
            </button>
            <button className="block-duplicate" onClick={() => duplicateBlock(block.id)} title="ডুপ্লিকেট করো">
              📑
            </button>
            <button className="block-delete" onClick={() => deleteBlock(block.id)} title="মুছে ফেলো">
              ×
            </button>
          </div>
        </div>

        <div className="block-params">
          {blockType && 'hasName' in blockType && blockType.hasName && (
            <input
              type="text"
              placeholder="নাম"
              value={block.params.name || ''}
              onChange={(e) => updateBlockParam(block.id, 'name', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasValue' in blockType && blockType.hasValue && (
            <input
              type="text"
              placeholder="মান"
              value={block.params.value || ''}
              onChange={(e) => updateBlockParam(block.id, 'value', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasCondition' in blockType && blockType.hasCondition && (
            <input
              type="text"
              placeholder="শর্ত (যেমন: x > 5)"
              value={block.params.condition || ''}
              onChange={(e) => updateBlockParam(block.id, 'condition', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasParams' in blockType && blockType.hasParams && (
            <input
              type="text"
              placeholder="প্যারামিটার (যেমন: a, b)"
              value={block.params.params || ''}
              onChange={(e) => updateBlockParam(block.id, 'params', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasTimes' in blockType && blockType.hasTimes && (
            <input
              type="number"
              placeholder="কতবার"
              value={block.params.times || '10'}
              onChange={(e) => updateBlockParam(block.id, 'times', e.target.value)}
              className="block-input"
              min="1"
            />
          )}
          {blockType && 'hasPrompt' in blockType && blockType.hasPrompt && (
            <input
              type="text"
              placeholder="প্রম্পট (ঐচ্ছিক)"
              value={block.params.prompt || ''}
              onChange={(e) => updateBlockParam(block.id, 'prompt', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasText' in blockType && blockType.hasText && (
            <input
              type="text"
              placeholder="মন্তব্য লিখুন"
              value={block.params.text || ''}
              onChange={(e) => updateBlockParam(block.id, 'text', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasLeft' in blockType && blockType.hasLeft && (
            <input
              type="text"
              placeholder="বাম মান"
              value={block.params.left || ''}
              onChange={(e) => updateBlockParam(block.id, 'left', e.target.value)}
              className="block-input block-input-small"
            />
          )}
          {blockType && 'hasOperator' in blockType && blockType.hasOperator && (
            <select
              value={block.params.operator || '+'}
              onChange={(e) => updateBlockParam(block.id, 'operator', e.target.value)}
              className="block-select"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
              <option value="%">%</option>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
          )}
          {blockType && 'hasRight' in blockType && blockType.hasRight && (
            <input
              type="text"
              placeholder="ডান মান"
              value={block.params.right || ''}
              onChange={(e) => updateBlockParam(block.id, 'right', e.target.value)}
              className="block-input block-input-small"
            />
          )}
          {blockType && 'hasSeconds' in blockType && blockType.hasSeconds && (
            <input
              type="number"
              placeholder="সেকেন্ড"
              value={block.params.seconds || '1'}
              onChange={(e) => updateBlockParam(block.id, 'seconds', e.target.value)}
              className="block-input"
              min="0"
              step="0.1"
            />
          )}
          {blockType && 'hasArray' in blockType && blockType.hasArray && (
            <input
              type="text"
              placeholder="তালিকার নাম"
              value={block.params.array || ''}
              onChange={(e) => updateBlockParam(block.id, 'array', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasIndex' in blockType && blockType.hasIndex && (
            <input
              type="text"
              placeholder="ইনডেক্স"
              value={block.params.index || '0'}
              onChange={(e) => updateBlockParam(block.id, 'index', e.target.value)}
              className="block-input"
            />
          )}
          {blockType && 'hasElements' in blockType && blockType.hasElements && (
            <input
              type="text"
              placeholder="উপাদান (যেমন: 1, 2, 3)"
              value={block.params.elements || ''}
              onChange={(e) => updateBlockParam(block.id, 'elements', e.target.value)}
              className="block-input"
            />
          )}
        </div>

        {blockType && 'hasChildren' in blockType && blockType.hasChildren && (
          <div
            className="block-children"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.stopPropagation();
              if (draggedBlock && draggedBlock !== block.id) {
                moveBlockToContainer(draggedBlock, block.id);
              }
            }}
          >
            {block.children && block.children.length > 0 ? (
              block.children.map(child => renderBlock(child, depth + 1))
            ) : (
              <div className="block-placeholder">এখানে ব্লক টেনে আনুন</div>
            )}
          </div>
        )}

        {blockType && 'hasElse' in blockType && blockType.hasElse && (
          <>
            <div className="block-else-label">নাহলে কাকা</div>
            <div
              className="block-children block-else-children"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.stopPropagation();
                if (draggedBlock && draggedBlock !== block.id) {
                  moveBlockToElseContainer(draggedBlock, block.id);
                }
              }}
            >
              {block.elseChildren && block.elseChildren.length > 0 ? (
                block.elseChildren.map(child => renderBlock(child, depth + 1))
              ) : (
                <div className="block-placeholder">এখানে ব্লক টেনে আনুন</div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="block-editor">
      <div className="block-editor-header">
        <h2>Kaka Lang - Block Editor (ব্লক এডিটর)</h2>
        <button onClick={onBackToText} className="back-button">
          ← Text Mode
        </button>
      </div>
      <div className="block-editor-content">
      <div className="block-palette">
        <h3>ব্লক প্যালেট</h3>
        <input
          type="text"
          className="palette-search"
          placeholder="� ব্লক খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {(!searchTerm || 'আউটপুট'.includes(searchTerm) || 'print'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>� আউটপুট</h4>
          <button onClick={() => addBlock('print')} style={{ backgroundColor: BLOCK_TYPES.print.color }}>
            {BLOCK_TYPES.print.icon} কাকা বলো
          </button>
        </div>
        )}

        {(!searchTerm || 'ভেরিয়েবল'.includes(searchTerm) || 'variable'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>📦 ভেরিয়েবল</h4>
          <button onClick={() => addBlock('variable')} style={{ backgroundColor: BLOCK_TYPES.variable.color }}>
            {BLOCK_TYPES.variable.icon} কাকা রাখো
          </button>
          <button onClick={() => addBlock('variable_change')} style={{ backgroundColor: BLOCK_TYPES.variable_change.color }}>
            {BLOCK_TYPES.variable_change.icon} পরিবর্তন করো
          </button>
        </div>
        )}

        {(!searchTerm || 'কন্ট্রোল'.includes(searchTerm) || 'control'.includes(searchTerm.toLowerCase()) || 'if'.includes(searchTerm.toLowerCase()) || 'loop'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>🎮 কন্ট্রোল</h4>
          <button onClick={() => addBlock('if')} style={{ backgroundColor: BLOCK_TYPES.if.color }}>
            {BLOCK_TYPES.if.icon} যদি কাকা
          </button>
          <button onClick={() => addBlock('if_else')} style={{ backgroundColor: BLOCK_TYPES.if_else.color }}>
            {BLOCK_TYPES.if_else.icon} যদি-নাহলে
          </button>
          <button onClick={() => addBlock('while')} style={{ backgroundColor: BLOCK_TYPES.while.color }}>
            {BLOCK_TYPES.while.icon} যতক্ষণ কাকা
          </button>
          <button onClick={() => addBlock('repeat')} style={{ backgroundColor: BLOCK_TYPES.repeat.color }}>
            {BLOCK_TYPES.repeat.icon} পুনরাবৃত্তি
          </button>
          <button onClick={() => addBlock('break')} style={{ backgroundColor: BLOCK_TYPES.break.color }}>
            {BLOCK_TYPES.break.icon} ব্যাস কাকা
          </button>
          <button onClick={() => addBlock('continue')} style={{ backgroundColor: BLOCK_TYPES.continue.color }}>
            {BLOCK_TYPES.continue.icon} পরেরটা কাকা
          </button>
        </div>
        )}

        {(!searchTerm || 'ইনপুট'.includes(searchTerm) || 'input'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>⌨️ ইনপুট</h4>
          <button onClick={() => addBlock('input')} style={{ backgroundColor: BLOCK_TYPES.input.color }}>
            {BLOCK_TYPES.input.icon} কাকা শোনো
          </button>
        </div>
        )}

        {(!searchTerm || 'গণিত'.includes(searchTerm) || 'math'.includes(searchTerm.toLowerCase()) || 'compare'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>🔢 গণিত ও তুলনা</h4>
          <button onClick={() => addBlock('math_op')} style={{ backgroundColor: BLOCK_TYPES.math_op.color }}>
            {BLOCK_TYPES.math_op.icon} গণিত
          </button>
          <button onClick={() => addBlock('compare')} style={{ backgroundColor: BLOCK_TYPES.compare.color }}>
            {BLOCK_TYPES.compare.icon} তুলনা
          </button>
        </div>
        )}

        {(!searchTerm || 'লজিক'.includes(searchTerm) || 'logic'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>🔗 লজিক</h4>
          <button onClick={() => addBlock('logic_and')} style={{ backgroundColor: BLOCK_TYPES.logic_and.color }}>
            {BLOCK_TYPES.logic_and.icon} এবং
          </button>
          <button onClick={() => addBlock('logic_or')} style={{ backgroundColor: BLOCK_TYPES.logic_or.color }}>
            {BLOCK_TYPES.logic_or.icon} অথবা
          </button>
          <button onClick={() => addBlock('logic_not')} style={{ backgroundColor: BLOCK_TYPES.logic_not.color }}>
            {BLOCK_TYPES.logic_not.icon} নয়
          </button>
        </div>
        )}

        {(!searchTerm || 'মান'.includes(searchTerm) || 'value'.includes(searchTerm.toLowerCase()) || 'number'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>💎 মান</h4>
          <button onClick={() => addBlock('number')} style={{ backgroundColor: BLOCK_TYPES.number.color }}>
            {BLOCK_TYPES.number.icon} সংখ্যা
          </button>
          <button onClick={() => addBlock('string')} style={{ backgroundColor: BLOCK_TYPES.string.color }}>
            {BLOCK_TYPES.string.icon} টেক্সট
          </button>
          <button onClick={() => addBlock('boolean_true')} style={{ backgroundColor: BLOCK_TYPES.boolean_true.color }}>
            {BLOCK_TYPES.boolean_true.icon} ঠিক
          </button>
          <button onClick={() => addBlock('boolean_false')} style={{ backgroundColor: BLOCK_TYPES.boolean_false.color }}>
            {BLOCK_TYPES.boolean_false.icon} ভুল
          </button>
        </div>
        )}

        {(!searchTerm || 'ফাংশন'.includes(searchTerm) || 'function'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>⚙️ ফাংশন</h4>
          <button onClick={() => addBlock('function')} style={{ backgroundColor: BLOCK_TYPES.function.color }}>
            {BLOCK_TYPES.function.icon} ফাংশন কাকা
          </button>
          <button onClick={() => addBlock('return')} style={{ backgroundColor: BLOCK_TYPES.return.color }}>
            {BLOCK_TYPES.return.icon} ফেরত নাও
          </button>
          <button onClick={() => addBlock('call')} style={{ backgroundColor: BLOCK_TYPES.call.color }}>
            {BLOCK_TYPES.call.icon} কল করো
          </button>
        </div>
        )}

        {(!searchTerm || 'তালিকা'.includes(searchTerm) || 'array'.includes(searchTerm.toLowerCase()) || 'list'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>📋 তালিকা</h4>
          <button onClick={() => addBlock('array_create')} style={{ backgroundColor: BLOCK_TYPES.array_create.color }}>
            {BLOCK_TYPES.array_create.icon} তৈরি
          </button>
          <button onClick={() => addBlock('array_push')} style={{ backgroundColor: BLOCK_TYPES.array_push.color }}>
            {BLOCK_TYPES.array_push.icon} যোগ করো
          </button>
          <button onClick={() => addBlock('array_get')} style={{ backgroundColor: BLOCK_TYPES.array_get.color }}>
            {BLOCK_TYPES.array_get.icon} নাও
          </button>
          <button onClick={() => addBlock('array_length')} style={{ backgroundColor: BLOCK_TYPES.array_length.color }}>
            {BLOCK_TYPES.array_length.icon} দৈর্ঘ্য
          </button>
        </div>
        )}

        {(!searchTerm || 'অন্যান্য'.includes(searchTerm) || 'comment'.includes(searchTerm.toLowerCase()) || 'wait'.includes(searchTerm.toLowerCase())) && (
        <div className="palette-section">
          <h4>💭 অন্যান্য</h4>
          <button onClick={() => addBlock('comment')} style={{ backgroundColor: BLOCK_TYPES.comment.color }}>
            {BLOCK_TYPES.comment.icon} মন্তব্য
          </button>
          <button onClick={() => addBlock('wait')} style={{ backgroundColor: BLOCK_TYPES.wait.color }}>
            {BLOCK_TYPES.wait.icon} অপেক্ষা
          </button>
        </div>
        )}
      </div>

      <div className="block-workspace">
        <div className="workspace-header">
          <h3>কোড ওয়ার্কস্পেস</h3>
          <div className="workspace-actions">
            <button className="paste-code-button" onClick={() => setShowPasteDialog(true)} title="কোড পেস্ট করো">
              � কোড পেস্ট
            </button>
            {copiedBlock && (
              <button className="paste-button" onClick={pasteBlock} title="ব্লক পেস্ট করো">
                📋 ব্লক পেস্ট
              </button>
            )}
            <button className="clear-button" onClick={clearWorkspace} title="সব মুছে ফেলো">
              🗑️ Clear
            </button>
            <button className="code-toggle-btn" onClick={() => setShowCode(!showCode)}>
              {showCode ? '🧩 Blocks' : '📝 Code'}
            </button>
            <button className="run-button" onClick={runCode}>▶ চালাও</button>
          </div>
        </div>
        {showCode ? (
          <div className="code-preview">
            <pre>{`ও কাকা\n${blocksToCode(blocks)}আসি কাকা`}</pre>
          </div>
        ) : (
          <div className="workspace-area">
            {blocks.length === 0 ? (
              <div className="workspace-empty">বাম দিক থেকে ব্লক টেনে আনুন</div>
            ) : (
              blocks.map(block => renderBlock(block))
            )}
          </div>
        )}
      </div>

      <div className="block-output">
        <h3>আউটপুট</h3>
        <div className="output-console">
          {output.length === 0 ? (
            <div className="output-empty">কোড চালান আউটপুট দেখতে</div>
          ) : (
            output.map((line, i) => <div key={i}>{line}</div>)
          )}
        </div>
      </div>
      </div>

      {showPasteDialog && (
        <div className="paste-dialog-overlay" onClick={() => setShowPasteDialog(false)}>
          <div className="paste-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="paste-dialog-header">
              <h3>📄 কাকা ল্যাং কোড পেস্ট করুন</h3>
              <button className="dialog-close" onClick={() => setShowPasteDialog(false)}>×</button>
            </div>
            <textarea
              className="paste-dialog-textarea"
              placeholder="এখানে আপনার কাকা ল্যাং কোড পেস্ট করুন...&#10;&#10;উদাহরণ:&#10;কাকা রাখো x = 10;&#10;কাকা বলো x;"
              value={pasteCodeText}
              onChange={(e) => setPasteCodeText(e.target.value)}
              autoFocus
            />
            <div className="paste-dialog-actions">
              <button className="dialog-cancel" onClick={() => setShowPasteDialog(false)}>
                বাতিল
              </button>
              <button 
                className="dialog-convert" 
                onClick={() => convertCodeToBlocks(pasteCodeText)}
                disabled={!pasteCodeText.trim()}
              >
                ব্লকে রূপান্তর করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
