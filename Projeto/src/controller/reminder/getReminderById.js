import { prisma } from "../../database/client.js";

export class GetReminderById {
	async handle(request, response) {
		const { id } = request.params;

		const reminder = await prisma.reminder.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (reminder) {
			return response.json(reminder);
		} else {
			return response.status(404).json({ message: "Reminder not found" });
		}
	}
}
