export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const target = url.searchParams.get('url');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  };

  if (!target) {
    return new Response(JSON.stringify({ error: 'Missing ?url= parameter' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const u = new URL(target);
    if (!u.hostname.endsWith('opqibi.com')) {
      return new Response(JSON.stringify({ error: 'Only opqibi.com is allowed' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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

    // Return as JSON to prevent browser from loading sub-resources
    // and triggering auth popups
    return new Response(JSON.stringify({ html: body, status: response.status }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Fetch failed: ' + err.message }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
