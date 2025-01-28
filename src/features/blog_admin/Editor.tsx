import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection } from 'lexical';
import { CodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import { $createLinkNode } from '@lexical/link';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';

function ToolbarPlugin(): React.JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const insertHeading = (tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  const insertLink = () => {
    if (!linkUrl) return;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const linkNode = $createLinkNode(linkUrl);
        selection.insertNodes([linkNode]);
      }
    });
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const insertCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const codeNode = new CodeNode();
        $setBlocksType(selection, () => codeNode);
      }
    });
  };

  return (
    <div className="toolbar">
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}>Bold</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>Italic</button>
      <button onClick={() => insertHeading('h1')}>H1</button>
      <button onClick={() => insertHeading('h2')}>H2</button>
      <button onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        Bullet List
      </button>
      <button onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        Numbered List
      </button>
      <button onClick={insertCodeBlock}>Code Block</button>
      <button onClick={() => setShowLinkInput(!showLinkInput)}>Link</button>
      {showLinkInput && (
        <div className="link-input">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL"
          />
          <button className="add-link" onClick={insertLink}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}

interface EditorProps {
  onChange?: (_content: string) => void;
  initialContent?: string;
  readOnly?: boolean;
}

const Editor: React.FC<EditorProps> = ({ onChange, initialContent, readOnly = false }) => {
  const editorConfig = {
    namespace: 'BlogEditor',
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, CodeNode],
    editable: !readOnly,
    onError: (error: Error) => {
      console.error('Lexical Editor Error:', error);
    },
    theme: {
      code: 'editor-code',
    },
    ...(initialContent && { editorState: JSON.parse(initialContent) }),
  };

  const handleEditorChange = (editorState: EditorState) => {
    if (onChange) {
      onChange(JSON.stringify(editorState));
    }
  };

  return (
    <div className="editor-container">
      <LexicalComposer initialConfig={editorConfig}>
        {!readOnly && <ToolbarPlugin />}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">
                {readOnly ? '' : 'Start writing your post...'}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangePlugin onChange={handleEditorChange} />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default Editor;
