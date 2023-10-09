const {userService} = require("../services/userService");

const signInKakao = async (req, res) => {
    //const headers = req.headers["authorization"];
    //const kakaoToken = headers.split(" ")[1];
    const kakaoToken = "Ldb7QXWrCoKIlHNREQu2pqHRPdleyndU0R9bSSf_Cj11GQAAAYsOiEZ_";
    const accessToken = await userService.signInKakao(kakaoToken);

    return res.status(200).json({accessToken: accessToken});

};
//받아온 토큰 서비스단으로 넘기기

module.exports = {
    signInKakao
}