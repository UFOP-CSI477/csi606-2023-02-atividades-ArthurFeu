import { prisma } from "../../database/client.js";

export class CreateLocaisController {

	async handle(request, response) {
		const { nome, rua, numero, complemento, cidadeId } = request.body;

		try {
			const locaisColeta = await prisma.locaisColeta.create({
				data: {
					nome,
					rua,
					numero,
					complemento,
					cidade: {
						connect: {
							id: cidadeId
						}
					}
				}
			});

			return response.json(locaisColeta);
		} catch (error) {
			console.error(error);
			return response.status(400).json(error);
		}
	}
}
