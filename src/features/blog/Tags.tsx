import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

import { Link } from 'react-router-dom';

interface Tag {
  name: string;
  slug: string;
}

function Tags() {
  // 1. Get Tags
  const [tags, setTags] = useState<Tag[]>([]);
  const [errorTags, setErrorTags] = useState<string | null>(null);
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorTags(error.message);
        } else {
          // Handle cases where it's not an Error object
          setErrorTags('An unknown error occurred');
        }
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="blog__tags">
      <h2 className="heading-2">Tags</h2>
      {isLoadingTags ? (
        <FiLoader className="spin" />
      ) : errorTags ? (
        <p>{errorTags}</p>
      ) : !tags.length ? (
        <p className="blog__tags-404">No tags were found</p>
      ) : (
        <div>
          {tags.map((tag: Tag) => {
            return (
              <Link to={`/blog/tag/${tag.slug}`} key={tag.slug} className="blog__tag">
                {tag.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Tags;
