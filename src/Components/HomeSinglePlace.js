import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';


const HomeSinglePlace = ({place})=>{
    
    const [selectedMarker, setSelectedMarker] = useState({});
    const [readyToSelect, setReadyToSelect] = useState(false);
    const [readyToSelect2, setReadyToSelect2] = useState(false);
    const [{place_selected,products_with_discounts},dispatch] = useStateValue();
    const [mapMarker, setMapMarker] = useState(null);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [productsWithDiscounts, setProductsWithDiscounts] = useState([]);

    const selectMarker = ()=>{
        setSelectedMarker(place);
        setReadyToSelect(!readyToSelect);
        setShowingInfoWindow(true);
    };

    useEffect(()=>{
        const myPlace = {
            pk: selectedMarker.pk,
            name: selectedMarker.name,
            lat: selectedMarker.latitude,
            lng: selectedMarker.longitude
        };
        dispatch({
            type:actionTypes.SET_PLACE_SELECTED,
            place_selected:myPlace
        });
        localStorage.setItem('place_selected',JSON.stringify(myPlace));
        console.log('selectedMarker:', selectedMarker);
        //setReadyToSelect2(!readyToSelect2);
        
    },[selectedMarker,readyToSelect]);

    useEffect(()=>{
        const getProductsWithDiscounts = async ()=>{
            try {
                if(Object.keys(selectedMarker).length>0){
                const place_id = selectedMarker.pk;
                console.log('PLACE_ID: ', place_id);
                //debugger
                const {data} = await axios({
                    method:'get',
                    url: `http://maspormenos.azurewebsites.net/products/discount/getDiscountByPlaceID/${place_id}`,
                    headers:{
                        "Content-Type":"application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                        "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
                    }
                });
                console.log('Productos con descuentos: ', data);
                setProductsWithDiscounts(data);
                return data;
            }
            } catch (error) {
                console.log(error);
            }
        };
        setTimeout(()=>{
            getProductsWithDiscounts();
        },3000);
    }
    ,[readyToSelect2]
    );

    useEffect(()=>{
        dispatch({
            type:actionTypes.SET_PRODUCTS_WITH_DISCOUNTS,
            products_with_discounts:productsWithDiscounts
        });
        localStorage.setItem('products_with_discounts',JSON.stringify(productsWithDiscounts));
    },[productsWithDiscounts]);

    return (
        <div>
            <Marker onLoad={(mapMarker)=>setMapMarker(mapMarker)} key={place.latitude} position={{lat:place.latitude,lng:place.longitude}}
            onClick={()=>{
                selectMarker();
                setReadyToSelect2(!readyToSelect2);
            }}>
                {place_selected && Object.keys(place_selected).length !== 0 && showingInfoWindow && (
                    <InfoWindow anchor={mapMarker} position={{lat:place_selected.lat,lng:place_selected.lng}} onCloseClick={()=>setShowingInfoWindow(false)} >
                        <h2>{place.name}</h2>
                    </InfoWindow>
                )}

            </Marker>

        </div>
    )
};

export default HomeSinglePlace;