import logger from "../../../logger";

export default (dependencies) => {

    const { accountSchema } = dependencies;

    const validateAccount = async (request, response, next) => {
        // Input
        try {
            const validated = await accountSchema['account'].validateAsync(request.body);
            request.body = validated;
            logger.info("Account schema validation successfull");
            next();
        } catch (err) {
            logger.error(`Error in request validation: ${err.message}`);
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        validateAccount
    };
};
