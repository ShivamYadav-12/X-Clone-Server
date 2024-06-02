import { initServer } from "./app";
import * as dotenv from 'dotenv';
dotenv.config();

async function init() {
    const app = initServer()
        ; (await app).listen(8000, () => {
            console.log(`server hai`)
        })
}

init()
