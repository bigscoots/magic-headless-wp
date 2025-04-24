const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isDevelopment ? '/api' : '/api';

export const wpApi = {
  getPosts: async (page = 1, perPage = 10, categories?: number[]) => {
    let url = `${API_BASE_URL}/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`;

    if (categories && categories.length > 0) {
      url += `&categories=${categories.join(',')}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa('admin:214u FnFR QR0e lWbn RuN1 hVaQ')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const posts = await response.json();
    return {
      posts,
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '1'),
      total: parseInt(response.headers.get('X-WP-Total') || '0'),
    };
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/wp/v2/categories`, {
      headers: {
        Authorization: `Basic ${btoa('admin:214u FnFR QR0e lWbn RuN1 hVaQ')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    return response.json();
  },
};

export const wcApi = {
  getProducts: async (page = 1, perPage = 12, category?: number) => {
    let url = `${API_BASE_URL}/wc/v3/products?page=${page}&per_page=${perPage}`;

    if (category) {
      url += `&category=${category}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa('admin:214u FnFR QR0e lWbn RuN1 hVaQ')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    return response.json();
  },

  getProduct: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/wc/v3/products/${id}`, {
      headers: {
        Authorization: `Basic ${btoa('admin:214u FnFR QR0e lWbn RuN1 hVaQ')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    return response.json();
  },
};