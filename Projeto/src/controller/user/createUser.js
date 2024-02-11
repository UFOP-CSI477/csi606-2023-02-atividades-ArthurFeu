import { prisma } from "../../database/client.js";

export class CreateUser {
	async handle(request, response) {
		const { email, name } = request.body;

		const user = await prisma.user.create({
			data: {
				email,
				name,
			},
		});

		return response.json(user);
	}
}
