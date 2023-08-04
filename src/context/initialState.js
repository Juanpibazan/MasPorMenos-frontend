export const initialState ={
    user: localStorage.getItem('user')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('user')),
    business_id: localStorage.getItem('business_id')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('business_id')),
    place_selected: localStorage.getItem('place_selected')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('place_selected')),
    products_with_discounts: localStorage.getItem('products_with_discounts')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('products_with_discounts')),
    cart_items: localStorage.getItem('cart_items') ==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('cart_items')),
    order: localStorage.getItem('order')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('order')),
    is_change: localStorage.getItem('is_change')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('is_change'))
};