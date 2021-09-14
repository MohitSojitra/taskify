import {Box, makeStyles} from '@material-ui/core'
import React, {memo, useCallback, useState} from 'react'
import {SketchPicker} from 'react-color'
import {useDispatch} from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import {toast} from 'react-toastify'
import {deleteItemInContainer, editItemInContainer} from '../../store/dipatures'

import {colors} from '../../Theme/ColorPalette'
import {Api} from '../../utils/Api'
import ButtonContainer from '../ButtonContainer'
import CustomTransitionsModal from '../common/Modal/Modal'

import CustomDeleteIcon from '../Icons/DeleteIcon'
import CustomEditIcon from '../Icons/EditIcon'
import InputContainer from '../InputContainer'

import {TextElement} from '../TextElement'
import Discussion from './Discussion'

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
    border: '1px solid',
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0px',
  },
}))
function DisplayItem({item, boardId, columnIndex, index, columnId}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const [isPalateOpen, setIsPalateOpen] = useState(false)
  const [title, setTitle] = useState(item.name)
  const [description, setDescription] = useState(item.description || '')
  const [color, setColor] = useState(item.bgColor || colors.white)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleNameChangeTitle = useCallback(e => {
    setTitle(e.target.value)
  }, [])
  const handleNameChangeDescription = useCallback(e => {
    setDescription(e.target.value)
  }, [])

  const handleClickInColorPalate = useCallback(() => {
    setIsPalateOpen(!isPalateOpen)
  }, [isPalateOpen])

  const handleChangeColor = useCallback(fetchColor => {
    setColor(fetchColor.hex)
  }, [])

  const _handleDeleteItem = useCallback(async () => {
    const {statusCode, data} = await Api.DeleteRequest(
      `/board-item/${boardId}/column/${columnId}/item/${item._id}`,
    )
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    const {message} = JSON.parse(data)
    toast(message)
    deleteItemInContainer(dispatch, {
      columnIndex,
      boardId,
      index,
      columnId,
      itemId: item._id,
    })
  }, [boardId, columnId, columnIndex, dispatch, index, item._id])

  const _handleEditItem = useCallback(async () => {
    const {statusCode, data} = await Api.putRequest(
      `/board-item/${boardId}/column/${columnId}/item/${item._id}`,
      {name: title, description, bgColor: color},
    )
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    const {message, item: updatedItem} = JSON.parse(data)
    toast(message)
    editItemInContainer(dispatch, {
      columnIndex,
      boardId,
      item: updatedItem,
      index,
      columnId,
    })
  }, [
    boardId,
    color,
    columnId,
    columnIndex,
    description,
    dispatch,
    index,
    item._id,
    title,
  ])

  return (
    <>
      <Box style={{margin: '5px 0px'}} />
      <Box
        style={{
          backgroundColor: color,
          padding: '5px 10px',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box style={{width: '90%'}}>
          <TextElement
            font="bold"
            fontType="h6"
            textStyle={{overflowWrap: 'break-word'}}
          >
            {title}
          </TextElement>
        </Box>
        <Box style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          <CustomEditIcon
            toolTipText={'Edit'}
            fillColor={colors.lightBlue}
            styles={{margin: '3px 0px 3px 0px'}}
            onClick={handleOpen}
          />
          <CustomDeleteIcon
            toolTipText={'Delete'}
            fillColor={colors.deleteRed}
            styles={{margin: '3px 0px 3px 0px'}}
            onClick={_handleDeleteItem}
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
              onChange={handleNameChangeTitle}
              // onBlur={emailValidate}
              // errorMessage={<ErrorText errorMessage={emailError} />}
              // error={emailError === "" ? false : true}
              style={styles.input}
            />

            <TextareaAutosize
              minRows={4}
              style={{
                width: '100%',
                textDecoration: 'none',
                border: `0.5px solid ${colors.darkWhite}`,
                borderRadius: '5px',
                padding: '10px 0px 0px 10px',
                marginTop: '5px',
              }}
              placeholder={'Add Description Here...'}
              value={description}
              onChange={handleNameChangeDescription}
            />

            <Box
              onClick={handleClickInColorPalate}
              className={classes.colorPalate}
              style={{backgroundColor: color}}
            >
              <TextElement font="bold" fontType="h8" textStyle={styles.text}>
                {isPalateOpen ? 'Done' : 'Change Color'}
              </TextElement>
            </Box>

            {isPalateOpen ? (
              <SketchPicker
                color={color}
                onChangeComplete={handleChangeColor}
              ></SketchPicker>
            ) : null}

            <Box className={classes.buttonPosition}>
              <ButtonContainer
                customButtonStyle={{
                  ...styles.submitbutton,
                }}
                title={'Close'}
                onClick={handleClose}
              />
              <ButtonContainer
                customButtonStyle={{
                  ...styles.submitbutton,
                  backgroundColor: color,
                  color: colors.black,
                }}
                title={'Add Changes'}
                onClick={_handleEditItem}
              />
            </Box>
            {/* Discussion Section */}
            <Discussion
              boardId={boardId}
              columnId={columnId}
              itemId={item._id}
              comments={item.comments}
            />
          </Box>
        </Box>
      </CustomTransitionsModal>
    </>
  )
}

export default memo(DisplayItem)
const styles = {
  text: {
    color: colors.black,
  },
  input: {
    width: '100%',
  },
  submitbutton: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    // marginTop: "20px",
    color: colors.white,
  },
}
