import { prisma } from "../../database/client.js"

export class UpdateEstadoController {

    async handle(request, response){

        let { id, nome, sigla } = request.body

        // Validar se a sigla tem mais de dois caracteres
        if (sigla.length > 2) {
            return response.status(400).json({ error: "Sigla deve ter no máximo dois caracteres" });
        }

        // Remover acentuação do nome
        nome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Colocar letra maiúscula nas primeiras letras de cada palavra do nome
        nome = nome.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');

        // Colocar as duas letras da sigla em maiúscula
        sigla = sigla.toUpperCase();

        const estado = await prisma.estados.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome,
                sigla,
                updatedAt: new Date()
            }
        })

        return response.json(estado)
    }
}