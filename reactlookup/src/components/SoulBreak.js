import React from 'react';
import PropTypes from 'prop-types';

const SoulBreak = ({soulBreak}) => {
    return (
        <div>
            <h1>Name: {soulBreak.description}</h1>
            <h3>Character: {soulBreak.characterName}</h3>
            <p>Effect: {soulBreak.effects}</p>
            {soulBreak.imagePath && <img src={soulBreak.imagePath.split('"')[0]} alt={soulBreak.description}></img>}  
        </div>
    );
};

SoulBreak.propTypes = {
    soulBreak: PropTypes.object,
};

export default SoulBreak;