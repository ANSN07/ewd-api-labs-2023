import Authenticator from '../Authenticator';

export default class extends Authenticator {
    async compare(password, encryptedPassword) {
        try {
            // Compare password
            const result = password == encryptedPassword;
            return Promise.resolve(result);
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}
