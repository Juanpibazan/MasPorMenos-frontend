export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_BUSINESS_ID: 'SET_BUSINESS_ID',
    SET_PLACE_SELECTED:'SET_PLACE_SELECTED',
    SET_PRODUCTS_WITH_DISCOUNTS:'SET_PRODUCTS_WITH_DISCOUNTS',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_ORDER: 'SET_ORDER',
    SET_IS_CHANGE: 'SET_IS_CHANGE'
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
        case actionTypes.SET_PRODUCTS_WITH_DISCOUNTS:
            return {
                ...state,
                products_with_discounts:action.products_with_discounts
            }
        case actionTypes.SET_CART_ITEMS:
            return {
                ...state,
                cart_items: action.cart_items
            }
        case actionTypes.SET_ORDER:
            return {
                ...state,
                order: action.order
            }
        case actionTypes.SET_IS_CHANGE:
            return {
                ...state,
                is_change: action.is_change
            }
        default:
            return state;
    }
};