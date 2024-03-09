import db from '../models/index';
import patientService from '../services/patientService';

let handleBookAppointment = async (req, res) => {
    console.log('check postman data: ', req.body);
    try {
        let response = await patientService.BookAppointment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

module.exports = {
    handleBookAppointment: handleBookAppointment,
};
