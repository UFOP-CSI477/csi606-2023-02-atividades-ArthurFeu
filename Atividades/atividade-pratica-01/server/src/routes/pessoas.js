import { Router } from 'express';
import { CreatePessoasController } from '../controller/pessoas/createPessoasController.js';
import { GetAllPessoasController } from '../controller/pessoas/getAllPessoasController.js';
import { GetByIdPessoasController } from '../controller/pessoas/getByIdPessoasController.js';
import { UpdatePessoasController } from '../controller/pessoas/updatePessoasController.js';
import { DeletePessoasController } from '../controller/pessoas/deletePessoasController.js';

const pessoasRouter = Router();
const createPessoasController = new CreatePessoasController();
const getAllPessoasController = new GetAllPessoasController();
const getByIdPessoasController = new GetByIdPessoasController();
const updatePessoasController = new UpdatePessoasController();
const deletePessoasController = new DeletePessoasController();

pessoasRouter.post('/pessoas', createPessoasController.handle);
pessoasRouter.get('/pessoas', getAllPessoasController.handle);
pessoasRouter.get('/pessoas/:id', getByIdPessoasController.handle);
pessoasRouter.put('/pessoas', updatePessoasController.handle);
pessoasRouter.delete('/pessoas', deletePessoasController.handle);

export { pessoasRouter };
