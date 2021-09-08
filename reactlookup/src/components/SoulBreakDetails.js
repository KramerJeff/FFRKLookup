import React from 'react';
import PropTypes from 'prop-types';
import * as helpers from '../helpers';
import SoulBreakCommands from './SoulBreakCommands';
import SoulBreakStatuses from './SoulBreakStatuses';
const SoulBreakDetails = ({soulBreak}) => {
    return (
        <div>
            <p>Effects: {soulBreak.effects}</p>
            {soulBreak.elements.length > 0 && <p>Elements: {helpers.getElements(soulBreak.elements, 'string')}</p>}
            {soulBreak.multiplier > 0 && <p>Multiplier: {soulBreak.multiplier}</p>}
            {soulBreak.castTime && <p>Cast Time: {soulBreak.castTime}</p>}
            {soulBreak.target && <p>Target: {soulBreak.target}</p>}
            {soulBreak.damageFormulaType > 1 && <p>Type: {helpers.getDamageType(soulBreak.damageFormulaType)}</p>}
            {soulBreak.commands && <SoulBreakCommands commands={soulBreak.commands}/>}
            {soulBreak.statuses.length > 0 && <SoulBreakStatuses statuses={soulBreak.statuses}/>}
        </div>
    );
};

SoulBreakDetails.propTypes = {
    soulBreak: PropTypes.object.isRequired,
};

export default SoulBreakDetails;