import {Box, makeStyles} from '@material-ui/core'
import React from 'react'
import {colors} from '../Theme/ColorPalette'
import {TextElement} from './TextElement'
const useStyle = makeStyles(theme => ({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: colors.lightBlue,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    maxWidth: '450px',
    minHeight: '300px',
    backgroundColor: colors.lightWhite,
    boxShadow: theme.shadows[5],
    borderRadius: '8px',
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
function SizeNotSupport() {
  const classes = useStyle()
  return (
    <Box className={classes.container}>
      <Box className={classes.box}>
        <TextElement
          font="bold"
          fontType="h1"
          textStyle={{
            textAlign: 'center',
            color: colors.lightBlue,
            fontWeight: 'bold',
            letterSpacing: '2px',
            fontSize: '42px',
          }}
        >
          {' '}
          Sorry
        </TextElement>
        <Box className={classes.center}>
          <TextElement
            font="bold"
            fontType="h4"
            textStyle={{
              textAlign: 'center',
              color: colors.black,
              fontWeight: 'bold',
              letterSpacing: '2px',
            }}
          >
            {' '}
            Use case of this application is desktop so please change to desktop
            view. Thankyou
          </TextElement>
        </Box>
      </Box>
    </Box>
  )
}

export default SizeNotSupport
