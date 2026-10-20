const express = require('express');

function block_1_httpMethod () {
    return new Promise ((resolve, reject) => {
        
        const app = express();
        app.use(express.json());

        const routes = {
            1: {
                id: 1,
                name: "Dadar Andhri Express",
                direction: 'North'
            },
            2: {
                id: 2,
                name: 'Bandra-kurla Shuttle',
                direction: 'East'
            }
        }

        let nextId = 3;

        // * backend Routes

        // List all trains
        app.get('/routes', ( _ , res) => {
            return res.json(Object.values(routes));
        })

        // single routes by id
        app.get('/routes/:id', (req, res) => {
            const id = req.params.id;

            // id ! in routes
            if (!Object.keys(routes).includes(id)){
                return res.status(404).json({error: 'id is not in list'});
            }

            const route = routes[id];

            return res.status(200).json(route);
        })
        
        // new entry
        app.post ('/routes', (req, res) => {
            //! no validation done

            const newRoute = {
                ...req.body,
                id: nextId++,
            }

            routes[newRoute.id] = newRoute;
            return res.status(201).json(newRoute);
        })

        // update the route
        app.put('/routes/:id', (req, res) => {
            const id = req.params.id;
            
            // id absent
            if (!routes[id]) {
                return res.status(404).json({ error: 'id not present'});
            }
            const updatedRoute = {
                id: Number(id),
                ...req.body
            }

            routes[id] = updatedRoute;

            return res.status(200).json(routes[id]);
        })

        // update a limited element
        app.patch('/routes/:id', (req, res) => {

            const id = req.params.id;

            if (!routes[id]) {
                return res.status(404).json({error: 'Route not found'});
            }

            const data = req.body;

            routes[id] = {
                ...routes[id],
                id: Number(id),
                ...req.body,
            }

            return res.status(200).json(routes[id]);
        })

        // delete the route
        app.delete('/routes/:id', (req, res) => {
            const id = req.params.id;

            if (!routes[id]) {
                return res.status(400).json({ errror: 'Route not found' });
            }


            delete routes[id];

            return res.status(200).end();
        })

        // * frontend 
        const server = app.listen(0, async () => {
            
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            try {
                console.log('------------------------------------');

                const listRes = await fetch(`${base}/routes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ routes })
                });
                const listData = await listRes.json();
                console.log('GET /routes', listData);
                
                console.log('------------------------------------');
                
                const routeIdRes = await fetch(`${base}/routes/:id`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ routes })
                });
                const routeIdData = await routeIdRes.json();
                console.log('GET /routes/:id', routeIdData);

                console.log('------------------------------------');
                
                const newEntryRes = await fetch (`${base}/routes`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: 'Colaba-Worli',
                        direction: 'South'
                    })
                });
                const newEntryData = await newEntryRes.json();
                console.log('POST /routes', newEntryData);
                
                console.log('------------------------------------');
                
                const updateRoutesRes = await fetch (`${base}/routes/:id`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 3,
                        name: 'Colaba-Worli',
                        direction: 'South'
                    })
                });
                const updateRoutesData = await updateRoutesRes.json();
                console.log('POST /routes/:id', updateRoutesData);
            
                
                console.log('------------------------------------');
                
                const updateRoutesIDRes = await fetch (`${base}/routes/:id`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 2,
                        direction: 'East-South'
                    })
                });
                const updateRoutesIDData = await updateRoutesIDRes.json();
                console.log('PATCH /routes/:id', updateRoutesIDData);
                
                console.log('------------------------------------');
            
                const deleteRoutesRes = await fetch (`${base}/routes/:id`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify ({
                        id : 1
                    })
                });
                const deleteRoutesData = await deleteRoutesRes.json();
                console.log('Delete /routes/:id', deleteRoutesData);
                
                console.log('------------------------------------');
            
            
            } catch (error) {
                console.log(error);
            } finally {
                // * server closed
                server.close( () => {
                    console.log('Server 1 closed .... ');
                    resolve();
                })
            }
        })


    })
}

function block_1_httpMethod_otherWay () {
    return new Promise ((resolve) => {

        const app = express();
        app.use(express.json());

        //* wildcard
            //? /files/docs/readme.txt
            //? /files/assets/style.css

        app.get('/file/*filepath', (req, res) => {
            const filepath = req.params.filepath
            res.json({
                filepath,
                type: 'wildcard'
            })
        })

        // routes
        app
            .route ('/schedule')
            .get ((req, res) => {})
            .post ((req, res) => {})
            .put ((req, res) => {})
            .delete((req, res) => {})

            // middleware
        app
            .use("/api", (req, res) => {})
    })
}

async function main () {
    await block_1_httpMethod()
    await block_1_httpMethod_otherWay()

    process.exit(0)
}

main();
