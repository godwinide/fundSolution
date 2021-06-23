import {GET_CUSTOMERS, GET_HISTORY, GET_COMMISSION_HISTORY} from './types'
import axios from 'axios'

export const getCustomers = () => async dispatch => {
    try{
        const res = await axios.get("/customers", {timeout: 30000});
        dispatch({
            type: GET_CUSTOMERS,
            payload: res.data.customers
        })
    }catch(err){
        setTimeout(()=> {
            getCustomers()(dispatch);
        },3000)
    }
}

export const getHistory = () => async dispatch => {
    try{
        const res = await axios.get("/history", {timeout: 30000});
        dispatch({
            type: GET_HISTORY,
            payload: res.data.history
        })
    }catch(err){
        setTimeout(()=> {
            getHistory()(dispatch);
        },3000)
    }
}

export const getComHistory = () => async dispatch => {
    try{
        const res = await axios.get("/commission", {timeout: 30000});
        dispatch({
            type: GET_COMMISSION_HISTORY,
            payload: res.data.history
        })
    }catch(err){
        setTimeout(()=> {
            getComHistory()(dispatch);
        },3000)
    }
}


