import { Router } from "express";
import { CategoriaController } from "./controllers/CategoriaController";
import { EnderecoController } from "./controllers/EnderecoController";
import { PagamentoController } from "./controllers/PagamentoController";
import { PedidoController } from "./controllers/PedidoController";

const router = Router();

const categories = new CategoriaController()
const enderecos = new EnderecoController()
const pagamentos = new PagamentoController()
const pedidos = new PedidoController()

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

// PAGAMENTOS ROUTES
router.get('/getAllPayments', pagamentos.getAll);
router.get('/getPayment/:id', pagamentos.getById);
router.post('/createPayment', pagamentos.create);
router.put('/updatePayment/:id', pagamentos.edit);
router.delete('/deletePayment/:id', pagamentos.delete);

// PEDIDOS ROUTES
router.get('/getAllOrders', pedidos.getAll);
router.get('/getOrder/:id', pedidos.getById);
router.post('/createOrder', pedidos.create);
router.put('/updateOrder/:id', pedidos.edit);
router.delete('/deleteOrder/:id', pedidos.delete);

export { router };