import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../actions';
import './Modal.css';


export default function Modal() {
    
    let getStorage = JSON.parse(localStorage.getItem('ListaStorage'));
    const dispatch = useDispatch();
    const [lista, setLista] = useState(getStorage ? getStorage : [] );
    const [inputText, setInputText] = useState('');
    const [imgPreview, setImgPreview] = useState(null);
    const [peliculaAgregada, setPeliculaAgregada] = useState(false);
    const [error, setError] = useState(false);
    const [filled, setFilled] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    
    
    useEffect(() => {
      if (filled < 100 && isRunning) {
        setTimeout(() => setFilled(prev => prev += 2), 50)
      }
      
      if(imgPreview){
        setIsRunning(true);
        
        let findImg = lista.filter(el => el.img === imgPreview)
        
        if(findImg.length > 0){
          setError(true)
        }else{
          setError(false)
        }

      }
    },[filled, isRunning, imgPreview, lista])
   

    function handleInputChange(e){      
      e.preventDefault()
      setInputText(e.target.value)
    }
    

    function handleImgInputChange(e){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      
      reader.onload = (e) => {
        e.preventDefault()
        setImgPreview(e.target.result) 
      } 
    }
    

    function handleAgregar(e){                                         
          e.preventDefault();

          setLista([...lista, {
            
              img: imgPreview,
              title: inputText                              
          }]); 

          // setInputText('');
          setImgPreview(null);
          setPeliculaAgregada(true);    
      }
    
    function closeModal(e){
      dispatch(openModal(false))
    }
    
    function resetModal(e){
      dispatch(openModal(false));

      setTimeout(() => dispatch(openModal(true)), 50);
    }
    
    localStorage.setItem('ListaStorage', JSON.stringify(lista));    
    localStorage.setItem('Input', JSON.stringify(inputText));   
     
  return (
      <div className='modal-back'>
        <div className='modal-container'>
            <div className='mod-logo'>
              <p className='mod-lite'>LITEFLIX</p> 
            </div>

          {!peliculaAgregada ? 
              <div>

                <p className='modal-title'>AGREGAR PELÍCULA</p>
                  <button className='close-btn' onClick={(e) => closeModal(e)}>X</button>
                  
                  <form className='form-modal' onSubmit={(e) => handleAgregar(e)}>
                  {!imgPreview ?
                    
                    <label className='label'>
                      <input type='file' accept='image' onChange={(e) => handleImgInputChange(e)}></input>
                          <span className='drag-span'>Agregá un archivo o arrastralo y soltalo aquí</span> 
                          <span className='drag-span-resp'>Agregá un archivo</span> 
                    </label>
                    
                    : 
                        
                    <div>
                      {filled === 100 && error ?
                        <div>
                          <span className="progressPercent">¡error! no se pudo cargar la película</span>
                          <div className="progressbar">
                            <div style={{ height: "100%", width: `${filled}%`,backgroundColor: "red", transition:"width 0.5s"}}></div>
                          </div>
                        <p className='modal-cancelar' onClick={(e) => resetModal(e)}>reintentar</p>
                        </div>
                        :
                        <div>
                          <span className="progressPercent">cargando { filled }%</span>
                          <div className="progressbar">
                            <div style={{ height: "100%", width: `${filled}%`,backgroundColor: "#64EEBC", transition:"width 0.5s"}}></div>
                          </div>
                          {filled === 100 && !error ?
                          
                          <p className='modal-listo'>¡Listo!</p>
                          : <p className='modal-cancelar' onClick={(e) => closeModal(e)}>cancelar</p>
                        } 
                      </div>}
                    </div>
                  }
                        
                      
                    <div>
                      <input className='modal-nombre' type="text" placeholder='Título' onChange={ (e) => handleInputChange(e) }></input>
                      <hr></hr>
                    </div> 

                    {!imgPreview || !inputText || error || filled < 100 ?
                      <button className='modal-btn-no' type='submit' disabled >subir película</button> :
                      <button className='modal-btn-ok' type='submit'>subir película</button>
                    }
                    <button className='salir-btn' onClick={(e) => closeModal(e)}>Salir</button> 
                  </form>
              </div> :
                
              <div>
                <p className='modal-title-ok'>Liteflix</p>
                <button className='close-btn' onClick={(e) => closeModal(e)}>X</button>
                <p className='modal-felicitaciones'>¡Felicitaciones!</p>
                <p className='modal-felicitaciones'>{inputText && inputText} fue correctamente subida</p>
                <button className='modal-btn-home' type='text' onClick={(e) => closeModal(e)}>Ir a Home</button>  
              </div>}
        
        </div>
    </div>
  )
}
