import express from 'express';

import PhoneNumberController from '../controllers/phoneNumber';
import { phoneNumberApiPrefix } from '../helpers/defaults';
import verifyQuery from '../middlewares/verifyQuery';

const phoneNumberRoutes = express.Router();

phoneNumberRoutes.get(`${phoneNumberApiPrefix}/generate`, verifyQuery,
    PhoneNumberController.getPhoneNumbers);


export default phoneNumberRoutes;
