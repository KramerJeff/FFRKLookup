import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableHead, TableBody, TableCell, Avatar, Collapse} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import * as constants from '../constants.js';

const SoulBreak = ({soulBreak}) => {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Avatar src={soulBreak.imagePath.split('"')[0]} alt={soulBreak.description}></Avatar>
                </TableCell>
                <TableCell>{soulBreak.description}</TableCell>
                <TableCell>{soulBreak.characterName}</TableCell>
                <TableCell>{constants.SB_TIER[soulBreak.soulBreakTier]}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <p>{soulBreak.effects}</p>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>

    );
};

SoulBreak.propTypes = {
    soulBreak: PropTypes.object,
};

export default SoulBreak;