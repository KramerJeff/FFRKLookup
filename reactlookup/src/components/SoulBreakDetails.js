import React from 'react';
import PropTypes from 'prop-types';
import SoulBreakCommands from './SoulBreakCommands';
const SoulBreakDetails = ({soulBreak}) => {
    return (
        <div>
            <p>{soulBreak.effects}</p>
            {soulBreak.commands && <SoulBreakCommands commands={soulBreak.commands}/>}
        </div>
    );
};

SoulBreakDetails.propTypes = {
    soulBreak: PropTypes.object.isRequired,
};

export default SoulBreakDetails;