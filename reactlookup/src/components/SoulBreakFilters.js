import React, { useEffect, useState } from 'react';
import {FormGroup, FormControlLabel, Checkbox, CheckboxIcon} from '@material-ui/core';
const SoulBreakFilters = () => {

    // Lift state and onChange to SoulBreakSearch
    const [state, setState] = React.useState({
        Default: true,
        SB: true,
        SSB: true,
        BSB: true,
        OSB: true,
        USB: true,
        Glint: true,
        GlintP: true,
        AOSB: true,
        AASB: true,
        SASB: true,
        CSB: true,
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <FormGroup column>
            {/* Refactor to use map function you dingus */}
            <FormControlLabel
                control={<Checkbox checked={state.Default} onChange={handleChange} name="Default" />}
                label="Default"
            />
            <FormControlLabel
                control={<Checkbox checked={state.SB} onChange={handleChange} name="SB" />}
                label="SB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.SSB} onChange={handleChange} name="SSB"/>}
                label="SSB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.BSB} onChange={handleChange} name="BSB" />}
                label="BSB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.OSB} onChange={handleChange} name="OSB" />}
                label="OSB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.USB} onChange={handleChange} name="USB" />}
                label="USB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.Glint} onChange={handleChange} name="Glint" />}
                label="Glint"
            />
            <FormControlLabel
                control={<Checkbox checked={state.GlintP} onChange={handleChange} name="GlintP" />}
                label="Glint+"
            />
            <FormControlLabel
                control={<Checkbox checked={state.AOSB} onChange={handleChange} name="AOSB" />}
                label="AOSB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.AASB} onChange={handleChange} name="AASB" />}
                label="AASB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.SASB} onChange={handleChange} name="SASB" />}
                label="SASB"
            />
            <FormControlLabel
                control={<Checkbox checked={state.CSB} onChange={handleChange} name="CSB" />}
                label="CSB"
            />

        </FormGroup>
    );
};

export default SoulBreakFilters;