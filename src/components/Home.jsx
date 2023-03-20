import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDestacada} from '../actions'
import './Home.css'
import NavBar from './NavBar';
import Dropdown from './Dropdown';
import Modal from './Modal';
import { BsPlay } from 'react-icons/bs';
import { BsPlusLg } from "react-icons/bs";




export default function Home() {
    const dispatch = useDispatch();
    const destacadas = useSelector((state => state.destacada));
    const modal = useSelector((state => state.modal));
    const peliculaDestacada = destacadas.results && destacadas.results[7];
    const img = peliculaDestacada && 'https://image.tmdb.org/t/p/original' + peliculaDestacada.backdrop_path;
    
    
    useEffect (() =>{                                                      
        dispatch(getDestacada());
                                  
    }, [dispatch]);
    
    
    
    return (
      <div>
        <div style={{ backgroundImage: `url(${img})`, 
                      backgroundRepeat: 'no-repeat', 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      objectFit: 'cover', 
                      position: 'fixed', 
                      width: '100%', 
                      height: '100%',
                      }}>
        </div>
          <div className='components-container'>
          <NavBar/>
            
            <div className='home-container'>
              <div className='original-container'>
                <h4 className='home-original'>original de</h4>
                <h4 className='original-liteflix'>liteflix</h4>
              </div>
              
              <div className='title-container'>
                {peliculaDestacada && <h2 className='destacada-title' >{peliculaDestacada.original_title}</h2>}
              </div>
              
              <div className='btns-container'>
                <button className='reproducir-btn'><i className='bsplay'>{<BsPlay/>}</i>Reproducir</button>
                <button className='lista-btn'><i className='bsplus'>{<BsPlusLg/>}</i>Mi Lista</button>
              </div>
            </div>
            <div className='home-dropdown'>
                <Dropdown/>
            </div>

          </div>
            

        {modal && <Modal/>}
  
      </div>
  )
}
