import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clientsController } from '@controllers/index';
import { authenticateToken } from '@server/shared/middleware';

const clientRouter = Router();

clientRouter.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});

clientRouter.post(
  '/clients',
  //authenticateToken,
  clientsController.SchemaValidation,
  clientsController.validatePrimaryKeys,
  clientsController.validate,
  clientsController.create
);
clientRouter.get(
  '/clients',
  clientsController.getAllValidation,
  clientsController.getAll
);
clientRouter.get(
  '/clients/:client_id',
  clientsController.getByIdValidation,
  clientsController.getById
);
clientRouter.get(
  '/clients/:client_id_doc',
  clientsController.getByIdDocValidation,
  clientsController.getByIdDoc
);

clientRouter.put(
  '/clients',
  clientsController.updateByIdValidation,
  clientsController.updateById
);
clientRouter.delete(
  '/clients/:client_id',
  clientsController.deleteByIdValidation,
  clientsController.deleteById
);

//Auth test
clientRouter.get('/recurso-protegido', authenticateToken, (req, res) => {
  // O middleware authenticateToken garante que o usuário está autenticado
  // Você pode acessar informações do usuário a partir de req.client aqui
  res.json({ mensagem: 'Acesso autorizado' });
});


export default clientRouter;
