import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
const SoulBreakFilters = ({
    tiers: {Default, SB, SSB, BSB, OSB, USB, Glint, GlintP, AOSB, AASB, SASB, CSB},
    onCheckboxChange
}) => {

    return (
        <FormGroup column>
            {/* Refactor to use map function you dingus */}
            <FormControlLabel
                control={<Checkbox checked={Default} onChange={onCheckboxChange} name="Default" />}
                label="Default"
            />
            <FormControlLabel
                control={<Checkbox checked={SB} onChange={onCheckboxChange} name="SB" />}
                label="SB"
            />
            <FormControlLabel
                control={<Checkbox checked={SSB} onChange={onCheckboxChange} name="SSB"/>}
                label="SSB"
            />
            <FormControlLabel
                control={<Checkbox checked={BSB} onChange={onCheckboxChange} name="BSB" />}
                label="BSB"
            />
            <FormControlLabel
                control={<Checkbox checked={OSB} onChange={onCheckboxChange} name="OSB" />}
                label="OSB"
            />
            <FormControlLabel
                control={<Checkbox checked={USB} onChange={onCheckboxChange} name="USB" />}
                label="USB"
            />
            <FormControlLabel
                control={<Checkbox checked={Glint} onChange={onCheckboxChange} name="Glint" />}
                label="Glint"
            />
            <FormControlLabel
                control={<Checkbox checked={GlintP} onChange={onCheckboxChange} name="GlintP" />}
                label="Glint+"
            />
            <FormControlLabel
                control={<Checkbox checked={AOSB} onChange={onCheckboxChange} name="AOSB" />}
                label="AOSB"
            />
            <FormControlLabel
                control={<Checkbox checked={AASB} onChange={onCheckboxChange} name="AASB" />}
                label="AASB"
            />
            <FormControlLabel
                control={<Checkbox checked={SASB} onChange={onCheckboxChange} name="SASB" />}
                label="SASB"
            />
            <FormControlLabel
                control={<Checkbox checked={CSB} onChange={onCheckboxChange} name="CSB" />}
                label="CSB"
            />

        </FormGroup>
    );
};

SoulBreakFilters.propTypes = {
    tiers: PropTypes.object,
    onCheckboxChange: PropTypes.func.isRequired,
}

export default SoulBreakFilters;