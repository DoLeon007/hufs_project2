const axios = require("axios");


const CLIENT_ID = "695757edacbf01e55c4d269a9ff165ba";
const REDIRECT_URI = "https://localhost:3000/auth/kakao/callback";


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
        const access_token = authToken.data.access_token;
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
            const userArray = [res.data.id, res.data.properties.nickname];
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