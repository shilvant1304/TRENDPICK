const https = require('https');

function getUrlHash(url) {
    return new Promise(resolve => {
        https.get(url, (res) => {
            let loc = res.headers.location;
            if(!loc) return resolve(null);
            let opts = { headers: { 'User-Agent': 'Mozilla/5.0' } };
            https.get(loc, opts, (res2) => {
                let data = '';
                res2.on('data', chunk => data += chunk);
                res2.on('end', () => {
                    // search for images/I/([^"\.]+)
                    let m = data.match(/images\/I\/([^"\.]+)/g);
                    if(m) {
                        let uniqueHashes = [...new Set(m.map(x => x.replace('images/I/','')))].slice(0, 5);
                        resolve(uniqueHashes);
                    } else resolve(null);
                });
            }).on('error', () => resolve(null));
        }).on('error', () => resolve(null));
    });
}

getUrlHash('https://amzn.to/41PXPEx').then(h => console.log(h));
