//const {userDao} = require("../models/userDao");
const {userDao} = require("../server");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const signInKakao = async (kakaoToken) => {
    const result = await axios.getAdapter("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    });
    const {data} = result
    const name = data.properties.nickname;
    const kakaoId = data.id;
    
    if (!name || !kakaoId) throw new error("KEY_ERROR", 400);

    const user = await userDao.getUserById(kakaoId);

    if(!user) {
        await userDao.signUp(name, kakaoId);
    }

    return jwt.sign({kakao_id: user[0].kakao_id}, process.env.TOKENSECRET);
};
//사용자 정보 요청 후 jwt 토큰 발급
//db에 없는 카카오 id일 경우 Dao로 넘김
module.exports = {
    signInKakao
}