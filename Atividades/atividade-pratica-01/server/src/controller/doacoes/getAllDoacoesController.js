import { prisma } from "../../database/client.js";

export class GetAllDoacoesController {

	async handle(request, response) {
		const doacoes = await prisma.doacoes.findMany({
			select: {
				pessoa: {
					select: {
						nome: true
					}
				}
			}
		});

		return response.json(doacoes);
	}
}
