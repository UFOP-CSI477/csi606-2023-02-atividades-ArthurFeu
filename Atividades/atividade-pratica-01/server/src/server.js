import express, { response } from "express";
import { mainRouter } from "./routes/main.js";
import { estadoRouter } from "./routes/estados.js";
import { cidadeRouter } from "./routes/cidades.js";
import { doacoesRouter } from "./routes/doacoes.js";
import { locaisRouter } from "./routes/locais.js";
import { pessoasRouter } from "./routes/pessoas.js";
import { tiposRouter } from "./routes/tiposSanguineos.js";
import { prisma } from "./database/client.js"

const server = express();
const PORT = 5555

server.use(express.json())

server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    })
})



server.use(mainRouter)
server.use(estadoRouter)
server.use(cidadeRouter)
server.use(doacoesRouter)
server.use(locaisRouter)
server.use(pessoasRouter)
server.use(tiposRouter)


server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`)
})