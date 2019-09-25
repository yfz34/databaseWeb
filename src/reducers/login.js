let initial = {
    permission: '',
    account: '', 
    name: '',
    sex: '',
    phone: '',
    location: '',
    email: '',
    birthday: '',
}

const loginReducer = (state = initial, action) => {
    switch (action.type) {
        case "OPEN_LOADING_COMPONENT":
            return state = {
                ...state,
                isopen: true,
            }
        case "CLOSE_LOADING_COMPONENT":
            return state = {
                ...state,
                isopen: false,
            }
        default:
            return state
    }
}
export default loginReducer