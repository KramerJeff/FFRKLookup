import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import SoulBreak from './SoulBreak';
import {Table, TableHead, TableBody, TableCell, TableRow, TableFooter, TablePagination} from '@material-ui/core';

const SoulBreakSearch = () => {
    const [error, setError] = useState(null);
    const [soulBreaks, setSoulBreaks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, soulBreaks.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                    {(rowsPerPage > 0
                        ? soulBreaks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : soulBreaks
                    ).map((soulBreak) => (
                        <SoulBreak key={soulBreak.id} soulBreak={soulBreak}/>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={soulBreaks.length}
                            onChangePage={handleChangePage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
};

export default SoulBreakSearch;