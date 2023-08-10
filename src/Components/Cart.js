import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import CartItem from './CartItem';

const Cart = ()=>{

    const [{cart_items,user,order, place_selected,is_change}, dispatch] = useStateValue();
    const [totalBs,setTotalBs] = useState(0);
    const navigate = useNavigate();


    useEffect(()=>{
        const myArray = [];
        const myPrices = document.getElementsByClassName('discounted_price');
        const newArray = Array.from(myPrices).map((item)=>{
            myArray.push(item.innerHTML.split('Bs. ')[1]);
            console.log('MyArray: ',myArray);
            return myArray;
        });
        const totalPrice = myArray.length>1 ? myArray.reduce((a,b)=>parseFloat(a)+parseFloat(b)) : parseFloat(myArray[0]);
        setTotalBs(totalPrice);
        console.log(totalBs);
    },[is_change]);
    
    const goToCheckOut = ()=>{
        const orderArray = [];
        cart_items.map((item)=>{
            let product = {
                name:item.name,
                product_id: item.pk,
                description: item.description,
                image_url: item.image_url,
                place_id: item.place_id,
                place_name: item.place_name,
                user_email:user.email,
                maps_place_id: item.maps_place_id,
                quantity: item.quantity,
                discount_id:item.discount_id,
                total_Bs: item.quantity*item.normal_price *(1-(item.percentage_discount/100))
            }
            orderArray.push(product);
            return orderArray;
        });
        console.log('OrderArray: ',orderArray);
        dispatch({
            type:actionTypes.SET_ORDER,
            order: orderArray
        });
        localStorage.setItem('order',JSON.stringify(orderArray));
        return navigate('/checkout');
    };

    return (
        <div className='big-cart-container'>
            <div style={{width:'100%'}}>
                <h2>Carrito</h2>
                {cart_items && cart_items.length>0 && (
                cart_items.map((item)=>{
                    return (
                        <CartItem item={item} />
                    )
                })
                )}
            </div>
            <div className='total-to-pay-container'>
                <h1>Total a pagar:</h1>
                <h2>Bs. {totalBs}</h2>
                <button onClick={goToCheckOut}>Check Out</button>
            </div>    
        </div>
    )
};

export default Cart;