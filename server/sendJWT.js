const express = require("express");
const axios = require("axios");
const {getToken} = require("./getUserToken");
const {createJWT} = require("./getUserToken")

app.post("/user", async (req, res, next) => {
    console.log("get code");
    try{
        const {code} = req.body;
        const {accessToken} = await getToken(code);
        const userJWT = await createJWT(accessToken);

        res.status(200).json(userJWT)
    } catch(e) {
        console.error(e);

        const errorData = {
            message: "Internal server error",
        };
        res.status(500).json(errorData);
        
    }
});