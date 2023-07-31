import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const Cart = ()=>{

    const [{cart_items,user}, dispatch] = useStateValue();
    

    return (
        <div>
            <div>
                {cart_items && cart_items.length>0 && (
                cart_items.map((item)=>{
                    return (
                    <div className='cart-container' key={item.pk}>
                        <h2>Carrito</h2>
                        <div className='cart-single-container'>
                            <div>
                                <img src={item.image_url} />
                            </div>
                            {/*<div>
                            <h2>Producto: </h2>
                            <h2>Descripcion: </h2>
                            <h2>Precio normal: </h2>
                            <h2>Descuento:</h2>
                            <h2>Lo que pagarás:</h2>
                            </div>
                            <div>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <h3>{item.normal_price}</h3>
                            <h4>{item.percentage_discount}%</h4>
                            <h2>Bs. {item.normal_price*(1-(item.percentage_discount/100))}</h2>
                            </div> */}
                            <table>
                                <tr>
                                    <th>Producto:</th>
                                    <th>Description</th>
                                    <th>Precio normal</th>
                                    <th>Descuento</th>
                                    <th>Lo que pagarás</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.normal_price}</td>
                                        <td>{item.percentage_discount}</td>
                                        <td>Bs. {item.normal_price*(1-(item.percentage_discount/100))}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                    )
                })
                )}
            </div>
        </div>
    )
};

export default Cart;