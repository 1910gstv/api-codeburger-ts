import { Router } from "express";
import { CategoriaController } from "./controllers/CategoriaController";
import { EnderecoController } from "./controllers/EnderecoController";
import { PagamentoController } from "./controllers/PagamentoController";
import { PedidoController } from "./controllers/PedidoController";
import { PedidoProdutoController } from "./controllers/PedidoProdutoController";
import { ProdutoController } from "./controllers/ProdutoController";
import { UsuarioController } from "./controllers/UsuarioController";

const router = Router();

const categories = new CategoriaController();
const enderecos = new EnderecoController();
const pagamentos = new PagamentoController();
const pedidos = new PedidoController();
const pedidosprodutos = new PedidoProdutoController();
const produtos = new ProdutoController();
const usuarios = new UsuarioController();

// CATEGORIAS ROUTES
router.get("/categories", categories.getAll);
router.get("/categories/:id", categories.getById);
router.post("/categories", categories.create);
router.put("/categories/:id", categories.edit);
router.delete("/categories/:id", categories.delete);

// ENDERECÇOS ROUTES
router.get("/adresses", enderecos.getAll);
router.get("/adresses/:id", enderecos.getById);
router.post("/adresses", enderecos.create);
router.put("/adresses/:id", enderecos.edit);
router.delete("/adresses/:id", enderecos.delete);

// PAGAMENTOS ROUTES
router.get("/payments", pagamentos.getAllP);
router.get("/payments/:id", pagamentos.getById);
router.post("/payments", pagamentos.create);
router.put("/payments/:id", pagamentos.edit);
router.delete("/payments/:id", pagamentos.delete);

// PEDIDOS ROUTES
router.get("/orders/", pedidos.getAll);
router.get("/orders/:id", pedidos.getById);
router.post("/orders", pedidos.create);
router.put("/orders/:id", pedidos.edit);
router.delete("/orders/:id", pedidos.delete);

// PEDIDOS PRODUTOS ROUTES
router.get("/orders-item", pedidosprodutos.getAll);
router.get("/orders-item/:id", pedidosprodutos.getById);
router.post("/orders-item", pedidosprodutos.create);
router.put("/orders-item/:id", pedidosprodutos.edit);
router.delete("/orders-item/:id", pedidosprodutos.delete);

// PRODUTOS ROUTES
router.get("/products", produtos.getAll);
router.get("/products/:id", produtos.getById);
router.post("/products", produtos.create);
router.put("/products/:id", produtos.edit);
router.delete("/products/:id", produtos.delete);

// USUARIOS ROUTES
router.get("/users", usuarios.getAll);
router.get("/users/:id", usuarios.getById);
router.post("/users", usuarios.create);
router.put("/users/:id", usuarios.edit);
router.delete("/users/:id", usuarios.delete);

export { router };
