import { prisma } from "../../database/client.js";

export class CreatePessoasController {

	async handle(request, response) {
		const { nome, numero, rua, complemento, rg, cidadeId, tipoId } = request.body;

		const pessoas = await prisma.pessoas.create({
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
				}
			}
		});

		return response.json(pessoas);
	}

}
