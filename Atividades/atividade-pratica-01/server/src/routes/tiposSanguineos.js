import { Router } from 'express';
import { CreateTiposController } from '../controller/tiposSanguineos/createTiposController.js';
import { GetAllTiposController } from '../controller/tiposSanguineos/getAllTiposController.js';
import { GetByIdTiposController } from '../controller/tiposSanguineos/getByIdTiposController.js';
import { UpdateTiposController } from '../controller/tiposSanguineos/updateTiposController.js';
import { DeleteTiposController } from '../controller/tiposSanguineos/deleteTiposController.js';

const tiposRouter = Router();
const getAllTiposController = new GetAllTiposController();
const getByIdTiposController = new GetByIdTiposController();
const createTiposController = new CreateTiposController();
const updateTiposController = new UpdateTiposController();
const deleteTiposController = new DeleteTiposController();

tiposRouter.get('/tiposSanguineos', getAllTiposController.handle);
tiposRouter.get('/tiposSanguineos/:id', getByIdTiposController.handle);
tiposRouter.post('/tiposSanguineos', createTiposController.handle);
tiposRouter.put('/tiposSanguineos', updateTiposController.handle);
tiposRouter.delete('/tiposSanguineos', deleteTiposController.handle);

export { tiposRouter };
