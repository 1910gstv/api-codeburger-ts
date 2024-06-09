import { Router } from "express";
import { CategoriaController } from "./controllers/CategoriaController";
import { EnderecoController } from "./controllers/EnderecoController";

const router = Router();

const categories = new CategoriaController()
const enderecos = new EnderecoController()

// CATEGORIAS ROUTES
router.get('/getAllCategories', categories.getAll);
router.get('/getCategory/:id', categories.getById);
router.post('/createCategory', categories.create);
router.put('/updateCategory/:id', categories.edit);
router.delete('/deleteCategory/:id', categories.delete);

// ENDERECÇOS ROUTES
router.get('/getAllAdresses', enderecos.getAll);
router.get('/getAddress/:id', enderecos.getById);
router.post('/createAddress', enderecos.create);
router.put('/updateAddress/:id', enderecos.edit);
router.delete('/deleteAddress/:id', enderecos.delete);


export { router };