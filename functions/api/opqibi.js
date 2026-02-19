export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const target = url.searchParams.get('url');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  };

  if (!target) {
    return new Response('Missing ?url= parameter', {
      status: 400,
      headers: corsHeaders,
    });
  }

  try {
    const u = new URL(target);
    if (!u.hostname.endsWith('opqibi.com')) {
      return new Response('Only opqibi.com is allowed', {
        status: 403,
        headers: corsHeaders,
      });
    }
  } catch {
    return new Response('Invalid URL', {
      status: 400,
      headers: corsHeaders,
    });
  }

  try {
    const response = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      },
      redirect: 'follow',
    });

    const body = await response.text();

    // Return 200 with the body, even if OPQIBI returned 401
    // Remove WWW-Authenticate header to prevent browser auth popup
    return new Response(body, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    return new Response('Fetch failed: ' + err.message, {
      status: 502,
      headers: corsHeaders,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
