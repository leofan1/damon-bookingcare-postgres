import db from '../models/index';
import specialtyService from '../services/specialtyService';

let handleCreateSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let handleGetSpecialties = async (req, res) => {
    try {
        let doctors = await specialtyService.getAllSpecialty(req.query.id);
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let handleDeleteSpecialty = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
        });
    } else {
        let response = await specialtyService.deleteSpecialty(req.body.id);
        return res.status(200).json(response);
    }
};

module.exports = {
    handleCreateSpecialty: handleCreateSpecialty,
    handleGetSpecialties: handleGetSpecialties,
    handleDeleteSpecialty: handleDeleteSpecialty,
};
