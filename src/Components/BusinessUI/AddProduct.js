import React,{useState, useEffect} from 'react';
import axios from 'axios';

import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import SingleProduct from './SingleProduct';


const AddProduct = ()=>{

    const [{place_selected}, dispatch] = useStateValue();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(0.0);
    const [savedProducts,setSavedProducts] = useState([]);

    const add_product = async ()=>{
        const response = await axios({
            method:'post',
            url:'http://maspormenos.azurewebsites.net/products/add',
            data:{
                name,
                description,
                place_id: place_selected.pk,
                maps_place_id:place_selected.maps_id,
                normal_price:price
            },
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
            }
        });
        if(response.status===200){
            alert('Producto agregado exitosamente!');
        }
    };

    useEffect(()=>{
        console.log('THE PK IS: ',place_selected.pk);
        const fetchProducts = async ()=>{
            const {data} = await axios({
                method:'get',
                url:`http://maspormenos.azurewebsites.net/products/${place_selected.pk}`,
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                    "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
                }
            });
            console.log('Saved products fetched: ',data);
            return setSavedProducts(data);
        };
        fetchProducts();
    });

    useEffect(()=>{
        console.log('savedProducts fetched: ',savedProducts);
    },[savedProducts]);

    return (
        <div>
            {place_selected && (
                <div>
                    <h2>Agregar productos a:</h2>
                    <h3>{place_selected.name}</h3>
                        <div style={{display:'flex',justifyContent:'space-around'}}>
                        <div>
                            <label>Nombre del producto</label><br/>
                            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} /><br/>
                            <label>Description del producto</label><br/>
                            <textarea type='text' value={description} onChange={(e)=>setDescription(e.target.value)} /><br/>
                            <label>Precio normal</label><br/>
                            <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} /><br/>
                            <button onClick={add_product}>Agregar</button>
                        </div>
                            {savedProducts.length>0 && (
                            <div>
                            {savedProducts.map((product)=>{
                                return (
                                    <SingleProduct product={product} />
                                )
                            })}
                            </div>
                            )}

                        </div>

                </div>
            )}

            <div>

            </div>
        </div>
    )
};

export default AddProduct;