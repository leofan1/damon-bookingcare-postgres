import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.Doctor_Infor,
                        attributes: ['addressClinic', 'nameClinic', 'nameSpecialty'],
                    },
                ],
                raw: true,
                nest: true,
            });

            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: db.Markdown,
                        attributes: ['contentHTML', 'contentMarkdown', 'discriptionHTML', 'discriptionMarkdown'],
                    },
                    {
                        model: db.Doctor_Infor,
                        attributes: [
                            'nameClinic',
                            'addressClinic',
                            'provinceId',
                            'priceId',
                            'specialtyId',
                            'nameSpecialty',
                        ],
                    },
                    {
                        model: db.Allcode,
                        as: 'positionData',
                        attributes: ['valueEn', 'valueVi'],
                    },
                ],
                raw: true,
                nest: true,
            });

            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!',
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'discriptionHTML', 'discriptionMarkdown'],
                        },
                        {
                            model: db.Doctor_Infor,
                            attributes: [
                                'specialtyId',
                                'clinicId',
                                'addressClinic',
                                'provinceId',

                                'priceId',
                                'paymentId',
                                'addressClinic',
                                'nameClinic',
                                'nameSpecialty',
                                'note',
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                    ],
                    raw: true,
                    nest: true,
                });

                if (!data) {
                    data = {};
                }

                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let saveDetailDoctorInfo = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inputData.doctorId ||
                !inputData.contentText ||
                !inputData.descText ||
                !inputData.price ||
                !inputData.payment ||
                !inputData.specialtyId ||
                !inputData.clinicId ||
                !inputData.clinicAddress ||
                !inputData.provinceId
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!',
                });
            } else {
                let doctorMarkdown = await db.Markdown.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false,
                });

                if (doctorMarkdown) {
                    doctorMarkdown.discriptionHTML = inputData.descHTML;
                    doctorMarkdown.discriptionMarkdown = inputData.descText;
                    doctorMarkdown.contentHTML = inputData.contentHTML;
                    doctorMarkdown.contentMarkdown = inputData.contentText;
                    await doctorMarkdown.save();
                } else {
                    await db.Markdown.create({
                        doctorId: inputData.doctorId,
                        discriptionHTML: inputData.descHTML,
                        discriptionMarkdown: inputData.descText,
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentText,
                    });
                }

                let doctor_booking = await db.Doctor_Infor.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false,
                });

                if (doctor_booking) {
                    doctor_booking.priceId = inputData.price;
                    doctor_booking.paymentId = inputData.payment;

                    doctor_booking.specialtyId = inputData.specialtyId;
                    doctor_booking.nameSpecialty = inputData.specialtyName;

                    doctor_booking.clinicId = inputData.clinicId;
                    doctor_booking.nameClinic = inputData.clinicName;

                    doctor_booking.provinceId = inputData.provinceId;
                    doctor_booking.addressClinic = inputData.clinicAddress;

                    doctor_booking.note = inputData.note;

                    await doctor_booking.save();
                } else {
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.price,
                        paymentId: inputData.payment,

                        specialtyId: inputData.specialtyId,
                        nameSpecialty: inputData.specialtyName,

                        clinicId: inputData.clinicId,
                        nameClinic: inputData.clinicName,
                        provinceId: inputData.provinceId,
                        addressClinic: inputData.clinicAddress,
                        note: inputData.note,
                    });
                }

                resolve({
                    errCode: 0,
                    Message: 'Lưu thông tin thành công!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let schedule = data.arrSchedule;
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date,
                    },
                    attributes: ['id', 'timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true,
                });

                if (schedule && schedule.length > 0) {
                    schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });

                    // convert date
                    if (existing && existing.length > 0) {
                        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                            return a.timeType === b.timeType && a.date === b.date;
                        });
                        let toDestroy = _.differenceWith(existing, schedule, (a, b) => {
                            return a.timeType === b.timeType && a.date === b.date;
                        });

                        if (toCreate) {
                            await db.Schedule.bulkCreate(toCreate);
                        }

                        if (toDestroy && toDestroy.length > 0) {
                            for (let i = 0; i < toDestroy.length; i++) {
                                await db.Schedule.destroy({
                                    where: {
                                        id: toDestroy[i].id,
                                    },
                                });
                            }
                        }

                        resolve({
                            errCode: 0,
                            Message: 'OK',
                        });
                    } else {
                        await db.Schedule.bulkCreate(schedule);
                        resolve({
                            errCode: 0,
                            Message: 'OK',
                        });
                    }
                } else {
                    if (existing && existing.length > 0) {
                        for (let i = 0; i < existing.length; i++) {
                            await db.Schedule.destroy({
                                where: { id: existing[i].id },
                            });
                        }

                        resolve({
                            errCode: 0,
                            Message: 'OK',
                        });
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getScheduleByDate = (inputDoctorId, inputDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputDoctorId || !inputDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: inputDoctorId,
                        date: inputDate,
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'timeTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                    ],
                    raw: true,
                    nest: true,
                });

                if (!dataSchedule) {
                    dataSchedule = [];
                }
                resolve({
                    errCode: 0,
                    data: dataSchedule,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getDetailDoctorById: getDetailDoctorById,
    getAllDoctors: getAllDoctors,
    saveDetailDoctorInfo: saveDetailDoctorInfo,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
};
