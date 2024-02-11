import { prisma } from "../../database/client.js";

export class CreateReminder {
	async handle(request, response) {
		const { title, description, date, completed, userId } = request.body;

		const reminder = await prisma.reminder.create({
			data: {
				title,
				description,
				date: new Date(date),
				completed,
				userId,
			},
		});

		return response.json(reminder);
	}
}
