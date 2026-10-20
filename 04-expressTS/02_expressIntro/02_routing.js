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
            res.json(Object.values(routes));
        })

        // single routes by id
        app.get('/routes/:id', (req, res) => {
            const id = req.params.id;

            // id ! in routes
            if (!Object.keys(routes).includes(id)){
                res.status(404).json({error: 'id is not in list'});
            }

            const route = routes[id];

            res.status(200).json(route);
        })
        
        // new entry
        app.post ('/routes', (req, res) => {
            //! no validation done

            const newRoute = {
                id: nextId++,
                ...req.body
            }

            routes[newRoute.id] = newRoute;
            res.status(201).json(newRoute);
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
                ...req.body,
                id: Number(id)
            }

            return res.status(200).json(routes[id]);
        })

        // delete the route
        app.delete('/routes/:id', (req, res) => {
            if (!routes[id]) {
                return res.status(400).json({errror: 'Route not found'});
            }

            const id = req.params.id;

            delete routes[id];

            return res.status(200).end();
        })

        // * frontend 
        const server = app.listen(0, async () => {
            
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            
        })

        // * server closed

    })
}

