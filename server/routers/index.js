const express = require("express");
const router = express.Router();

const userRouter = require("./userRouters");

router.use("/auth", userRouter)
//엔드포인트

module.exports = router