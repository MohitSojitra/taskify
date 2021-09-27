import {Box, makeStyles} from '@material-ui/core'
import React from 'react'
import {colors} from '../../Theme/ColorPalette'
import AddMember from '../AddMember/AddMember'
import ButtonContainer from '../ButtonContainer'

import BoardCard from './BoardCard'
import BoardParticipants from './BoardParticipants'
const useStyle = makeStyles({
  container: {
    width: '100%',
    // backgroundColor: "red",
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: "red"
  },
})
function BoardItem({board}) {
  const classes = useStyle()

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

      {/* add member buttons */}
      <AddMember
        member={board.member}
        boardId={board._id}
        boardCreaterId={board.createdBy._id}
      />
    </Box>
  )
}

export default BoardItem
