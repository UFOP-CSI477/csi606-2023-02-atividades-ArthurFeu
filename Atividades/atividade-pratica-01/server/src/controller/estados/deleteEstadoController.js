import { prisma } from "../../database/client.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"

export class DeleteEstadoController {

    async handle(request, response) {

        const { id } = request.body

        try{
            const estado = await prisma.estados.delete({

                where: {
                    id: parseInt(id)
                }

            })

            return response.json(estado)
        }catch(error){
            if(error.code === "P2025" && error instanceof PrismaClientKnownRequestError){

                return response.status(400).json({
                    message: '[DeleteEstadoController] Estado id: ${id} não encontrado.'
                })
            }

        }

    }
}