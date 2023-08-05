import React, {useState, useEffect} from 'react';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const CheckOut = ()=>{

    const [{order}, dispatch] = useStateValue();

    return (
        <div>
            <h1>Check Out</h1>
            <div>
                {order.map((item)=>{
                    return (
                    <div key={item.place_id+item.product_id+item.discount_id} style={{width:'100%'}}>
                        <h3>{item.place_name}</h3>
                        <div className='checkout-subcontainer'>
                            <div style={{width:'20%',height:'80%'}}>
                                <img src={item.image_url} />
                            </div>
                            <h2>{item.name}</h2>
                            <h2>Bs. {item.total_Bs}</h2>
                        </div>
                    </div>
                    )
                })}

            </div>
        </div>
    )
};

export default CheckOut;