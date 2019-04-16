import express from 'express';

import PhoneNumberController from '../controllers/phoneNumber';
import { phoneNumberApiPrefix } from '../helpers/defaults';
import verifyQuery from '../middlewares/verifyQuery';

const phoneNumberRoutes = express.Router();

phoneNumberRoutes.get(`${phoneNumberApiPrefix}`, verifyQuery,
    PhoneNumberController.getPhoneNumbers);

phoneNumberRoutes.get(`${phoneNumberApiPrefix}/generate`, verifyQuery,
    PhoneNumberController.generatePhoneNumbers);

phoneNumberRoutes.get(`${phoneNumberApiPrefix}/minmax`,
    PhoneNumberController.getMinMaxPhoneNumbers);


export default phoneNumberRoutes;
