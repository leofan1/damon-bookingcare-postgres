import { response } from 'express';
import db from '../models/index';
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'firstName', 'lastName', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!';
                    }
                }
                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in syntem`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['password'],
                },
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email  is already in used, Plz try another email',
                });
            } else {
                let passwordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: passwordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phoneNumber,
                    gender: data.gender,
                    positionId: data.degree,
                    roleId: data.role,
                    image: data.avatar,
                });
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let deleteUser = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`,
                });
            }

            await db.User.destroy({
                where: { email: userEmail },
            });

            resolve({
                errCode: 0,
                message: 'The user is deleted',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getUserByEmail = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });

            if (user) {
                resolve({
                    errCode: 0,
                    user: user,
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters',
                });
            }

            let user = await db.User.findOne({
                where: { email: data.email },
                raw: false,
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.gender = data.gender;
                user.positionId = data.degree;
                user.roleId = data.role;
                user.phonenumber = data.phoneNumber;
                user.image = data.avatar;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update user succeeds!',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User isn't found`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (typeInput === 'ALL') {
                res.data = await db.Allcode.findAll();
            } else {
                res.data = await db.Allcode.findAll({
                    where: { type: typeInput },
                });
            }
            res.errCode = 0;
            resolve(res);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    getUserByEmail: getUserByEmail,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getAllCodeService: getAllCodeService,
};
