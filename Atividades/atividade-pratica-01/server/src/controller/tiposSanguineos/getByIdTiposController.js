import { prisma } from "../../database/client.js";

export class GetByIdTiposController {

	async handle(request, response) {

		const { id } = request.params
		const tiposSanguineos = await prisma.tiposSanguineos.findUnique({

			where: {
				id: parseInt(id)
			}

		})

		return response.json(tiposSanguineos)

	}


}