import React ,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import data1 from './Project.json'
import './main.css';
import TableProject from './TableProject';
import TableTenent from './TableTenent';
import TableSchedule from './TableSchedule';

export default function Main(){
    
    const [tenentClicked,setTenentClicked] = useState(false)
    const [projectClicked,setProjectClicked] = useState(false)
    const [scheduleClicked,setScheduleClicked] = useState(false)
    // useEffect(() => {
    //     fetchData().then(apiData => {
    //         // console.log("apiData "+apiData);
    //         // for(let ele in apiData){
    //         //     console.log(apiData[ele]);
    //         // }
    //         setData(apiData);
    //     })
    //   },[]);
    //console.log("here "+data);
    const projectButtonClicked = () => {
        setProjectClicked(true)
        setTenentClicked(false)
        setScheduleClicked(false)
    }
    const tenentButtonClicked = () => {
        setProjectClicked(false)
        setTenentClicked(true)
        setScheduleClicked(false)
    }
    const scheduleButtonClicked =() =>{
        setProjectClicked(false)
        setTenentClicked(false)
        setScheduleClicked(true)
    }
    const head = ['description', 'planned_start_date','planned_end_date'];
    return (
        <div class="main">
            
            <button onClick={tenentButtonClicked}>Tenent</button>&nbsp;&nbsp;&nbsp;
            <button onClick={projectButtonClicked}>Projects</button>&nbsp;&nbsp;&nbsp;
            <button onClick={scheduleButtonClicked}>Schedule</button>
            <br/>
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

            {projectClicked && <TableProject/>}
            {tenentClicked && <TableTenent/>}
            {scheduleClicked && <TableSchedule/>}

            
            
        </div>
    );
};



// export default Main;
