import {Box, Divider, makeStyles} from '@material-ui/core'
import React, {useCallback, useState} from 'react'
import {SketchPicker} from 'react-color'
import {colors} from '../../Theme/ColorPalette'
import ButtonContainer from '../ButtonContainer'
import CustomTransitionsModal from '../common/Modal/Modal'
import ErrorText from '../ErrorText'
import InputContainer from '../InputContainer'
import {TextElement} from '../TextElement'
import BoardCard from './BoardCard'
const useStyles = makeStyles(theme => ({
  container: {
    width: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  devider: {
    width: '100%',
    height: '1px',
    margin: '10px 0px',
  },
  colorPalate: {
    width: '100px',
    height: '30px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
}))
function BoardModel({open, handleClose, handleSubmit, board}) {
  const classes = useStyles()
  const [title, setTitle] = useState(board?.name || '')
  const [color, setColor] = useState({
    color: board?.bgColor || colors.lightBlue,
    isPalateOpen: false,
  })
  const [titleError, setTitleError] = useState('')
  const handleNameChange = useCallback(e => {
    setTitle(e.target.value)
  }, [])

  const handleChangeColor = useCallback(
    fetchColor => {
      setColor({color: fetchColor.hex, isPalateOpen: color.isPalateOpen})
    },
    [color.isPalateOpen],
  )

  const handleClickInColorPalate = useCallback(() => {
    setColor({color: color.color, isPalateOpen: !color.isPalateOpen})
  }, [color.color, color.isPalateOpen])

  const titleValidate = useCallback(() => {
    if (title === '') {
      setTitleError('Enter First Name')
    } else {
      setTitleError('')
    }
  }, [title])

  const _handleSubmit = useCallback(() => {
    handleSubmit({
      titleError,
      title,
      color: {color: color.color, isPalateOpen: color.isPalateOpen},
    })
    handleClose()
  }, [
    color.color,
    color.isPalateOpen,
    handleClose,
    handleSubmit,
    title,
    titleError,
  ])

  return (
    <CustomTransitionsModal open={open} handleClose={handleClose}>
      <Box className={classes.container}>
        {/* Preview Mode */}
        <Box>
          <BoardCard title={title} color={color.color} />
        </Box>

        <Divider variant="middle" className={classes.devider} />

        {/* Input Of Users */}
        <Box style={{width: '100%'}}>
          <InputContainer
            textType="text"
            inputLable="Title"
            inputValue={title}
            placeholder={'Please Enter your title'}
            onChange={handleNameChange}
            onBlur={titleValidate}
            errorMessage={<ErrorText errorMessage={titleError} />}
            error={titleError === '' ? false : true}
            style={styles.input}
            autoFocus
          />
          <Box
            onClick={handleClickInColorPalate}
            className={classes.colorPalate}
            style={{backgroundColor: color.color}}
          >
            <TextElement font="bold" fontType="h8" textStyle={styles.text}>
              {color.isPalateOpen ? 'Done' : 'Change Color'}
            </TextElement>
          </Box>

          {color.isPalateOpen ? (
            <SketchPicker
              color={color.color}
              onChangeComplete={handleChangeColor}
            ></SketchPicker>
          ) : null}

          {/* add member component */}

          <Box className={classes.buttonPosition}>
            <ButtonContainer
              customButtonStyle={{
                ...styles.submitbutton,
                backgroundColor: color.color,
              }}
              title={board ? 'Edit Board' : 'Create Board'}
              onClick={_handleSubmit}
            />
          </Box>
        </Box>
      </Box>
    </CustomTransitionsModal>
  )
}

export default BoardModel

const styles = {
  link: {
    color: colors.lightBlue,
  },
  input: {
    width: '100%',
  },
  text: {
    color: colors.white,
    // backgroundColor: "red"
  },
  submitbutton: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    marginTop: '20px',
  },
}
