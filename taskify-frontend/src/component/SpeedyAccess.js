import {Box, makeStyles} from '@material-ui/core'
import React, {useCallback} from 'react'
import {colors} from '../Theme/ColorPalette'
import ButtonContainer from './ButtonContainer'
import CustomTransitionsModal from './common/Modal/Modal'
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
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}))

function SpeedyAccess({onAccess}) {
  const [open, setOpen] = React.useState(true)
  const classes = useStyle()
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const _ok = useCallback(() => {
    onAccess()
    handleClose()
  }, [handleClose, onAccess])

  return (
    <CustomTransitionsModal
      open={open}
      handleClose={handleClose}
      styles={{padding: 0}}
    >
      <Box className={classes.box}>
        <TextElement
          font="bold"
          fontType="h1"
          textStyle={{
            textAlign: 'center',
            color: colors.lightBlue,
            fontWeight: 'bold',
            letterSpacing: '2px',
            fontSize: '25px',
          }}
        >
          {' '}
          You want to speedy access ?
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
            Email : test@gmail.com
          </TextElement>
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
            Password : test12345
          </TextElement>
        </Box>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>
          <ButtonContainer
            customButtonStyle={{
              backgroundColor: colors.deleteRed,
            }}
            title={'Close'}
            onClick={handleClose}
          />
          <ButtonContainer
            customButtonStyle={
              {
                //   ...styles.submitbutton,
              }
            }
            title={'Access'}
            onClick={_ok}
          />
        </Box>
      </Box>
    </CustomTransitionsModal>
  )
}

export default SpeedyAccess
