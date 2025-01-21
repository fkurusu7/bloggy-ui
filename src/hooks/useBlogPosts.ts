import { useEffect, useState } from 'react';

interface Post {
  slug: string;
  title: string;
  banner: string;
  description: string;
  tags: Array<{ slug: string; name: string }>;
  createdAt: string;
  draft: boolean;
}

interface UseBlogPostsParams {
  searchTerm?: string;
  tag?: string;
}

export function useBlogPosts({ searchTerm, tag }: UseBlogPostsParams = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        }
        const queryStr = params.toString();
        if (queryStr) urlString += `?${queryStr}`;

        const response = await fetch(urlString);

        if (!response.ok && response.status !== 404) {
          throw new Error('Error fetching posts');
        }

        const jsonRes = await response.json();

        setPosts(jsonRes.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [tag, searchTerm]);

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
