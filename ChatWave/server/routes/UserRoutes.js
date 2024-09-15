const express = require("express");
const router = express.Router();
const {userRegister ,userLogin, getUser, getUsers} = require("../controller/UserController")

router
    .post('/register', userRegister)
    .post('/login',  userLogin)
    .get('/find/:userId',getUser)
    .get('/',getUsers);

exports.router = router;