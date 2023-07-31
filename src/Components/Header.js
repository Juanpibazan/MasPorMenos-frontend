import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {PiHandbagSimpleFill} from 'react-icons/pi';

import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import Logo4 from '../img/logo4.PNG';

const Header = ()=>{

    const [{user,cart_items},dispatch] = useStateValue();
    const navigate = useNavigate();

    return (
        <div>
            <div className='header-container'>
                <div className='logo-container'>
                    <a onClick={()=>navigate('/')}><img src={Logo4} /></a>
                </div>
                <nav className='navbar-container'>
                    <ul className='menu-container'>
                        <li>
                            <Link to={'/'}>Negocios afiliados</Link>
                        </li>
                        <li>
                            <Link>Conocenos</Link>
                        </li>
                        <li>
                            <Link>Contactanos</Link>
                        </li>
                        <li>
                            <Link to={'/business/register'}>Afilia tu negocio</Link>
                        </li>
                        {!user && (
                        <div className='menu-container2'>
                            <li>
                                <Link to={'/login/user'} >Iniciar sesion</Link>
                            </li>
                            <li>
                                <Link to={'/register/user'}>Registrarse</Link>
                            </li>
                        </div>
                        )}
                        {user && (
                        <div className='menu-container2'>
                            <li>
                                <Link>Mi Perfil</Link>
                            </li>
                            <li>
                                <Link>Mis Ordenes</Link>
                            </li>
                            <li style={{width:'50px',}}>
                                <a onClick={()=>navigate('/cart')} >
                                    <div style={{width:'100%', position:'relative',cursor:'pointer'}}>
                                        <PiHandbagSimpleFill style={{position:'absolute',top:0,left:0}} />
                                        <div style={{borderRadius:'50%',backgroundColor:'#8bf300', color:'#fff', fontSize:'10px',fontWeight:'bolder',padding:'3px 7px',textAlign:'center',position:'absolute',right:10, bottom:0}}>{cart_items && cart_items.length>0 ? cart_items.length : ''}</div>
                                    </div>
                                </a>
                            </li>

                        </div>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default Header;