import { Avatar, Box, makeStyles } from '@material-ui/core';
import React, { memo } from 'react'
import { colors } from '../../Theme/ColorPalette';
import CustomTooltip from '../styledComponent/CustomTooltip';

const useStyle = makeStyles({
    container: {
        width: "70%", padding: "16px", display: "flex", flexWrap: "wrap"
    },
    toolTipStyle: {
        backgroundColor: colors.white, color: colors.black
    },
    avatar: {
        backgroundColor: colors.lightBlue, marginRight: "4px"
    }
});
function BoardParticipants({ member }) {
    const classes = useStyle()

    return (
        <Box className={classes.container}>
            {member.map((user, index) => <CustomTooltip title={user.userId.name} placement="top" arrow className={classes.toolTipStyle} key={user._id}>
                <Avatar alt="Profile" src={`https://joeschmoe.io/api/v1/${user.userId.name}`} className={classes.avatar} />
            </CustomTooltip>)}
        </Box>
    )
}

export default memo(BoardParticipants)
