import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './main.css';

import FileSaver from 'file-saver';

import XLSX from 'xlsx';

const formatDate = (date) => {
    if(typeof(date)!="undefined" && date!=null) date  = date.toString();
    if(typeof(date) != "undefined" && date!=null){
        const date_time = date.split("T")
        let date_val = date.substring(0,10)
        let time = date_time[1]
        let year_mon_day = date_val.split("-");
        console.log(year_mon_day);
        let mon_day_year = year_mon_day[1].toString()+"/"+year_mon_day[2].toString()+"/"+year_mon_day[0].toString()
        //let mon_day_year = ""+year_mon_day[2]+"/"+year_mon_day[1]+"/"+year_mon_day[0]+""
        let hour_min = time.substring(0,5)
        let res = mon_day_year+" "+hour_min
        //res = res.replaceAll('-','/')
        //console.log(typeof(res));

        return res
    }
    return ""
    // return null
} 

const fiterSchedule = (details,id) =>{
    const allowed = ['Name','Description','Purpose','PlannedStartDate','PlannedEndDate','EstimatedStartDate','EstimatedEndDate',
    'PercentageDone','WorkPackageStatus','WorkEffort','Discipline'];
    
    const filtered = Object.keys(details)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
        obj[key] = details[key];
        return obj;
        }, {});

        

        var newObject = {
            "Level1": filtered.Name,
            "Level2": "",
            "Level3": "",
            "Level4": "",
            "Level5": "",
            "Work Package": "",
            "Work Step": "",
            'Description': filtered.Description,
            "Purpose": filtered.Purpose,
            'Planned Start Date': formatDate(filtered.PlannedStartDate).toString(),
            'planned End Date': formatDate(filtered.PlannedEndDate).toString(),
            'Actual Start Date': formatDate(filtered.EstimatedStartDate).toString(),
            'Actual End Date': formatDate(filtered.EstimatedEndDate).toString(),
            'Progress': parseInt(filtered.PercentageDone).toString(),
            'Status': filtered.WorkPackageStatus,
            'Weightage': parseInt(filtered.WorkEffort),
            'Discipline': filtered.Discipline
        }
        if(filtered.WorkPackageStatus != null ){
            newObject['Level1'] = ""
            newObject['Level2'] = ""
            newObject['Level3'] = ""
            newObject['Work Package'] = filtered.Name
        }
        if(id==3){
            newObject['Level1'] = ""
            newObject['Work Step'] = filtered.Name
            console.log("ws-----> "+newObject['Discipline'])
        }
        let count = 0
        for(let i=0;i<filtered.Name.length;i++){
            if(filtered.Name.charAt(i)=='.'){
                count +=1
            }
            
        }
        console.log(filtered.Name)
        console.log("count "+count)
        if(count === 1 && filtered.Name.length<5){
            newObject['Level2'] = filtered.Name
            newObject['Level1'] = ""
        }
        else if(count === 2 && filtered.Name.length<8){
            newObject['Level3'] = filtered.Name
            newObject['Level1'] = ""
        }
    
    return newObject
    
}
const workSteps = (ws,finalData) => {

    let val = fiterSchedule(ws,3)
    finalData.push(val)
}

const processWpckg = (Wpckg,finalData) => {

    let ws = Wpckg['WorkSteps']
    Wpckg['WorkSteps'] = null
    let val = fiterSchedule(Wpckg)
    finalData.push(val)
    let len = ws.length
    if(len>0){
        for(let i=0;i<len;i++){
            workSteps(ws[i],finalData)
        }
    }

}

const processMain = (data,finalData) => {

    let wbs = data['WBSChildren']
    console.log("checking WBSChildren");
    if(typeof(wbs)==='undefined'){
        return 1;
    }
    data['WBSChildren'] = null
    console.log("from process Main")
    console.log(data)
    let val = fiterSchedule(data)
    finalData.push(val)
    let len = wbs.length
    if(len>0){
        let visited = []
        console.log("len "+len)
        for(var i=0;i<len;i++){
            visited.push(false)
        }
        for(var i=0;i<len;i++){
            processMain(wbs[i],finalData)
        }

        //var i = 1
        //processWBS(wbs,len)
    }
    else{
        if(data['WorkPackages'] != null ){
            let num = data['WorkPackages'].length
            let Wpckg = data['WorkPackages']
            for(var i=0;i<num;i++){
                processWpckg(Wpckg[i],finalData)
            }
            
        }
    }
    console.log(finalData)

    return finalData;
}





const fetchData = (Uid) => {
    // const projId = ["16f01829-c1ed-47be-802b-83bc9a74f366","e2dd1c95-54fc-4fb0-92ae-185f02b954a7",
    // "4cbc6b37-ba9f-4f00-a5d4-fe78793332e7"];
    // let id;
    // if(projName==="Smart Visualization - 305"){
    //     id = projId[0];
    // }
    // else if(projName==="Sample project"){
    //     id = projId[1];
    // }
    // else{
    //     id = projId[2];
    // }
    //console.log(id);
    console.log("UID from get schedule");
    console.log(Uid);
    return axios.get("https://backend-smartbuildapi.azurewebsites.net/schedule/"+Uid)
    .then((res)=>{
        console.log(res.data);
        let arr1 = []
        let finalData = processMain(res.data,arr1)
        
        



       return finalData; // return the final array having only ['description', 'planned_start_date','planned_end_date'] key elements
    })
    .catch((err) =>{
        console.log(err)
    })
}

const exportToCSV = (csvData, fileName) => {

    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});

    FileSaver.saveAs(data, fileName +  '.xlsx');

}

function GetSchedule(props) {
    const [data,setData] = useState([])
    const [isData,setisData] = useState(false)
    const [present,setPresent] = useState(0)
    const Uid = props.project.uid
    const projName = props.project.description
    useEffect(() => {
        fetchData(Uid).then(apiData => {
                if(apiData!=1)setData(apiData);
                if(apiData!=1){
                    console.log("len "+apiData.length);
                    if(apiData.length>10){
                        setisData(true);
                        setPresent(2)
                    }
                }
                if(apiData===1){
                    setPresent(1)
                }
            })
        },[]);

        
        const CSVReport = {
            filename:'Schedule report.xls',
            data:data
        }

        const head = ["Level1","Level2","Level3","Level4","Level5","Work Package","Work Step",
        'Description',"Purpose",'Planned Start Date','planned End Date','Actual Start Date','Actual End Date',
        'Progress','Status','Weightage','Discipline']

    return (
        <div>
            {/* <table class="table">
                <thead class>
                    <tr>
                    {head.map((ele,eleIdx)=> <th key={eleIdx}>
                        {ele}
                        </th>)}
                    </tr>
                </thead>
            
                <tbody>
                    {data.map((ele,eleIdx)=>(
                        <tr key={eleIdx}>
                            {head.map((title,titleIdx)=>(
                                <td key={titleIdx}>{ele[title]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <div class="table1">
            {isData && /*<Button variant="warning" size="md" active>
                             <CSVLink {...CSVReport}> Download </CSVLink>
        </Button>*/  <button  className="button" onClick={(e) => exportToCSV(data,"schedule_report")}>Export</button>}
           
            </div>
            <br/>
            {present===1 && <h2>Schedule Data is not available for this project</h2>}
            {present!=1 && !isData &&<h2>Please wait Schedule Data is loading.......</h2>}{present!=1 && !isData &&<div class="loader"></div>}
            {isData &&<h3>Schedule Data loaded sucessfully for project : <h2 class="project">{projName}</h2></h3>}
            <br/>
            {present===2 && <table class="table">
                <thead class>
                    <tr>
                    {head.map((ele,eleIdx)=> <th key={eleIdx}>
                    <td align="left">{ele}</td>
                        </th>)}
                         
                    </tr>
                    
                    
                </thead>
                {isData && <tbody>
                    {data.map((ele,eleIdx)=>(
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

export default GetSchedule;