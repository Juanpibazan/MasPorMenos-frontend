import React, { useState, useEffect} from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, InfoWindow} from '@react-google-maps/api';
import { GiPositionMarker } from 'react-icons/gi';
import axios from 'axios';

//import * from 'dotenv'.config();
import GreenMarker from '../img/pin.png';
import HomeSinglePlace from './HomeSinglePlace';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const center = {lat:-16.541220,lng:-68.077371}
const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Home = ()=>{
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries:['places']
    });
    const [map, setMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [userCoords,setUserCoords] = useState({});
    const [{place_selected,products_with_discounts},dispatch] = useStateValue();

    //const center = userCoords;

    const success = (position)=>{
        const myLat = position.coords.latitude;
        const myLng = position.coords.longitude;
        console.log(`user lat: ${myLat}, user lng: ${myLng}`);
        setUserCoords({lat:myLat,lng:myLng});
    }

    const error = ()=>{
        console.log('Unable to retrieve location');
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error);
    } else{
        console.log('Geolocation not supported');
    }



    useEffect(()=>{
        const fetchPlaces = async ()=>{
            const {data} = await axios({
                method:'get',
                url:'http://maspormenos.azurewebsites.net/places',
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                    "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
                }
            });
            console.log(data);
            setPlaces(data);
        };
        fetchPlaces();
    }
    ,[places]
    );

    return (
        <div>
            {!isLoaded && (
            <h2>No map yet</h2>
            )}
            {isLoaded && (
            <div className='map-container'>
                {products_with_discounts.length>0 && (
                <div className='info-pane-container'>
                {products_with_discounts.map((product)=>{
                    return (
                        <div key={product.pk}>
                            <span>Producto: </span><h3>{product.name}</h3>
                            <span>Descuento de: </span>
                            <h2>{product.percentage_discount} %</h2>
                            <div className='apartar-btn-container'>
                                <button className='apartar-btn'>Apartar</button>
                            </div>
                        </div>
                    )
                })}
                </div>
            )}
                <GoogleMap center={center} zoom={14} mapContainerStyle={{width:'100vw',height:'80vh',textAlign:'center'}} onLoad={(map)=>setMap(map)} >
                {places.map((place)=>{
                    return (
                        <HomeSinglePlace place={place}/>
                    )
                })}
                <Marker position={userCoords} label='My Location' icon={GreenMarker} opacity={0.5} />
                </GoogleMap>
            </div>
            )}

        </div>
    )
};

export default Home;