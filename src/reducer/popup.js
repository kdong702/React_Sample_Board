import {  handleActions } from "redux-actions";
import {TOGGGLE_POPUP,CHANGE_MESSAGE,CHANGE_MESSAGECODE} from "../action/popup"

const initialState = {
    popupStatus: false,
    message : '성공',
    messageCode : "0000"
};

export default handleActions(
    {
        [TOGGGLE_POPUP]: (state,action) =>({
            ...state,
            popupStatus: action.payload,
        }),
        [CHANGE_MESSAGE]: (state,action) =>({
            ...state,
            message: action.payload,
        }),
        [CHANGE_MESSAGECODE]: (state,action) =>({
            ...state,
            messageCode: action.payload,
        }),
    },initialState
);