import { prisma } from "../../database/client.js";

export class GetAllReminders {
	async handle(request, response) {
		const reminders = await prisma.reminder.findMany();
		return response.json(reminders);
	}
}
