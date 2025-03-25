import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

function PostEditorCodeBlock({
  node,
  updateAttributes,
  extension,
}: {
  node?: { attrs?: { language?: string } };
  updateAttributes?: (_attrs: { language: string }) => void;
  extension?: { options?: { lowlight?: { listLanguages?: () => string[] } } };
}) {
  const defaultLanguage = node?.attrs?.language || 'null';

  return (
    <NodeViewWrapper className="code-block">
      <select
        contentEditable={false}
        value={defaultLanguage}
        onChange={(event) => updateAttributes?.({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension?.options?.lowlight?.listLanguages?.()?.map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}

export default PostEditorCodeBlock;
