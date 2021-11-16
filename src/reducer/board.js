import * as types from '../action/board';

const initialState = {
    fileImage: ''
};

function board(state = initialState, action) {
    switch (action.type) {
        case types.SET_FILEIMAGE:
            return {
                ...state,
                fileImage: action.fileImage
        };
        default:
            return state;
    }
}

export default board;