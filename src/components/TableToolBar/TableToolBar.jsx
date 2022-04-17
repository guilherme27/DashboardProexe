import React from 'react'
import { useNavigate } from 'react-router';
import { alpha, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function TableToolBar(props) {
    const navigate = useNavigate();
    const { numSelected, onOpen, onClick } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Proexe
                </Typography>
            )}

            {numSelected > 0 ? numSelected === 1 ? (
                <>
                    <Tooltip title="Edit">
                        <IconButton onClick={onClick}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={onOpen}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Delete">
                    <IconButton onClick={onOpen}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add User">
                    <IconButton onClick={() => navigate("/user")}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};