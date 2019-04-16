import { validSortOrder, maxPhoneNumberQty } from '../helpers/defaults';

const verifyQuery = (req, res, next) => {
    try {
        const { qty, order } = req.query;
        const errors = {};

        if (!qty && !order) {
            return next();
        }

        const modulo = qty % 1;
        if (qty) {
            if (modulo !== 0 || qty > maxPhoneNumberQty) {
                errors.qty = `qty must be a number and not more than ${maxPhoneNumberQty}`;
            } else {
                req.query.qty = parseInt(qty, 10);
            }
        }

        const regexp = /^[a-zA-Z]+$/;

        if (order) {
            if (regexp.test(order) && validSortOrder.includes(order.toLowerCase())) {
                req.query.order = order.toLowerCase();
            } else {
                errors.order = 'order must either be descending or ascending';
            }
        }

        if (Object.keys(errors).length) {
            const error = { errors, status: 400 };
            return next(error);
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

export default verifyQuery;
