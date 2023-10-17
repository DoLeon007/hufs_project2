const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {getToken} = require("./getUserToken");
const {createJWT} = require("./getUserToken");

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}));


app.post("/user", async (req, res, next) => {
    console.log("get code");
    try{
        const {code} = req.body; //인가코드
        const {accessToken} = await getToken(code); //액세스토큰
        const userJWT = await createJWT(accessToken); //JWT

        res.status(200).json(userJWT) //로그인 페이지로 jwt 리턴
    } catch(e) {
        console.error(e);

        const errorData = {
            message: "Internal server error",
        };
        res.status(500).json(errorData);       
    }
});
