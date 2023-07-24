import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const Register= ()=>{
    const [firstName,setFirstName] =useState('');
    const [lastName,setLastName] =useState('');
    const [email,setEmail] =useState('');
    const [pass,setPass] =useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [{user},dispatch] = useStateValue();

    const navigate = useNavigate();

    const register = async ()=>{
        try {
            const response = await axios({
                method:'post',
                url:'http://maspormenos.azurewebsites.net/auth/register/user',
                data:{
                    firstName,
                    lastName,
                    email,
                    password: pass,
                    age,
                    gender
                },
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status===200){
                alert('Registro exitoso');
                dispatch({
                    type: actionTypes.SET_USER,
                    user: {firstName,email}
                });
                localStorage.setItem('user', JSON.stringify({firstName,email}));
                return navigate('/');
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <h1>Registro de usuario</h1>
            <div>
                <h3>Por favor ingresa tus datos</h3>
                <label>Nombres</label><br/>
                <input type='text' value={firstName} onChange={(e)=>setFirstName(e.target.value)} /><br/>
                <label>Apellidos</label><br/>
                <input type='text' value={lastName} onChange={(e)=>setLastName(e.target.value)} /><br/>
                <label>Email</label><br/>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
                <label>Contraseña</label><br/>
                <input type='password' value={pass} onChange={(e)=>setPass(e.target.value)} /><br/>
                <label>Edad</label><br/>
                <input type='text' value={age} onChange={(e)=>setAge(e.target.value)} /><br/>
                <label>Genero</label><br/>
                <select  value={gender} onChange={(e)=>setGender(e.target.value)}>
                    <option disabled={true}>Selecciona tu genero</option>    
                    <option>Masculino</option>    
                    <option>Femenino</option>    
                </select><br/>
                <button onClick={register}>Registrar</button>
            </div>
        </div>
    )
};

export default Register;