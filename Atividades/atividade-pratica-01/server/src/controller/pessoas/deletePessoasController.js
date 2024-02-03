import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prisma } from "../../database/client.js";

export class DeletePessoasController {

	async handle(request, response) {
		const { id } = request.body;

		try {
			const pessoas = await prisma.pessoas.delete({
				where: {
					id: parseInt(id)
				}
			});

			return response.json(pessoas);
		} catch (error) {
			if (error.code === "P2025" && error instanceof PrismaClientKnownRequestError) {
				return response.status(400).json({
					message: `[DeletePessoasController] Pessoas id: ${id} não existe.`
				});
			}

			console.error(error);
			return response.status(500).json(error);
		}
	}

}
