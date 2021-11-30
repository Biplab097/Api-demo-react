// import React ,{useEffect,useState} from 'react';
// import axios from 'axios';
// import data1 from './Project.json'
// import {CSVLink} from 'react-csv';
// import {Button} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'

// const fiterProjects = (details) =>{
//     const allowed = ['description', 'planned_start_date','planned_end_date'];
//     const filtered = Object.keys(details)
//         .filter(key => allowed.includes(key))
//         .reduce((obj, key) => {
//         obj[key] = details[key];
//         return obj;
//         }, {});

//     console.log("filtered "+filtered);
//     var newObject = {
//         'description': filtered.description,
//         'planned_start_date': filtered.planned_start_date,
//         'planned_end_date': filtered.planned_end_date 
//     }
//     return newObject
// }
// const filterData = (data) =>{
//     console.log(data);
//     const allowed = ['object'];
//     let filtered=[];
//     for(let ele in data){
//         console.log((data[ele]));
//         let item = data[ele]
//         filtered.push(item['object'])
//     }
    
//     return filtered
// }
// const fetchData = () => {
//      return axios.get("http://localhost:5000/projects")
//      .then((res)=>{
         

//          let details = filterData(data1) // filters elemets having value of 'object'
         
//          console.log(details);
         
//         let final = [];
//         for(let ele in details){
//             final.push(fiterProjects(details[ele]))
//         }
//         console.log(final);
//         return final; // return the final array having only ['description', 'planned_start_date','planned_end_date'] key elements
//      })
//      .catch((err) =>{
//          console.log(err)
//      })
// }

// function TableProject() {
//     const [data,setData] = useState([])
//     const [isData,setisData] = useState(false)
//     useEffect(() => {
//     fetchData().then(apiData => {
//             setData(apiData);
//             setisData(true);
            
//         })
//     },[]);
//     const head = ['description', 'planned_start_date','planned_end_date'];
    
//     const CSVReport ={
//         filename:'report.csv',
//         data:data
//     }
    
//     return (
//         <div>
//             <table class="table">
//                 <thead class>
//                     <tr>
//                     {head.map((ele,eleIdx)=> <th key={eleIdx}>
//                         {ele}
//                         </th>)}
//                         {isData && <Button variant="warning" size="lg">
//                             <CSVLink {...CSVReport}>Export</CSVLink>
//                         </Button>}
//                     </tr>
                    
//                 </thead>
//             {/* {data.map((ele,eleIdx)=> <div key={eleIdx}>
//                 {ele.description}
//                 </div>)} */}
//                 <tbody>
//                     {data.map((ele,eleIdx)=>(
//                         <tr key={eleIdx}>
//                             {head.map((title,titleIdx)=>(
//                                 <td key={titleIdx}>{ele[title]}</td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default TableProject;


import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'

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
     return axios.get("http://localhost:5000/projects")
     .then((res)=>{
         

         let details = filterData(res.data) // filters elemets having value of 'object'
         
         
        let final = [];
        for(let ele in details){
            final.push(fiterProjects(details[ele]))
        }
        
        console.log(final)

        return final; // return the final array having only ['description', 'planned_start_date','planned_end_date'] key elements
     })
     .catch((err) =>{
         console.log(err)
     })
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
   
     const CSVReport = {
        filename:'Project report.csv',
        data:data
    }
    
    return (
        <div><br></br>
        <div class="table1">
            {isData && <Button variant="warning" size="md" active>
                             <CSVLink {...CSVReport}> Download </CSVLink>
                         </Button>}
           
        </div>
        <br />
            <table class="table">
                <thead class>
                    <tr>
                    {headings.map((ele,eleIdx)=> <th key={eleIdx}>
                        {ele}
                        </th>)}
                         
                    </tr>
                    
                    
                </thead>
            {/* {data.map((ele,eleIdx)=> <div key={eleIdx}>
                {ele.description}
                </div>)} */}
                <tbody>
                    {data.map((ele,eleIdx)=>(
                        <tr key={eleIdx}>
                            {head.map((title,titleIdx)=>(
                                <td key={titleIdx}>{ele[title]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            
        </div>
    );
}

export default TableProject;