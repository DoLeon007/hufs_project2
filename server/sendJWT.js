// KakaoWebView.js sendCodeToServer => jwt 리턴

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {getToken} = require("./getUserToken");
const {getInfo} = require("./getUserToken");
const {createJWT} = require("./createJWT");

const app = express();
const port = process.env.port || 8000; //카카오 auth 전용 포트

app.use(bodyParser.json());
app.use(cors({
  origin: "*", 
  credentials: true,
  optionSuccessStatus: 200,
}));

app.post("/auth", async (req, res, next) => { //카카오 auth api: http://localhost:8000/auth
    console.log('Code sent from client to server:', req.body);
    try{
        const { code } = req.body; //인가코드
        const access_token = await getToken(code); //액세스토큰 발급 함수 호출
        console.log('Access Token:', access_token);

        const userArray = await getInfo(access_token); //사용자 정보 요청 함수 호출
        console.log('User Info:', userArray);

        const userJWT = await createJWT(userArray); //JWT 생성 함수 호출
        console.log('JWT:', userJWT);

        return res.status(200).json(userJWT) // jwt 리턴 => KakaoWebView.js sendCodeToServer (res)
    } catch(e) {
        console.error(e);

        const errorData = {
            message: "Internal server error",
        };
        return res.status(500).json(errorData);       
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});