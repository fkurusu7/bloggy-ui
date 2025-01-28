import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface TiptapEditorProps {
  content: string;
  onChange: (_content: string) => void;
}

const Editor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor">
      <div className="tiptap-editor-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`toolbar-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
        >
          Quote
        </button>
      </div>

      <EditorContent editor={editor} className="tiptap-content" />

      <FloatingMenu editor={editor} className="floating-menu">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>List</button>
      </FloatingMenu>

      <BubbleMenu editor={editor} className="bubble-menu">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</button>
      </BubbleMenu>
    </div>
  );
};

export default Editor;
