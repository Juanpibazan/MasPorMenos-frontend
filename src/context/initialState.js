export const initialState ={
    user: localStorage.getItem('user')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('user')),
    business_id: localStorage.getItem('business_id')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('business_id')),
    place_selected: localStorage.getItem('place_selected')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('place_selected'))
};