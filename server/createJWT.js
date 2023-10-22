const jwt = require("jsonwebtoken");
const fs = require('fs')

const userDao = require("./userDao");
const {getUserById} = require("./userDao");
const {signUp} = require("./userDao");

const data = fs.readFileSync('./jwt.json');
const conf = JSON.parse(data);
const jwt_secret = conf.key;

const createJWT = async(userArray) => {
    try{
        const userId = userArray[0];
        const userName = userArray[1];
        //회원 정보

        const user = await userDao.getUserById(userId);
        //기존 회원일 경우 회원정보 불러오기

        if(user=="null") {
            await userDao.signUp(userId, userName);
        } //신규 회원일 경우 정보 저장

        return jwt.sign({ userId: user }, jwt_secret);

    } catch(e) {
        console.error('Failed to create JWT');
    }
}

module.exports = {
    createJWT
}