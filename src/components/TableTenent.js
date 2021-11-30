


import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
//import data1 from './Project.json'

import FileSaver from 'file-saver';

import XLSX from 'xlsx';

import './main.css';

const filterTenant = (details) =>{
    const allowed = ['name','created_date','edited_date'];
    const filtered = Object.keys(details)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
        obj[key] = details[key];
        return obj;
        }, {});

    console.log("filtered "+filtered);
    return filtered
}

const fetchData = () => {
     return axios.get("https://backend-smartbuildapi.azurewebsites.net/tenants")
     .then((res)=>{
         console.log("coming in fetch");
         console.log(res.data)
         console.log("data")
         //console.log(data1);
         //for(let obj in res.data)

         let details = filterTenant(res.data) // filters elemets having value of 'object'
         
         console.log("here");
         console.log(details);
         
        let final = [];
        for(let ele in details){
            final.push((details[ele]))
        }
        console.log("Final Data");
        console.log(final);

        const result = []
        let idx = 0
        
        while(idx<final.length){
            let obj = {}
            for(let i=0;i<3;i++){
                if(i===0)
                    obj["name"] = final[idx++];
                if(i===1)
                    obj["created_date"] = final[idx++];
                if(i===2)
                    obj["edited_date"] = final[idx++];
                
            }
            result.push(obj);

        }
        console.log("res");
        console.log(result);
        return result; // return the final array having only ['description', 'planned_start_date','planned_end_date'] key elements
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





    function TableTenant() {
        const [data,setData] = useState([])
        const [isData,setisData] = useState(false)
        useEffect(() => {
        fetchData().then(apiData => {
                setData(apiData);
                console.log(apiData);
                setisData(true);
            })
        },[]);
        const head = ['name','created_date','edited_date'];
        // const heading = [{label:'Name'},{label:'Created date'},{label:'Edited date'}];
        // const CSVReport = {
        //     filename:'Tenant report.csv',
        //     headings:heading,
        //     data:[data]
        //     }

        
        //setData(res)

    return (
        <div>
            <br></br>
        <div class="table1">
            {isData && /*<Button variant="warning" size="md" active>
                             <CSVLink {...CSVReport}> Download </CSVLink>
                         </Button> */  <button  className="button" onClick={(e) => exportToCSV(data,"Tenant_report")}>Export</button>} 
           
        </div>
        <br />

        
            <table class="table">
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
            </table>
        </div>
    );
}

export default TableTenant;