import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    provinceId: data.provinceId,
                    provinceName: data.provinceName,
                    image: data.image,
                    descriptionHTML: data.descHTML,
                    descriptionMarkdown: data.descMarkdown,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Save clinic succeed!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics = await db.Clinic.findAll({
                raw: true,
                nest: true,
            });

            if (clinics.length > 0) {
                clinics.map((item, index) => {
                    item.image = `${item.image}`;
                });
            }

            resolve({
                errCode: 0,
                data: clinics,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
};
