import Account from '../entities/Accounts';
import Reviews from '../entities/Reviews';

export default {
    registerAccount: async (firstName, lastName, email, password, { accountsRepository, authenticator }) => {
        password = await authenticator.encrypt(password);
        const account = new Account(undefined, firstName, lastName, email, password);
        return accountsRepository.persist(account);
    },
    getAccount: (accountId, { accountsRepository }) => {
        return accountsRepository.get(accountId);
    },
    find: ({ accountsRepository }) => {
        return accountsRepository.find();
    },
    findByEmail: (email, { accountsRepository }) => {
        return accountsRepository.getByEmail(email);
    },
    updateAccount: async (id, firstName, lastName, email, password, { accountsRepository, authenticator }) => {
        password = await authenticator.encrypt(password);
        const account = new Account(id, firstName, lastName, email, password);
        return accountsRepository.merge(account);
    },
    authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
        const account = await accountsRepository.getByEmail(email);
        const result = await authenticator.compare(password, account.password);
        if (!result) {
            throw new Error('Bad credentials');
        }
        const token = tokenManager.generate({ email: account.email });
        return token;
    },
    getFavourites: async (accountId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        return account.favourites;
    },
    addFavourite: async (accountId, movieId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        if (account.favourites.includes(movieId)) {
            return "Movie already exists in favourites";
        }
        account.favourites.push(movieId);
        return await accountsRepository.merge(account);
    },
    verifyToken: async (token, { accountsRepository, tokenManager }) => {
        const decoded = await tokenManager.decode(token);
        const user = await accountsRepository.getByEmail(decoded.email);
        if (!user) {
            throw new Error('Bad token');
        }
        return user.email;
    },
    addReview: async (accountId, movieId, author, review, rating, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        const newReview = new Reviews(movieId, author, review, rating);
        account.reviews.push(newReview);
        return await accountsRepository.merge(account);
    },
    getReviews: async (accountId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        return account.reviews;
    },
};
