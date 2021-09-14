import {Button, makeStyles} from '@material-ui/core'
import React from 'react'
import {colors} from '../Theme/ColorPalette'
import {TextElement} from './TextElement'
const useStyle = makeStyles({
  cardButton: {
    borderRadius: '12px',
    textTransform: 'none',
    backgroundColor: colors.lightBlue,
    padding: '15px',
    cursor: 'pointer',
    '&:disabled': {
      backgroundColor: colors.disableLightBlue,
      color: 'white',
    },
  },
})
const ButtonContainer = props => {
  const {title, customButtonStyle, titleStyles, ...rest} = props
  const classes = useStyle()
  return (
    <Button
      className={classes.cardButton}
      style={{...customButtonStyle}}
      variant="contained"
      color="primary"
      {...rest}
    >
      <TextElement
        font="bold"
        fontType="h5"
        className={classes.cardTitle}
        textStyle={{...titleStyles}}
      >
        {title}
      </TextElement>
    </Button>
  )
}

export default ButtonContainer
