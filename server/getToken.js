const express = require("express");
const axios = require("axios");
const {CLIENT_ID} = require("../screens/KakaoWebView");
const {REDIRECT_URI} = require("../screens/KakaoWebView");
const {userService} = require("../services/userService");

app.get('/auth/kakao/signin', async(req, res) => {
    const code = req.body;
    console.log("code: ", code);
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
        console.log("accessToken: ", accessToken)
        const kakaoToken = await userService.creatJWT(accessToken);
        return res.status(200).json({kakaoToken: kakaoToken});

    } catch(e){
        console.error(e);
    }    
    
}
)

//받아온 토큰 서비스단으로 넘기기

module.exports = {
    creatJWT
}
