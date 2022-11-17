import React from 'react'
import { useEffect } from 'react'
import enimeImage from './images/enimeimg.png'
import './style.css'
export default function Enime({x}) {

  return (
    <div style={{left:x+"px"}} className='enime'>
      <img src={enimeImage} alt="" />
    </div>
  )
}
