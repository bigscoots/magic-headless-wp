import { useState, useEffect } from 'react';
import { Product } from '../types';

export const useProducts = (page = 1, perPage = 12, category?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `/api/products?page=${page}&per_page=${perPage}`;
        if (category) {
          url += `&category=${category}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        // Try WooCommerce headers first, fall back to WordPress headers
        const totalPagesHeader = response.headers.get('X-WC-TotalPages') || response.headers.get('X-WP-TotalPages');
        const totalHeader = response.headers.get('X-WC-Total') || response.headers.get('X-WP-Total');
        
        setProducts(products);
        setTotalPages(parseInt(totalPagesHeader || '1'));
        setTotal(parseInt(totalHeader || '0'));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, perPage, category]);

  return { products, loading, error, totalPages, total };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};