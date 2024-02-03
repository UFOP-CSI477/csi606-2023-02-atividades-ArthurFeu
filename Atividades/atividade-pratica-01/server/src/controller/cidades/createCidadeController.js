import { prisma } from "../../database/client.js";

export class CreateCidadeController {

	async handle(request, response) {

		const { nome, estadoId } = request.body;

		const cidade = await prisma.cidades.create({

			data: {
				nome,
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
