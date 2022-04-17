import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, Slide } from '@mui/material';

export default function DialogBox(props) {
    const { message, status, onDelete, onClose } = props;
    
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-delete-user"
        >
            <DialogTitle>{message}</DialogTitle>
            <DialogActions>
                <Button variant='outlined' onClick={onClose}>Cancel</Button>
                <Button variant="outlined" color={status} onClick={onDelete}>{status==='error'?"Delete":"Sucess"}</Button>
            </DialogActions>
        </Dialog>
    )
}
