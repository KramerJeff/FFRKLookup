import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';

const Tutorial = () => {
    return (
        <div>
            <Typography variant='subtitle1'>Welcome to FFRK Lookup! You can use this site to look up Soul Breaks, Legend Materia, and more for the mobile game Final Fantasy Record Keeper.</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Request</TableCell>
                        <TableCell>Command</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Search for a specific Soul Break tier for a character</TableCell>
                        <TableCell>Cloud BSB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Search for an individual Soul Break of a certain tier for a character</TableCell>
                        <TableCell>Cloud BSB2</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Search for a character's Legend Materia</TableCell>
                        <TableCell>Cloud LM</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Search for an Ability by name</TableCell>
                        <TableCell>Meltdown abil</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Search for a Record Materia by name</TableCell>
                        <TableCell>Battleforged RM</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Search for a status by name</TableCell>
                        <TableCell>Dark Bargain stat</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Use multiple commands in a single request</TableCell>
                        <TableCell>Cloud BSB; Cloud LM; Elarra USB</TableCell>
                    </TableRow >
                </TableBody>
            </Table>
            
            <Typography variant='h6'>Character Aliases</Typography>
            <p>"onion knight": ["ok", "onion knight", "onion"]</p>
            <p>"orlandeau": ["tg cid", "tgc"]</p>
            <p>"cecil (dark knight)": ["decil", "dcecil", "dark knight cecil", "cecil dark knight"]</p>
            <p>"cecil (paladin)": ["pecil", "pcecil", "paladin cecil", "cecil paladin"]</p>
            <p>"gilgamesh": "greg"</p>
            <p>"aerith": "aeris"</p>
            <p>"cid (iv)": ["cid iv", "cid4", "cid 4"]</p>
            <p>"cid (xiv)": ["cid xiv", "cid 14", "cid14"]</p>
            <p>"cid (vii)": ["cid vii", "cid7", "cid 7"]</p>
            <p>"elarra": "urara"</p>
            <p>"barbariccia": "barb"</p>
            <p>"cloud of darkness": "cod"</p>
            <p>"red xiii": ["nanaki", "red13", "red 13"]</p>
            <p>"gogo (v)": ["gogo v", "gogo5", "gogo 5"]</p>
            <p>"gogo (vi)": ["gogo vi", "gogo6", "gogo 6"]</p>
        </div>
    );
};

export default Tutorial;