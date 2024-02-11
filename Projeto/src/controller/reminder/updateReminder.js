import { prisma } from "../../database/client.js";

export class UpdateReminder {
	async handle(request, response) {
		const { id } = request.params;
		const { title, description, date, completed } = request.body;

		const reminder = await prisma.reminder.update({
			where: { id: Number(id) },
			data: {
				title,
				description,
				date: new Date(date),
				completed,
			},
		});

		return response.json(reminder);
	}
}
