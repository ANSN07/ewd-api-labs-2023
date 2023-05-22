import Account from '../entities/Accounts';
import mongoose from 'mongoose';
import AccountRepository from './Repository';
import logger from '../../../logger';

export default class extends AccountRepository {

    constructor() {
        super();
        const ReviewsSchema = new mongoose.Schema({
            movieId: Number,
            author: String,
            review: String,
            rating: Number
        });
        const accountsSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: { type: String, unique: true, index: true },
            password: String,
            favourites: [Number],
            reviews: [ReviewsSchema]
        });
        this.model = mongoose.model('Account', accountsSchema);
    }

    async persist(accountEntity) {
        const { firstName, lastName, email, password } = accountEntity;
        const result = new this.model({ firstName, lastName, email, password });
        await result.save();
        accountEntity.id = result.id;
        return accountEntity;
    }

    async merge(accountEntity) {
        const { id, firstName, lastName, email, password, favourites, reviews } = accountEntity;
        await this.model.findByIdAndUpdate(id, { firstName, lastName, email, password, favourites, reviews });
        logger.info({ id, firstName, lastName, email, password, favourites, reviews });
        return accountEntity;
    }

    async remove(userId) {
        return this.model.findOneAndDelete(userId);
    }

    async get(userId) {
        const result = await this.model.findById(userId);
        const { id, firstName, lastName, email, password, favourites, reviews } = result;
        return new Account(id, firstName, lastName, email, password, favourites, reviews);
    }

    async getByEmail(userEmail) {
        const result = await this.model.findOne({ email: userEmail.toLowerCase() });
        return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favourites, result.reviews);
    }

    async find() {
        const accounts = await this.model.find();
        return accounts.map((result) => {
            return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favourites, result.reviews);
        });
    }
}
