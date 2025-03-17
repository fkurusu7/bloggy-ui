import { useCallback, useEffect, useState } from 'react';
import { Post } from '../features/blog_admin/types';
import { API_BASE_URL } from '../utils/helpers';

interface UseBlogPostsParams {
  searchTerm?: string;
  tag?: string;
  slug?: string;
}

export function useBlogPosts({ searchTerm, tag, slug }: UseBlogPostsParams = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setIsLoadingPosts(true);
        setError(null);

        let urlString = `${API_BASE_URL}/api/blog/getPosts`;
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append('searchTerm', searchTerm);
        } else if (tag) {
          params.append('tag', tag);
        } else if (slug) {
          params.append('slug', slug);
        }
        const queryStr = params.toString();
        if (queryStr) urlString += `?${queryStr}`;

        const response = await fetch(urlString, { signal });

        if (!response.ok) {
          if (response.status !== 404) {
            setPosts([]);
            return;
          }
          throw new Error('Error fetching posts');
        }

        const jsonRes = await response.json();

        setPosts(jsonRes.data || []);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.log(error);
      } finally {
        setIsLoadingPosts(false);
      }
    },
    [tag, searchTerm, slug] // Dependencies for useCallback
  );
  // Handle initial fetch and cleanup
  useEffect(() => {
    const controller = new AbortController();

    // Pass the abort signal to the fetch function
    fetchPosts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchPosts]);

  const getTitle = () => {
    if (searchTerm) return `Search by ${searchTerm}`;
    else if (tag) return `Search by Tag: ${tag}`;
    else return 'Latest Posts';
  };

  const refetch = () => fetchPosts();

  return {
    posts,
    isLoadingPosts,
    error,
    getTitle,
    refetch,
  };
}
