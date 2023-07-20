import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';


const HomeSinglePlace = ({place})=>{
    
    const [selectedMarker, setSelectedMarker] = useState({});
    const [readyToSelect, setReadyToSelect] = useState(false);
    const [{place_selected},dispatch] = useStateValue();
    const [mapMarker, setMapMarker] = useState(null);

    const selectMarker = ()=>{
        setSelectedMarker(place);
        setReadyToSelect(!readyToSelect);
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
        const getProductsWithDiscounts = async ()=>{
            try {
                const place_id = selectedMarker.pk;
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
                return data  
            } catch (error) {
                console.log(error);
            }
        };
        //getProductsWithDiscounts();
    },[readyToSelect,readyToSelect]);

    /*useEffect(()=>{
        const getProductsWithDiscounts = async ()=>{
            try {
                const {data} = await axios({
                    method:'get',
                    url: `http://maspormenos.azurewebsites.net/products/discount/getDiscountByPlaceID/${place_selected.pk}`,
                    headers:{
                        "Content-Type":"application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                        "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
                    }
                });
                console.log('Productos con descuentos: ', data);
                return data  
            } catch (error) {
                console.log(error);
            }
        };
        getProductsWithDiscounts();
    });*/

    return (
        <div>
            <Marker onLoad={(mapMarker)=>setMapMarker(mapMarker)} key={place.latitude} position={{lat:place.latitude,lng:place.longitude}} onClick={selectMarker} >
                {place_selected && Object.keys(place_selected).length !== 0 && (
                    <InfoWindow anchor={mapMarker} position={{lat:place_selected.lat,lng:place_selected.lng}}>
                        <h2>{place.name}</h2>
                    </InfoWindow>
                )}

            </Marker>

        </div>
    )
};

export default HomeSinglePlace;