import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection } from 'lexical';
import { $createCodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import React, { useState } from 'react';
import { $createLinkNode } from '@lexical/link';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';

export function ToolbarPlugin(): React.JSX.Element {
  // export function ToolbarPlugin(): Element {
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
        const codeNode = $createCodeNode();
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
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <button onClick={insertLink}>Add</button>
        </div>
      )}
    </div>
  );
}
