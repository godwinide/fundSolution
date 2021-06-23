import { GET_CUSTOMERS, GET_HISTORY, GET_COMMISSION_HISTORY } from "../actions/types";


const INITIAL_STATE = {
    customers: [],
    history: [],
    commissionHistory: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state, customers: action.payload
            };
        case GET_HISTORY:
            return {
                ...state, history: action.payload
            };
        case GET_COMMISSION_HISTORY:
            return {
                ...state, commissionHistory: action.payload
            };
    }
    return state
};

export default reducer;