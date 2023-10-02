import React, { useEffect } from 'react';
import './App.css';
import ArenaAvatar from './ArenaAvatar';
import PropTypes from 'prop-types';

const lastHeroStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

function Arena(props) {
    useEffect(() => {
        if (props.heroes.length > 1) {
            document
                .querySelectorAll('.avatar')
                .forEach(
                    (avatar) =>
                        (avatar['style'].justifySelf =
                            Math.random() > 0.5 ? 'start' : 'center')
                );
            props.arenaResolve();
        }
    });

    const contestants = props.heroes.map((contestant) => (
        <ArenaAvatar key={contestant.name} hero={contestant} />
    ));

    return (
        <div
            style={props.heroes.length === 1 ? lastHeroStyles : {}}
            className="arena-container"
        >
            {contestants}
        </div>
    );
}

Arena.propTypes = {
    arenaResolve: PropTypes.func.isRequired,
    heroes: PropTypes.array.isRequired,
};

export default Arena;