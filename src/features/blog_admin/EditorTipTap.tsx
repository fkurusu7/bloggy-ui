import { Color } from '@tiptap/extension-color';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  HiMiniBold,
  HiMiniH1,
  HiMiniH2,
  HiMiniH3,
  HiMiniItalic,
  HiMiniListBullet,
  HiOutlineNumberedList,
  HiOutlineStrikethrough,
} from 'react-icons/hi2';
import { HiOutlineCode } from 'react-icons/hi';
import { PiMarkerCircleLight, PiParagraph } from 'react-icons/pi';
import { LuRedoDot, LuUndoDot } from 'react-icons/lu';
import { TbBlockquote } from 'react-icons/tb';
import { CgFormatSeparator } from 'react-icons/cg';
import { ImClearFormatting, ImPagebreak } from 'react-icons/im';
import { AiOutlineClear } from 'react-icons/ai';

interface TiptapEditorProps {
  content: string;
  onChange: (_content: string) => void;
}

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  // <HiOutlineLink /> <LuSeparatorHorizontal />
  return (
    <div className="tiptap__editor--toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <HiMiniBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <HiMiniItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <HiOutlineStrikethrough />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        Code
      </button> */}
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        {/* Clear marks - Inline formatting */}
        <ImClearFormatting />
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        {/* Clear nodes */}
        <AiOutlineClear />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        <PiParagraph />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <HiMiniH1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <HiMiniH2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <HiMiniH3 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <HiMiniListBullet />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <HiOutlineNumberedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <HiOutlineCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <TbBlockquote />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <CgFormatSeparator />
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        {/* Hard break */}
        <ImPagebreak />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <LuUndoDot />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <LuRedoDot />
      </button>
      <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        <PiMarkerCircleLight />
      </button>
    </div>
  );
};

const EditorTiptap = ({ content, onChange }: TiptapEditorProps) => {
  const extensions = [
    TextStyle,
    ListItem,
    CodeBlock,
    Document,
    Paragraph,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  return (
    <div className="tiptap__editor">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
      />
    </div>
  );
};

export default EditorTiptap;
