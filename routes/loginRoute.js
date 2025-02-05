const express = require('express');
const LoginController = require('../controller/loginController');

const Login = (model) => {
    const router = express.Router();
    const loginController = new LoginController(model);

    router.post('/', loginController.login);

    return router;
};

module.exports = Login;
