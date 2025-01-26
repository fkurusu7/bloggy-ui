import React, { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

function SearchAndTags() {
  const navigate = useNavigate();
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

  // TODO: Add functionality to search for posts

  const handleInputSearch = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    // /blog/search/:searchTerm
    if (ev.currentTarget.value.trim().length && ev.key === 'Enter') {
      const searchTerm = ev.currentTarget.value;
      ev.currentTarget.value = '';
      navigate(`/blog/search/${searchTerm}`);
    }
  };

  return (
    <aside className="blog__main-st">
      <div className="blog__main-st-search">
        <input type="text" placeholder="Search for a post" onKeyDown={handleInputSearch} />
        <HiOutlineSearch />
      </div>
      <div className="blog__main-tags">
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
    </aside>
  );
}

export default SearchAndTags;
