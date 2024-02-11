import { prisma } from "../../database/client.js";

export class UpdateUser {
	async handle(request, response) {
		const { id } = request.params;
		const { email, name } = request.body;

		// Verificar se existe outro usuário com o mesmo email
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser && existingUser.id !== Number(id)) {
			return response.status(400).json({ error: "Email já está em uso." });
		}

		const user = await prisma.user.update({
			where: { id: Number(id) },
			data: {
				email,
				name,
			},
		});

		return response.json(user);
	}
}
