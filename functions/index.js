export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    // WordPress API endpoints
    if (url.pathname.startsWith('/api/posts') || url.pathname.startsWith('/api/categories')) {
      const wpEndpoint = new URL('https://test3.isaumya.tech/wp-json/wp/v2' + url.pathname.replace('/api', ''));
      const params = new URLSearchParams(url.search);
      
      // Forward all query parameters
      params.forEach((value, key) => {
        wpEndpoint.searchParams.append(key, value);
      });
      
      // Add _embed for media and author data if it's a posts request
      if (url.pathname.startsWith('/api/posts')) {
        wpEndpoint.searchParams.append('_embed', '');
      }

      const response = await fetch(wpEndpoint.toString(), {
        headers: {
          Authorization: `Basic ${env.WP_AUTH_TOKEN}`,
        },
      });
      
      const data = await response.text();
      return new Response(data, { status: response.status, headers });
    }

    // WooCommerce API endpoints
    if (url.pathname.startsWith('/api/products')) {
      const wcEndpoint = new URL('https://test3.isaumya.tech/wp-json/wc/v3' + url.pathname.replace('/api', ''));
      const params = new URLSearchParams(url.search);
      
      // Forward all query parameters
      params.forEach((value, key) => {
        wcEndpoint.searchParams.append(key, value);
      });

      const response = await fetch(wcEndpoint.toString(), {
        headers: {
          Authorization: `Basic ${env.WC_AUTH_TOKEN}`,
        },
      });
      
      const data = await response.text();
      return new Response(data, { status: response.status, headers });
    }

    return new Response('Not Found', { status: 404 });
  },
};