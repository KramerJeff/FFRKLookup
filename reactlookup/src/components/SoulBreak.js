import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableHead, TableBody, TableCell, Avatar, Collapse} from '@material-ui/core';
import * as constants from '../constants.js';

const SoulBreak = ({soulBreak}) => {
    const [open, setOpen] = useState(false);
    return (
        <TableRow>
            <TableCell>
                <Avatar src={soulBreak.imagePath.split('"')[0]} alt={soulBreak.description}></Avatar>
            </TableCell>
            <TableCell>{soulBreak.description}</TableCell>
            <TableCell>{soulBreak.characterName}</TableCell>
            <TableCell>{constants.SB_TIER[soulBreak.soulBreakTier]}</TableCell>
        </TableRow>
    );
};

SoulBreak.propTypes = {
    soulBreak: PropTypes.object,
};

export default SoulBreak;