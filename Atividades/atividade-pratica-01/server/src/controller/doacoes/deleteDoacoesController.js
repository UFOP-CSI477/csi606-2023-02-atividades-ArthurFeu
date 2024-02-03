import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prisma } from "../../database/client.js";

export class DeleteDoacoesController {

	async handle(request, response) {
		const { id } = request.body;

		try {
			const doacoes = await prisma.doacoes.delete({
				where: {
					id: parseInt(id)
				}
			});

			return response.json(doacoes);
		} catch (error) {
			if (error.code === "P2025" && error instanceof PrismaClientKnownRequestError) {
				return response.status(400).json({
					message: `[DeleteDoacoesController] Doacoes id: ${id} não existe.`
				});
			}
		}
	}
}
