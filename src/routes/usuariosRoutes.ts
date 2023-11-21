import { Router } from 'express';
import UsersController from '../controllers/UsuariosController';

const routes = Router();

routes.post('/recoverPassword', UsersController.forgotPassword);
routes.get('/resetpassword/:id/:token', UsersController.resetPassword);
routes.post('/resetpassword/:id/:token', UsersController.changePassword);

export default routes;
