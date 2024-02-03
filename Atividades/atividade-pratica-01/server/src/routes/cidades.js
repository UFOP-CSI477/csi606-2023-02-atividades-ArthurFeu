import { Router } from 'express';
import { CreateCidadeController } from '../controller/cidades/createCidadeController.js';
import { GetAllCidadeController } from '../controller/cidades/getAllCidadeController.js';
import { GetByIdCidadeController } from '../controller/cidades/getByIdCidadeController.js';
import { UpdateCidadeController } from '../controller/cidades/updateCidadeController.js';
import { DeleteCidadeController } from '../controller/cidades/deleteCidadeController.js';

const cidadeRouter = Router();
const createCidadeController = new CreateCidadeController();
const getAllCidadeController = new GetAllCidadeController();
const getByIdCidadeController = new GetByIdCidadeController();
const updateCidadeController = new UpdateCidadeController();
const deleteCidadeController = new DeleteCidadeController();

cidadeRouter.post('/cidades', createCidadeController.handle);
cidadeRouter.get('/cidades', getAllCidadeController.handle);
cidadeRouter.get('/cidades/:id', getByIdCidadeController.handle);
cidadeRouter.put('/cidades', updateCidadeController.handle);
cidadeRouter.delete('/cidades', deleteCidadeController.handle);

export { cidadeRouter };
