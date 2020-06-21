import React from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants.js';
import {FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
const SoulBreakFilters = ({
    tiers,
    onTierChange
}) => {

    return (
        <FormGroup column>
            {Object.entries(tiers).map(([tier, value]) => {
                return ( <FormControlLabel 
                    control={<Checkbox checked={value} onChange={onTierChange} name={tier}/>}
                    label={constants.SB_TIER[tier]}
                />);
            })}
        </FormGroup>
    );
};

SoulBreakFilters.propTypes = {
    tiers: PropTypes.object,
    onTierChange: PropTypes.func.isRequired,
}

export default SoulBreakFilters;