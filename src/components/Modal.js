import React from 'react'

import './Modal.css'

export default function Modal({ shuffleCards }) {
    const handleClick = () => {
        shuffleCards();
    }

    return (
        <div className="modal">
            <div className="modal-info">
                <h2>Congratulations, You Win!</h2>
                <button onClick={handleClick}>New Game!</button>
            </div>
        </div>
    );
}
