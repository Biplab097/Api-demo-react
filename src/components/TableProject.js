import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'

import FileSaver from 'file-saver';

import XLSX from 'xlsx';

import './main.css';

const fiterProjects = (details) =>{
    const allowed = ['description', 'planned_start_date','planned_end_date'];
    const filtered = Object.keys(details)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
        obj[key] = details[key];
        return obj;
        }, {});

        var newObject = {
            'description': filtered.description,
            'planned_start_date': filtered.planned_start_date,
            'planned_end_date': filtered.planned_end_date 
        }
    
        return newObject
    
}
const filterData = (data) =>{
    
    const allowed = ['object'];
    let filtered=[];
    for(let ele in data){
        
        let item = data[ele]
        filtered.push(item['object'])
    }
    
    return filtered
}
const fetchData = () => {
     return axios.get("https://backend-smartbuildapi.azurewebsites.net/projects")
     .then((res)=>{
         

        let details = filterData(res.data) // filters elements having value of 'object'
        console.log(res.data) 
         
        let final = [];
        for(let ele in details){
            final.push(fiterProjects(details[ele]))
        }
        console.log("final ");
        console.log(final)

        return final; // return the final array having only ['description', 'planned_start_date','planned_end_date'] key elements
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



function TableProject() {
    const [data,setData] = useState([])
    const [isData,setisData] = useState(false)
    useEffect(() => {
    fetchData().then(apiData => {
            setData(apiData);
            setisData(true);
        })
    },[]);
    const head = ['description', 'planned_start_date','planned_end_date'];
    const headings = ['Description', 'Planned Start Date','Planned End Date']
   
    //  const CSVReport = {
    //     filename:'Project report.csv',
    //     data:data
    // }
    
    return (
        <div><br></br>
        <div class="table1">
            {isData && /*<Button variant="warning" size="md" active>
                             <CSVLink {...CSVReport}> Download </CSVLink>
                         </Button>*/ <button  className="button" onClick={(e) => exportToCSV(data,"Project_report")}>Export</button>}
           
        </div>
        <br />
            <table class="table">
                <thead class>
                    <tr>
                    {headings.map((ele,eleIdx)=> <th key={eleIdx}>
                        <td align="left">{ele}</td>
                        </th>)}
                         
                    </tr>
                    
                    
                </thead>
            {/* {data.map((ele,eleIdx)=> <div key={eleIdx}>
                {ele.description}
                </div>)} */}
                {isData && <tbody>
                    {data.map((ele,eleIdx)=>(
                        <tr key={eleIdx}>
                            {head.map((title,titleIdx)=>(
                                <td align="left" key={titleIdx}>{ele[title]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>}
            </table>
            
            
        </div>
    );
}

export default TableProject;