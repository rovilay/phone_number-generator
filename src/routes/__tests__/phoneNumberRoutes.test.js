/* eslint no-undef: 0 */
import fs from 'fs';
import request from 'supertest';
import { expect } from 'chai';

import app from '../../index';
import {
    apiPrefix, phoneNumberApiPrefix, maxPhoneNumberQty, phoneNumbersFilePath, notFoundMessage
} from '../../helpers/defaults';
import { writeToFile } from '../../helpers/utils';


describe('Phone number route', () => {
    const fileName = `${phoneNumbersFilePath}.txt`;
    afterAll((done) => {
        fs.unlink(fileName, (err) => {
            if (err) done(err);
        });

        done();
    });

    describe('Generate phone numbers', () => {
        it('should generate phone numbers', (done) => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}/generate`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const {
                        success, message, phoneNumbersList, totalNumbersAvailable
                    } = res.body;

                    expect(success).to.equal(true);
                    expect(message).to.equal('Phone numbers generated sucessfully');
                    expect(totalNumbersAvailable).to.equal(maxPhoneNumberQty);
                    expect(phoneNumbersList.length).to.equal(maxPhoneNumberQty);

                    done();
                });
        });

        it('should generate 5 phone numbers', (done) => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}/generate?qty=5&order=ascending`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const {
                        success, message, phoneNumbersList, totalNumbersAvailable
                    } = res.body;

                    expect(success).to.equal(true);
                    expect(message).to.equal('Phone numbers generated sucessfully');
                    expect(totalNumbersAvailable).to.equal(5);
                    expect(phoneNumbersList.length).to.equal(5);

                    done();
                });
        });

        it('should return error if query is invalid', (done) => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}/generate?qty=ghhgh&order=rrr`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const { success, error } = res.body;

                    expect(res.status).to.equal(400);
                    expect(success).to.equal(false);
                    expect(error.qty)
                        .to.equal(`qty must be a number and not more than ${maxPhoneNumberQty}`);
                    expect(error.order).to.equal('order must either be descending or ascending');

                    done();
                });
        });
    });

    describe('Fetch phone numbers', () => {
        const phoneNumberQty = 20;
        beforeAll(async () => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}/generate?qty=${phoneNumberQty}`;
            await request(app).get(url);
        });

        it('should fetch all phone numbers', (done) => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const {
                        success, message, phoneNumbersList, totalNumbersAvailable
                    } = res.body;

                    expect(res.status).to.equal(200);
                    expect(success).to.equal(true);
                    expect(message).to.equal('Phone numbers retrieved sucessfully');
                    expect(totalNumbersAvailable).to.equal(phoneNumberQty);
                    expect(phoneNumbersList.length).to.equal(phoneNumberQty);

                    done();
                });
        });

        it('should fetch 5 phone numbers', (done) => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}?qty=5`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const {
                        success, message, phoneNumbersList, totalNumbersAvailable
                    } = res.body;

                    expect(success).to.equal(true);
                    expect(message).to.equal('Phone numbers retrieved sucessfully');
                    expect(totalNumbersAvailable).to.equal(phoneNumberQty);
                    expect(phoneNumbersList.length).to.equal(5);

                    done();
                });
        });

        it('should return error if query or order is invalid', (done) => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}?qty=ghhgh&order=rrr`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const { success, error } = res.body;

                    expect(res.status).to.equal(400);
                    expect(success).to.equal(false);
                    expect(error.qty)
                        .to.equal(`qty must be a number and not more than ${maxPhoneNumberQty}`);
                    expect(error.order).to.equal('order must either be descending or ascending');

                    done();
                });
        });

        it('should return 404 if phone number is not found', async (done) => {
            await writeToFile('');

            const url = `${apiPrefix}${phoneNumberApiPrefix}`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const { success, error } = res.body;

                    expect(res.status).to.equal(404);
                    expect(success).to.equal(false);
                    expect(error).to.equal(notFoundMessage);

                    done();
                });
        });
    });

    describe('Get min and max phone numbers', () => {
        const phoneNumberQty = 20;
        beforeAll(async () => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}/generate?qty=${phoneNumberQty}`;
            await request(app).get(url);
        });

        it('should fetch all phone numbers', (done) => {
            const url = `${apiPrefix}${phoneNumberApiPrefix}/minmax`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const {
                        success, message, phoneNumbers, totalNumbersAvailable
                    } = res.body;

                    expect(res.status).to.equal(200);
                    expect(success).to.equal(true);
                    expect(message).to.equal('Min and Max Phone numbers retrieved sucessfully');
                    expect(totalNumbersAvailable).to.equal(phoneNumberQty);
                    expect(phoneNumbers).to.have.property('min');
                    expect(phoneNumbers).to.have.property('max');
                    expect(phoneNumbers.max > phoneNumbers.min).to.equal(true);
                    expect(phoneNumbers.max.length).to.equal(10);

                    done();
                });
        });

        it('should return 404 if phone number is not found', async (done) => {
            await writeToFile('');

            const url = `${apiPrefix}${phoneNumberApiPrefix}/minmax`;
            request(app)
                .get(url)
                .end((err, res) => {
                    if (err) done(err);

                    const { success, error } = res.body;

                    expect(res.status).to.equal(404);
                    expect(success).to.equal(false);
                    expect(error).to.equal(notFoundMessage);

                    done();
                });
        });
    });
});
