import { useCallback, useEffect } from 'react';
import Prism from 'prismjs';
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

import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { mergeAttributes, Node } from '@tiptap/core';
import type { NodeViewProps } from '@tiptap/react';
import { Transaction } from '@tiptap/pm/state';

const CodeBlock = ({ node, updateAttributes, editor }: NodeViewProps) => {
  const languages = [
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

  // Function to highlight code
  const highlightCode = useCallback(() => {
    requestAnimationFrame(() => {
      const preElements = document.querySelectorAll('pre code');
      preElements.forEach((el) => {
        if (el.className.includes(`language-${currentLanguage}`)) {
          Prism.highlightElement(el);
        }
      });
    });
  }, [currentLanguage]);

  // Monitor content changes
  useEffect(() => {
    if (!editor) return;

    const updateHandler = ({ transaction }: { transaction: Transaction }) => {
      if (transaction.docChanged) {
        highlightCode();
      }
    };

    editor.on('update', updateHandler);

    return () => {
      editor.off('update', updateHandler);
    };
  }, [editor, highlightCode]);

  // Initial highlight
  useEffect(() => {
    highlightCode();
  }, [currentLanguage, highlightCode]);

  return (
    <NodeViewWrapper>
      <div className="code-block not-prose">
        <div className="code-block-header">
          <span className="code-block-language">{currentLabel}</span>
          <select
            contentEditable={false}
            suppressContentEditableWarning
            className="bg-gray-700 text-white px-2 py-1 rounded outline-none"
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
        <div className="code-block-content">
          <pre>
            <NodeViewContent as="code" className={`language-${currentLanguage}`} />
          </pre>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

const CustomCodeBlock = Node.create({
  name: 'codeBlock',
  group: 'block',
  content: 'text*',
  code: true,
  defining: true,

  addOptions() {
    return {
      languageClassPrefix: 'language-',
      exitOnTripleEnter: true,
      indentOnEnter: true,
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
    return [{ tag: 'pre', preserveWhitespace: 'full' }];
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
      Tab: ({ editor }) => {
        return editor.commands.insertContent('  ');
      },
      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;

        // Get the text before the cursor
        const textBefore = $from.doc.textBetween(Math.max(0, $from.pos - 2), $from.pos, '\n');

        // Check for double newline (triple Enter press)
        if (textBefore === '\n\n' && this.options.exitOnTripleEnter) {
          // return editor.chain().lift(selection.$from.pos, selection.$to.pos).run();
          return editor.chain().lift('codeBlock').run();
        }

        // Get the current line's content
        const currentLine = $from.nodeBefore?.text;

        if (currentLine && this.options.indentOnEnter) {
          // Match the indentation of the current line
          const indentMatch = currentLine.match(/^[ \t]*/);
          const indent = indentMatch ? indentMatch[0] : '';

          // Additional indent after lines ending with brackets
          const shouldAddIndent = /[{[(]$/.test(currentLine.trim());
          const extraIndent = shouldAddIndent ? '  ' : '';

          return editor
            .chain()
            .insertContent('\n' + indent + extraIndent)
            .run();
        }

        return editor.commands.insertContent('\n');
      },
      Backspace: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { empty, $from } = selection;

        if (!empty) return false;

        const currentLine = $from.nodeBefore?.text;
        if (currentLine && /^[ \t]+$/.test(currentLine)) {
          // If the line only contains whitespace, delete it
          const tr = state.tr.delete($from.pos - currentLine.length, $from.pos);
          editor.view.dispatch(tr);
          return true;
        }
        return false;
      },
    };
  },
});

export default CustomCodeBlock;
