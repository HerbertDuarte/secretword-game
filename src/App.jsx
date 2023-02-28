// CSS
import './App.css'
// COMPONENTS
import Start from './components/Start'
import End from './components/End'
import Game from './components/Game'
// LIBS
import { useState, useCallback, useEffect } from 'react'
// DATA
import { wordsList } from './data/words.js'

function App() {
  // CONSTS
  const words = wordsList  
  const [stage, setStage] = useState('start')
  const [pickedword, setPickedword] = useState('')
  const [pickedcategory, setpickedcategory] = useState('')
  const [letters, setLetters] = useState('')
  let [wrongLetters, setWrongLetters] = useState([])
  const [hits, setHits] = useState([])
  const [chances, setChances] = useState(5)
  const [guesses, setGuesses] = useState(-1000)

  // NAVIGATION FUNCTIONS
  const startGame = () => {
    const [word, category] = pickWordAndCategoy()
    const wordLetters = word.toLowerCase().split('')
    setHits([])
    setWrongLetters([])
    if(chances == 0){
      setGuesses(0)
    }else{
      setGuesses(guesses + 1000)
    }
    setChances(5)
    setPickedword(word)
    setpickedcategory(category)
    setLetters(wordLetters)
    setStage('game')
  }
  
  const retry = () => setStage('start')

  const pickWordAndCategoy = () =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return[ word , category ]
  }

  return (
    
    <div className="App">
      {stage == 'start' && <Start click={startGame}/>}
      {stage == 'game' && (
      <Game  
      word={letters} 
      category={pickedcategory}
      setStage={setStage}
      hits={hits}
      setHits={setHits}
      chances ={chances}
      setChances={setChances}
      guesses= {guesses}
      setGuesses = {setGuesses}
      wrongLetters={wrongLetters}
      setWrongLetters={setWrongLetters}
      startGame={startGame}
       />
      )}
      {stage == 'end' && <End 
      click={retry}
      guesses = {guesses}
      />}
    </div>
  )
}

export default App
