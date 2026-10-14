export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    // Allow POST only
    if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
    }
    
    // Get the API key
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API_KEY_MISSING' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
    });
    }
    
    try {
    // Read what the browser sent
    const body = await request.text();
    
    // Send it to OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
    },
    body: body
    });
    
    // Get raw text first — don't assume it's JSON
    const responseText = await openaiResponse.text();
    
    // Send it back exactly as we got it
    return new Response(responseText, {
    status: openaiResponse.status,
    headers: { 'Content-Type': 'application/json' }
    });
    
    } catch (error) {
    return new Response(JSON.stringify({
    error: 'PROXY_ERROR',
    message: error.message
    }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
    });
    }
    }
    
        