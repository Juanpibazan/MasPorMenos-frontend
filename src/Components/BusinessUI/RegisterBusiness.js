import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';

const RegisterBusiness = ()=>{
    const [name,setName] =useState('');
    const [email,setEmail] =useState('');
    const [pass,setPass] =useState('');
    const [{user},dispatch] = useStateValue();

    const navigate = useNavigate();

    const register = async ()=>{
        try {
            const response = await axios({
                method:'post',
                url:'http://maspormenos.azurewebsites.net/auth/register/business',
                data:{
                    name,
                    email,
                    password: pass
                },
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status===200){
                alert('Registro exitoso');
                dispatch({
                    type: actionTypes.SET_USER,
                    user: {email}
                });
                localStorage.setItem('user', JSON.stringify({email}));
                return navigate('/business/add');
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <h1>Registro comercial</h1>
            <div>
                <h3>Por favor ingrese los datos comerciales de su empresa</h3>
                <label>Nombre comercial</label><br/>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)} /><br/>
                <label>Email</label><br/>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
                <label>Contraseña</label><br/>
                <input type='password' value={pass} onChange={(e)=>setPass(e.target.value)} /><br/>
                <button onClick={register}>Registrar</button>
            </div>
        </div>
    )
};

export default RegisterBusiness;