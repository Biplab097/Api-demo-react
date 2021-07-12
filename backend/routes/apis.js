const express = require('express');
const ApiRouter = express.Router();
const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://demo1.hxgnsmartbuild.com/api'
    //headers: { 'X-Auth-Token' : '<some-token>'}
});

ApiRouter.get('/tenant', async(req, res, next) => {
    console.log("Inside tenant api call");
    axios.get('https://demo1.hxgnsmartbuild.com/api/tenant')
    .then(response =>{
        console.log("print response");
        console.log(response);
        res.send(response.data)
    }).catch(err =>{
        console.log("print error");
        res.send(err.message)
    })
})

module.exports = ApiRouter;