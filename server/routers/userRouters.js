const express = require("express");
const router = express.Router();
const {userController} = require("../controllers/userController");
const {signInKakao} = require("../controllers/userController");
router.post('/kakao/signin', signInKakao)
//엔드포인트

module.exports = router
