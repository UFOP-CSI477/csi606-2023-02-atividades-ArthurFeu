import { prisma } from "../../database/client.js";

export class UpdateDoacoesController {

	async handle(request, response) {
		const { id, pessoaId, localId, data } = request.body;

		const doacoes = await prisma.doacoes.update({
			where: {
				id: parseInt(id)
			},
			data: {
				pessoa: {
					connect: {
						id: pessoaId
					}
				},
				local: {
					connect: {
						id: localId
					}
				},
				data,
				updatedAt: new Date()
			}
		});

		return response.json(doacoes);
	}

}
