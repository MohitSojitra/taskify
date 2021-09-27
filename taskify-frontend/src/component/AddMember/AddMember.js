import {Box, makeStyles} from '@material-ui/core'
import React, {memo, useCallback, useState} from 'react'
import {colors} from '../../Theme/ColorPalette'
import ButtonContainer from '../ButtonContainer'
import CustomTransitionsModal from '../common/Modal/Modal'
import InputContainer from '../InputContainer'
import {TextElement} from '../TextElement'

import {Api} from '../../utils/Api'
import Spinner from '../Loader/Spinner'
import {toast} from 'react-toastify'
import {addMemberInBoard, removeMemberInBoard} from '../../store/dipatures'
import {useDispatch} from 'react-redux'
import Member from './Member'

const useStyles = makeStyles(theme => ({
  container: {
    width: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonPosition: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
}))

function AddMember({member, boardId, boardCreaterId}) {
  const classes = useStyles()
  console.log({member})
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const _handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const _handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleNameChange = useCallback(e => {
    setValue(e.target.value)
  }, [])

  const _addMember = useCallback(async () => {
    setLoading(true)
    setValue('')
    const {statusCode, data} = await Api.postRequest(
      `/board/${boardId}/addMember`,
      {email: value},
    )
    setLoading(false)
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    const {message, member} = JSON.parse(data)

    addMemberInBoard(dispatch, {boardId, member})
    toast(message)
  }, [boardId, dispatch, value])

  const _removeMember = useCallback(
    async memberUserId => {
      setLoading(true)
      setValue('')
      const {statusCode, data} = await Api.postRequest(
        `/board/${boardId}/removeMember`,
        {memberUserId},
      )
      setLoading(false)
      if (statusCode === 400 || statusCode === 500) {
        toast.error(data)
        return
      }
      const {message, member} = JSON.parse(data)

      removeMemberInBoard(dispatch, {boardId, member})
      toast(message)
    },
    [boardId, dispatch],
  )
  return (
    <Box style={{width: '20%', padding: '16px 0px'}}>
      <Spinner isLoading={loading} />
      <ButtonContainer
        customButtonStyle={{
          ...styles.submitbutton,
        }}
        title={'Add Member'}
        onClick={_handleOpen}
      />
      <CustomTransitionsModal open={open} handleClose={_handleClose}>
        <Box className={classes.container}>
          <Box className={classes.inputContainer}>
            <InputContainer
              textType="text"
              inputLable="Email"
              value={value}
              placeholder={'Please Enter Your Member Email'}
              onChange={handleNameChange}
              style={styles.input}
              autoFocus
            />
            <ButtonContainer
              title={'Add'}
              onClick={_addMember}
              customButtonStyle={{
                ...styles.addMemberbtn,
              }}
            />
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: '20px',
              width: '100%',
            }}
          >
            {member
              .filter(user => user.userId._id !== boardCreaterId)
              .map(user => (
                <Member
                  user={user}
                  key={user._id}
                  removeMember={_removeMember}
                />
              ))}
          </Box>

          {member.length > 1 && (
            <Box className={classes.buttonPosition}>
              <ButtonContainer
                customButtonStyle={{
                  ...styles.submitbutton,
                  // backgroundColor: color.color,
                }}
                title={'Done'}
                onClick={_handleClose}
              />
            </Box>
          )}
        </Box>
      </CustomTransitionsModal>
    </Box>
  )
}
const styles = {
  submitbutton: {
    // width: "24%",
    height: '45px',
    // marginLeft: '20px',

    borderRadius: '12px',
    // marginTop: "20px",
    color: colors.white,
  },
  addMemberbtn: {
    height: '100%',

    marginTop: '12px',
  },
  input: {
    flexGrow: 1,
    marginRight: '20px',
  },
}

export default memo(AddMember)
