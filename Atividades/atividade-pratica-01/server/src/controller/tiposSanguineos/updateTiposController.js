import { prisma } from "../../database/client.js";

export class UpdateTiposController {

	async handle(request, response) {
		const { id, tipo, fator } = request.body;

		const tiposSanguineos = await prisma.tiposSanguineos.update({
			where: {
				id: parseInt(id)
			},
			data: {
				tipo,
				fator,
				updatedAt: new Date()
			}
		});

		return response.json(tiposSanguineos);
	}

}
