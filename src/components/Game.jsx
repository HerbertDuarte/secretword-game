import './Game.css'
import { useState, useRef, useEffect } from 'react'

const Game = ({word, category, setStage, wrongLetters, setWrongLetters, hits, setHits, guesses, setGuesses, chances, setChances, startGame}) => {

  const [letter, setLetter] = useState('')
  const letterInputRef = useRef(null)
  const [storageLetter, setStorageLetter] = useState([])
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    
  }

  useEffect(()=>{
    if(chances == 1 ){
      alert('Ultima chance, se você errar o jogo acaba!')
    }

    else if (chances <= 0){
      let simpleWord = word.join('')
      simpleWord = simpleWord.toString().toUpperCase()
      alert('Fim de jogo!\nA palavra era : ' + simpleWord)
      setStage('end')
    }
  }, [wrongLetters])

  useEffect(()=>{

    const uniqueLetters = [...new Set(word)]
  
    // win condition

    if(hits.length === uniqueLetters.length){
      startGame()
    }

  }, [hits])

  const verifyLetter = (letter) =>{

    if(hits.includes(letter) || wrongLetters.includes(letter)){
      alert('Essa letra já foi digitada!')
      setLetter('')
      letterInputRef.current.focus()
        return;
    }
    else if(letter == '' || letter == ' '){
      alert('Digite alguma letra!')
      setLetter('')
      letterInputRef.current.focus()
      return;
    }
    else{
      if(word.includes(letter)){
        setHits([
          ...hits,
        letter
        ])
        setGuesses(guesses + 100)
      }else{
        setWrongLetters([
          ...wrongLetters,
          letter
        ])
        setChances(chances - 1)
        
      }
    }
    setLetter('')
    letterInputRef.current.focus()
  }

  return (
    <div className='gamescreen'>
      <h1 className='adv'>Secret Word</h1>
      <h2 className='tip'>Dica : <span className="category">{category}</span></h2>

      <div className='container'>

        <h4 className='instruction'>Tente adivinhar uma letra da palavra:</h4>

        <div className='word'>
          {word.map((wordLetter, i) =>{
            let wordClass = ''
            hits.includes(wordLetter) ? (wordClass = 'letter') : (wordClass = 'letter blankLetter')
            return(
            <div
            key={i} 
            className={wordClass}
            >
              {wordLetter}
            </div>
            )
          })}
        </div>

        <p id='score' className='score'>Pontuação: <span>{guesses}</span></p>

        <form onSubmit={(e)=> handleSubmit(e)}>
          <input 
          maxLength={1} 
          autoComplete='off' 
          type="text" 
          name="letter" 
          id="letter"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          ref={letterInputRef} />
        <button onClick={() => verifyLetter(letter)}>Confirmar</button>
        </form>

        <div className="wrongLetters">
          <span>Letras erradas :</span>
          {wrongLetters.map((wrong, i) => (
            <span key={i} className='wl'>{wrong}</span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Game