import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const CartItem = ({item})=>{

    const [{cart_items,user,is_change}, dispatch] = useStateValue();
    const [quantity,setQuantity] = useState(1);
    const [isChange, setIsChange] = useState(false);
    
    const removeFromCart = ()=>{
        dispatch({
            type:actionTypes.SET_CART_ITEMS,
            cart_items: cart_items.filter(product=>product.pk!==item.pk)
        })
        localStorage.setItem('cart_items',JSON.stringify(cart_items.filter(product=>product.pk!==item.pk)));
    };

    /*const changeQuantity = (change)=>{
        setQuantity(quantity + change);
        setIsChange(true);
    };*/

    useEffect(()=>{
        cart_items.map((item)=>{
            item.quantity=quantity;
            return item;
        });
        setIsChange(!isChange);
    },[quantity]);

    useEffect(()=>{
        dispatch({
            type: actionTypes.SET_IS_CHANGE,
            is_change: isChange
        });
        localStorage.setItem('is_change',JSON.stringify(isChange));
    },[isChange]);

    return (
        <div className='cart-container' key={item.pk}>
            <div className='cart-single-container'>
                <div className='cart-img-container'>
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
                <table className='cart-table'>
                    <tr className='table-row'>
                        <th>Producto</th>
                        <th>Description</th>
                        <th>Precio normal</th>
                        <th>Descuento</th>
                        <th>Unidades</th>
                        <th>Lo que pagarás</th>
                    </tr>
                    <tbody>
                        <tr className='table-row'>
                            <td className='table-data'>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.normal_price}</td>
                            <td>{item.percentage_discount}</td>
                            <td style={{display:'flex',justifyContent:'space-evenly'}}>
                                <button className='change-qty-btn' onClick={()=>setQuantity(quantity+1)} >+</button>
                                {quantity}
                                <button className='change-qty-btn' onClick={()=>setQuantity(quantity-1)} >-</button>
                            </td>
                            <td className='discounted_price'>Bs. {quantity*item.normal_price*(1-(item.percentage_discount/100))}</td>

                            <button onClick={removeFromCart}>Eliminar</button>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    )
};

export default CartItem;