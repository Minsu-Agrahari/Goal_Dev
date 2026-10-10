const http = require('http')

// create a local server to listen to HTTP requests
const server = http.createServer((req, res) => {

    // Get Request
    if (req.method === 'GET' && req.url === '/menu') {
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify({items:['thali', 'biryani']}))
    } else if (req.method === 'POST' && req.url === '/order') {
        let data = '';
        req.on ('data', chunk => data += chunk);
        req.on ('end', () => {
            const order = JSON.parse(data);
            res.writeHead(200, {'content-type' : ' application/json'});
            res.end(JSON.stringify({
                status: 'received',
                order
            }))
        })
    }
});
