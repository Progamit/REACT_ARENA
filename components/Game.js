import './Game.css';
import React, { useState, useEffect, useRef } from 'react';
import World from './World';
import Hero from './Hero';
import ChooseHeroHeader from './ChooseHeroHeader';
import ChoosePlayersNumber from './ChoosePlayersNumber';
import Arena from './Arena';
import ArenaResults from './ArenaResults';
import PropTypes from 'prop-types';

export default function Game(props) {


    const [whichPlayerTurn, setWhichPlayerTurn] = useState(1);
    const [howManyPlayers, setHowManyPlayers] = useState(0);
    const [shouldArenaStart, setShouldArenaStart] = useState(false);

    useEffect(() => {
        if (whichPlayerTurn === howManyPlayers + 1 && howManyPlayers)
            setShouldArenaStart(true);
    }, [whichPlayerTurn]);

    const [disabledWorlds, setdisabledWorlds] = useState(
        props.worlds
            .filter(
                (world) => !props.heroes.some((hero) => hero.worldId === world.id)
            )
            .map((worldWithoutHeroes) => worldWithoutHeroes.id)
    );
    const [heroesSelected, setHeroesSelected] = useState([]);
    const [worldSelected, setWorldSelected] = useState(null);

    useEffect(() => {
        const lastWorldSelected =
            heroesSelected[heroesSelected.length - 1]?.worldId;
        if (
            heroesSelected.filter((hero) => hero.worldId === lastWorldSelected)
                .length ===
            props.heroes.filter((hero) => hero.worldId === lastWorldSelected).length
        ) {
            setdisabledWorlds((prev) => [...prev, lastWorldSelected]);
        }
    }, [heroesSelected]);

    const unselectWorld = () => setWorldSelected(() => null);

    const selectWorld = (id) => {
        setWorldSelected(() => id);
    };

    const submitPlayersNumber = (playersNumber) =>
        setHowManyPlayers(() => playersNumber);

    const selectHero = (hero) => {
        setWhichPlayerTurn((prev) => prev + 1);
        setWorldSelected(() => null);
        setHeroesSelected((prev) => [...prev, hero]);
    };

    const resolveGame = () => {

        const resultsArray = heroesSelected.map((hero, index) => ({
            player: index + 1,
            finalPower: hero.power + divineFavour(),
        }));

        let winner = resultsArray[0];
        for (let index = 1; index < resultsArray.length; index++) {
            if (resultsArray[index].finalPower > winner.finalPower)
                winner = resultsArray[index];
        }

        setTimeout(() => {
            const survivor = heroesSelected[winner.player - 1];
            setHeroesSelected([survivor]);
        }, 10000);
        // Render the Arena Results panel
        setTimeout(() => {
            const finalPanel = document.querySelector('#results');
            const finalPanelHeader = document.querySelector('#results_header');
            finalPanel['style'].display = 'flex';
            finalPanelHeader['innerText'] = `Hail Player ${winner.player}!`;
        }, 16000);
    };

    const restartGame = () => {

        setHeroesSelected([]);
        setWorldSelected(null);
        setWhichPlayerTurn(1);
        setHowManyPlayers(0);
        setShouldArenaStart(false);
        setdisabledWorlds(
            props.worlds
                .filter(
                    (world) => !props.heroes.some((hero) => hero.worldId === world.id)
                )
                .map((worldWithoutHeroes) => worldWithoutHeroes.id)
        );
    };


    if (shouldArenaStart)
        return (
            <div>
                <Arena arenaResolve={resolveGame} heroes={heroesSelected} />
                <ArenaResults restart={restartGame} />
            </div>
        );

    else if (worldSelected) {

        const heroes = props.heroes
            .filter((hero) => {
                return (
                    !heroesSelected.some((heroesList) => heroesList.id === hero.id) &&
                    hero.worldId === worldSelected
                );
            })
            .map((hero) => {
                return <Hero hero={hero} key={hero.id} onClick={selectHero} />;
            });
        return (
            <div>
                <ChooseHeroHeader turn={whichPlayerTurn} />
                <div>
                    <div className="content">{heroes}</div>
                    <button onClick={unselectWorld}>Wróć</button>
                </div>
            </div>
        );
    }

    else if (howManyPlayers) {
        const worlds = props.worlds.map((world) => (
            <World
                isDisabled={disabledWorlds.includes(world.id)}
                world={world}
                key={world.id}
                onClick={selectWorld}
            />
        ));
        return (
            <div>
                <ChooseHeroHeader turn={whichPlayerTurn} />
                <div className="content">{worlds}</div>
            </div>
        );
    }
    else
        return (
            <div>
                <button
                    onClick={props.backToWelcomePage}
                    className="back-to-welcome-page-button"
                >
                    Back to the Welcome Page
                </button>
                <ChoosePlayersNumber submitPlayersNumber={submitPlayersNumber} />
            </div>
        );
}


function divineFavour() {
    return Math.floor(Math.random() * 30);
}

Game.propTypes = {
    backToWelcomePage: PropTypes.func.isRequired,
    heroes: PropTypes.array.isRequired,
    worlds: PropTypes.array.isRequired,
};
// export default Game;
