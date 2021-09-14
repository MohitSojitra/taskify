import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { TextElement } from './TextElement';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function ComfirmationDailog({ description, onOk, onCancel, open }) {

    return (

        <Dialog
            open={open}
            onClose={onCancel}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <TextElement font="bold" fontType="h2" textStyle={{ textAlign: "left" }}>
                    Please Comfirm
                </TextElement>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onCancel} color="primary">
                    <TextElement font="bold" fontType="h6" textStyle={{ textAlign: "left" }}>
                        No
                    </TextElement>
                </Button>
                <Button onClick={onOk} color="primary">
                    <TextElement font="bold" fontType="h6" textStyle={{ textAlign: "left" }}>
                        Yes
                    </TextElement>
                </Button>
            </DialogActions>
        </Dialog>

    );
}