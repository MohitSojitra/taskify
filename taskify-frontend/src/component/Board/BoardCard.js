import React, {memo, useCallback} from 'react'
import {Avatar, Box, makeStyles} from '@material-ui/core'

import {colors} from '../../Theme/ColorPalette'
import {TextElement} from '../TextElement'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CustomTooltip from '../styledComponent/CustomTooltip'

import CustomEditIcon from '../Icons/EditIcon'
import CustomDeleteIcon from '../Icons/DeleteIcon'
import {Api} from '../../utils/Api'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import {deleteBoard, editBoard} from '../../store/dipatures'
import {useHistory} from 'react-router-dom'

const useStyle = makeStyles(props => ({
  card: {
    width: '250px',
    height: '150px',
    backgroundColor: props => props.color || colors.lightBlue,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '16px',
  },
  text: {
    color: 'white',
    textAlign: 'left',
  },
  avatarImage: {
    width: '28px',
    height: '28px',
    cursor: 'pointer',
  },
  center: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

// TODO: NOTES : here in Home screen - title and color are null and board is fetched from the database
// TODO: NOTES : here in Create board preview - title and color are not null and board is null
function BoardCard({title, color, board}) {
  const history = useHistory()

  const classes = useStyle({color: color || board.bgColor})
  const dispatch = useDispatch()
  const _handleDelete = useCallback(async () => {
    const {statusCode, data} = await Api.DeleteRequest(`/board/${board._id}`)
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    deleteBoard(dispatch, board._id)
    toast(data)
  }, [board?._id, dispatch])
  const _handleEdit = useCallback(
    async ({titleError, title, color}) => {
      const {statusCode, data} = await Api.putRequest(`/board/${board._id}`, {
        name: title,
        bgColor: color.color,
      })
      if (statusCode === 400 || statusCode === 500) {
        toast.error(data)
        return
      }
      const {board: updatedBoard, message} = JSON.parse(data)
      editBoard(dispatch, updatedBoard)
      toast(message)
    },
    [board?._id, dispatch],
  )

  const _handleRedirect = useCallback(() => {
    console.log('Click')
    history.push(`/board/${board._id}`)
  }, [board?._id, history])
  console.log(board?.createdBy.name)
  return (
    <Box className={classes.card}>
      <Box style={{cursor: 'pointer'}} onClick={_handleRedirect}>
        <TextElement font="bold" fontType="h5" className={classes.text}>
          {title || board?.name || 'Your titles goes here'}
        </TextElement>
      </Box>
      <Box className={classes.center}>
        <Box className={classes.center}>
          <AccountCircleIcon
            fontSize="medium"
            style={{marginRight: '4px', fill: colors.white}}
          />
          <TextElement font="bold" fontType="h6" className={classes.text}>
            {`${board?.member.length || 1} `}
          </TextElement>
        </Box>

        {/* <Box> */}
        <CustomEditIcon
          toolTipText={'Edit Board'}
          onClick={board && _handleEdit}
          isBoard={{edit: true, board}}
        />
        {/* </Box> */}

        {/* <Box> */}
        <CustomDeleteIcon
          toolTipText={'Delete Board'}
          onClick={board && _handleDelete}
        />
        {/* </Box> */}

        <Box>
          <CustomTooltip
            title={board?.createdBy.name || 'User Name'}
            placement="top"
            arrow
            style={{color: colors.black}}
          >
            <Avatar
              alt="Profile"
              src={`https://joeschmoe.io/api/v1/${
                board?.createdBy.name || 'User Name'
              }`}
              className={classes.avatarImage}
              style={{backgroundColor: colors.white}}
            />
          </CustomTooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(BoardCard)
