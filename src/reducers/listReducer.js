const initialData = {
    list : []
}

const formatList = (list) =>{

    list.sort(function(a, b) {
        
        return (a["external_system_id"] > b["external_system_id"]) ? 1 : ((a["external_system_id"] < b["external_system_id"]) ? -1 : 0);
        
    });

    

}

const listReducer = (state = initialData, action)=>{
    switch(action.type){
        case 'ADD':
            const data = action.payload
            console.log("data in list reducer ",data.item);
            formatList(state["list"]);
            console.log("checking state ",state);
            // return { 
            //     ...state,
            //     list: [...state.list, {
            //         data:data.item
            //     }]
            // }
            return { 
                ...state,
                list: [...state.list,data.item]
            }
        case 'START':
            return state = {list:[]};
        default:
            return state;
    }
}

export default listReducer;