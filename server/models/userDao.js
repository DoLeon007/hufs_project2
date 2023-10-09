const connection = require("../server")
const fs = require('fs')

const getUserById = async(kakaoId) => {
    return await connection.query(
        "SELECT u_id, u_name FROM hufs.users WHERE u_id=?",
        [kakaoId]
    );
}

const signUp = async (kakaoId, name) => {
    return await connection.query(
        "INSERT INTO hufs.users(u_id, u_name) VALUES(?, ?)",
        [kakaoId, name]
    );
}

module.exports = {
    getUserById,
    signUp
}