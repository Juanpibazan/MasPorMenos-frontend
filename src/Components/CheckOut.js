import React, {useState, useEffect} from 'react';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const CheckOut = ()=>{

    const [{order}, dispatch] = useStateValue();
    const [totalPrice, setTotalPrice] = useState(0);

    const pricesArray = [];

    useEffect(()=>{
        const singlePrices = Array.from(document.getElementsByClassName('checkout-single-price'));
        singlePrices.map((price)=>{
            pricesArray.push(price.innerHTML.split('Bs. ')[1])
            return pricesArray;
        });
        const myPrice = pricesArray.length>1 ? pricesArray.reduce((a,b)=>parseFloat(a)+parseFloat(b)) : parseFloat(pricesArray[0]);
        setTotalPrice(myPrice);
    });


    return (
        <div>
        <h1>Check Out</h1>
        <div className='checkout-container'>
            <div className='checkout-subcontainer'>
                {order.map((item)=>{
                    return (
                    <div key={item.place_id+item.product_id+item.discount_id} className='checkout-item-container'>
                        <h3>{item.place_name}</h3>
                        <div className='checkout-item-subcontainer'>
                            <div style={{width:'20%',height:'80%'}}>
                                <img src={item.image_url} />
                            </div>
                            <h2>{item.name}</h2>
                            <h2 className='checkout-single-price'>Bs. {item.total_Bs}</h2>
                        </div>
                    </div>
                    )
                })}

            </div>
            <div className='checkout-second-subcontainer'>
                <h1>Bs. {totalPrice}</h1>
                <div>
                    <h2>Payment Gateway</h2>
                </div>
            </div>
        </div>
        </div>
    )
};

export default CheckOut;