import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { usersController } from '@controllers/index';
import { authenticateToken } from '@server/shared/middleware';

const userRouter = Router();

userRouter.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});

userRouter.post(
  '/users',
  //authenticateToken,
  usersController.createValidation,
  usersController.createUserController
);
userRouter.get(
  '/users',
  usersController.getAllValidation,
  usersController.getAllUsersController
);
userRouter.get(
  '/users/:user_id',
  usersController.getByIdValidation,
  usersController.getByIdValidation
);
userRouter.put(
  '/users/:user_id',
  usersController.updateByIdValidation,
  usersController.updateUserByIdController
);
userRouter.delete(
  '/users',
  usersController.deleteByIdValidation,
  usersController.deleteUserByIdController
);

//Auth test
userRouter.get('/recurso-protegido', authenticateToken, (req, res) => {
  // O middleware authenticateToken garante que o usuário está autenticado
  // Você pode acessar informações do usuário a partir de req.user aqui
  res.json({ mensagem: 'Acesso autorizado' });
});

export default userRouter;
