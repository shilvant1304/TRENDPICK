const https = require('https');
const url = 'https://amzn.to/41PXPEx';

https.get(url, (res) => {
    let loc = res.headers.location;
    if(loc) {
        let opts = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        https.get(loc, opts, (res2) => {
            let data = '';
            res2.on('data', chunk => data += chunk);
            res2.on('end', () => {
                let m = data.match(/<img[^>]*id="landingImage"[^>]*src="([^"]+)"/);
                if(m) console.log("Found:", m[1]);
                else console.log("Not found, body length:", data.length);
            });
        });
    }
});
