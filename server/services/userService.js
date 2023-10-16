const {getUserById} = require("../server");
const {signUp} = require("../server");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const express = require("express");
const fs = require('fs')

const creatJWT = async (accessToken) => {
    try{
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
        const userJWT = jwt.sign({kakao_id: user}, process.env.JWTSECRET);
        return res.status(200).json({userJWT: userJWT});

    } catch(e) {
        console.error('Failed to get access token and create JWT');
    }
    
};


const sendJWTtoServer = async (userJWT) => {
    try {
        const response = await fetch('http://localhost:4000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userJWT }),
        });
        
        if (response.ok) {
            console.log('success(sending jwt)');
        } else {
            console.error('Fail(sending jwt)');
        }
    } catch (error) {
        console.error('Error sending JWT to the server:', error);
        }
};



//사용자 정보 요청 후 jwt 토큰 발급
//db에 없는 카카오 id일 경우 Dao로 넘김
module.exports = {
    creatJWT, sendJWTtoServer
}