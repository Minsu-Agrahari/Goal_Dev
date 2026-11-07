import "dotenv/config";

import { createServer } from 'node:http';
import createApplication from './app';

async function main() {
    try {
        const server = createServer(createApplication);
        const PORT: number = Number(process.env.PORT) || 8080;

        server.listen(PORT, () => {
            console.log(`HTTP server is running on PORT ${PORT} in ${process.env.NODE}`);
        })
    } catch (error) {
        console.log(`Error: starting HTTP server`);
        throw error;
    }
};

main();
