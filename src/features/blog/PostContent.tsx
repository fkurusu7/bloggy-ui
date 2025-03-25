import { useEffect } from 'react';

import DOMPurify from 'dompurify';
import { logger } from '../../utils/helpers';

// Core
import Prism from 'prismjs';
// Theme
// import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/themes/prism-solarizedlight.css'; // Light Mode
// import 'prismjs/themes/prism-solarizeddark.css'; // Dark Mode - Not working

// dependencies
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike'; // Required before JavaScript

// Language packs
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
/* 
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
 */
type PostContentProps = {
  content: string; // This says "this box can only hold text!"
};

function PostContent({ content }: PostContentProps) {
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll(); // Ensures Prism runs after the DOM updates
    }, 0);
  }, [content]);

  const cleanContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ['code'],
    ADD_ATTR: ['class'],
  });
  logger.info(cleanContent);

  return (
    <div className="blog__post-info__content" dangerouslySetInnerHTML={{ __html: cleanContent }} />
  );
}

export default PostContent;
