import { prisma } from "../../database/client.js";

export class UpdateLocaisController {

	async handle(request, response) {
		const { id, nome, rua, numero, complemento, cidadeId } = request.body;

		const locaisColeta = await prisma.locaisColeta.update({
			where: {
				id: parseInt(id)
			},
			data: {
				nome,
				rua,
				numero,
				complemento,
				cidade: {
					connect: {
						id: cidadeId
					}
				},
				updatedAt: new Date()
			}
		});

		return response.json(locaisColeta);
	}

}
