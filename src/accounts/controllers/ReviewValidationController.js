import logger from "../../../logger";

export default (dependencies) => {

    const { reviewSchema } = dependencies;

    const validateReview = async (request, response, next) => {
        try {
            const validated = await reviewSchema['review'].validateAsync(request.body);
            request.body = validated;
            logger.info("Review schema validation successfull");
            next();
        } catch (err) {
            logger.error(`Error in request validation: ${err.message}`);
            next(new Error(`Invalid Data: ${err.message}`));
        }
    };

    return {
        validateReview
    };
};
