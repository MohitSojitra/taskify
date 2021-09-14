import React, { memo, useCallback } from 'react'
import { colors } from '../../Theme/ColorPalette'
import CustomTooltip from '../styledComponent/CustomTooltip'
import DeleteIcon from '@material-ui/icons/Delete';
import ComfirmationDailog from '../Comfirmation';

function CustomDeleteIcon({ fillColor, styles, toolTipText, onClick }) {
    const [open, setOpen] = React.useState(false);
    const _handleClick = useCallback(
        () => {
            setOpen(false)
            onClick()

        }, [onClick]
    )
    const _handleDilog = () => {

        if (typeof onClick === "function") {
            setOpen(true)
        }
    }
    return (<>
        <CustomTooltip title={toolTipText} placement="top" arrow style={{ color: colors.black }}>
            <DeleteIcon style={{ fill: fillColor || colors.white, cursor: "pointer", styles }} onClick={_handleDilog} />
        </CustomTooltip>
        <ComfirmationDailog description={"Are You sure to Delete This ?"} onOk={_handleClick} onCancel={() => setOpen(false)} open={open} />
    </>
    )
}

export default memo(CustomDeleteIcon)
