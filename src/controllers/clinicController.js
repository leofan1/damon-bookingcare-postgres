import db from '../models/index';
import clinicService from '../services/clinicService';

let handleCreateClinic = async (req, res) => {
    try {
        let response = await clinicService.createClinic(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let handleGetAllClinic = async (req, res) => {
    try {
        let clinics = await clinicService.getAllClinic();
        return res.status(200).json(clinics);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

module.exports = {
    handleCreateClinic: handleCreateClinic,
    handleGetAllClinic: handleGetAllClinic,
};
