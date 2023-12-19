import express, { response } from "express";
import { mainRouter } from "./routes/main.js";
import { estadoRouter } from "./routes/estados.js";
import { prisma } from "./database/client.js"

const server = express();
const PORT = 5000

server.use(express.json())

server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    })
})



server.use(mainRouter)
server.use(estadoRouter)


server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`)
})