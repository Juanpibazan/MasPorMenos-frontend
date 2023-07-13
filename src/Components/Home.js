import React, { useState, useEffect} from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete} from '@react-google-maps/api';
import { GiPositionMarker } from 'react-icons/gi';
import axios from 'axios';

//import * from 'dotenv'.config();
import GreenMarker from '../img/pin.png';

const center = {lat:-16.541220,lng:-68.077371}

const Home = ()=>{
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAbluNxF5AA_wOlTwcG-i4pxMP3C5TlmyY',
        libraries:['places']
    });
    const [map, setMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [userCoords,setUserCoords] = useState({});

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

    useEffect(()=>{
        fetchPlaces();
    },[places]);

    return (
        <div>
            {!isLoaded && (
            <h2>No map yet</h2>
            )}
            {isLoaded && (
            <div className='map-container'>
                <GoogleMap center={center} zoom={14} mapContainerStyle={{width:'100vw',height:'80vh',textAlign:'center'}} onLoad={(map)=>setMap(map)} >
                {places.map((place)=>{
                    return (
                        <Marker key={place.latitude} position={{lat:place.latitude,lng:place.longitude}} />
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