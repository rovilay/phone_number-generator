import {
    maxPhoneNumberQty, minPhoneNumberLength, maxPhoneNumberLength,
    genericErrorMessage
} from '../helpers/defaults';
import { getRandomRangeNumber, writeToFile, sorter } from '../helpers/utils';

class PhoneNumberController {
    static generateNumber(min, max) {
        const randomNumber = getRandomRangeNumber(min, max);
        const phoneNumber = `0${randomNumber}`;
        return phoneNumber;
    }

    static async generatePhoneNumbersToFile(quantityToGenerate, order) {
        try {
            const phoneNumbersList = [];

            while (phoneNumbersList.length < quantityToGenerate) {
                const phoneNumber = PhoneNumberController
                    .generateNumber(minPhoneNumberLength, maxPhoneNumberLength);

                if (!phoneNumbersList.includes(phoneNumber)) {
                    phoneNumbersList.push(phoneNumber);
                }
            }

            const sortedPhoneNumbersList = sorter(phoneNumbersList, order);

            const error = await writeToFile(sortedPhoneNumbersList.toString());

            if (error) {
                throw Error(genericErrorMessage);
            }

            return { phoneNumbersList: sortedPhoneNumbersList };
        } catch (error) {
            return { error };
        }
    }

    static async getPhoneNumbers(req, res, next) {
        try {
            const { qty, order } = req.query;
            const quantityToGenerate = qty || maxPhoneNumberQty;
            const { phoneNumbersList, error } = await PhoneNumberController
                .generatePhoneNumbersToFile(quantityToGenerate, order);

            if (error) {
                throw error;
            }

            return res.status(200).json({
                success: true,
                message: 'Phone numbers retrieved sucessfully',
                phoneNumbersList
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default PhoneNumberController;
