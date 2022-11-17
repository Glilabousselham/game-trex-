import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Enime from './Enime'
import Player from './Player'
import "./style.css"

const gameWidth = 800
const gameHeight= 400

var ii;

const initGame = {
  enimeX : 500,
  playerY:0,
  jumping:false,
  up:false,
  gameOver:false
}
const frame = 10
const enimeSpeed = 2
const playerJumbingSpeed = 5
const playerJumbingOffSpeed = 2
const maxJump = 100

export default function GameContainer() {
  const [gameState,setGameState] = useState(initGame)

  


  const PlayerJump = ()=>{
    setGameState((old)=>{
      const {up,playerY,jumping}=old
      var newPlayerY = playerY
      var newJumping = jumping
      var newUp = up
      if (jumping) {

        if(up){

          newPlayerY  = playerY + playerJumbingSpeed
          if (playerY > maxJump) {
            newUp = false
          }
        }else{
            newPlayerY  = playerY - playerJumbingOffSpeed
            if (playerY < 0) {
              newJumping = false
              newPlayerY = 0
            }
        }

      }
      
      
      return {...old,playerY:newPlayerY,jumping:newJumping,up:newUp}
    
    })
  }


  const enimeMove = ()=>{
    setGameState((old)=>{
      let newEnimeX = old.enimeX - enimeSpeed
      if(old.enimeX <-70){
        newEnimeX=gameWidth
      }
      return {...old, enimeX:newEnimeX}
    })
  }



  const checkGameOver = ()=>{
    setGameState((old)=>{
      const {enimeX,playerY} = old

      if (enimeX<50 && enimeX>20 && playerY<20 ) {
        clearInterval(ii)
        return {...old,gameOver:true}
      }
      
      return {...old}

    })
  }

  useEffect(()=>{
   startGame()
    return ()=>{
      clearInterval(ii)
    }
  },[])

  const onClick=()=>{
    // console.log('click');
    // console.log(gameState);
      if (gameState.jumping) {
        return false
      }
      setGameState(old=>{return{...old,jumping:true,up:true}})
    }



  const startGame=() =>{
    setGameState(initGame)
     ii = setInterval(() => {
      PlayerJump()
      enimeMove()
      checkGameOver()
      // console.log(gameState);
    }, frame);
  }
  const {enimeX,playerY} =gameState
  return (
    <div  className='gameContainer'>
      <Enime x={enimeX}/>
      <Player y={playerY}/>

      
      {gameState.gameOver?<GameOver startGame={startGame}/>:<button onClick={onClick} className='jump-btn'>JUMP</button>}
    </div>
  )
}



const GameOver = ({startGame})=>{
  return <div className='gameOver'>
      <div>
        <div>GameOver</div>
        <button onClick={startGame} className='btn'>play again</button>

      </div>
    </div>
}