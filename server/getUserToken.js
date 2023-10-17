const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const fs = require('fs')

const {CLIENT_ID} = require("../screens/KakaoWebView");
const {REDIRECT_URI} = require("../screens/KakaoWebView");

const {getUserById} = require("../server");
const {signUp} = require("../server");

const getToken = async(code) => {
    try{
        const authToken = await axios.post('https://kauth.kakao.com/oauth/token', {}, {
            headers: {
                "Content-Type": "application/json"
            },
        params:{
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            code,
            redirect_uri: REDIRECT_URI
        }
        })

        const accessToken = authToken.data.accessToken;
        
        return res.status(200).json({accessToken: accessToken}); 

    } catch(e){
        console.error('Failed to get access token');
    }
};

const createJWT = async (accessToken) => {
    try{
        const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
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
        console.error('Failed to create JWT');
    }
    
};


module.exports = {
    getToken,
    createJWT
}
