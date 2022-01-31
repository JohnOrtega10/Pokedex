const INITIAL_STATE = {
    name: "",
    itemsPage: 20,
    isDark: false,
    apperance: 0,

}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload}
        case 'CHANGE_ITEMS':
            return {...state, itemsPage: action.payload}

        case 'CHANGE_THEME':
            return {...state, isDark: action.payload}

        case 'SET_APPERANCE':
            return {...state, apperance: action.payload}
        default:
            return state
    }

}

export default reducer;