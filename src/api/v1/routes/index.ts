import { swagger } from 'config';
import express from 'express';
import SwaggerUi from 'swagger-ui-express';

import authRoutes from './auth';
import rolesRoutes from './roles';
import usersRoutes from './users';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/docs', SwaggerUi.serve, swagger);

export default routes;
