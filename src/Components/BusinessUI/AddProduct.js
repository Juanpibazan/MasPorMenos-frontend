import React,{useState, useEffect} from 'react';
import axios from 'axios';

import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';


const AddProduct = ()=>{

    const [{place_selected}, dispatch] = useStateValue();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(0.0);

    return (
        <div>
            {place_selected && (
                <div>
                    <h2>Agregar productos a:</h2>
                    <h3>{place_selected.name}</h3>
                    <div>
                        <label>Nombre del producto</label><br/>
                        <input type='text' value={name} onChange={(e)=>setName(e.target.value)} /><br/>
                        <label>Description del producto</label><br/>
                        <textarea type='text' value={description} onChange={(e)=>setDescription(e.target.value)} /><br/>
                        <label>Precio normal</label><br/>
                        <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} /><br/>
                        <button>Agregar</button>
                    </div>
                </div>
            )}

            <div>

            </div>
        </div>
    )
};

export default AddProduct;