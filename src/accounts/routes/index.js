/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password set by the user
 *       example:
 *         firstName: Sim
 *         lastName: Moen
 *         email: johann80@hotmail.com
 *         password: Test@1234
 *     Create_Account_Response:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password set by the user
 *         favourites:
 *           type: array
 *           description: Array containing IDs of favourite movies of user
 *           items:
 *             type: string
 *         reviews:
 *           type: array
 *           description: Array containing movie reviews posted by the user
 *           items:
 *             $ref: '#/components/schemas/Review'
 *       example:
 *         id: 646bbcbe0b8299c1ebdcbf0e
 *         firstName: Sim
 *         lastName: Moen
 *         email: johann80@hotmail.com
 *         password: $2a$10$AQUwnv6sP6ORLqI34q4zsOkswpe7CVzjPZWblcD1N6KpcYH8RhBH.
 *         favourites: []
 *         reviews: []
 *     
 *     Review:
 *       type: object
 *       properties:
 *         movieId:
 *           type: number
 *           description: The id of the movie
 *         author:
 *           type: string
 *           description: The name of the user
 *         rating:
 *           type: number
 *           description: The user rating for the movie
 *         review:
 *           type: string
 *           description: The review text
 *       example:
 *         movieId: 123456
 *         author: Sim Moen
 *         rating: 3
 *         review: Nice movie
 *
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies API
 *
 * /api/accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       '200':
 *         description: The created account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Create_Account_Response'
 *       '500':
 *         description: Internal server error
 * 
 *   get:
 *     summary: Lists all the accounts
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: The list of the accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 * 
 * /api/accounts/{id}:
 *   get:
 *     summary: Get the account by user id
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The account details by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: The user id was not found
 *   put:
 *    summary: Update the acconut by user id
 *    tags: [Account]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Account'
 *    responses:
 *      200:
 *        description: The account was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Account'
 *      400:
 *        description: The user id was not found
 * 
 * /security/token:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password set by the user
 *           example:
 *             email: test@test.com
 *             password: Test@123
 * 
 *     responses:
 *       '200':
 *         description: The bearer token
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *             example:
 *                token: Bearer slndchgsjnhdsgliuhgblvdiuhnvgldhu
 *       '400':
 *         description: The user id was not found
 * 
 * /{id}/favourites:
 *   post:
 *     summary: Add a movie to favourites
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId: 
 *                 type: string
 *                 description: Id of the movie to be added to favourites
 *           example:
 *             movieId: 12345
 *     responses:
 *       '200':
 *         description: The account details along with favourites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Create_Account_Response'
 *       '400':
 *         description: The user id was not found
 * 
 *   get:
 *     summary: Lists all the ids of favourite movies of a user
 *     tags: [Account]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *     responses:
 *       '200':
 *         description: The list of the movie ids
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       '400':
 *         description: The user id was not found
 * 
 * /{id}/reviews:
 *   post:
 *     summary: Add a new review for a movie
 *     tags: [Review]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: The account details along with reviews
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Create_Account_Response'
 *       '400':
 *         description: The user id was not found
 * 
 *   get:
 *     summary: Lists all the reviews posted by a user
 *     tags: [Review]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *     responses:
 *       '200':
 *         description: The list of all the reviews of user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '400':
 *         description: The user id was not found
 */

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
