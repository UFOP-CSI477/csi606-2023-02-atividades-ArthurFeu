import { Router } from "express";
import { GetAllEstadoController } from "../controller/estados/getAllEstadoController.js";
import { GetByIdEstadoController } from "../controller/estados/getByIdEstadoController.js";
import { CreateEstadoController } from "../controller/estados/createEstadoController.js";
import { UpdateEstadoController } from "../controller/estados/updateEstadoController.js";
import { DeleteEstadoController } from "../controller/estados/deleteEstadoController.js";

const estadoRouter = Router();
const getAllEstadoController = new GetAllEstadoController()
const getByIdEstadoController = new GetByIdEstadoController()
const createEstadoController = new CreateEstadoController()
const updateEstadoController = new UpdateEstadoController()
const deleteEstadoController = new DeleteEstadoController()


estadoRouter.get("/estados", getAllEstadoController.handle)
estadoRouter.get("/estados/:id", getByIdEstadoController.handle)
estadoRouter.post("/estados", createEstadoController.handle)
estadoRouter.put("/estados/", updateEstadoController.handle)
estadoRouter.delete("/estados", deleteEstadoController.handle)


export { estadoRouter }