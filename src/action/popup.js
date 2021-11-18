import { createAction } from "redux-actions";

const TOGGGLE_POPUP = 'popup/TOGGLE_POPUP';

const CHANGE_MESSAGE = 'popup/MESSAGE';
const CHANGE_MESSAGECODE = 'popup/MESSAGECODE';
const CHANGE_SEQ = 'popup/SEQ';

export const togglePopup = createAction(TOGGGLE_POPUP,popup => popup);
export const changeMessage = createAction(CHANGE_MESSAGE,message => message);
export const changeMessageCode = createAction(CHANGE_MESSAGECODE,messageCode => messageCode);
export const changeSeq = createAction(CHANGE_SEQ,seq=>seq);

export {TOGGGLE_POPUP,CHANGE_MESSAGE,CHANGE_MESSAGECODE,CHANGE_SEQ};