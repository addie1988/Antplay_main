document.addEventListener('DOMContentLoaded', async function() {
    const iframe = document.getElementById('game-iframe');
    const loading = document.getElementById('loading');
    
    // Parse URL query parameters
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            if (key && value) {
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            }
        }
        
        return params;
    }
    
    try {
        // Get game and lang from URL
        const params = getQueryParams();
        const game = params.game;
        const lang = params.lang || 'en'; // Default to English if not specified
        
        if (!game) {
            throw new Error('Game parameter is missing from URL');
        }
        
        console.log(`Loading game: ${game}, language: ${lang}`);
        
        // Call the authentication API
        const response = await fetch('https://games.antplay.com/api/debug/auth/guest/v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game": game,
                "agentId": "5"
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        const token = data.data.token;
        console.log('Received token:', token);
        if (!token) {
            throw new Error('Failed to get token from API');
        }
        
        // Set the iframe src with token, game, and language
        const gameUrl = `https://games.antplay.com/${game}/?token=${token}&lang=${lang}`;
        // const gameUrl = `https://antplay-dev.primestar.plus/game/${game}/?token=${token}&lang=${lang}`;
        
        console.log('Setting iframe src to:', gameUrl);
        iframe.src = gameUrl;
        
        // Hide loading indicator once iframe is loaded
        iframe.onload = function() {
            loading.style.display = 'none';
        };
        
    } catch (error) {
        console.error('Error:', error);
        loading.innerHTML = `<div style="color: red; font-family: Arial;">${error.message}</div>`;
    }
});