import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SoulBreak from './SoulBreak';
import { Table, TableHead, TableBody, TableCell, TableRow, TableFooter, TablePagination } from '@material-ui/core';

const SoulBreakTable = ({soulBreaks}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell />
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
                    <SoulBreak key={soulBreak.id} soulBreak={soulBreak} />
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

};

SoulBreakTable.propTypes = {
    soulBreaks: PropTypes.array.isRequired,
};

export default SoulBreakTable;