import React from 'react';
import PropTypes from 'prop-types';

const SoulBreakDetails = ({soulBreak}) => {
    return (
        <p>{soulBreak.effects}</p>
    );
};

SoulBreakDetails.propTypes = {
    soulBreak: PropTypes.object.isRequired,
};

export default SoulBreakDetails;