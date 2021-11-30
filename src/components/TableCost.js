import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import GetCost from './GetCost';

import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css';

//redux
import { useSelector, useDispatch} from 'react-redux';
import { addToList, emptyList } from '../actions';

const fiterProjects = (details) =>{
    const allowed = ['description', 'uid'];
    const filtered = Object.keys(details)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
        obj[key] = details[key];
        return obj;
        }, {});

        var newObject = {
            'description': filtered.description,
            'uid': filtered.uid
        }
    
        return newObject
    
}
const filterData = (data) =>{
    
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
function TableCost() {
    
    const [getCost,setGetCost] = useState(false)
    const [projectUid,setProjectUid] = useState("")
    const [projectList, setProjectList] = useState([])
    const [projObject, setProjectObject] = useState({})
    const [buttonDisable, setButtonDisable] = useState(false)

    //for redux
    const list = useSelector((state) => state.listState.list);
    const dispatch = useDispatch();
    //end redux
    
    useEffect(() => {
    fetchData().then(apiData => {
        setProjectList(apiData);
        })
    },[]);

    //const head = ['description', 'planned_start_date','planned_end_date'];
    const getButtonClicked =() =>{
        setGetCost(true);
        setButtonDisable(true);
        
    }
    const handleChange=(e) =>{
        //setProjectUid(e.target.value);
        //e.preventDefault();
        setButtonDisable(false)
        dispatch(emptyList());
        console.log(typeof(e.target.value));
        let desc = e.target.value
        var val = desc
        console.log(val);
        var index = -1
        var filteredObj = projectList.find(function(item, i){
            if(item.description === val){
                index = i;
                return i;
            }
        });
        console.log(filteredObj,index);
        //console.log(filteredObj.uid);
        let uid = filteredObj.uid
        setProjectObject(filteredObj)
        console.log(uid);
        setProjectUid(uid);
        console.log("UID");
        console.log(projectUid);
        setGetCost(false);
    }

    console.log(projectList);
    console.log("after");

    let optionItems = projectList.map((planet) =>
                <option id={projectList.uid}>{projectList.description}</option>
            );
            console.log(optionItems);
    return (
        <>
        <div>
            <br/>
            <label for="projects"><b>Choose a Project:</b></label>
            {'  '}
            <select id="projects" onChange={handleChange}>
                {/* <option value="None">------- None - Select a Project ------- </option>
                <option value="Smart Visualization - 305">Smart Visualization - 305</option>
                <option value="Sample project">Sample project</option>
                <option value="HCCI_PSE Project Demo" >HCCI_PSE Project Demo</option> */}
                {/* {optionItems} */}
                <option>---Select a Project----</option>
                {
                projectList.map((proj)=>(
                                <option key={proj.uid}>{proj.description}</option>
                ))}
            </select>

            {'    '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
            <button id="submit" disabled={buttonDisable} className="button2" onClick={getButtonClicked}>Get Cost</button>
  
            <div id="container"></div>
            <br/>
        </div>
        {/* {getSchedule && <GetSchedule projectUid={projectUid}/>} */}
        {getCost && <GetCost project={projObject}/>}
        </>
    );
}

export default TableCost;