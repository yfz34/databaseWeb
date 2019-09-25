let initial = {
    successText: '搜索成功',
    successBar: false,

    failText: '搜索失敗', 
    failBar: false,
}

const SnackbarReducer = (state = initial, action) => {
    switch (action.type) {
        case "OPEN_SUCCESS_SNACKERBAR":
            return state = {
                ...state,
                successBar: true,
                successText: action.payload.data,
            }
        case "CLOSE_SUCCESS_SNACKERBAR":
            return state = {
                ...state,
                successBar: false,
            }
        case "OPEN_FAIL_SNACKERBAR":
            return state = {
                ...state,
                failBar: true,
                failText: action.payload.data,
            }
        case "CLOSE_FAIL_SNACKERBAR":
            return state = {
                ...state,
                failBar: false,
            }
        default:
            return state
    }
}
export default SnackbarReducer