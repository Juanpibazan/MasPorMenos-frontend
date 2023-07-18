export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_BUSINESS_ID: 'SET_BUSINESS_ID',
    SET_PLACE_SELECTED:'SET_PLACE_SELECTED'
};

export const reducer = (state, action)=>{
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user:action.user
            };
        case actionTypes.SET_BUSINESS_ID:
            return {
                ...state,
                business_id:action.business_id
            };
        case actionTypes.SET_PLACE_SELECTED:
            return {
                ...state,
                place_selected: action.place_selected
            };
        default:
            return state;
    }
};