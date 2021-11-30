// import React ,{useEffect,useState} from 'react';
// import axios from 'axios';
// import data1 from './Project.json'

// const fiterProjects = (details) =>{
//     const allowed = ['description', 'planned_start_date','planned_end_date'];
//     const filtered = Object.keys(details)
//         .filter(key => allowed.includes(key))
//         .reduce((obj, key) => {
//         obj[key] = details[key];
//         return obj;
//         }, {});

//     console.log("filtered "+filtered);
//     return filtered
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
//      return axios.get("http://localhost:5000/tenant")
//      .then((res)=>{
//          console.log("coming in fetch");
//          console.log(res)
//          console.log("data")
//          console.log(data1);

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
//     useEffect(() => {
//     fetchData().then(apiData => {
//             setData(apiData);
//         })
//     },[]);
//     const head = ['description', 'planned_start_date','planned_end_date'];
//     return (
//         <div>
//             <table class="table">
//                 <thead class>
//                     <tr>
//                     {head.map((ele,eleIdx)=> <th key={eleIdx}>
//                         {ele}
//                         </th>)}
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
import Table from 'react-bootstrap/Table';
//import data1 from './Project.json'

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
const fetchData = () => {
     return axios.get("http://localhost:5000/tenants")
     .then((res)=>{
         console.log("coming in fetch");
         console.log(res.data)
         console.log("data")
         //console.log(data1);
         //for(let obj in res.data)

         let details = filterTenant(res.data) // filters elemets having value of 'object'
         
         console.log(details);
         
        let final = [];
        for(let ele in details){
            final.push((details[ele]))
        }
        console.log("Final Data");
        console.log(final);
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
        const head = ['name','created_date','edited_date'];
        const heading = [{label:'Name'},{label:'Created date'},{label:'Edited date'}];
        const CSVReport = {
            filename:'Tenant report.csv',
            headings:heading,
            data:[data]
            }
    return (
        <div>
            <br></br>
        <div class="table1">
            {isData && <Button variant="warning" size="md" active>
                             <CSVLink {...CSVReport}> Download </CSVLink>
                         </Button>}
           
        </div>
        <br />

        
            <table class="table">
                <thead class>
                    <tr>
                    {head.map((ele,eleIdx)=> <th key={eleIdx}>
                        {ele}
                        </th>)}
                    </tr>
                </thead>
            
                <tbody>
                    
                        <tr>
                            {data.map((title,titleIdx)=>(
                                <td key={titleIdx}>{title}</td>
                            ))}
                        </tr>
                    
                </tbody>
            </table>
        </div>
    );
}

export default TableProject;