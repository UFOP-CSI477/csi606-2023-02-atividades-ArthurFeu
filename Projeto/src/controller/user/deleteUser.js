import { prisma } from "../../database/client.js";

export class DeleteUser {
	async handle(request, response) {
		const { id } = request.params;

		try {
			await prisma.reminder.deleteMany({
				where: {
					userId: Number(id),
				},
			});

			await prisma.user.delete({
				where: {
					id: Number(id),
				},
			});

			return response.json({ message: "User deleted successfully." });
		} catch (error) {
			console.error("Failed to delete user:", error);
			return response.status(500).json({ message: "Failed to delete user." });
		}
	}
}
