import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import SoulBreak from './SoulBreak';
import {Table, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core';

const SoulBreakSearch = () => {
    const [error, setError] = useState(null);
    const [soulBreaks, setSoulBreaks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch(`${constants.API_URL_BASE}/SoulBreaks`)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setSoulBreaks(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);   

    if(error) {
        return(<p>Error: {error.message}</p>);
    }
    else if(!isLoaded) {
        return (<p>Loading....</p>); //TODO add walking Tyro GIF
    }
    else {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Icon</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Character</TableCell>
                        <TableCell>Tier</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {soulBreaks.map((soulBreak) => (
                        <SoulBreak key={soulBreak.id} soulBreak={soulBreak}/>
                    ))}
                </TableBody>
            </Table>
        );
    }
};

export default SoulBreakSearch;