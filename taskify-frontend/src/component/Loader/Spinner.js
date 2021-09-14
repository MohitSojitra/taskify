import {Box, makeStyles} from '@material-ui/core'
import React, {memo} from 'react'
import Loader from 'react-loader-spinner'
import {colors} from '../../Theme/ColorPalette'
const useStyle = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    // opacity: 0.4,
  },
})
function Spinner({isLoading}) {
  const classes = useStyle()
  if (!isLoading) return null
  return (
    <Box className={classes.container}>
      <Loader
        type="Bars"
        height={100}
        width={100}
        color={colors.lightBlue}
        // styles={{opacity: 1}}
        // timeout={3000} //3 secs
      />
    </Box>
  )
}

export default memo(Spinner)
