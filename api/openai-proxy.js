export default async function handler(request) {
    if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
    }
    
    try {
    const body = await request.text();
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
    },
    body: body
    });
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' }
    });
    } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    }  