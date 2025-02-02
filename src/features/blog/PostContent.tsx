import { useEffect } from 'react';
import Prism from 'prismjs';
import DOMPurify from 'dompurify';

type PostContentProps = {
  content: string; // This says "this box can only hold text!"
};

function PostContent({ content }: PostContentProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div
      className="blog__post-info__content"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}

export default PostContent;
