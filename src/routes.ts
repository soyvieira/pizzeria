import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';

import { SenOrderController } from './controllers/order/SenOrderController';

import { ListOrderController } from './controllers/order/ListOrderController';

import { DetailOrderController } from './controllers/order/DetailOrderController';

import { FinishOrderController } from './controllers/order/FinishOrderController';

import { isAuthenticated } from './middlewares/isAuthenticaded';

import uploadConfig  from './config/multer';


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//User routes
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/userdetails', isAuthenticated, new DetailUserController().handle)

//Category routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

//Products routes
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//Orders routes
router.post('/order', isAuthenticated, new CreateOrderController().handle) //Create order

router.delete('/order', isAuthenticated, new RemoveOrderController().handle) //Delete order

router.post('/order/add', isAuthenticated, new AddItemController().handle) //Add item on order

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle) //Remove an item from order

router.put('/order/send', isAuthenticated, new SenOrderController().handle) //Send order to production

router.get('/orders', isAuthenticated, new ListOrderController().handle) //List orders in production

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle) //Show order details 

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle) //Finish order

export { router }; 