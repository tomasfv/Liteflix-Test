

import React from 'react';
import './Card.css'
import { HiOutlinePlayCircle } from 'react-icons/hi2'


export default function Card({title, image, rating, date}) {
  
  return (
    <div className='card-container'>
      <img src={image} alt='img not found'  className="card-img"/>
      <span className='card-play'>{<HiOutlinePlayCircle/>}</span>
      <span className='card-title'>{title}</span>
      <span className='card-rating'>{rating}</span>
      <span className='card-date'>{date}</span>


    </div>
  )
}
