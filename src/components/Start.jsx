import "./Start.css"

const start = ({click}) => {

  return (
    <div className='startscreen'>
      <h1>Secret Word</h1>
      <p>Clique no botão para começar a jogar!</p>
      <button onClick={click}>
        Começar o jogo
      </button>
    </div>
  )
}

export default start