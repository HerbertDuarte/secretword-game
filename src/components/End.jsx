import './End.css'

const End = ({click, guesses}) => {
  return (
    <div className='endscreen'>
      <h1>Fim de jogo!</h1>
      <p id='finalScore' className='finalScore'>Sua pontuação foi : <span>{guesses}</span></p>
      <button onClick={click}>
        Reiniciar o jogo
      </button>
    </div>
  )
}

export default End