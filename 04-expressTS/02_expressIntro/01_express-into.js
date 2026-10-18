const express = require ('express');

function block_1_basicServer() {
    return new Promise ((resolve, reject) => {
        const app = express ();

        // middleware -- need to read json file [as express by-default json file ko read nehi kar sakda h]
        app.use(express.json({ limit: '50kb'}));

        app.get('/menu', ( _ , res) => {
            res.json({
                items: [
                    'thai',
                    'biryani'
                ]
            })
        })

        app.get('/search', (req, res) => {
            // de-structure
            const {q, limit} = req.query;
            res.json({
                query: q,
                limit: limit || '10'
            });
        })

        app.get('/menu/:id', (req, res) => {
            const {id} = req.params;
            res.json({
                item: id,
                price: 149
            })
        })

        app.post('/order', (req, res) => {
            const order = req.body;
            res.status(201).json({
                status: 'created',
                order
            })
        })

        const server = app.listen(0, async () => {
            
            const port = server.address.port;
            const base = `http://127.0.0.1:${port}`
        
            try {
                console.log(`Server is running on port ${port}`);
                
                console.log ('------------------------------------------');
                
                const menuRes = await fetch (`${base}/menu`);
                const menuData = await menuRes.json()
                console.log('Get /menu', menuData);

                console.log ('------------------------------------------');

                const searchRes = await fetch (`${base}/search?q=biryani&limit=5`);
                const searchData = await searchRes.json();
                console.log('GET /search', JSON.stringify(searchData));

                console.log('---------------------------------------------');
                
                const menuItemRes = await fetch(`${base}/menu/42`);
                const menuItemData = await menuItemRes.json();
                console.log('POST /menu:id', JSON.stringify(menuItemData));
                
                console.log('---------------------------------------------');
                
                const orderRes = await fetch (`${base}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dish: 'biryani',
                        quantity: 2
                    })
                })
                
                const orderData = await orderRes.json();
                console.log('POST /order', JSON.stringify(orderData));
                
                console.log('---------------------------------------------');

            } catch (error) {
                console.log(error);
            }

            server.close(() => {
                console.log("Block 1 serverd closed ....")
                resolve();
            })
        })
    })
}

function block_2_response () {
    return new Promise ((resolve, reject) => {

        const app = express();

        app.get('/text', (req, res) => {
            res.send ('Hello from ChaiCode');
        })

        app.get('/json', (req, res) => {
            res.json ({
                framework: 'express',
                version: '6.1.1',
            })
        })

        app.get('/not-found', (req, res) => {
            res.status(404).json({
                error: "Page not found"
            })
        })

        app.get('/health', (req, res) => {
            res.sendStatus(200);
        })

        app.get('/old-menu', (req, res) => {
            res.redirect(301, '/no-content');
        })

        app.get('/xml', (req, res) => {
            res
                .type('application/xml')
                .send('<dish> <name>Biryani</name> </dish>');
        })

        app.get('/custom-header', (req, res) => {
            
            // Custom header
            res.set('X-powered-By', 'ChaiCode');
            res.set('X-Request-ID', '123545');
            
            res.json({
                message: 'Custom header set'
            })
        })

        app.get('/no-content', (req, res) => {
            // end() => means that the response is ended || it tell the client, no-body will be send
            res.status(204).end();
        })

        const server = app.listen (0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            console.log(`Server is running ${port} || URL ${base}`);

            try {
                
                console.log ('------------------------------------------');
                
                const textRes = await fetch (`${base}/text`);
                const textData = await textRes.text();
                console.log(`Get /text`, JSON.stringify(textData));

                console.log ('------------------------------------------');
                
                const jsonRes = await fetch (`${base}/json`);
                const jsonData = await jsonRes.json();
                console.log(`Get /json`, jsonData);

                console.log ('------------------------------------------');
                
                const notFoundRes = await fetch (`${base}/not-found`);
                const notFoundData = await notFoundRes.json();
                console.log('Get /not-Found', notFoundData);

                console.log ('------------------------------------------');
                
                const healthRes = await fetch (`${base}/health`);
                const healthData = await healthRes.text();
                console.log('Get /health', healthData);

                console.log ('------------------------------------------');
                
                const oldMenuRes = await fetch (`${base}/old-menu`);
                const oldMenuData = await oldMenuRes.json();
                console.log('Get /old-menu', oldMenuData);

                console.log ('------------------------------------------');
                
                const xmlRes = await fetch (`${base}/xml`);
                const xmlData = await xmlRes.text();
                console.log('Get /xml', xmlData);

                console.log ('------------------------------------------');
                
                const customHeaderRes = await fetch (`${base}/custom-header`);
                const customHeaderData = await customHeaderRes.json();
                console.log('Get /custom-header', customHeaderData);

                console.log ('------------------------------------------');
                
                const noContentRes = await fetch (`${base}/no-content`);
                console.log('Get /no-content', noContentData.status);
                
                console.log ('------------------------------------------');
                

            } catch (error) {
                console.log(error);
            }

            server.close(() => {
                console.log("Block 2 served ....");
                resolve();
            });
        })

    })
}

async function main() {
    await block_1_basicServer();
    await block_2_response();

    process.exit(0);
}

main();
