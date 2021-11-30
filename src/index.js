import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {createStore} from 'redux';
import allreducer from './reducers';
import { Provider } from 'react-redux';
const store = createStore(allreducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);
    ReactDom.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
        ,
document.querySelector('#root'));