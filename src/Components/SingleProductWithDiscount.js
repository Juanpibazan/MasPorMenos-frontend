import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const SingleProductWithDiscount = ({product})=>{

    const [cartItems, setCartItems] = useState([]);
    const [{cart_items,user}, dispatch] = useStateValue();

    const addToCart = ()=>{
        console.log('CartItems: ',cartItems);
    };

    useEffect(()=>{
        addToCart();
        dispatch({
            type:actionTypes.SET_CART_ITEMS,
            cart_items:cartItems
        });
        localStorage.setItem('cart_items',JSON.stringify(cartItems));
    },[cartItems]);


        return (
            <div key={product.pk}>
                <div className='info-pane-subcontainer'>
                    <div>
                        <h3>{product.name}</h3>
                        <h2>{product.percentage_discount} % <strong>OFF</strong></h2>
                        <p>{product.description}</p>
                    </div>
                <div className='info-pane-img-container'>
                    <img src={product.image_url} />
                </div>
                </div>
                <div className='apartar-btn-container'>
                    <button onClick={()=>setCartItems([...cartItems,product])} className='apartar-btn'>Apartar</button>
                </div>
            </div>
        )
};

export default SingleProductWithDiscount;
