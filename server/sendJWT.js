const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {getToken} = require("./getUserToken");
const {getInfo} = require("./getUserToken");
const {createJWT} = require("./createJWT");

const app = express();
const port = process.env.port || 8000;

app.use(bodyParser.json());
app.use(cors({
  origin: "*", 
  credentials: true,
  optionSuccessStatus: 200,
}));

app.post("/auth", async (req, res, next) => {
    console.log('Code sent from client to server:', req.body);
    try{
        const { code } = req.body; //인가코드
        const access_token = await getToken(code); //액세스토큰
        console.log('Access Token:', access_token);

        const userArray = await getInfo(access_token); //JWT
        console.log('User Info:', userArray);

        const userJWT = await createJWT(userArray);
        console.log('JWT:', userJWT);

        return res.status(200).json(userJWT) //로그인 페이지로 jwt 리턴
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