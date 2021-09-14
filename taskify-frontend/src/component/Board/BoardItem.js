import { Box, makeStyles } from '@material-ui/core';
import React from 'react'

import BoardCard from './BoardCard';
import BoardParticipants from './BoardParticipants';
const useStyle = makeStyles({
    container: {
        width: "100%",
        // backgroundColor: "red",
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        // backgroundColor: "red"
    },
});
function BoardItem({ board }) {

    const classes = useStyle();

    return (
        <Box className={classes.container}>
            {/* Card of board */}
            <Box>
                <BoardCard board={board} />
            </Box>

            {/* Participants */}
            {/* <Box style={{ width: "100%" }}> */}
            <BoardParticipants member={board.member} />
            {/* </Box> */}


            {/* <Box style={{ width: "10%", padding: "16px" }}>
                <CustomTooltip title="Mohit Sojitra" placement="top" arrow style={{ backgroundColor: colors.white, color: colors.black }}>
                    <EditIcon />
                </CustomTooltip>
            </Box> */}

        </Box>
    )
}

export default BoardItem
