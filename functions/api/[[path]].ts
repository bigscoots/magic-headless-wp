export async function onRequest(context) {
  const url = new URL(context.request.url);
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'X-WP-Total, X-WP-TotalPages, X-WC-Total, X-WC-TotalPages',
  };

  // Access environment variables
  const { WP_AUTH_HEADER, WC_AUTH_HEADER } = context.env;

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (url.pathname.startsWith('/api/posts')) {
    // WordPress API handling
    const pathParts = url.pathname.split('/').filter(Boolean);
    const wpBaseUrl = 'https://test3.isaumya.tech/wp-json/wp/v2';
    
    let wpEndpoint;
    if (pathParts.length === 2) {
      wpEndpoint = new URL(wpBaseUrl + '/posts');
      const params = new URLSearchParams(url.search);
      
      // Get the requested per_page value or default to 12
      const requestedPerPage = parseInt(params.get('per_page') || '12');
      
      // For the first page, reduce per_page by 1 to account for sticky post
      if (!params.has('page') || params.get('page') === '1') {
        // First, check if there are any sticky posts
        const stickyEndpoint = new URL(wpBaseUrl + '/posts');
        stickyEndpoint.searchParams.append('sticky', 'true');
        stickyEndpoint.searchParams.append('per_page', '1');
        
        const stickyResponse = await fetch(stickyEndpoint.toString(), {
          headers: {
            Authorization: WP_AUTH_HEADER,
          },
        });
        
        const stickyPosts = JSON.parse(await stickyResponse.text());
        
        if (stickyPosts && stickyPosts.length > 0) {
          // If there is a sticky post, reduce per_page by 1
          params.set('per_page', (requestedPerPage - 1).toString());
        } else {
          params.set('per_page', requestedPerPage.toString());
        }
      } else {
        // For subsequent pages, use the full per_page value and exclude sticky posts
        params.set('per_page', requestedPerPage.toString());
        params.set('sticky', 'false');
      }
      
      params.forEach((value, key) => {
        wpEndpoint.searchParams.append(key, value);
      });
    } else if (pathParts.length === 3) {
      const postId = pathParts[2];
      wpEndpoint = new URL(`${wpBaseUrl}/posts/${postId}`);
      const params = new URLSearchParams(url.search);
      params.forEach((value, key) => {
        wpEndpoint.searchParams.append(key, value);
      });
    } else {
      return new Response('Invalid path', { status: 400 });
    }
    
    if (!wpEndpoint.searchParams.has('_embed')) {
      wpEndpoint.searchParams.append('_embed', '');
    }

    // Make the main request
    const response = await fetch(wpEndpoint.toString(), {
      headers: {
        Authorization: WP_AUTH_HEADER,
      },
    });
    
    let data = await response.text();
    
    // If this is page 1, prepend sticky posts to the results
    if ((!url.searchParams.has('page') || url.searchParams.get('page') === '1') && pathParts.length === 2) {
      const stickyEndpoint = new URL(wpBaseUrl + '/posts');
      stickyEndpoint.searchParams.append('sticky', 'true');
      stickyEndpoint.searchParams.append('per_page', '1');
      stickyEndpoint.searchParams.append('_embed', '');
      
      const stickyResponse = await fetch(stickyEndpoint.toString(), {
        headers: {
          Authorization: WP_AUTH_HEADER,
        },
      });
      
      const stickyPosts = await stickyResponse.text();
      
      // Combine sticky and regular posts
      if (stickyPosts && stickyPosts !== '[]') {
        const regularPosts = JSON.parse(data);
        const combinedPosts = [...JSON.parse(stickyPosts), ...regularPosts];
        data = JSON.stringify(combinedPosts);
      }
    }
    
    // Create response headers
    const responseHeaders = { ...headers };
    const totalPages = response.headers.get('X-WP-TotalPages');
    const total = response.headers.get('X-WP-Total');
    if (totalPages) responseHeaders['X-WP-TotalPages'] = totalPages;
    if (total) responseHeaders['X-WP-Total'] = total;

    return new Response(data, { 
      status: response.status, 
      headers: responseHeaders
    });
  }

  // Handle categories endpoint
  if (url.pathname.startsWith('/api/categories')) {
    const wpEndpoint = new URL('https://test3.isaumya.tech/wp-json/wp/v2/categories');
    const params = new URLSearchParams(url.search);
    
    params.forEach((value, key) => {
      wpEndpoint.searchParams.append(key, value);
    });

    const response = await fetch(wpEndpoint.toString(), {
      headers: {
        Authorization: WP_AUTH_HEADER,
      },
    });
    
    const data = await response.text();
    return new Response(data, { status: response.status, headers });
  }

  // WooCommerce API endpoints
  if (url.pathname.startsWith('/api/products')) {
    const wcEndpoint = new URL('https://test3.isaumya.tech/wp-json/wc/v3' + url.pathname.replace('/api', ''));
    const params = new URLSearchParams(url.search);
    
    params.forEach((value, key) => {
      wcEndpoint.searchParams.append(key, value);
    });

    const response = await fetch(wcEndpoint.toString(), {
      headers: {
        Authorization: WC_AUTH_HEADER,
      },
    });
    
    const data = await response.text();
    
    // Create response headers with pagination information
    const responseHeaders = { ...headers };
    const totalPages = response.headers.get('X-WP-TotalPages');
    const total = response.headers.get('X-WP-Total');
    if (totalPages) responseHeaders['X-WP-TotalPages'] = totalPages;
    if (total) responseHeaders['X-WP-Total'] = total;

    return new Response(data, { 
      status: response.status, 
      headers: responseHeaders 
    });
  }

  return new Response('Not Found', { status: 404 });
}