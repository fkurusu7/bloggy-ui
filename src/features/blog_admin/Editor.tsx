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
import { CodeNode } from '@lexical/code';
import { ToolbarPlugin } from './ToolbarPlugin';
import React from 'react';

type EditorProps = {
  onChange?: (_content: string) => void; // Expecting a string (JSON) here
  initialContent?: string;
  readOnly?: boolean;
};

const Editor: React.FC<EditorProps> = ({ onChange, initialContent, readOnly = false }) => {
  const editorConfig = {
    namespace: 'BlogEditor',
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, CodeNode],
    editable: !readOnly,
    onError: (error: Error) => {
      console.error('Lexical Editor Error:', error);
    },
    ...(initialContent && { editorState: JSON.parse(initialContent) }), // Pass initialContent here if it exists
  };

  const handleEditorChange = (editorState: EditorState) => {
    if (onChange) {
      onChange(JSON.stringify(editorState)); // Pass stringified version of editorState
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor">
        {!readOnly && <ToolbarPlugin />}
        <div className="editor-container">
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
      </div>
    </LexicalComposer>
  );
};

export default Editor;
