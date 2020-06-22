import React from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants.js';
import {FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
const SoulBreakFilters = ({tiers, realms, onTierChange, onRealmChange}) => {

    return (
        <div>
            <FormGroup column>
                {Object.entries(tiers).map(([tier, value]) => {
                    return ( <FormControlLabel 
                        control={<Checkbox checked={value} onChange={onTierChange} name={tier}/>}
                        label={constants.SB_TIER[tier]}
                    />);
                })}
            </FormGroup>
            <FormGroup column>
                {Object.entries(realms).map(([realm, value]) => {
                    return (<FormControlLabel
                        control={<Checkbox checked={value} onChange={onRealmChange} name={realm} />}
                        label={constants.REALMS[realm]}
                    />);
                })}
            </FormGroup>
        </div>
    );
};

SoulBreakFilters.propTypes = {
    tiers: PropTypes.object.isRequired,
    realms: PropTypes.object.isRequired,
    onTierChange: PropTypes.func.isRequired,
    onRealmChange: PropTypes.func.isRequired,
}

export default SoulBreakFilters;