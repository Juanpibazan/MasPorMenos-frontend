import React, {useState,useEffect} from 'react';
import axios from 'axios';

import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';


const SingleProduct = ({product})=>{

    const [discountVisible,setDiscountVisible] = useState(false);
    const [readyToAdd,setReadyToAdd] = useState(false);
    const [productSelected,setProductSelected] = useState({});
    const [discount,setDiscount] =useState(0.0);
    const [{place_selected},dispatch] = useStateValue();

    const selectProduct = ()=>{
        setProductSelected(product);
        setReadyToAdd(true);
        console.log(productSelected);
    };

    useEffect(()=>{
        const addDiscount = async ()=>{
            try {
                const response = await axios({
                    method:'post',
                    url:'http://maspormenos.azurewebsites.net/products/discount/add',
                    data:{
                        product_id: productSelected.pk,
                        place_id: place_selected.pk,
                        maps_place_id: place_selected.maps_id,
                        percentage_discount: discount
                    },
                    headers:{
                        "Content-Type":"application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                        "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
                    }
                });
                if(response.status===200){
                    alert('Descuento agregado exitosamente');
                    //setDiscountVisible(!discountVisible);
                }
             
            } catch (error) {
                console.log(error);
            }
        };
        if(Object.keys(productSelected).length>0 && readyToAdd){
            addDiscount();
            console.log(productSelected);
        }
    },[productSelected,readyToAdd]
    )

    return (
        <div key={product.pk}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>{product.normal_price}</h4>
            <button onClick={()=>setDiscountVisible(!discountVisible)}>Agregar descuento</button>
            {discountVisible && (
                <div>
                    <label>Descuento en % </label>
                    <input type='text' value={discount} onChange={(e)=>setDiscount(e.target.value)} />
                    <button onClick={selectProduct}>Confirmar</button>
                    <button onClick={()=>setDiscountVisible(!discountVisible)} >Cancelar</button>
                </div>
            )}
        </div>
    )
};

export default SingleProduct;