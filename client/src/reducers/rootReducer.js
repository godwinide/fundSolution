import { combineReducers } from 'redux';
import authReducer from './authReducer';
import customerReducer from './customerReducer';


const rootReducer = combineReducers({
    customer: customerReducer,
    auth: authReducer
});

export default rootReducer;