import { Square } from "./components/Square"
import { TURNS } from "./logic/Turns"
import { WINNERCOMBINATIONS } from "./logic/WinnerCombinations"
import { useState, useEffect } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(false)

  function handleDarkMode() {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    // Cargar la preferencia de modo oscuro del localStorage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    // Guardar la preferencia de modo oscuro en el localStorage
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
    
  }, [darkMode]);

  //CREAMOS TABLERO
  const [board, setBoard] = useState(Array(9).fill(null))

  //CREAMOS EL STATE DE LOS TURNOS
  const [turn, setTurn] = useState(TURNS.X)

  //CREAMOS UN STETE PARA MANEJAR GANADORES
  const [winner, setWinner] = useState(null)
  const [contWinX, setContWinX] = useState(0)
  const [contWinO, setContWinO] = useState(0);
  

  function updateBoard(index) {
    //SI HAY ALGO EN EL CUADRADO NO DEVUELVE/HACE NADA
    if (board[index] || winner) return

    //CREAMOS UNA COPIA DEL TABLERO
    const newBoard = [...board]

    //MODIFICO EL NUEVO TABLERO CON EL MOVIMIENTO Y ACTUALIZO EL 
    //TABLERO Y LOS TURNOS
    newBoard[index] = turn
    setBoard(newBoard)
    findWinner(newBoard)

    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
  }
  
  function findWinner(board) {
    WINNERCOMBINATIONS.forEach((combination) => {
      const [a, b, c] = combination

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a])
        
        if (board[a] === TURNS.X) {
          setContWinX(prevCount => prevCount + 1);
        } else if (board[a] === TURNS.O) {
          setContWinO(prevCount => prevCount + 1);
        }
  
        return;
      }
    })
  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)
  }

  return (
    <div className={`flex flex-col min-h-screen bg-white dark:bg-black duration-100 ease-in`}>
      
      <header className="bg-gradient-to-r from-pink-500 to-blue-500 flex flex-row justify-between p-2 h-20 items-center">
        <h1 className="text-white text-4xl font-bold">Tres en Raya</h1>
        <button onClick={handleDarkMode} className="rounded-lg bg-white p-2">
          <img src="/darkMode.svg" alt="Toggle Dark Mode"/>
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <aside className={`flex flex-col max-w-md w-full bg-gradient-to-br from-pink-100 to-blue-100 dark:bg-gradient-to-br dark:from-pink-950 dark:to-blue-950 text-center rounded-lg transition-all duration-100 ease-in`}>
          <h1 className={`${!darkMode ? 'text-pink-600' : 'text-pink-300'} font-bold text-3xl p-2`}>Tres en Raya</h1>

          <div className="grid grid-cols-3 gap-4 p-4 text-center">
            {
              board.map((square, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                    darkMode={darkMode}
                    updateBoard={updateBoard}
                  >
                    {square}
                  </Square>
                )
              })
            }
          </div>

          <p className={`${!darkMode ? 'text-blue-600' : 'text-blue-300'} font-bold text-xl`}>Siguiente jugador: {turn} </p>
          
          {/* Ajustar el margin y el botón para que sea del ancho desde la X a la O */}
          <article className="flex flex-row justify-between mx-4 my-2">
            <p className={`${!darkMode ? 'text-pink-600' : 'text-pink-300'}`}>X: {contWinX}</p>
            <p className={`${!darkMode ? 'text-blue-600' : 'text-blue-300'}`}>O: {contWinO}</p>
          </article>
          <button onClick={resetGame} className="bg-gradient-to-r from-pink-500 to-blue-500 rounded w-11/12 h-10 mx-auto text-white font-bold mb-4">
            Nueva partida
          </button>
        </aside>
      </main>

      <footer className="bg-gray-400 dark:bg-gray-800 dark:text-gray-300 h-20 w-full text-center content-center">
        <p>&copy; 2023 Tres en Raya. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
