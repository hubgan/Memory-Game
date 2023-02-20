import React from 'react';

import './Card.css';

export default function Card({ card, handleChoice, flipped, isDisabled }) {
    const handleClick = () => {
        if (!isDisabled) {
            handleChoice(card);
        }
    }

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`}>
            <div className="back" onClick={handleClick}>
                <img
                    src="/img/cover.png"
                    alt="card-back"
                />
            </div>
            <div className="front">
                <img
                    src={card.src}
                    alt="card-front"
                />
            </div>
        </div>
        
    );
}
