import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const SingleProductWithDiscount = ({product})=>{

    const [{cart_items,user}, dispatch] = useStateValue();
    const [cartItems, setCartItems] = useState(cart_items ? cart_items : []);

    const addToCart = ()=>{
        setCartItems(cartItems.filter(item=>item.pk===product.pk).length===0 ? current => [...current,product] : cart_items);
    };

    useEffect(()=>{
        cartItems.map((item)=>{
            item.quantity=1;
            return item;
        });
        dispatch({
            type:actionTypes.SET_CART_ITEMS,
            cart_items:cartItems
        });
        localStorage.setItem('cart_items',JSON.stringify(cartItems));
        console.log('CartItems: ', cartItems);
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
                    <button onClick={addToCart} className='apartar-btn'>Apartar</button>
                </div>
            </div>
        )
};

export default SingleProductWithDiscount;
