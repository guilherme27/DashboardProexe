import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import UserService from "../../services/UserService"

import { Box } from '@mui/material';
import { default as MaterialTable } from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Dialog from "../Dialog/Dialog";
import TableBody from "../TableBody/TableBody";
import TableHeader from "../TableHeader/TableHeader";
import TableToolBar from "../TableToolBar/TableToolBar";
import styles from './styles';

export default function Table() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState();
    const [selected, setSelected] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headCells = [
        { id: 'id', label: 'id' },
        { id: 'name', label: 'Name' },
        { id: 'username', label: 'Username' },
        { id: 'city', label: 'City' },
        { id: 'email', label: 'Email' }
    ];

    useEffect(() => {
        setRows(UserService().getUsers());
    }, []);

    function updateData(newList) {
        UserService().setUsers(newList);
        setRows(UserService().getUsers());
    }

    const deleteUsers = () => {
        const newList = rows.filter((user) => !selected.includes(user.id));
        setSelected([]);
        updateData(newList);
        setOpenDialog(false);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const redirect = () => {
        navigate(`/user/${selected[0]}`)
    }

    return (
        <div style={styles.container}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    {openDialog && <Dialog message={"Do you really want delete this user"} status={"error"} onDelete={deleteUsers} onClose={() => setOpenDialog(false)} />}
                    <TableToolBar numSelected={selected.length} onOpen={() => setOpenDialog(true)} onClick={redirect} />
                    <TableContainer>
                        <MaterialTable
                            sx={{ minWidth: 750 }}
                            size={'medium'}
                        >
                            <TableHeader
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                head={headCells}
                            />
                            <TableBody
                                head={headCells}
                                order={order}
                                orderBy={orderBy}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onSelected={(items) => setSelected(items)}
                                rows={rows}
                                selected={selected}
                            />
                        </MaterialTable>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
}