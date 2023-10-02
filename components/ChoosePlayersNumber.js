import './App.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function ChoosePlayersNumber(props) {
    const [
        currentPlayersNumberSelected,
        setCurrentPlayersNumberSelected,
    ] = useState(0);

    const setPlayersNumber = (e) =>
        setCurrentPlayersNumberSelected(Number(e.target.value));

    const submitNumber = (e) => {
        e.preventDefault();
        currentPlayersNumberSelected !== 0
            ? props.submitPlayersNumber(currentPlayersNumberSelected)
            : alert('Choose a number first!');
    };

    return (
        <div className="panel">
            <header>
                <h1>How many players will play?</h1>
            </header>
            <form onSubmit={submitNumber}>
                <label htmlFor="two">
                    <input
                        onClick={setPlayersNumber}
                        id="two"
                        name="players-number"
                        type="radio"
                        value="2"
                    ></input>
                    Two
                </label>
                <label htmlFor="three">
                    <input
                        onClick={setPlayersNumber}
                        id="three"
                        name="players-number"
                        type="radio"
                        value="3"
                    ></input>
                    Three
                </label>
                <label htmlFor="four">
                    <input
                        onClick={setPlayersNumber}
                        id="four"
                        name="players-number"
                        type="radio"
                        value="4"
                    ></input>
                    Four
                </label>
                <div className="test">
                    <button className="players-number-button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

ChoosePlayersNumber.propTypes = {
    submitPlayersNumber: PropTypes.func.isRequired,
};
// export default ChoosePlayersNumber;
