import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControlLabel, Checkbox, Collapse, Typography, IconButton, Box, Link} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from "styled-components";

const SBCheckboxLabel = styled(FormControlLabel)`
    & * span {
        color: #398CBD;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    cursor: pointer;
    &:hover {
        text-decoration: none;
    }
`;

const CollapseBox = styled(Box)`
    display: flex;
    cursor: pointer;
`;

const SoulBreakFilter = ({filterName, filters, toggleAll, onChange, onToggleAll}) => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <CollapseBox onClick={() => setOpen(!open)}>
                <Typography variant='h6' align='left'>{filterName}</Typography>
                <IconButton aria-label="expand row" size="small">
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </CollapseBox>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <StyledLink onClick={onToggleAll}>{toggleAll ? 'Uncheck All' : 'Check All'}</StyledLink>
                <FormGroup>
                    {Object.values(filters).map((filter, key) => {
                        return (<SBCheckboxLabel
                            key={key}
                            control={<Checkbox checked={filter.checked} onChange={onChange} name={filter.id} />}
                            label={filter.name}
                        />);
                    })}
                </FormGroup>
            </Collapse>
        </div>
    );
};

SoulBreakFilter.propTypes = {
    filters: PropTypes.object.isRequired,
    toggleAll: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onToggleAll: PropTypes.func.isRequired,
}

export default SoulBreakFilter;