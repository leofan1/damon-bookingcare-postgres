import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name && !data.descriptionMarkdown && !data.image) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                if (data.id) {
                    let spe = await db.Specialty.findOne({
                        where: { id: data.id },
                        raw: false,
                    });
                    if (spe) {
                        spe.name = data.name;
                        spe.image = data.image;
                        spe.descriptionHTML = data.descHTML;
                        spe.descriptionMarkdown = data.descMarkdown;
                        await spe.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'Cập nhật chuyên khoa thành công!',
                        });
                    }
                } else {
                    await db.Specialty.create({
                        name: data.name,
                        image: data.image,
                        descriptionHTML: data.descHTML,
                        descriptionMarkdown: data.descMarkdown,
                    });

                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo mới chuyên khoa thành công!',
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

let deleteSpecialty = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let spe = await db.Specialty.findOne({
                where: { id: inputId },
            });

            if (!spe) {
                resolve({
                    errCode: 2,
                    errMessage: `Chuyên khoa không tồn tại`,
                });
            } else {
                await db.Specialty.destroy({
                    where: { id: inputId },
                });

                resolve({
                    errCode: 0,
                    message: 'Xóa chuyên khoa thành công!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllSpecialty = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputId !== 'ALL') {
                let specialty = await db.Specialty.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ['clinicId'],
                    },
                    raw: true,
                    nest: true,
                });

                if (specialty) {
                    specialty.image = `${specialty.image}`;
                }

                resolve({
                    errCode: 0,
                    data: specialty,
                });
            } else if (inputId === 'ALL') {
                let specialties = await db.Specialty.findAll({
                    attributes: {
                        exclude: ['clinicId'],
                    },
                    raw: true,
                    nest: true,
                });

                if (specialties.length > 0) {
                    specialties.map((item) => {
                        item.image = `${item.image}`;
                    });
                }
                resolve({
                    errCode: 0,
                    data: specialties,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    deleteSpecialty: deleteSpecialty,
};
