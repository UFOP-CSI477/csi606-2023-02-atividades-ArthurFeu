import { Router } from 'express';
import { CreateDoacoesController } from '../controller/doacoes/createDoacoesController.js';
import { GetAllDoacoesController } from '../controller/doacoes/getAllDoacoesController.js';
import { GetByIdDoacoesController } from '../controller/doacoes/getByIdDoacoesController.js';
import { UpdateDoacoesController } from '../controller/doacoes/updateDoacoesController.js';
import { DeleteDoacoesController } from '../controller/doacoes/deleteDoacoesController.js';

const doacoesRouter = Router();
const createDoacoesController = new CreateDoacoesController();
const getAllDoacoesController = new GetAllDoacoesController();
const getByIdDoacoesController = new GetByIdDoacoesController();
const updateDoacoesController = new UpdateDoacoesController();
const deleteDoacoesController = new DeleteDoacoesController();

doacoesRouter.post('/doacoes', createDoacoesController.handle);
doacoesRouter.get('/doacoes', getAllDoacoesController.handle);
doacoesRouter.get('/doacoes/:id', getByIdDoacoesController.handle);
doacoesRouter.put('/doacoes', updateDoacoesController.handle);
doacoesRouter.delete('/doacoes', deleteDoacoesController.handle);

export { doacoesRouter };
