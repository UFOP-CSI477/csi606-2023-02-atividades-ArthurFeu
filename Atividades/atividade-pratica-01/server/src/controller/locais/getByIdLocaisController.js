import { prisma } from "../../database/client.js";

export class GetByIdLocaisController {

	async handle(request, response) {
		const { id } = request.params;

		const locaisColeta = await prisma.locaisColeta.findUnique({
			where: {
				id: parseInt(id)
			}
		});

		return response.json(locaisColeta);
	}

}
