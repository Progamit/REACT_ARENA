import React from 'react';
import './App.css';
import PropTypes from 'prop-types';


export default function ArenaAvatar(props) {
    return (
        <div className="avatar">
            <img alt={props.hero.name} src={`${props.hero.avatarImage}`}></img>
        </div>
    );
}

ArenaAvatar.propTypes = {
    hero: PropTypes.object.isRequired,
};
// export default ArenaAvatar;