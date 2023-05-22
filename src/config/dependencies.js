import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository';
import AccountSchema from '../accounts/validators/accountValidator';
import ReviewSchema from '../accounts/validators/reviewValidator';
import Authenticator from '../accounts/security/BCryptAuthenticator';
import TokenManager from './../accounts/security/JWTToken';
import logger from '../../logger';

const buildDependencies = () => {
    const dependencies = {
        authenticator: new Authenticator()
    };
    dependencies.accountSchema = AccountSchema;
    dependencies.reviewSchema = ReviewSchema;
    dependencies.tokenManager = new TokenManager();
    if (process.env.DATABASE_DIALECT === "in-memory") {
        dependencies.accountsRepository = new AccountsRepositoryInMemory();
    } else if (process.env.DATABASE_DIALECT === "mongo") {
        dependencies.accountsRepository = new AccountsRepositoryMongo();
    } else if (process.env.DATABASE_DIALECT === "mysql") {
        logger.error("Add MySQL support");
        throw new Error('Add MySQL support');
    } else {
        logger.error("Add DB Support to project");
        throw new Error('Add DB Support to project');
    }
    return dependencies;
};

export default buildDependencies;
