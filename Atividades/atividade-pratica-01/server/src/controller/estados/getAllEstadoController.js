import { prisma } from '../../database/client.js'

export class GetAllEstadoController{

    async handle(request, response) {

        const estados = await prisma.estados.findMany()
        return response.json(estados);

    }

}