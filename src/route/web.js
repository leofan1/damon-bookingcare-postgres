import express from 'express';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/get-user-by-email', userController.handleGetUserByEmail);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/update-user', userController.handleUpDateUser);
    router.get('/api/get-allcode', userController.handleGetAllCode);

    router.get('/api/top-doctor-home', doctorController.handleGetTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.handleGetAllDoctors);
    router.post('/api/save-info-doctors', doctorController.handleSaveInfoDoctors);

    router.get('/api/get-detail-doctor-by-id', doctorController.handleGetDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.handleBulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.handleGetScheduleByDate);

    router.post('/api/patient-book-appointment', patientController.handleBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.handleCreateSpecialty);
    router.get('/api/get-all-specialties', specialtyController.handleGetSpecialties);
    router.delete('/api/delete-specialty', specialtyController.handleDeleteSpecialty);

    router.post('/api/create-new-clinic', clinicController.handleCreateClinic);
    router.get('/api/get-all-clinics', clinicController.handleGetAllClinic);

    return app.use('/', router);
};

module.exports = initWebRoutes;
