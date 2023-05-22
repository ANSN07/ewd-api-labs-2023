import express from 'express';
import AccountsController from '../controllers';
import ValidationController from '../controllers/ValidationController';

const createRouter = (dependencies) => {
    const router = express.Router();
    const validationController = ValidationController(dependencies);
    // load controller with dependencies
    const accountsController = AccountsController(dependencies);
    router.route('/')
        .post(validationController.validateAccount, accountsController.createAccount);

    router.route('/')
        .get(accountsController.listAccounts);

    router.route('/:id')
        .get(accountsController.getAccount);

    router.route('/:id')
        .put(accountsController.updateAccount);

    return router;
};
export default createRouter;
