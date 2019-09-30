
const defaultState = {
    isLoggedIn: false,
    user: null
}

const authReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                isLoggedIn: action.payload.username,
                user: action.payload.username
            }
        case 'LOG_OUT':
            return {
                isLoggedIn: false,
                user: null
            }
        default: 
            return state;
    }      
}

export default authReducer;