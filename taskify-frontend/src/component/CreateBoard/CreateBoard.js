import { Box, makeStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react'
import BoardCard from '../Board/BoardCard';
import ButtonContainer from '../ButtonContainer'
import CustomTransitionsModal from '../common/Modal/Modal';
import Divider from '@material-ui/core/Divider';
import InputContainer from '../InputContainer';
import { colors } from '../../Theme/ColorPalette';
import { SketchPicker } from 'react-color';
import { TextElement } from '../TextElement';
import ErrorText from '../ErrorText';
import { useDispatch } from "react-redux"
import { Api } from '../../utils/Api';
import { toast } from 'react-toastify';
import { addBoard } from '../../store/dipatures';
import BoardModel from '../Board/BoardModel';

function CreateBoard() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);



    const _handleCreateBoard = useCallback(async ({ titleError, title, color }) => {
        if (titleError !== "") {
            return
        }

        const { statusCode, data } = await Api.postRequest("/board", { name: title, bgColor: color.color })

        if (statusCode === 400 || statusCode === 500) {
            toast.error(data)
        }

        const res = JSON.parse(data)
        toast(res.message)
        addBoard(dispatch, res.board)

    }, [dispatch])

    return (
        <>
            <ButtonContainer customButtonStyle={styles.button} title={"Create"} onClick={handleOpen} />
            <BoardModel open={open} handleClose={handleClose} handleSubmit={_handleCreateBoard} />
        </>
    )
}

export default CreateBoard


const styles = {

    button: {
        height: "36px",
        borderRadius: "12px",
        marginRight: "20px"
    },

};
