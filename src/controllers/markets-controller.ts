import { Request, Response, NextFunction } from "express"
import { prisma } from "../database/prisma"
import { z } from "zod"

class MarketsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        category_id: z.string().uuid(),
        latitude: z.number(),
        longitude: z.number(),
      })

      const { category_id='todos', latitude=0, longitude=0} = request.params;
      console.log(category_id, latitude, longitude);
      const maxDistance = 1;
      
      let baseQuery = `
        SELECT
            markets.*,
            (
                6371 * acos(
                    cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) +
                    sin(radians(${latitude})) * sin(radians(latitude))
                )
            ) AS distancia
        FROM
            markets
      `;
    
      // Adiciona o filtro por categoria somente se `categoryId` não for "todos"
      if (category_id !== 'todos') {
        baseQuery += ` WHERE category_id = ${JSON.stringify(category_id)} `;
      }
    
      // Continua com a cláusula HAVING e ORDER BY
      baseQuery += `
        HAVING distancia <= ${maxDistance}
        ORDER BY distancia;
      `;

      // Executa a consulta
      const markets = await prisma.$queryRawUnsafe(baseQuery);

      return response.json(markets)
    } catch (error) {
      next(error)
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const markets = await prisma.market.findUnique({
        where: { id },
        include: {
          rules: true,
        },
      })

      return response.json(markets)
    } catch (error) {
      next(error)
    }
  }
}

export { MarketsController }
