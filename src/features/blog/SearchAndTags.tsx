import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

import { Link } from 'react-router-dom';

function SearchAndTags() {
  // 1. Get Tags
  const [tags, setTags] = useState([]);
  const [errorTags, setErrorTags] = useState(null);
  const [isLoadingTags, setIsLoadingTags] = useState(false);

  // Load pre-existing Tags in the DB
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoadingTags(true);
        setErrorTags(null);

        const response = await fetch('/api/blog/getTags');
        if (!response.ok) {
          throw new Error('Error fetching tags');
        }
        const jsonRes = await response.json();
        setTags(jsonRes.data);
      } catch (error: any) {
        setErrorTags(error.message);
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="blog__main__tags">
      {isLoadingTags ? (
        <FiLoader className="spin" />
      ) : errorTags ? (
        <p>{errorTags}</p>
      ) : (
        tags.map((tag: any) => {
          return (
            <Link to={`/blog/tag/${tag.slug}`} key={tag.slug} className="blog__main-tag">
              {tag.name}
            </Link>
          );
        })
      )}
    </div>
  );
}

export default SearchAndTags;
