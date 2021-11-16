// action type 설정
const SET_FILEIMAGE = 'SET_FILEIMAGE'

// 액션 함수 생성자
export const setFileImage = (fileImage) => ({
    type: SET_FILEIMAGE,
    fileImage
});

export{
    SET_FILEIMAGE
};