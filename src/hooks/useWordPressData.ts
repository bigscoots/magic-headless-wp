import { useState, useEffect, useCallback, useMemo } from 'react';
import { Post, Category } from '../types';

export const usePosts = (page = 1, perPage = 12, categories?: number[]) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Stabilize the categories array
  const categoriesKey = useMemo(() => 
    categories ? categories.sort().join(',') : '', 
    [categories]
  );

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      let url = `/api/posts?page=${page}&per_page=${perPage}&_embed`;
      if (categoriesKey) {
        url += `&categories=${categoriesKey}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setTotalPages(parseInt(response.headers.get('X-WP-TotalPages') || '1'));
      setTotal(parseInt(response.headers.get('X-WP-Total') || '0'));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, categoriesKey]);

  useEffect(() => {
    let mounted = true;
    
    const doFetch = async () => {
      await fetchPosts();
    };

    if (mounted) {
      doFetch();
    }

    return () => {
      mounted = false;
    };
  }, [fetchPosts]);

  return { posts, loading, error, totalPages, total };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useLatestPosts = (limit = 3) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts?per_page=${limit}&orderby=date&order=desc`);
        if (!response.ok) {
          throw new Error('Failed to fetch latest posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, [limit]);

  return { posts, loading, error };
};

export const usePost = (postId?: number, slug?: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        let response;

        if (postId) {
          // If we have the ID, fetch directly
          response = await fetch(`/api/posts/${postId}?_embed`);
        } else if (slug) {
          // If we only have the slug, fetch posts with the slug to get the ID first
          response = await fetch(`/api/posts?slug=${slug}&_embed`);
        } else {
          throw new Error('Either postId or slug is required');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        let finalPost = postId ? data : (Array.isArray(data) && data.length > 0 ? data[0] : null);
        
        if (finalPost) {
          // Transform the post to include embedded data
          if (finalPost._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
            finalPost.featured_image_url = finalPost._embedded['wp:featuredmedia'][0].source_url;
          }
          
          if (finalPost._embedded?.['author']?.[0]) {
            finalPost.author_name = finalPost._embedded['author'][0].name;
          }
        }
        
        setPost(finalPost);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (postId || slug) {
      fetchPost();
    }
  }, [postId, slug]);

  return { post, loading, error };
};