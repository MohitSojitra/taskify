import {Box, makeStyles} from '@material-ui/core'
import React from 'react'
import BoardContainer from '../component/Board/BoardContainer'
import Footer from '../component/Footer/Footer'
import {TextElement} from '../component/TextElement'

const useStyle = makeStyles({
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: '10px',
    flexGrow: 1,
  },
  containerFluid: {
    width: '80%',
    marginTop: '40px',
  },
})
function MyBoards() {
  const classes = useStyle()

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.containerFluid}>
          {/* Title */}
          <Box>
            <TextElement
              font="bold"
              fontType="h2"
              textStyle={{textAlign: 'left'}}
            >
              My Boards
            </TextElement>
          </Box>

          {/* board Container */}

          <BoardContainer />
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default MyBoards
