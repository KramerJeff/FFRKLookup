import React, {useState} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants.js';
import {FormGroup, FormControlLabel, Checkbox, Collapse, Typography, IconButton, Box, Link} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const SoulBreakFilters = ({tiers, realms, onTierChange, onTierAllToggle, onRealmChange, onRealmAllToggle}) => {
    const [open, setOpen] = useState(true);
    const [tierOpen, setTierOpen] = useState(true);

    function toggleAll() {
        //do nothing
    }
    return (
        <div>
            <Box display="flex" onClick={() => setTierOpen(!tierOpen)}>
                <Typography variant='h6' align='left'>Tier</Typography>
                <IconButton aria-label="expand row" size="small">
                    {tierOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Box>
            <Collapse in={tierOpen} timeout="auto" unmountOnExit>
                <Link display="flex" href='#' onClick={onTierAllToggle}>Select/Unselect All</Link>
                <FormGroup column>
                    {Object.entries(tiers).map(([tier, value]) => {
                        return ( <FormControlLabel 
                            control={<Checkbox checked={value} onChange={onTierChange} name={tier}/>}
                            label={constants.SB_TIER[tier]}
                        />);
                    })}
                </FormGroup>
            </Collapse>

            <Box display="flex" onClick={() => setOpen(!open)}>
                <Typography variant='h6' align='left' onClick={() => setOpen(!open)}>Realms</Typography>
                <IconButton aria-label="expand row" size="small">
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Link display="flex" href='#' onClick={onRealmAllToggle}>Select/Unselect All</Link>
                <FormGroup column>
                    {Object.entries(realms).map(([realm, value]) => {
                        return (<FormControlLabel
                            control={<Checkbox checked={value} onChange={onRealmChange} name={realm} />}
                            label={constants.REALMS[realm]}
                        />);
                    })}
                </FormGroup>
            </Collapse>
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