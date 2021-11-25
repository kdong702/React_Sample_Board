import { handleActions } from "redux-actions";

import {CHANGE_SEARCHTYPE,CHANGE_SEARCHKEYWORD,CHANGE_INPUT,CHANGE_STARTDAY,CHANGE_ENDDAY} from '../action/search'

var today = new Date();

const pad = (n) => { 
    return n<10 ? "0"+n :""+n; 
} 

const makeDate = (day,isStart) => {
    var date ="";
    if(isStart === 0 ){
        date = day.getFullYear() + pad(day.getMonth()+1) + pad(day.getDate()) + "000000" ; 
    }else{
        date = day.getFullYear() + pad(day.getMonth()+1) + pad(day.getDate()) + "999999" ;
    }
    var dateNum = parseInt(date);
    return dateNum
}

var initialStartDay =  makeDate(new Date(today.setFullYear(today.getFullYear()-1)),0);
var initialEndDay =  makeDate(new Date(),1);

const initialState = {
    input: '',
    searchType: null,
    searchKeyword: null,
    startDay: initialStartDay,
    endDay: initialEndDay,
};

export default handleActions(
    {
        [CHANGE_SEARCHTYPE]:(state,action) => ({
            ...state,
            searchType: action.payload
        }),
        [CHANGE_SEARCHKEYWORD]:(state,action) => ({
            ...state,
            searchKeyword: action.payload
        }),
        [CHANGE_INPUT]: (state, action) => ({
            ...state,
            input: action.payload,
        }),
        [CHANGE_STARTDAY]: (state, action) => ({
            ...state,
            startDay: action.payload,
        }),
        [CHANGE_ENDDAY]: (state, action) => ({
            ...state,
            endDay: action.payload,
        }),
    },
    initialState
);