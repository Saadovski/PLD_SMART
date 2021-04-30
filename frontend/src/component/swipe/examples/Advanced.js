import React, { useState, useMemo } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from '../react-tinder-card/index'
import "../../../styles/swipe.css";
import "../../../styles/box.css";

const db = [
  {
    name: 'Harry Péteur',
    url: './img/Harry.jpg'
  },
  {
    name: 'Seigneur des Anus',
    url: './img/Seigneur.jpg'
  },
  {
    name: 'Shtar Wars',
    url: './img/Shtar.jpg'
  },
  {
    name: 'Dildo le Eau-Bite',
    url: './img/Dildo.jpg'
  }

]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced () {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (

    <div class="box-centre swipe-color">
      <div class="box-en-haut">
          <h1>Commencez à swiper vos films!</h1>
          </div>
      <div className='cardContainer'>
        {characters.map((character, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'https://s2.qwant.com/thumbr/0x380/d/c/19413b85bd3dc732fac698946e259e635e66d912b3882ab7afb3d136496e28/Le_Seigneur_des_Anneaux_La_Communaute_de_l_anneau.jpg?u=http%3A%2F%2Fmedia.senscritique.com%2Fmedia%2F000007087597%2Fsource_big%2FLe_Seigneur_des_Anneaux_La_Communaute_de_l_anneau.jpg&q=0&b=1&p=0&a=0' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}>Swipe left!</button>
        <button onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText box_en_bas'>You swiped {lastDirection}</h2> : <h2 className='infoText box_en_bas'>Swipe a card or press a button to get started!</h2>}
    </div>
    
  )
}

export default Advanced
