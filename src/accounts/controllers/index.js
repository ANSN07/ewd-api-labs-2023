import logger from "../../../logger";
import accountService from "../services";
const createError = require('http-errors');

export default (dependencies) => {

    const createAccount = async (request, response, next) => {
        try {
            logger.info("Request received for createAccount");
            // Input
            const { firstName, lastName, email, password } = request.body;
            // Treatment
            const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
            //output
            response.status(201).json(account);
        } catch (e) {
            logger.error(`Error in createAccount request`);
            next(createError(500, `Server error: ${e.message}`));
        }
    };
    const getAccount = async (request, response, next) => {
        try {
            logger.info("Request received for getAccount");
            //input
            const accountId = request.params.id;
            // Treatment
            const account = await accountService.getAccount(accountId, dependencies);
            //output
            response.status(200).json(account);
        } catch (e) {
            logger.error(`Error in getAccount request`);
            next(createError(400, `Invalid Data: ${e.message}`));
        }
    };
    const listAccounts = async (request, response, next) => {
        logger.info("Request received for listAccounts");
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output
        response.status(200).json(accounts);
    };
    const updateAccount = async (request, response, next) => {
        try {
            logger.info("Request received for updateAccount");
            // Input
            const id = request.params.id;
            const { firstName, lastName, email, password } = request.body;
            // Treatment
            const account = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies);
            //output
            response.status(200).json(account);
        } catch (e) {
            logger.error(`Error in updateAccount request`);
            next(createError(400, `Invalid Data: ${e.message}`));
        }
    };
    const authenticateAccount = async (request, response, next) => {
        try {
            logger.info("Request received for authenticateAccount");
            const { email, password } = request.body;
            const token = await accountService.authenticate(email, password, dependencies);
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            logger.error(`Error in authenticateAccount request`);
            next(createError(401));
        }
    };
    const addFavourite = async (request, response, next) => {
        try {
            logger.info("Request received for addFavourite");
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.addFavourite(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            logger.error(`Error in addFavourite request`);
            next(createError(400, `Invalid Data ${err.message}`));
        }
    };
    const getFavourites = async (request, response, next) => {
        try {
            logger.info("Request received for getFavourites");
            const id = request.params.id;
            const favourites = await accountService.getFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            logger.error(`Error in getFavourites request`);
            next(createError(400, `Invalid Data ${err.message}`));
        }
    };
    const verify = async (request, response, next) => {
        try {
            logger.info("Request received for account verification");
            // Input
            const authHeader = request.headers.authorization;
            // Treatment
            const accessToken = authHeader.split(" ")[1];
            const user = await accountService.verifyToken(accessToken, dependencies);
            //output
            next();
        } catch (err) {
            //Token Verification Failed
            logger.error(`Error in account Verification`);
            next(createError(401, `Verification Failed ${err.message}`));
        }
    };
    const addReview = async (request, response, next) => {
        try {
            logger.info("Request received for addReview");
            const { movieId, author, review, rating } = request.body;
            const id = request.params.id;
            const review_response = await accountService.addReview(id, movieId, author, review, rating, dependencies);
            response.status(200).json(review_response);
        } catch (err) {
            logger.error(`Error in addReview request`);
            next(createError(400, `Invalid Data ${err.message}`));
        }
    };
    const getReviews = async (request, response, next) => {
        try {
            logger.info("Request received for getReviews");
            const id = request.params.id;
            const reviews = await accountService.getReviews(id, dependencies);
            response.status(200).json(reviews);
        } catch (err) {
            logger.error(`Error in getReviews request`);
            next(createError(400, `Invalid Data ${err.message}`));
        }
    };

    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
        authenticateAccount,
        addFavourite,
        getFavourites,
        verify,
        addReview,
        getReviews
    };
};
