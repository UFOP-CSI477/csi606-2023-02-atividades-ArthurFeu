import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prisma } from "../../database/client.js";

export class DeleteLocaisController {

	async handle(request, response) {
		const { id } = request.body;

		try {
			const locaisColeta = await prisma.locaisColeta.delete({
				where: {
					id: parseInt(id)
				}
			});

			return response.json(locaisColeta);
		} catch (error) {
			if (error.code === "P2025" && error instanceof PrismaClientKnownRequestError) {
				return response.status(400).json({
					message: `[DeleteLocaisController] Locais id: ${id} não existe.`
				});
			}

			console.error(error);
			return response.status(500).json(error);
		}
	}
}
