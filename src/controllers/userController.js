import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log('===Check email====')
    console.log(email);
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!',
        });
    } else {
        let userData = await userService.handleUserLogin(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        });
    }
};

let handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsers();
    if (users) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users,
        });
    } else {
        return {
            errCode: 1,
            errMessage: 'Mistake from server',
        };
    }
};

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    if (!req.body.email) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
        });
    } else {
        let response = await userService.deleteUser(req.body.email);
        return res.status(200).json(response);
    }
};

let handleGetUserByEmail = async (req, res) => {
    let email = req.query.email;
    let user = await userService.getUserByEmail(email);
    return res.status(200).json(user);
};

let handleUpDateUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
};

let handleGetAllCode = async (req, res) => {
    try {
        let type = req.query.type;
        let data = await userService.getAllCodeService(type);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleGetAllCode: handleGetAllCode,
    handleGetUserByEmail: handleGetUserByEmail,
    handleUpDateUser: handleUpDateUser,
};
