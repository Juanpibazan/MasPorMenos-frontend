import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const Login = ()=>{
    const [email,setEmail] =useState('');
    const [pass,setPass] =useState('');
    const [{user},dispatch] = useStateValue();

    const navigate = useNavigate();

    const login = async ()=>{
        try {
            const response = await axios({
                method:'post',
                url:'http://maspormenos.azurewebsites.net/auth/login/user',
                data:{
                    email,
                    password: pass
                },
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status===200 && response.data){
                alert('Login exitoso');
                dispatch({
                    type: actionTypes.SET_USER,
                    user: {fisrtName: response.data.first_name,email}
                });
                localStorage.setItem('user', JSON.stringify({fisrtName: response.data.first_name,email}));
                return navigate('/');
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <h1>Login</h1>
            <div>
                <h3>Por favor ingresa tus datos</h3>
                <label>Email</label><br/>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
                <label>Contraseña</label><br/>
                <input type='password' value={pass} onChange={(e)=>setPass(e.target.value)} /><br/>
                <button onClick={login}>Log In</button>
            </div>
        </div>
    )
};

export default Login;