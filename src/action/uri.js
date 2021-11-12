// action type 설정
const URI_SAVE = 'URI_SAVE';

// write 버튼 클릭 시 호출될 함수
export const uriSave = (inputData) => ({
    type: URI_SAVE,
    inputData: inputData
})

export { URI_SAVE };