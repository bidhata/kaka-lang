# Block Editor Interface Guide

## Layout Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Kaka Lang - Block Editor (ব্লক এডিটর)    [← Text Mode]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌────────────────────────────┐  ┌─────────────┐ │
│  │          │  │                            │  │             │ │
│  │  Block   │  │      Workspace             │  │   Output    │ │
│  │ Palette  │  │                            │  │  Console    │ │
│  │          │  │                            │  │             │ │
│  │          │  │                            │  │             │ │
│  └──────────┘  └────────────────────────────┘  └─────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Left Panel: Block Palette

```
┌─────────────────────┐
│  ব্লক প্যালেট      │
├─────────────────────┤
│                     │
│  আউটপুট            │
│  ┌───────────────┐  │
│  │  কাকা বলো    │  │ ← Purple (Output)
│  └───────────────┘  │
│                     │
│  ভেরিয়েবল          │
│  ┌───────────────┐  │
│  │  কাকা রাখো   │  │ ← Red (Variables)
│  └───────────────┘  │
│                     │
│  কন্ট্রোল           │
│  ┌───────────────┐  │
│  │  যদি কাকা     │  │ ← Orange (If)
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ যতক্ষণ কাকা   │  │ ← Green (While)
│  └───────────────┘  │
│                     │
│  ফাংশন              │
│  ┌───────────────┐  │
│  │ ফাংশন কাকা   │  │ ← Pink (Function)
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  ফেরত নাও    │  │ ← Pink (Return)
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

## Center Panel: Workspace

### Empty State
```
┌──────────────────────────────────────┐
│  কোড ওয়ার্কস্পেস                    │
│              [📝 Code] [▶ চালাও]    │
├──────────────────────────────────────┤
│                                      │
│                                      │
│    বাম দিক থেকে ব্লক টেনে আনুন     │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

### With Blocks
```
┌──────────────────────────────────────┐
│  কোড ওয়ার্কস্পেস                    │
│              [📝 Code] [▶ চালাও]    │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────┐     │
│  │ কাকা রাখো            [×]  │     │
│  │ নাম: [i        ]           │     │
│  │ মান: [0        ]           │     │
│  └────────────────────────────┘     │
│                                      │
│  ┌────────────────────────────┐     │
│  │ যতক্ষণ কাকা          [×]  │     │
│  │ শর্ত: [i < 5   ]           │     │
│  │ ┌──────────────────────┐   │     │
│  │ │ কাকা বলো       [×] │   │     │
│  │ │ মান: [i      ]       │   │     │
│  │ └──────────────────────┘   │     │
│  │ ┌──────────────────────┐   │     │
│  │ │ কাকা রাখো      [×] │   │     │
│  │ │ নাম: [i      ]       │   │     │
│  │ │ মান: [i + 1  ]       │   │     │
│  │ └──────────────────────┘   │     │
│  └────────────────────────────┘     │
│                                      │
└──────────────────────────────────────┘
```

### Code View
```
┌──────────────────────────────────────┐
│  কোড ওয়ার্কস্পেস                    │
│              [🧩 Blocks] [▶ চালাও]  │
├──────────────────────────────────────┤
│                                      │
│  ও কাকা                              │
│    কাকা রাখো i = 0;                 │
│    যতক্ষণ কাকা (i < 5) {            │
│      কাকা বলো i;                    │
│      কাকা রাখো i = i + 1;           │
│    }                                 │
│  আসি কাকা                            │
│                                      │
└──────────────────────────────────────┘
```

## Right Panel: Output Console

```
┌─────────────────────┐
│  আউটপুট            │
├─────────────────────┤
│                     │
│  0                  │
│  1                  │
│  2                  │
│  3                  │
│  4                  │
│                     │
│                     │
│                     │
└─────────────────────┘
```

## Block Anatomy

### Simple Block (Print)
```
┌────────────────────────────┐
│ কাকা বলো            [×]   │ ← Header with delete button
│ মান: [Hello World!]        │ ← Parameter input
└────────────────────────────┘
```

### Container Block (If)
```
┌────────────────────────────┐
│ যদি কাকা             [×]  │ ← Header
│ শর্ত: [x > 5]              │ ← Condition input
│ ┌──────────────────────┐   │
│ │                      │   │ ← Drop zone for nested blocks
│ │ এখানে ব্লক টেনে আনুন│   │
│ │                      │   │
│ └──────────────────────┘   │
└────────────────────────────┘
```

### Nested Blocks
```
┌────────────────────────────┐
│ যতক্ষণ কাকা          [×]  │
│ শর্ত: [i < 10]             │
│ ┌──────────────────────┐   │
│ │ কাকা বলো       [×] │   │ ← Nested block 1
│ │ মান: [i      ]       │   │
│ └──────────────────────┘   │
│ ┌──────────────────────┐   │
│ │ কাকা রাখো      [×] │   │ ← Nested block 2
│ │ নাম: [i      ]       │   │
│ │ মান: [i + 1  ]       │   │
│ └──────────────────────┘   │
└────────────────────────────┘
```

## Color Scheme

- **Purple (#9966FF)**: Output operations (কাকা বলো)
- **Red (#FF6680)**: Variables (কাকা রাখো)
- **Orange (#FFAB19)**: Conditionals (যদি কাকা)
- **Green (#0FBD8C)**: Loops (যতক্ষণ কাকা)
- **Pink (#FF6680)**: Functions (ফাংশন কাকা, ফেরত নাও)
- **Blue (#4C97FF)**: Input (কাকা শোনো)

## Interaction Patterns

### Adding a Block
1. Click button in palette → Block appears in workspace

### Configuring a Block
1. Click in input field → Type value/name/condition

### Nesting a Block
1. Drag block → Hover over container → Drop in colored area

### Deleting a Block
1. Click × button → Block removed (including children)

### Running Code
1. Click ▶ চালাও → Output appears in right panel

### Viewing Code
1. Click 📝 Code → See generated Kaka Lang code
2. Click 🧩 Blocks → Return to block view

### Switching Modes
1. Click ← Text Mode → Return to text editor
2. Click 🧩 Block Mode → Return to block editor

## Tips for Best Experience

- Use distinct colors to identify block types quickly
- Drag blocks fully into container drop zones
- Check code view to learn Kaka Lang syntax
- Run frequently to test your program
- Start simple and build complexity gradually
