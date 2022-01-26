import 'express-async-errors';
import express from 'express'

import { UserRoutes } from './controllers/User';
import { errorHandler } from './controllers/middlewares/errorHandler';

const server = express();

server.use(express.json());

server.use('/user', UserRoutes)

// PRECISA SER DEPOIS DAS ROTAS POR SER UM MIDDLEWARE PÓS ROTA
server.use(errorHandler)

server.listen(3000, () => console.log("Server listening on port 3000"))