import express from 'express';

import PhoneNumberController from '../controllers/phoneNumber';
import { phoneNumberApiPrefix } from '../helpers/defaults';
import verifyQuery from '../middlewares/verifyQuery';

const musicRoutes = express.Router();

musicRoutes.get(`${phoneNumberApiPrefix}/generate`, verifyQuery,
    PhoneNumberController.getPhoneNumbers);


export default musicRoutes;
