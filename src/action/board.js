// action type 설정
const SET_FILEIMAGE = 'SET_FILEIMAGE'
const SET_SEQ = 'SET_SEQ'

// 액션 함수 생성자
export const setFileImage = (fileImage) => ({
    type: SET_FILEIMAGE,
    fileImage
});
export const setSeq = (seq) => ({
    type: SET_SEQ,
    seq
});

export{
    SET_FILEIMAGE,
    SET_SEQ
};