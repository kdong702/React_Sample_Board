import {  handleActions } from "redux-actions";
import {TOGGGLE_POPUP,CHANGE_MESSAGE,CHANGE_MESSAGECODE,CHANGE_SEQ} from "../action/popup"

const initialState = {
    popupStatus: false,
    message : '성공',
    messageCode : "0000",
    seq: 0,
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
        [CHANGE_SEQ]: (state,action) => ({
            ...state,
            seq: action.payload,
        })
    },initialState
);