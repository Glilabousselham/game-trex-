import React from 'react'
import trexImage from './images/treximg.gif'
import './style.css'
export default function Player({y}) {
  return (
    <div style={{bottom:(100+ +y)+"px"}} className='player'>
      <img src={trexImage} alt="" />
    </div>
  )
}
