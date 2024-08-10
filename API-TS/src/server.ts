import  express  from "express";
import { router } from './routes';
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(router);

const port = process.env.NODE_DOCKER_PORT || 8080

app.listen(port, () => console.log('Server rodando na porta ', port))