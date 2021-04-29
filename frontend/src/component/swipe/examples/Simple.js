import React, { useState } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from '../react-tinder-card/index'
import "../../../styles/Swipe.css";
import "../../../styles/box.css";
import "../../../styles/textes.css";



const db = [

  {
    name: 'Harry Péteur',
    url: 'https://s2.qwant.com/thumbr/474x660/6/3/2ff8124bceef64e0784ee3e2c6d1b54178840b07bb0502d3900973eb8b4565/th.jpg?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CJUcKd5aVQzC1HkGsiyZ7QHaKU%26pid%3DApi&q=0&b=1&p=0&a=0'
  },
  {
    name: 'Seigneur des Anus',
    url: 'https://www.lescinemasaixois.com/films/affiche/affiche_13474.jpg?ts=1566461124'
  },
  {
    name: 'Shtar Wars',
    url: 'https://s1.qwant.com/thumbr/474x682/0/1/cf8d604ea35cec1be16fc0b3dd9a6238a72694840e2f03d8c4b48b3c4cf2cc/th.jpg?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.0JUABqufxR3Om2qmQFh5OQHaKq%26pid%3DApi&q=0&b=1&p=0&a=0'
  },
  {
    name: 'Dildo le Eau-Bite',
    url: 'https://s1.qwant.com/thumbr/474x474/2/7/2aab8ab15c3bd90334b5f272c04268209f1669b6509df8561103a3cc925502/th.jpg?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.z7Xgxj3U8fsIgKRTdq0kpQHaHa%26pid%3DApi&q=0&b=1&p=0&a=0'
  }
]

function Simple () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div class="box-centre swipe-color">
      
      <div class="box-en-haut">
      <h1 class="texte-blanc">Commencez à swiper vos films!</h1>
      </div> 
      <div className='cardContainer'>
        {characters.map((character) =>
        <div>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
          <div className=' background-vide'><h3>{character.name}</h3></div>

            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
            </div>
          </TinderCard>
          </div>
        )}
      </div>
      {lastDirection ? <h2 className='infoText texte-blanc box-en-bas'>You swiped {lastDirection}</h2> : <h2 className='infoText texte-blanc box-en-bas' />}
    </div>
  )
}

export default Simple
