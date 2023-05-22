import express from 'express';
import AccountsController from '../controllers';
import AccountValidationController from '../controllers/AccountValidationController';
import ReviewValidationController from '../controllers/ReviewValidationController';

const createRouter = (dependencies) => {
    const router = express.Router();

    const accountValidationController = AccountValidationController(dependencies);
    const reviewValidationController = ReviewValidationController(dependencies);

    // load controller with dependencies
    const accountsController = AccountsController(dependencies);
    router.route('/')
        .post(accountValidationController.validateAccount, accountsController.createAccount);

    router.route('/')
        .get(accountsController.listAccounts);

    router.route('/:id')
        .get(accountsController.getAccount);

    router.route('/:id')
        .put(accountsController.updateAccount);

    router.route('/security/token')
        .post(accountsController.authenticateAccount);

    router.route('/:id/favourites')
        .post(accountsController.addFavourite);

    router.route('/:id/favourites')
        .get(accountsController.getFavourites);

    router.route('/:id/reviews')
        .post(reviewValidationController.validateReview, accountsController.addReview);

    router.route('/:id/reviews')
        .get(accountsController.getReviews);

    return router;
};
export default createRouter;
