import React, {useState,useEffect, useRef} from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';

const center = {lat:-16.541220,lng:-68.077371}

const AddBusiness = ()=>{

    const [map,setMap] = useState(null);
    const [placesDetails, setPlacesDatails] = useState([]);
    const nameRef = useRef();
    const API_KEY = 'AIzaSyAbluNxF5AA_wOlTwcG-i4pxMP3C5TlmyY';

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries:['places']
    });

    /*useEffect(()=>{
        const script = document.createElement('script');
        script.src=`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
        script.async=true;
        script.crossOrigin='anonymous';
        document.body.appendChild(script);
    });*/

    const getCandidates = async ()=>{
        const formattedPlace = nameRef.current.value.replace(' ','%20').replace(',','!4d');
        const {data} = await axios({
            method:'post',
            url:`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${formattedPlace}&inputtype=textquery&key=${API_KEY}`,
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
            }
        });
        console.log(data.candidates);
        return data.candidates;
    };

    const fetchPlaces = async (candidate)=>{
        const {place_id} = candidate;
        const {data} = await axios({
            method:'post',
            url:`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${API_KEY}`,
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
            }
        });
        console.log(data.result);
        return setPlacesDatails([...placesDetails,data.result]);
    };

    const getDetailsLoop = async ()=>{
        let candidates = await getCandidates();
        const newCandidates = candidates.map(  (candidate)=>{
            const currentCandidate = fetchPlaces(candidate);
            return currentCandidate;
        })
        console.log('These are the candidates: ',newCandidates);
        console.log('placesDetails: ',placesDetails);
    }

        return (
            <div>
                {!isLoaded && (
                    <h1>Falta cargar</h1>
                )}
                {isLoaded && (
                    <div>
                        <h2>Registro de Negocio</h2>
                        <p>Por favor ingrese el nombre de su negocio y luego valide los datos que aparezcan despues de haber ingresado el nombre</p>
                        <div className='business-add-container'>
                            <Autocomplete>
                                <input type='text' ref={nameRef} />
                            </Autocomplete>
                            <button onClick={getDetailsLoop}>Validar</button>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-around'}}>
                            <div >
                                {placesDetails.map((place)=>{
                                    return (
                                        <div key={place.place_id}>
                                            <input type='text' value={place.name} /><br/>
                                            <input type='text' value={place.geometry.location.lat} /><br/>
                                            <input type='text' value={place.geometry.location.lng}/>
                                        </div>
                                    )
                                })}

                            </div>
                            <GoogleMap center={center} zoom={12} mapContainerStyle={{width:'500px',height:'500px',textAlign:'center'}} onLoad={(map)=>setMap(map)}>
                                {placesDetails.map((place)=>{
                                    return (
                                        <Marker position={{lat:place.geometry.location.lat,lng:place.geometry.location.lng}} />
                                    )
                                })}
                            </GoogleMap>
                        </div>
                    </div>
                )}

            </div>
        )
};

export default AddBusiness;