const express = require("express");
const router = express.Router();

const userController = require("../controller/usercontroller");

const democontroller = require("../controller/democontroller");

router.post('/adduser', userController.create_user);

router.post('/tokenuser', userController.user_login);

router.post('/demoadd', democontroller.create_demo);

router.post('/demologin', democontroller.demo_login);
 
module.exports = router;