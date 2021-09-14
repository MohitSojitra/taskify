import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import NotesIcon from '@material-ui/icons/Notes'
import {Avatar, Box, CircularProgress, makeStyles} from '@material-ui/core'
import {TextElement} from '../TextElement'
import InputContainer from '../InputContainer'
import {colors} from '../../Theme/ColorPalette'
import CustomTooltip from '../styledComponent/CustomTooltip'
import CustomDeleteIcon from '../Icons/DeleteIcon'
import SendIcon from '@material-ui/icons/Send'
import {Api} from '../../utils/Api'
import {toast} from 'react-toastify'
import {getPreetyDisplayDate} from '../../utils/helper'

const useStyle = makeStyles({
  container: {
    width: '70%',
    padding: '16px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  toolTipStyle: {
    backgroundColor: colors.white,
    color: colors.black,
  },
  avatar: {
    backgroundColor: colors.daisyWhite,
    marginRight: '4px',
  },
})

const DiscussionDisplay = memo(({comment, handleCommentDelete}) => {
  const classes = useStyle()
  const date = useMemo(
    () => getPreetyDisplayDate(comment.createdAt),
    [comment.createdAt],
  )
  const _handleDelete = useCallback(() => {
    console.log(comment)
    handleCommentDelete(comment._id)
  }, [comment, handleCommentDelete])
  return (
    <Box style={{display: 'flex', alignItems: 'center', marginTop: '8px'}}>
      <Box>
        <CustomTooltip
          title="Mohit Sojitra"
          placement="top"
          arrow
          className={classes.toolTipStyle}
        >
          <Avatar
            alt="Profile"
            src={'https://joeschmoe.io/api/v1/mohit'}
            className={classes.avatar}
          />
        </CustomTooltip>
      </Box>
      <Box style={{flexGrow: 1, marginLeft: '10px'}}>
        <TextElement
          font={'regular'}
          fontType="h6"
          textStyle={{marginLeft: '10px'}}
        >
          {comment.message}
        </TextElement>
        <TextElement
          font={'regular'}
          fontType="h9"
          textStyle={{marginLeft: '10px', color: colors.darkGrey}}
        >
          {date}
        </TextElement>
      </Box>
      <Box
        style={{
          marginLeft: '20px',
        }}
      >
        <CustomDeleteIcon
          fillColor={colors.deleteRed}
          toolTipText={'Delete Comment'}
          onClick={_handleDelete}
        />
      </Box>
    </Box>
  )
})
function Discussion({boardId, columnId, itemId, comments}) {
  const classes = useStyle()
  const [comment, setComment] = useState('')
  const [discussions, setDiscussions] = useState([])
  const [loading, setLoading] = useState(true)
  const handleChangeComment = useCallback(e => {
    console.log(e.target.value)
    setComment(e.target.value)
  }, [])

  const _handleSendComment = useCallback(async () => {
    if (comment === '') {
      return
    }
    const {statusCode, data} = await Api.postRequest(
      `/board-item/${boardId}/column/${columnId}/item/${itemId}/comment`,
      {message: comment},
    )
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    console.log({data})
    const {message, comment: postedComment} = JSON.parse(data)
    toast(message)
    setComment('')
    setDiscussions([postedComment, ...discussions])
  }, [boardId, columnId, comment, discussions, itemId])

  const handleCommentDelete = useCallback(
    async id => {
      //TODO: Delete Comment code goes to here...
      const {statusCode, data} = await Api.DeleteRequest(
        `/board-item/${boardId}/column/${columnId}/item/${itemId}/comment/${id}`,
      )
      if (statusCode === 400 || statusCode === 500) {
        toast.error(data)
        return
      }
      const {message} = JSON.parse(data)
      toast(message)

      // remove comment from the discussion
      const filterComment = discussions.filter(comment => comment._id !== id)
      setDiscussions([...filterComment])
    },
    [boardId, columnId, discussions, itemId],
  )

  useEffect(() => {
    ;(async () => {
      const {statusCode, data} = await Api.getRequest(
        `/board-item/${boardId}/column/${columnId}/item/${itemId}/comment`,
      )
      if (statusCode === 400 || statusCode === 500) {
        toast.error(data)
        setLoading(false)
        return
      }
      const {comments} = JSON.parse(data)
      setTimeout(() => {
        setLoading(false)
      }, 1000)

      setDiscussions([...comments])
    })()
  }, [boardId, columnId, itemId])

  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* comment text */}
        <Box>
          <NotesIcon fontSize={'large'} />
        </Box>
        <Box>
          <TextElement
            font="bold"
            fontType="h5"
            textStyle={{marginLeft: '10px'}}
          >
            Discussion
          </TextElement>
        </Box>
      </Box>

      {/* Input Box for comments */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box>
          <CustomTooltip
            title="Mohit Sojitra"
            placement="top"
            arrow
            className={classes.toolTipStyle}
          >
            <Avatar
              alt="Profile"
              src={'https://joeschmoe.io/api/v1/mohit'}
              className={classes.avatar}
            />
          </CustomTooltip>
        </Box>
        <Box
          style={{
            flexGrow: 1,
            marginLeft: '10px',
          }}
        >
          <InputContainer
            textType="text"
            inputLable="Comment"
            inputValue={comment}
            placeholder={'Please Enter your comment'}
            onChange={handleChangeComment}
            onKeyPress={e => (e.charCode === 13 ? _handleSendComment() : null)}
            value={comment}
            // onBlur={emailValidate}
            // errorMessage={<ErrorText errorMessage={emailError} />}
            // error={emailError === "" ? false : true}
            style={styles.input}
          />
        </Box>
        <Box
          style={{
            marginLeft: '20px',
          }}
        >
          <SendIcon
            fontSize={'large'}
            style={{color: colors.lightBlue}}
            onClick={_handleSendComment}
          />
        </Box>
      </Box>

      {/* Comments... */}

      {loading ? (
        <Box
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        discussions.map((comment, index) => (
          <DiscussionDisplay
            key={comment._id}
            comment={comment}
            handleCommentDelete={handleCommentDelete}
          />
        ))
      )}
    </Box>
  )
}

export default Discussion
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
    width: '35px',
    borderRadius: '8px',
    // marginTop: "20px",
    color: colors.white,
  },
}
