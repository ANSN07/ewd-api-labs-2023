import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository';
import AccountSchema from '../accounts/validators/accountValidator';
import ReviewSchema from '../accounts/validators/reviewValidator';
import Authenticator from '../accounts/security/BCryptAuthenticator';
import TokenManager from './../accounts/security/JWTToken';

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
        throw new Error('Add MySQL support');
    } else {
        throw new Error('Add DB Support to project');
    }
    return dependencies;
};

export default buildDependencies;
