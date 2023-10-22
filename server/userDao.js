const axios = require("axios");
//kakao 로그인 -> 유저 리스트 확인
const getUserById = async (u_id) => {
    try{
        const res = await axios.get('http://192.168.45.129:4000/auth/info', {
            params: {
                'user_id': u_id
            }
        })
        const userId = res.data.result;
        console.log(userId);

        if(userId==""){
            console.log("user id is not exists")
            return "null"
        } else{
            return userId
        }

    } catch(e) {
        console.error(e)
    }
    //return await connection.query(
        //`SELECT u_id FROM hufs.user WHERE u_id=?`,
        //[u_id]
    //);
}

//kakao 로그인 -> 유저 추가
const signUp = async (u_id, u_name) => {
    console.log(u_id, u_name);
    try{
        const req = await axios.post('http://192.168.45.129:4000/auth/info', {
            user_id: u_id,
            user_name: u_name,
        }).then((response)=>{
            console.log(response.data);
        }).catch((err)=>{
            console.log(err)
        })
        return req.data.result;
        
    } catch(e){
        console.error('Failed to sign up');
    }

}

module.exports = {
    getUserById,
    signUp
}
