const {getUserById} = require("../server");
const {signUp} = require("../server");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const express = require("express");

const signInKakao = async (accessToken) => {
    const result = await axios.getAdapter("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const {data} = result
    const name = data.properties.nickname;
    const kakaoId = data.id;
    
    if (!name || !kakaoId) throw new error("KEY_ERROR", 400);

    const user = await getUserById(kakaoId);

    if(!user) {
        await signUp(name, kakaoId);
    }

    return jwt.sign({kakao_id: user[0].kakao_id}, process.env.TOKENSECRET);
};
//사용자 정보 요청 후 jwt 토큰 발급
//db에 없는 카카오 id일 경우 Dao로 넘김
module.exports = {
    signInKakao
}