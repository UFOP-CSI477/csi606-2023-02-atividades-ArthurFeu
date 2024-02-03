import { prisma } from "../../database/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export class DeleteCidadeController {

	async handle(request, response) {

		const { id } = request.body;

		try {
			const cidade = await prisma.cidades.delete({
				where: {
					id: parseInt(id)
				}
			});

			return response.json(cidade);

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
				return response.status(400).json({
					message: `[DeleteCidadeController] Cidade id: ${id} não encontrado.`
				});
			}
			console.error(error);
			return response.status(400).json(error);
		}
	}
}
