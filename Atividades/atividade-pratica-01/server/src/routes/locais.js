import { Router } from 'express';
import { CreateLocaisController } from '../controller/locais/createLocaisController.js';
import { GetAllLocaisController } from '../controller/locais/getAllLocaisController.js';
import { GetByIdLocaisController } from '../controller/locais/getByIdLocaisController.js';
import { UpdateLocaisController } from '../controller/locais/updateLocaisController.js';
import { DeleteLocaisController } from '../controller/locais/deleteLocaisController.js';

const locaisRouter = Router();
const createLocaisController = new CreateLocaisController();
const getAllLocaisController = new GetAllLocaisController();
const getByIdLocaisController = new GetByIdLocaisController();
const updateLocaisController = new UpdateLocaisController();
const deleteLocaisController = new DeleteLocaisController();

locaisRouter.post('/locais', createLocaisController.handle);
locaisRouter.get('/locais', getAllLocaisController.handle);
locaisRouter.get('/locais/:id', getByIdLocaisController.handle);
locaisRouter.put('/locais', updateLocaisController.handle);
locaisRouter.delete('/locais', deleteLocaisController.handle);

export { locaisRouter };
