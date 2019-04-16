import { writeFile } from 'fs';

import { fileEncoding, phoneNumbersFilePath } from './defaults';

export const getRandomRangeNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const writeToFile = async (content) => {
    const fileName = `${phoneNumbersFilePath}.txt`;
    await writeFile(fileName, content, fileEncoding, error => error);

    // return error;
};
export const sorter = (arrayOfValues, order) => {
    const compareFunction = (firstValue, secondValue) => {
        let compared = secondValue < firstValue;
        if (order === 'descending') {
            compared = firstValue < secondValue;
        }

        return compared;
    };

    const sortedArray = [...arrayOfValues].sort(compareFunction);
    return sortedArray;
};
