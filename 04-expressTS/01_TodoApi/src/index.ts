// Raw HTTP Server
import { env } from "./env.js";
import { createServerApplication } from "./app/index.js";

async function main () {
    try {
        const app = createServerApplication();
        const PORT: number = env.PORT? +env.PORT : 8080;

        app.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`);
        })
    } catch (error) {
        console.error (`System break ... `, error);
        process.exitCode = 1
    }
}

main();
