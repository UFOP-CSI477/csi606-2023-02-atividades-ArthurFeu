import { prisma } from "../../database/client.js";

export class GetAllUsers {
	async handle(request, response) {
		const users = await prisma.user.findMany();
		return response.json(users);
	}
}