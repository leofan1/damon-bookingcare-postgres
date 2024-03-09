import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let BookAppointment = (data) => {
    console.log('check postman data: ', data);
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.time || !data.dateTimestamp) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                    },
                });

                if (user && user[0]) {
                    await db.Booking.create({
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: user[0].id,
                        date: data.dateTimestamp,
                        timeType: data.time,
                    });
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save booking succeed!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    BookAppointment: BookAppointment,
};
