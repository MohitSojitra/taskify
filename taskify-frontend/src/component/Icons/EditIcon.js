import React, { memo, useCallback } from 'react'
import { colors } from '../../Theme/ColorPalette'
import CustomTooltip from '../styledComponent/CustomTooltip'
import EditIcon from '@material-ui/icons/Edit';
import ComfirmationDailog from '../Comfirmation';
import BoardModel from '../Board/BoardModel';

function CustomEditIcon({ fillColor, styles, toolTipText, onClick, isBoard = { edit: false, board: {} } }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const _handleEditButton = () => {
        if (!isBoard.edit) {
            onClick()
            return
        }
        handleOpen()
    }

    return (<>
        <CustomTooltip title={toolTipText} placement="top" arrow style={{ color: colors.black }}>
            <EditIcon style={{ fill: fillColor || colors.white, ...styles }} onClick={_handleEditButton} />
        </CustomTooltip>
        <BoardModel open={open} handleClose={handleClose} board={isBoard.board} handleSubmit={onClick} />
    </>
    )
}

export default memo(CustomEditIcon)
