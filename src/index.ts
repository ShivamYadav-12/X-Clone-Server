import { initServer } from "./app";

async function init() {
    const app = initServer()
        ; (await app).listen(8000, () => {
            console.log(`server hai`)
        })
}

init()
