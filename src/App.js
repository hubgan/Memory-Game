import { useEffect, useState } from 'react';

import './App.css';

import Card from './components/Card';
import Modal from './components/Modal';

const cardImages = [
  { "src": "/img/helmet-1.png", "matched": false },
  { "src": "/img/potion-1.png", "matched": false },
  { "src": "/img/ring-1.png", "matched": false },
  { "src": "/img/scroll-1.png", "matched": false },
  { "src": "/img/shield-1.png", "matched": false },
  { "src": "/img/sword-1.png", "matched": false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const shuffleCards = () => {
    let shuffledCards = [...cardImages, ...cardImages];
    let firstCardIndex = shuffledCards.length;

    while (firstCardIndex > 1) {
      firstCardIndex -= 1;
      const secondCardIndex = Math.floor(Math.random() * firstCardIndex);
      [shuffledCards[firstCardIndex], shuffledCards[secondCardIndex]] = [shuffledCards[secondCardIndex], shuffledCards[firstCardIndex]];
    }

    shuffledCards = shuffledCards.map((card, index) => {
      return { ...card, id: index };
    })

    setCards(shuffledCards);
    setIsEnd(false);
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  }

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setIsDisabled(false);
  }

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setIsDisabled(true);
      
      if (firstChoice.src === secondChoice.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            }

            return { ...card };
          })
        })

        resetTurn();
      }
      else {
        setTimeout(resetTurn, 500);
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    const checkWin = () => {
      setIsEnd(cards.every((card) => card.matched === true));
    }

    checkWin();
  }, [cards])

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <div className={isEnd ? "blur" : ""}>
        <h1>Hello World!</h1>
        <button onClick={shuffleCards}>New Game</button>
        
        <div className="card-container">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              handleChoice={handleChoice}
              flipped={card === firstChoice || card === secondChoice || card.matched}
              isDisabled={isDisabled}
            />
          ))}
        </div>
      </div>

      {isEnd && <Modal shuffleCards={shuffleCards} setIsEnd={setIsEnd} />}
    </div>
  );
}

export default App;
