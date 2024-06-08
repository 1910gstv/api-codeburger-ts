import { Router } from "express";
import { CategoriaController } from "./controllers/CategoriaController";

const router = Router();

const categories = new CategoriaController()

router.get('/getAllCategories', categories.getAll);
router.post('/createCategory', categories.create);

export { router };