export default async function handler(request) {
    if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
    });
    }
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
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
    
    const responseText = await res.text();
    
    if (!res.ok) {
    return new Response(JSON.stringify({
    error: `OpenAI API Error (${res.status})`,
    details: responseText
    }), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
    });
    }
    
    let data;
    try {
    data = JSON.parse(responseText);
    } catch (e) {
    return new Response(JSON.stringify({
    error: 'Invalid response from OpenAI',
    details: responseText.substring(0, 300)
    }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
    });
    }
    
    return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
    });
    } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
    });
    }
    }
    
    