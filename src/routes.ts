import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'

const router = Router();

//User route
router.post('/users', new CreateUserController().handle)

export { router }; 