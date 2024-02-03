import { prisma } from "../../database/client.js";

export class UpdatePessoasController {

	async handle(request, response) {
		const { id, nome, numero, rua, complemento, rg, cidadeId, tipoId } = request.body;

		const pessoas = await prisma.pessoas.update({
			where: {
				id: parseInt(id)
			},
			data: {
				nome,
				numero,
				rua,
				complemento,
				rg,
				cidade: {
					connect: {
						id: cidadeId
					}
				},
				tipo: {
					connect: {
						id: tipoId
					}
				},
				updatedAt: new Date()
			}
		});

		return response.json(pessoas);
	}

}
