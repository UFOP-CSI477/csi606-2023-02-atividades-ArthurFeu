import { prisma } from '../../database/client.js'

export class GetByIdEstadoController {

    async handle(request, response){

        const { id } = request.params

        const estado = await prisma.estados.findUnique({

            where: {
                id: parseInt(id)
            }

        })

        return response.json(estado)

    }

}