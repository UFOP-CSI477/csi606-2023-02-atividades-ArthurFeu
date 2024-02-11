import { prisma } from "../../database/client.js";

export class DeleteReminder {
	async handle(request, response) {
		const { id } = request.params;

		await prisma.reminder.delete({
			where: {
				id: Number(id),
			},
		});

		return response.json({ message: "Reminder deleted successfully." });
	}
}
