import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './main.css';

import FileSaver from 'file-saver';

import XLSX from 'xlsx';
import { waitFor } from '@testing-library/dom';
//import { stack } from '../../backend/routes/apis';

//redux
import { useSelector, useDispatch} from 'react-redux';
import { addToList, emptyList } from '../actions';

var last = [];
var root = [];
var projId = "";
var rootUid = "";
var final1 = []


class Stack {

    constructor()
    {
        this.items = [];
    }
    push(element)
    {
        this.items.push(element);
    }
    pop()
    {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    peek()
    {
        return this.items[this.items.length - 1];
    }
    isEmpty()
    {
        return this.items.length == 0;
    }
}

var stack = new Stack()



function copyObjectProps(source, keys,level) {
    let newObject = {}
    keys.forEach(function(key) {
      newObject[key] = source[key]
    })
    let pre = ""
    for(let i=0;i<level;i++){
        pre = pre+"-------";
    }

    newObject["description"] = pre+newObject["description"]

    return newObject
 }

 const checkData=(uid,level)=>{
    let str1 = projId+":"+uid
    axios.get("https://back-end-smart-build-api.azurewebsites.net/"+str1)
    .then((res)=>{
        let response = res.data;
        console.log(last)
        if(response.length==0) return false;

        for(let i=0;i<response.length;i++){
            stack.push(response[i]["uid"]+":"+level+1)
        }

        //console.log(roots)

        //let finData = processCost(res.data)
    

    })
    .catch((err) =>{
        //console.log(err)
    })


 }

 function getData(str,level){
     let response;
     
     axios.get("https://back-end-smart-build-api.azurewebsites.net/costItems/"+str)
     .then((res)=>{
         response = res.data;
         console.log(last)
 
         for(let i=0;i<response.length;i++){
             console.log("coming in stack push child");
             stack.push(response[i]["uid"]+":"+level+1)
         }

         return response;
 
 
         //console.log(roots)
 
         //let finData = processCost(res.data)
         
 
     })
     .catch((err) =>{
         //console.log(err)
     })
 }

 const dataDfs=(level)=>{
    console.log("peek");
    console.log(stack);
    let uidCurr = stack.peek().split(":")[0]
    stack.pop();
    let str = projId+":"+uidCurr
    let response = getData(str,level);
    setTimeout(() => { console.log("response " + response); }, 40000);
    
    // axios.get("http://localhost:5000/costItems/"+str)
    // .then((res)=>{
    //     response = res.data;
    //     console.log(last)

    //     for(let i=0;i<response.length;i++){
    //         console.log("coming in stack push child");
    //         stack.push(response[i]["uid"]+":"+level+1)
    //     }


    //     //console.log(roots)

    //     //let finData = processCost(res.data)
        

    // })
    // .catch((err) =>{
    //     //console.log(err)
    // })

    level = level+1;
    console.log("Coming " + level);
    console.log(stack);

    while(!stack.isEmpty()){
        console.log("Coming in while");
        let curr = stack.pop()
        let currLvl = curr.split(":")[1]
        let uid = curr.split(":")[0]

        console.log("Checking 2nd Level" + currLvl);

        
        
        if(checkData(uid,currLvl)){

        }

        
        //let modified = copyObjectProps(,filter,level);
        //last.push(modified)

    }





    // for(let i=0;i<roots.length;i++){

    // }

 }


async function processCost(data,level){

    console.log("data in process")   // ["root1"]
    console.log(data);
    console.log(data[0]["uid"]+":"+level);
    console.log("before push ",stack);
    stack.push(data[0]["uid"]+":"+level);
    console.log("after push ",stack);
    // for(let i=0;i<data.length;i++){
    //     console.log("inside push loop");
    //     console.log(data[i]["uid"]);
    //     roots.push(data[i]["uid"]);
    // }

    console.log(stack);

    const filter = ["description","external_system_id","total_cost","cpi","spi","quantity","unit_cost","uom_name"];
    
    
    let modified = copyObjectProps(data[0],filter,level);
    last.push(modified)
    

    dataDfs(0);
    return last;

    

    // let str = projId+":"+roots[0]

    // axios.get("http://localhost:5000/costItems/"+str)
    // .then((res)=>{
    //     console.log("getting cost items "+str);
    //     console.log(res.data);
    //     let response = res.data;
    //     console.log(last)

    //     for(let i=0;i<response.length;i++){
    //         roots.push(response[i]["uid"]);
    //     }

    //     console.log(roots)

    //     //let finData = processCost(res.data)
        

    // })
    // .catch((err) =>{
    //     //console.log(err)
    // })

    // stack.push()

    // dataDfs();

}

// function childCost(Uid,level){
//     let str1="";
//     if(Uid!=null)str1 = projId+":"+Uid
//     else return;

//     return axios.get("http://localhost:5000/costItems/"+str1)
//     .then((res)=>{

//         console.log("Inside child cost ",res.data.length);
//         for(let i=0;i<res.data.length;i++){
//             //console.log(i+" "+"item");
//             //console.log("current root "+root);
//             let uid = res.data[i]["uid"]
//             //console.log("child UID ",uid);

//             const filter = ["description","external_system_id","total_cost","cpi","spi","quantity","unit_cost","uom_name"];
//             let modified = copyObjectProps(res.data[i],filter,level);
//             root.push(modified);

//             if(uid!=null && uid!="")childCost(uid,level+1);
//         }

//     })
//     .catch((err)=>{
//         console.log(err);
//         return;
//     })


// }




// async function rootCost(Uid){

//     return axios.get("http://localhost:5000/cost/"+Uid)
//     .then((res)=>{
//         console.log("inside root cost ",res.data);

//         rootUid = res.data[0]["uid"]

//         console.log("root UID ",rootUid);

//         const filter = ["description","external_system_id","total_cost","cpi","spi","quantity","unit_cost","uom_name"];
    
    
//         let modified = copyObjectProps(res.data[0],filter,0);

        

//         root.push(modified);

//         //let finData = processCost(res.data,0)

//         childCost(rootUid,1);
        
//         //let finalData = ["ok"];
//         console.log("inside root cost test",root);
//         //if(root.length!=0)setData(root);
//         return root; 
//     })
//     .catch((err) =>{
//         console.log(err)
//     })

// }


// const fetchData = (Uid) => {
    
//     console.log("UID from fetch Data");
//     console.log(Uid);
//     projId = Uid;

//     rootCost(Uid);

//     console.log("from fetchData ",root);
//     return root;

//     // return axios.get("http://localhost:5000/cost/"+Uid)
//     // .then((res)=>{
//     //     console.log(res.data);

//     //     let finData = processCost(res.data,0)
        
//     //     //let finalData = ["ok"];

//     //    return finData; 
//     // })
//     // .catch((err) =>{
//     //     console.log(err)
//     // })
// }

const exportToCSV = (csvData, fileName) => {

    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});

    FileSaver.saveAs(data, fileName +  '.xlsx');

}

function delay(t) {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    });
}

function GetCost(props) {

    const [data,setData] = useState([])
    const [final,setFinal] = useState([])
    const [isData,setisData] = useState(false)
    const [formatDone,setFormatDone] = useState(false)
    const [present,setPresent] = useState(0)
    const Uid = props.project.uid
    console.log("project id")
    console.log(Uid)
    const projName = props.project.description

    //for redux
    const list = useSelector((state) => state.listState.list);
    const dispatch = useDispatch();
    //end redux


/// test
    async function childCost(Uid,level){
        let str1="";
        if(Uid!=null)str1 = projId+":"+Uid
        else return;
    
        return axios.get("https://back-end-smart-build-api.azurewebsites.net/costItems/"+str1)
        .then((res)=>{
    
            console.log("Inside child cost ",res.data.length);
            for(let i=0;i<res.data.length;i++){
                //console.log(i+" "+"item");
                //console.log("current root "+root);
                
                let uid = res.data[i]["uid"]
                //console.log("child UID ",uid);
    
                const filter = ["description","external_system_id","total_cost","cpi","spi","quantity","unit_cost","uom_name"];
                let modified = copyObjectProps(res.data[i],filter,level);
                root.concat(modified);
                // console.log("before adding",modified);
                // dispatch(addToList([modified]));
                // console.log("result ",list);
                
                setData(root);

                console.log("before adding",modified);
                dispatch(addToList([modified]));
                console.log("result ",list);
    
                if(uid!=null && uid!="")childCost(uid,level+1);
                
                
                
            }
    
        })
        .catch((err)=>{
            console.log(err);
            return;
        })
    
    
    }
    
    
    
    
    async function rootCost(Uid){
    
        return axios.get("https://back-end-smart-build-api.azurewebsites.net/cost/"+Uid)
        .then((res)=>{
            console.log("inside root cost ",res.data);
    
            rootUid = res.data[0]["uid"]
    
            console.log("root UID ",rootUid);
    
            const filter = ["description","external_system_id","total_cost","cpi","spi","quantity","unit_cost","uom_name"];
        
        
            let modified = copyObjectProps(res.data[0],filter,0);
    
            
    
            root.concat(modified);
            console.log("before calling dispatch ",modified);
            if(modified["total_cost"]==null){
                setPresent(1);
                return null;
            }
            setPresent(2)
            setisData(true)
            
            dispatch(addToList([modified]));
            
    
            //let finData = processCost(res.data,0)
            console.log("calling childcost global list ",list);
            childCost(rootUid,1);
            
            //let finalData = ["ok"];
            console.log("inside root cost test",root);
            setData(root);
            console.log("data ",data);
            last = data;

            //if(root.length!=0)setData(root);
            return root; 
        })
        .catch((err) =>{
            console.log(err)
        })
    
    }
    
    
 const fetchData = (Uid) => {
        
        console.log("UID from fetch Data");
        console.log(Uid);
        projId = Uid;
    
        rootCost(Uid);
        //formatList();
        setFormatDone(true);
        //final1 = list;
    
        console.log("from fetchData ",root);
        return root;
    
        // return axios.get("http://localhost:5000/cost/"+Uid)
        // .then((res)=>{
        //     console.log(res.data);
    
        //     let finData = processCost(res.data,0)
            
        //     //let finalData = ["ok"];
    
        //    return finData; 
        // })
        // .catch((err) =>{
        //     console.log(err)
        // })
    }

// const formatList = () =>{

//     list.sort(function(a, b) {
        
//         return (a["external_system_id"] > b["external_system_id"]) ? 1 : ((a["external_system_id"] < b["external_system_id"]) ? -1 : 0);
        
//     });

    

// }


/// test    

    useEffect(() => {
        
        root = [];
        projId = "";
    
        // fetchData(Uid).then(apiData => {
                
        //         console.log(apiData);
        //         if(apiData!=1){
        //             setData(apiData);
        //             console.log("data")
        //             console.log(apiData)
        //         }
        //         if(apiData!=1){
        //             console.log("len "+apiData.length);
        //             if(apiData){
        //                 setisData(true);
        //                 setPresent(2)
        //             }
        //         }
        //         if(apiData.length==0 || apiData[0]["total_cost"]==null){
        //             setPresent(1)
        //             setisData(false);
        //         }
        //     })
        // },[]);
        //dispatch(emptyList());
        
        let apiData = fetchData(Uid);

        delay(1000);
                
        console.log("apiData ",apiData);
        console.log(root);
        
        
        //setData(root);
            // if(apiData!=1){
            //     //setData(apiData);
            //     console.log("data")
            //     console.log(apiData)
            // }
            // if(apiData!=1){
            //     console.log("len "+apiData.length);
            //     if(apiData){
            //         setisData(true);
            //         setPresent(2)
            //     }
            // }
            // if(root.length==0){
            //     setPresent(1)
            //     setisData(false);
            // }
    
    },[]);

        
        const CSVReport = {
            filename:'cost report.xls',
            data:data
        }

        const head = ["description","external_system_id","total_cost","cpi","spi","quantity","unit_cost","uom_name"];

    return (
        <div>
          
            <div class="table1">
            {isData && (present!=1) && /*<Button variant="warning" size="md" active>
                             <CSVLink {...CSVReport}> Download </CSVLink>
        </Button>*/  <button  className="button" onClick={(e) => exportToCSV(list,"schedule_report")}>Export</button>}
           
            </div>
            <br/>
            {present===1 && <h2>Cost Data is not available for this project</h2>}
            {present!=2 && present!=1 && !isData &&<h2>Please wait Cost Data is loading.......</h2>}{present!=1 && !isData &&<div class="loader"></div>}
            {isData && (present==2) &&<h3>Cost Data loaded sucessfully for project : <h2 class="project">{projName}</h2></h3>}
            <br/>
            {formatDone && present===2 && <table class="table">
                <thead class>
                    <tr>
                    {head.map((ele,eleIdx)=> <th key={eleIdx}>
                    <td align="left">{ele}</td>
                        </th>)}
                         
                    </tr>
                    
                    
                </thead>
                {last}
                {isData && <tbody>
                    {list.map((ele,eleIdx)=>(
                        <tr key={eleIdx}>
                            {head.map((title,titleIdx)=>(
                                <td align="left" key={titleIdx}>{ele[title]}</td>
                            ))}
                        </tr>
                    ))}
                    
                </tbody>}
            </table>}


        </div>
    );
}

export default GetCost;