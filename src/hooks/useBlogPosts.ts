import { useEffect, useState } from 'react';
import { Post } from '../features/blog_admin/types';

interface UseBlogPostsParams {
  searchTerm?: string;
  tag?: string;
  slug?: string;
}

export function useBlogPosts({ searchTerm, tag, slug }: UseBlogPostsParams = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true);
        setError(null);

        let urlString = '/api/blog/getPosts';
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

        const response = await fetch(urlString);

        if (!response.ok) {
          if (response.status !== 404) {
            setPosts([]);
            return;
          }
          throw new Error('Error fetching posts');
        }

        const jsonRes = await response.json();
        console.log(jsonRes);
        setPosts(jsonRes.data || []);
      } catch (error: any) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.log(error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [tag, searchTerm, slug]);

  const getTitle = () => {
    if (searchTerm) return `Search by ${searchTerm}`;
    else if (tag) return `Search by Tag: ${tag}`;
    else return 'Latest Posts';
  };

  return {
    posts,
    isLoadingPosts,
    error,
    getTitle,
  };
}
