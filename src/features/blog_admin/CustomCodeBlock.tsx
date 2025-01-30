// import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
// import { mergeAttributes, Node } from '@tiptap/core';
// import { Plugin, PluginKey } from 'prosemirror-state';
// import { Decoration, DecorationSet } from 'prosemirror-view';
// import Prism from 'prismjs';

// // Import basic Prism styles and languages
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-jsx';
// import 'prismjs/components/prism-tsx';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-scss';
// import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-bash';
// import 'prismjs/components/prism-shell-session';

// interface CodeBlockProps {
//   node: {
//     attrs: {
//       language: string;
//     };
//   };
//   updateAttributes: (_attrs: { language: string }) => void;
// }

// interface Language {
//   value: string;
//   label: string;
// }

// // CodeBlock Component
// const CodeBlock = ({ node, updateAttributes }: CodeBlockProps) => {
//   const languages: Language[] = [
//     { value: 'javascript', label: 'JavaScript' },
//     { value: 'typescript', label: 'TypeScript' },
//     { value: 'jsx', label: 'JSX' },
//     { value: 'tsx', label: 'TSX' },
//     { value: 'css', label: 'CSS' },
//     { value: 'scss', label: 'SCSS' },
//     { value: 'html', label: 'HTML' },
//     { value: 'python', label: 'Python' },
//     { value: 'bash', label: 'Bash' },
//     { value: 'shell', label: 'Shell' },
//   ];

//   const currentLanguage = node.attrs.language || 'javascript';

//   return (
//     <NodeViewWrapper className="code-block relative group">
//       <select
//         contentEditable={false}
//         className="absolute right-2 top-2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
//         value={currentLanguage}
//         onChange={(ev) => updateAttributes({ language: ev.target.value })}
//       >
//         {languages.map((lang) => (
//           <option key={lang.value} value={lang.value}>
//             {lang.label}
//           </option>
//         ))}
//       </select>
//       <pre className="bg-gray-900 p-4 rounded-lg relative">
//         <NodeViewContent as="code" className={`language-${currentLanguage}`} />
//       </pre>
//     </NodeViewWrapper>
//   );
// };

// const syntaxHighlighting = new PluginKey('syntax-highlighting');

// TipTap extension

import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { mergeAttributes, Node } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import Prism from 'prismjs';

// Import basic Prism styles and languages
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-shell-session';

interface CodeBlockProps {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: (_attrs: { language: string }) => void;
}

interface Language {
  value: string;
  label: string;
}

// CodeBlock Component
const CodeBlock = ({ node, updateAttributes }: CodeBlockProps) => {
  const languages: Language[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'jsx', label: 'JSX' },
    { value: 'tsx', label: 'TSX' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'SCSS' },
    { value: 'html', label: 'HTML' },
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'shell', label: 'Shell' },
  ];

  const currentLanguage = node.attrs.language || 'javascript';
  const currentLabel =
    languages.find((lang) => lang.value === currentLanguage)?.label || currentLanguage;

  return (
    <NodeViewWrapper className="code-block">
      <div className="code-block-header">
        <span className="code-block-language">{currentLabel}</span>
        <select
          contentEditable={false}
          className="code-block-select"
          value={currentLanguage}
          onChange={(ev) => updateAttributes({ language: ev.target.value })}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <pre>
        <NodeViewContent as="code" className={`language-${currentLanguage}`} />
      </pre>
    </NodeViewWrapper>
  );
};

const syntaxHighlighting = new PluginKey('syntax-highlighting');

// Rest of the CustomCodeBlock implementation remains the same...

const CustomCodeBlock = Node.create({
  name: 'codeBlock',
  group: 'block',
  code: true,
  defining: true,

  addOptions() {
    return {
      languageClassPrefix: 'language-',
      exitOnTripleEnter: true,
      exitOnArrowDown: true,
    };
  },

  addAttributes() {
    return {
      language: {
        default: 'javascript',
        parseHTML: (element) => {
          const [, language] = element.getAttribute('class')?.split('language-') || [];
          return language || 'javascript';
        },
        renderHTML: (attributes) => ({
          class: `language-${attributes.language || 'javascript'}`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['pre', mergeAttributes(HTMLAttributes), ['code', 0]];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),

      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { empty, $from } = selection;

        if (!empty || !this.options.exitOnTripleEnter) {
          return false;
        }

        const pos = $from.pos;
        const node = state.doc.nodeAt(pos);

        if (!node) {
          return false;
        }

        const textBefore = $from.doc.textBetween(Math.max(0, pos - 2), pos, '\n');

        if (textBefore === '\n\n') {
          editor.commands.clearNodes();
          return true;
        }

        return false;
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: syntaxHighlighting,
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];
            const doc = state.doc;

            doc.descendants((node, pos) => {
              if (node.type.name !== this.name) {
                return;
              }

              const language = node.attrs.language || 'javascript';
              const code = node.textContent;

              if (!language || !code) {
                return;
              }

              const grammar = Prism.languages[language];

              if (!grammar) {
                return;
              }

              const tokens = Prism.tokenize(code, grammar);
              let offset = 0;

              const processToken = (token: string | Prism.Token, pos: number) => {
                if (typeof token === 'string') {
                  offset += token.length;
                  return;
                }

                // Handle nested tokens
                const processTokenContent = (
                  content: string | Prism.Token | (string | Prism.Token)[]
                ) => {
                  if (typeof content === 'string') {
                    return content;
                  } else if (Array.isArray(content)) {
                    return content.map((t) => processTokenContent(t)).join('');
                  } else {
                    return content.content.toString();
                  }
                };

                const content = processTokenContent(token.content);

                // Create a single decoration for the entire token
                if (content.length > 0) {
                  decorations.push(
                    Decoration.inline(pos + offset, pos + offset + content.length, {
                      class: `token ${token.type}`,
                    })
                  );
                }

                offset += content.length;
              };

              tokens.forEach((token) => processToken(token, pos));
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default CustomCodeBlock;
