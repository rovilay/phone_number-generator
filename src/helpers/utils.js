import { writeFile } from 'fs';

import { fileEncoding, phoneNumbersFilePath } from './defaults';

export const getRandomRangeNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const writeToFile = async (content) => {
    const fileName = `${phoneNumbersFilePath}.txt`;
    await writeFile(fileName, content, fileEncoding, error => error);
};
export const sorter = (arrayOfValues, order) => {
    let sortedArray;

    if (order === 'descending') {
        sortedArray = [...arrayOfValues].sort().reverse();
    } else {
        sortedArray = [...arrayOfValues].sort();
    }

    return sortedArray;
};
