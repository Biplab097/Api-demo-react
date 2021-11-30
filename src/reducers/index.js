import listReducer from "./listReducer";
import loggedReducer from "./logged";

import { combineReducers } from "redux";

const allreducer = combineReducers({
    listState: listReducer,
    logged : loggedReducer
})

export default allreducer;