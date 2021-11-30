import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import data1 from './Project.json'

const fiterProjects = (details) =>{
    const allowed = ['description', 'planned_start_date','planned_end_date'];
    const filtered = Object.keys(details)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
        obj[key] = details[key];
        return obj;
        }, {});

    console.log("filtered "+filtered);
    return filtered
}
const filterData = (data) =>{
    console.log(data);
    const allowed = ['object'];
    let filtered=[];
    for(let ele in data){
        console.log((data[ele]));
        let item = data[ele]
        filtered.push(item['object'])
    }
    
    return filtered
}
const fetchData = () => {
     return axios.get("http://localhost:5000/tenant")
     .then((res)=>{
         console.log("coming in fetch");
         console.log(res)
         console.log("data")
         console.log(data1);

         let details = filterData(data1) // filters elemets having value of 'object'
         
         console.log(details);
         
        let final = [];
        for(let ele in details){
            final.push(fiterProjects(details[ele]))
        }
        console.log(final);
        return final; // return the final array having only ['description', 'planned_start_date','planned_end_date'] key elements
     })
     .catch((err) =>{
         console.log(err)
     })
}
function TableSchedule() {
    const [data,setData] = useState([])
    useEffect(() => {
    fetchData().then(apiData => {
            setData(apiData);
        })
    },[]);
    const head = ['description', 'planned_start_date','planned_end_date'];
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
            <h2>Still No data available!!!</h2>
        </div>
    );
}

export default TableSchedule;