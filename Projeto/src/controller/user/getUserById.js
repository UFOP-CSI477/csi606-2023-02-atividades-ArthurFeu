import { prisma } from "../../database/client.js";

export class GetUserById {
	async handle(request, response) {
		const { id } = request.params;

		const user = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (user) {
			return response.json(user);
		} else {
			return response.status(404).json({ message: "User not found" });
		}
	}
}