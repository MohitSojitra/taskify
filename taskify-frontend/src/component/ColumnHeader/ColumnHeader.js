import {Box, makeStyles} from '@material-ui/core'
import React, {memo, useCallback, useMemo, useState} from 'react'
import {SketchPicker} from 'react-color'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {deleteContainer, editContainer} from '../../store/dipatures'
import {colors} from '../../Theme/ColorPalette'
import {Api} from '../../utils/Api'
import ButtonContainer from '../ButtonContainer'
import CustomTransitionsModal from '../common/Modal/Modal'
import CustomDeleteIcon from '../Icons/DeleteIcon'
import CustomEditIcon from '../Icons/EditIcon'
import InputContainer from '../InputContainer'
import {TextElement} from '../TextElement'

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

function ColumnHeader({
  title,
  setTitle,
  setContainerColumnColor,
  containerColumnColor,
  boardId,
  columnId,
  index,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const [isPalateOpen, setIsPalateOpen] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialTitle = useMemo(() => title, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialColor = useMemo(() => containerColumnColor, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = useCallback(() => {
    setOpen(false)
    setContainerColumnColor(initialColor)
    setTitle(initialTitle)
  }, [initialColor, initialTitle, setContainerColumnColor, setTitle])

  const handleNameChange = useCallback(
    e => {
      setTitle(e.target.value)
    },
    [setTitle],
  )

  const handleClickInColorPalate = useCallback(() => {
    setIsPalateOpen(!isPalateOpen)
  }, [isPalateOpen])

  const handleChangeColor = useCallback(
    fetchColor => {
      setContainerColumnColor(fetchColor.hex)
    },
    [setContainerColumnColor],
  )
  const _handleEditColumn = useCallback(async () => {
    if (initialTitle === title && initialColor === containerColumnColor) {
      setOpen(false)
      return
    }
    const {statusCode, data} = await Api.putRequest(
      `/board-column/${boardId}/column/${columnId}`,
      {name: title, bgColor: containerColumnColor},
    )
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    const {message, column} = JSON.parse(data)
    toast(message)
    editContainer(dispatch, {columnId, boardId, column})
    setOpen(false)
  }, [
    boardId,
    columnId,
    containerColumnColor,
    dispatch,
    initialColor,
    initialTitle,
    title,
  ])
  const _handleDeleteColumn = useCallback(async () => {
    const {statusCode, data} = await Api.DeleteRequest(
      `/board-column/${boardId}/column/${columnId}`,
    )
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    const {message} = JSON.parse(data)
    toast(message)
    deleteContainer(dispatch, {boardId, columnId, index})
  }, [boardId, columnId, dispatch, index])
  return (
    <div>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextElement font="bold" fontType="h4">
          {title}
        </TextElement>
        <Box style={{display: 'flex'}}>
          <CustomEditIcon
            fillColor={colors.lightBlue}
            toolTipText={'Edit'}
            onClick={handleOpen}
          />
          <CustomDeleteIcon
            fillColor={colors.deleteRed}
            toolTipText={'Delete'}
            onClick={_handleDeleteColumn}
          />
        </Box>
      </Box>

      <CustomTransitionsModal open={open} handleClose={handleClose}>
        <Box className={classes.container}>
          <Box style={{width: '100%'}}>
            <InputContainer
              textType="text"
              inputLable="Title"
              inputValue={title}
              placeholder={'Please Enter your title'}
              onChange={handleNameChange}
              // onBlur={emailValidate}
              // errorMessage={<ErrorText errorMessage={emailError} />}
              // error={emailError === "" ? false : true}
              style={styles.input}
            />

            <Box
              onClick={handleClickInColorPalate}
              className={classes.colorPalate}
              style={{backgroundColor: containerColumnColor}}
            >
              <TextElement font="bold" fontType="h8" textStyle={styles.text}>
                {isPalateOpen ? 'Done' : 'Change Color'}
              </TextElement>
            </Box>

            {isPalateOpen ? (
              <SketchPicker
                color={containerColumnColor}
                onChangeComplete={handleChangeColor}
              ></SketchPicker>
            ) : null}

            <Box className={classes.buttonPosition}>
              <ButtonContainer
                customButtonStyle={{
                  ...styles.submitbutton,
                  backgroundColor: containerColumnColor,
                }}
                title={'Edit Column'}
                onClick={_handleEditColumn}
              />
            </Box>
          </Box>
        </Box>
      </CustomTransitionsModal>
    </div>
  )
}

export default memo(ColumnHeader)
const styles = {
  input: {
    width: '100%',
  },
  submitbutton: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    marginTop: '20px',
    color: colors.black,
  },
}
