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
        <div style={{textAlign:'center'}}>
            <h1 style={{color:'#2ecf59'}}>Registro comercial</h1>
            <div>
                <h3>Por favor ingrese los datos comerciales de su empresa</h3>
                <strong><label>Nombre comercial</label></strong><br/><br/>
                <input style={{color:'#2ecf59',borderColor:'#2ecf59',padding:'5px 10px'}} type='text' value={name} onChange={(e)=>setName(e.target.value)} /><br/><br/>
                <strong><label>Email</label></strong><br/><br/>
                <input style={{color:'#2ecf59',borderColor:'#2ecf59',padding:'5px 10px'}} type='email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
                <strong><label>Contraseña</label></strong><br/><br/>
                <input style={{color:'#2ecf59',borderColor:'#2ecf59',padding:'5px 10px'}} type='password' value={pass} onChange={(e)=>setPass(e.target.value)} /><br/><br/>
                <div  style={{display:'flex', justifyContent:'center',gap:'10%'}}>
                    <button className='register-btn' onClick={register}>Registrar</button>
                    <button className='login-btn-alternative' onClick={()=>navigate('/business/login')}>Iniciar Sesion</button>
                </div>
            </div>
        </div>
    )
};

export default RegisterBusiness;