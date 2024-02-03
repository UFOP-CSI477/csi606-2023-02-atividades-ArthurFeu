import { prisma } from "../../database/client.js";

export class UpdateCidadeController {
	async handle(request, response) {

		let { id, nome, estadoId } = request.body;

		const cidade = await prisma.cidades.update({
			where: {
				id: parseInt(id),
			},
			data: {
				nome,
				updatedAt: new Date(),
				estado: {
					connect: {
						id: estadoId
					}
				}
			}
		});

		return response.json(cidade);
	}
}
