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

        const token = authToken.data;

        const accessToken = authToken.data.access_token;
        //액세스토큰 발급
        
        //const refreshToken = authToken.data.refresh_token;
        

        return res.status(200).json({accessToken: accessToken}); 
        //액세스토큰 리턴

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
        const name = data.kakao_acount.name;
        //const kakaoId = data.id;
        //회원 정보
    
        if (!name) throw new error("KEY_ERROR", 400);

        const user = await getUserById(name);
        //기존 회원일 경우 회원정보 불러오기

        if(!user) {
            await signUp(name);
        } //신규 회원일 경우 정보 저장

        const userJWT = jwt.sign({name: user}, process.env.JWTSECRET);
        return res.status(200).json({userJWT: userJWT});
        //jwt 발급 후 리턴

    } catch(e) {
        console.error('Failed to create JWT');
    }
    
};


module.exports = {
    getToken,
    createJWT
}
