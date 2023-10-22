//액세스 토큰 발급 및 사용자 정보 요청

const axios = require("axios");

const CLIENT_ID = "695757edacbf01e55c4d269a9ff165ba"; // 테스트용 rest api => 수정 필요
const REDIRECT_URI = "https://localhost:3000/auth/kakao/callback"; //테스트용 redirect_uri => 수정 필요


const getToken = async(code) => {
    const grant_type = "authorization_code";
    try{
        const authToken = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`, 
            {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                },  
        }).then((res) => {
            return res;
        }).catch(err => {
            console.log(err);
        })
        const access_token = authToken.data.access_token; // 액세스 토큰
        return access_token; 

    } catch(e){
        console.error('Failed to get access token');
    }

    
};

const getInfo = async (access_token) => {
    try{
        const userInfo = axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                "Authorization": `Bearer ${access_token}`,
            },
        }).then((res)=>{                            
            const userArray = [res.data.id, res.data.properties.nickname]; //사용자 정보 [카카오 고유id, 이름] 리턴
            return userArray;     
        }).catch(err => {
            console.log(err);
        })

        const userArray = userInfo;
        
        return userArray;
        

    } catch(e) {
        console.error('Failed to get userInfo');
    }
    
};




module.exports = {
    getToken,
    getInfo
}