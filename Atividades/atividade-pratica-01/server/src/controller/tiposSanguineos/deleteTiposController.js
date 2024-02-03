import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prisma } from "../../database/client.js";

export class DeleteTiposController {

	async handle(request, response) {
		const { id } = request.body;

		try {
			const tiposSanguineos = await prisma.tiposSanguineos.delete({
				where: {
					id: parseInt(id)
				}
			});

			return response.json(tiposSanguineos);
		} catch (error) {
			if (error.code === "P2025" && error instanceof PrismaClientKnownRequestError) {
				return response.status(400).json({
					message: `[DeleteTiposController] Tipos id: ${id} não existe.`
				});
			}

			console.error(error);
			return response.status(500).json(error);
		}
	}

}
