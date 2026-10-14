export default async function handler(request) {
    if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405, headers: { 'Content-Type': 'application/json' }
    });
    }
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
    return new Response(JSON.stringify({ error: { message: 'API key missing' } }), {
    status: 500, headers: { 'Content-Type': 'application/json' }
    });
    }
    
    try {
    const body = await request.text();
    console.log('Request body:', body); // Debug log
    
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
    },
    body: body
    });
    
    const responseText = await res.text();
    console.log('OpenAI response:', responseText); // Debug log
    
    // Try to parse and return
    try {
    const json = JSON.parse(responseText);
    return new Response(JSON.stringify(json), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
    });
    } catch {
    // Return raw text as error
    return new Response(JSON.stringify({
    error: { message: `OpenAI error (status ${res.status}): ${responseText.substring(0, 200)}` }
    }), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
    });
    }
    } catch (err) {
    return new Response(JSON.stringify({
    error: { message: `Server error: ${err.message}` }
    }), {
    status: 500, headers: { 'Content-Type': 'application/json' }
    });
    }
    }
    