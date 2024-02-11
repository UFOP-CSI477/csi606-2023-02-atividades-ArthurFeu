import express, { response } from "express";
import { mainRouter } from "./routes/main.js";
import { userRouter } from "./routes/user.js"
import { reminderRouter } from "./routes/reminder.js"

import { prisma } from "./database/client.js"

import cors from "cors";
const server = express();
const PORT = 5555

server.use(cors());
server.use(express.json())

server.get('/', (request, response) => {
	response.json({
		message: 'Status: Server is running.'
	})
})



server.use(mainRouter)
server.use(userRouter)
server.use(reminderRouter)


server.listen(PORT, () => {
	console.log(`[SERVER] Server is running on port ${PORT}`)
})