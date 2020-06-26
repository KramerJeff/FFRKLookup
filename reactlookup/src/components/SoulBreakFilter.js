import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControlLabel, Checkbox, Collapse, Typography, IconButton, Box, Link} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const SoulBreakFilter = ({tiers, onTierChange, onTierAllToggle}) => {
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
        </div>
    );
};

SoulBreakFilter.propTypes = {
    tiers: PropTypes.object.isRequired,
    onTierChange: PropTypes.func.isRequired,
}

export default SoulBreakFilter;