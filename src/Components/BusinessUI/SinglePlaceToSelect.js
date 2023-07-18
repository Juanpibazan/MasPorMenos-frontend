import React, {useState,useEffect,useRef} from 'react';
import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { useNavigate } from 'react-router-dom';


const SinglePlaceToSelect = ({place})=>{

    const [placeSelected, setPlaceSelected] = useState({});
    const [{place_selected},dispatch] = useStateValue();
    const placeRef = useRef();
    const navigate = useNavigate();

    const selectPlace = ()=>{
        setPlaceSelected(place);
    };

    useEffect(()=>{
        const myPlace = {
            name:placeSelected.name,
            pk:placeSelected.pk,
            maps_id: placeSelected.maps_id
        };
        console.log(myPlace);
        dispatch({
            type:actionTypes.SET_PLACE_SELECTED,
            place_selected: myPlace
        });
        localStorage.setItem('place_selected',JSON.stringify(myPlace));
    },[placeSelected]);

    /*useEffect(()=>{
        return navigate('/business/product/add');
    },[place_selected]);*/

    return (
        <div>
            <h5 style={{cursor:'pointer'}} ref={placeRef} onClick={selectPlace} >{place.name}</h5>
        </div>
    )
};

export default SinglePlaceToSelect;
