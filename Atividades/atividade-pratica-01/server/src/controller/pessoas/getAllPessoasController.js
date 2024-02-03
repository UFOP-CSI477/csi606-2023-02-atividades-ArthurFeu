import { prisma } from "../../database/client.js";

export class GetAllPessoasController {

	async handle(request, response) {
		const pessoas = await prisma.pessoas.findMany();
		return response.json(pessoas);
	}

}
