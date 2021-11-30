const express = require('express');
const ApiRouter = express.Router();
const axios = require('axios');
var url ="https://demo1.hxgnsmartbuild.com/api/tenant/projects/";

// const axiosInstance = axios.create({
//     baseURL: 'https://demo1.hxgnsmartbuild.com/api'
//     //headers: { 'X-Auth-Token' : '<some-token>'}
// });

ApiRouter.route('/projects')
    .get((req, res, next) => {
    console.log("Inside tenant api call");
    axios.get(url,{headers: {"active-role": "788db0e7-c1d3-4944-a405-418673d21e41",
    "logged-in-user": "4f9e5810-edc4-4b8c-a9c0-a95b1886389f",
    "Cookie": "truview.mode=grab; user_origin=8de5427f-eee9-4f03-a2a9-5b309b69bd00; express:sess=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNmVkNGNmZjctNzIyMi00NmU4LWFlYmYtZTFjYTI0YTg2YTQ4In19; express:sess.sig=eFYlR3B85RS73OC_UV5LoxSVW3M"}})
    .then(response =>{
        console.log("print response");
        console.log(response.data);
        res.send(response.data)
    }).catch(err =>{
        console.log("print error");
        res.send(err.message)
    })
});
ApiRouter.route('/tenants')
    .get((req, res, next) => {
    console.log("Inside tenant api call");
    axios.get('https://demo1.hxgnsmartbuild.com/api/tenant/',{headers: {"active-role": "788db0e7-c1d3-4944-a405-418673d21e41",
    "logged-in-user": "4f9e5810-edc4-4b8c-a9c0-a95b1886389f",
    "Cookie": "truview.mode=grab; user_origin=8de5427f-eee9-4f03-a2a9-5b309b69bd00; express:sess=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNmVkNGNmZjctNzIyMi00NmU4LWFlYmYtZTFjYTI0YTg2YTQ4In19; express:sess.sig=eFYlR3B85RS73OC_UV5LoxSVW3M"}})
    .then(response =>{
        console.log("print response");
        let result = response.data
        console.log(result['object']);
        result = result['object']
        res.send(result)
    }).catch(err =>{
        console.log("print error");
        res.send(err.message)
    })
});
ApiRouter.route('/schedule/:projName')
    .get((req, res, next) => {
    console.log("Inside schedule api call");
    console.log(req.params.projName);
    let url = "https://demo1.hxgnsmartbuild.com/api/hxsb/v1/tenants('732882b4-a9e0-4b98-9fb6-233401c7e066')/projects('"+req.params.projName+"')/schedule?$expand=WBSChildren($expand=WBSChildren($expand=WBSChildren,WorkPackages($expand=WorkSteps)))";
    console.log(url);
    axios.get(url,{headers: {"active-role": "788db0e7-c1d3-4944-a405-418673d21e41",
    "logged-in-user": "4f9e5810-edc4-4b8c-a9c0-a95b1886389f",
    "Cookie": "truview.mode=grab; user_origin=8de5427f-eee9-4f03-a2a9-5b309b69bd00; express:sess=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNmVkNGNmZjctNzIyMi00NmU4LWFlYmYtZTFjYTI0YTg2YTQ4In19; express:sess.sig=eFYlR3B85RS73OC_UV5LoxSVW3M"}})
    .then(response =>{
        console.log("print response");
        let result = response.data
        result = result['value']
        //console.log(result);
        result = result[0]
        //console.log(result);
        res.send(result)
    }).catch(err =>{
        console.log("print error");
        res.send(err.message)
    })
});

ApiRouter.route('/cost/:projName')
    .get((req, res, next) => {
    console.log("Inside cost api call");
    console.log(req.params.projName);
    let url0 = "https://demo1.hxgnsmartbuild.com/api/services/externalsystems/estimation/projects("+req.params.projName+")/rootcostitem";
    //console.log(url0);
    axios.get(url0,{headers: {"active-role": "788db0e7-c1d3-4944-a405-418673d21e41",
    "logged-in-user": "4f9e5810-edc4-4b8c-a9c0-a95b1886389f",
    "Cookie": "truview.mode=grab; user_origin=8de5427f-eee9-4f03-a2a9-5b309b69bd00; express:sess=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNmVkNGNmZjctNzIyMi00NmU4LWFlYmYtZTFjYTI0YTg2YTQ4In19; express:sess.sig=eFYlR3B85RS73OC_UV5LoxSVW3M"}})
    .then(response =>{
        console.log("print response");
        //console.log(response)
        let result = response.data
        //console.log("data");
        //console.log(result)
        // result = result['value']
        // console.log(result);
        //result = result[0]
        //console.log(result);
        res.send(result)
    }).catch(err =>{
        console.log("print error");
        res.send(err.message)
    })
});

ApiRouter.route('/costItems/:str')
    .get((req, res, next) => {
    console.log("Inside cost api call");
    console.log(req.params.str);
    let arr = req.params.str.split(":");
    console.log(arr)
    let url0 = "https://demo1.hxgnsmartbuild.com/api/services/externalsystems/estimation/projects("+arr[0]+")/costitems("+arr[1]+")/";
    //console.log(url0);
    axios.get(url0,{headers: {"active-role": "788db0e7-c1d3-4944-a405-418673d21e41",
    "logged-in-user": "4f9e5810-edc4-4b8c-a9c0-a95b1886389f",
    "Cookie": "truview.mode=grab; user_origin=8de5427f-eee9-4f03-a2a9-5b309b69bd00; express:sess=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNmVkNGNmZjctNzIyMi00NmU4LWFlYmYtZTFjYTI0YTg2YTQ4In19; express:sess.sig=eFYlR3B85RS73OC_UV5LoxSVW3M"}})
    .then(response =>{
        console.log("print response");
        //console.log(response)
        let result = response.data
        console.log("costItem data");
        //console.log(result)
        // result = result['value']
        // console.log(result);
        //result = result[0]
        //console.log(result);
        res.send(result)
    }).catch(err =>{
        console.log("print error");
        res.send(err.message)
    })
});

module.exports = ApiRouter;