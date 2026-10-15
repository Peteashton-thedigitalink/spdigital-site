export const config = {
    runtime: 'edge',
    };
    
    export default async function handler(request) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
    });
    }
    
    try {
    const { model, messages, action, prompt, size = '1024x1024', quality = 'standard', n = 1 } = await request.json();
    
    // 🎨 IMAGE GENERATION
    if (action === 'generate-image') {
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    model: 'gpt-image-2.5-sunburst',
    prompt: prompt,
    size: size,
    quality: quality,
    n: n,
    }),
    });
    
    const imageData = await imageResponse.json();
    
    if (!imageResponse.ok) {
    return new Response(JSON.stringify({ error: imageData.error?.message || 'Image generation failed' }), {
    status: imageResponse.status,
    headers: { 'Content-Type': 'application/json' },
    });
    }
    
    return new Response(JSON.stringify(imageData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    });
    }
    
    // 💬 CHAT COMPLETION (existing functionality)
    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    model: model || 'gpt-4o-mini',
    messages: messages,
    }),
    });
    
    const chatData = await chatResponse.json();
    
    if (!chatResponse.ok) {
    return new Response(JSON.stringify({ error: chatData.error?.message || 'Request failed', details: chatData }), {
    status: chatResponse.status,
    headers: { 'Content-Type': 'application/json' },
    });
    }
    
    return new Response(JSON.stringify(chatData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    });
    
    } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
    });
    }
    }
    
    
    
        