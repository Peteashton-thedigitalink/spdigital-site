export default async function handler(request) {
    if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405, headers: { 'Content-Type': 'application/json' }
    });
    }
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key missing' }), {
    status: 500, headers: { 'Content-Type': 'application/json' }
    });
    }
    
    try {
    const body = await request.text();
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
    },
    body: body
    });
    
    const data = await res.json();
    return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
    });
    } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
    status: 500, headers: { 'Content-Type': 'application/json' }
    });
    }
    }
    