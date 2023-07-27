import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';

const LoginBusiness = ()=>{
    const [email,setEmail] =useState('');
    const [pass,setPass] =useState('');
    const [{user},dispatch] = useStateValue();

    const navigate = useNavigate();

    const login = async ()=>{
        try {
            const response = await axios({
                method:'post',
                url:'http://maspormenos.azurewebsites.net/auth/login/business',
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
                    user: {name: response.data.business_name,email}
                });
                localStorage.setItem('user', JSON.stringify({name: response.data.business_name,email}));
                return navigate('/business/add');
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div style={{textAlign:'center'}}>
            <h1 style={{color:'#2ecf59'}}>Login comercial</h1>
            <div>
                <h3>Por favor ingrese los datos de su empresa</h3>
                <strong><label>Email</label></strong><br/><br/>
                <input style={{color:'#2ecf59',borderColor:'#2ecf59',padding:'5px 10px'}} type='email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
                <strong><label>Contraseña</label></strong><br/><br/>
                <input style={{color:'#2ecf59',borderColor:'#2ecf59',padding:'5px 10px'}} type='password' value={pass} onChange={(e)=>setPass(e.target.value)} /><br/><br/>
                <div style={{display:'flex', justifyContent:'center',gap:'10%'}}>
                    <button className='login-btn' onClick={login}>Iniciar Sesion</button>
                    <button className='register-btn-alternative' onClick={()=>navigate('/business/register')}>Registrar</button>
                </div>

            </div>
        </div>
    )
};

export default LoginBusiness;