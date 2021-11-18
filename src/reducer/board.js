import * as types from '../action/board';

const initialState = {
    fileImage: '',
    seq: 0
};

function board(state = initialState, action) {
    switch (action.type) {
        case types.SET_FILEIMAGE:
            return {
                ...state,
                fileImage: action.fileImage
        };
        case types.SET_SEQ:
            return {
                ...state,
                fileImage: action.seq
            }
        default:
            return state;
    }
}

export default board;