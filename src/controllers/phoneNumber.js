import fs from 'fs';

import {
    maxPhoneNumberQty, minPhoneNumberLength, maxPhoneNumberLength,
    genericErrorMessage, phoneNumbersFilePath, fileEncoding, notFoundMessage
} from '../helpers/defaults';
import { getRandomRangeNumber, writeToFile, sorter } from '../helpers/utils';

const filePath = `${phoneNumbersFilePath}.txt`;

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

    static async generatePhoneNumbers(req, res, next) {
        try {
            const { qty, order } = req.query;
            const quantityToGenerate = qty || maxPhoneNumberQty;
            const { phoneNumbersList, error } = await PhoneNumberController
                .generatePhoneNumbersToFile(quantityToGenerate, order);

            if (error) {
                throw error;
            }

            return res.status(201).json({
                success: true,
                message: 'Phone numbers generated sucessfully',
                phoneNumbersList,
                totalNumbersAvailable: quantityToGenerate
            });
        } catch (error) {
            return next(error);
        }
    }

    static async getPhoneNumbers(req, res, next) {
        try {
            const { qty, order } = req.query;
            const phoneNumbers = fs.readFileSync(filePath, { encoding: fileEncoding });
            let phoneNumbersList = phoneNumbers === '' ? [] : phoneNumbers.split(',');
            const totalNumbersAvailable = phoneNumbersList.length;

            if (!totalNumbersAvailable) {
                const error = {
                    status: 404,
                    message: notFoundMessage
                };

                throw error;
            }

            if (qty) {
                phoneNumbersList.splice(qty);
            }

            if (order) {
                phoneNumbersList = sorter(phoneNumbersList, order);
            }

            return res.status(200).json({
                success: true,
                message: 'Phone numbers retrieved sucessfully',
                phoneNumbersList,
                totalNumbersAvailable
            });
        } catch (error) {
            return next(error);
        }
    }

    static async getMinMaxPhoneNumbers(req, res, next) {
        try {
            const phoneNumbers = fs.readFileSync(filePath, { encoding: fileEncoding });
            const phoneNumbersList = phoneNumbers === '' ? [] : phoneNumbers.split(',');
            const totalNumbersAvailable = phoneNumbersList.length;

            if (!totalNumbersAvailable) {
                const error = {
                    status: 404,
                    message: notFoundMessage
                };

                throw error;
            }

            const min = Math.min(...phoneNumbersList);
            const max = Math.max(...phoneNumbersList);

            return res.status(200).json({
                success: true,
                message: 'Min and Max Phone numbers retrieved sucessfully',
                phoneNumbers: {
                    min: `0${min}`,
                    max: `0${max}`,
                },
                totalNumbersAvailable
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default PhoneNumberController;
