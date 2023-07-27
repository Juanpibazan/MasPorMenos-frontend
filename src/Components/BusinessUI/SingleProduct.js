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
                    setDiscountVisible(false);
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
        <div className='SingleProduct' key={product.pk}>
            <div className='single-product-container'>
                <div>
                    <img src={product.image_url} />
                </div>
                <div style={{maxWidth:'30%'}}>
                    <span style={{color:'#00bd86',fontWeight:'bold'}}>Nombre del producto: </span><h3>{product.name}</h3>
                    <span style={{color:'#00bd86',fontWeight:'bold'}}>Descripcion del producto: </span><strong><p>{product.description}</p></strong>
                    <span style={{color:'#00bd86',fontWeight:'bold'}}>Precio normal del producto: </span><h3> Bs. {product.normal_price}</h3>
                    <button className='add-discount-btn' onClick={()=>setDiscountVisible(!discountVisible)}>Agregar descuento</button>
                </div>

            </div>

            {discountVisible && (
                <div>
                    <label>Descuento en % </label>
                    <input type='text' value={discount} onChange={(e)=>setDiscount(e.target.value)} />
                    <button className='confirm-discount-btn' onClick={selectProduct}>Confirmar</button>
                    <button className='cancel-btn' onClick={()=>setDiscountVisible(!discountVisible)} >Cancelar</button>
                </div>
            )}
        </div>
    )
};

export default SingleProduct;