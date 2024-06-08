import  express  from "express";
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(8081, () => console.log('Server rodando na porta 8081'))