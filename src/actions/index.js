
export const addToList = (item) =>{
    console.log("item from actions ",item);
    return{
        type:'ADD',
        payload:{item:item[0]}
    };

};export const emptyList = () =>{

    return{
        type:'START'
    };
};