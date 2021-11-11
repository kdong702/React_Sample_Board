// action type 설정
const URI_SAVE = 'URI_SAVE';
  
// data 초기화
const initialState = {
    inputData: '/'
}

// write 버튼 클릭 시 호출될 함수
export const uriSave = (inputData) => ({
    type: URI_SAVE,
    inputData: inputData
})

export default function uriReducer(state = initialState, action){
    switch(action.type) {
        case URI_SAVE:
            // state 를 직접 수정하는 건 불가. 그래서 첫 번째 인자로 빈 객체를 넘겨 주고, 여기에 두 번째 인자인 state 를 복사하여
            // action.inputData 와 합치는 로직이라고 이해함. 즉, 새로운 state 객체 반환.
            return Object.assign({}, state, {
                inputData: action.inputData
            })
 
        default:
            return state
    }
}