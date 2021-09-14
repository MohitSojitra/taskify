import {Box, makeStyles} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {Api} from '../../utils/Api'
import BoardItem from './BoardItem'
import {useDispatch, useSelector} from 'react-redux'
import {setBoards} from '../../store/dipatures'
import {setBoardsInStore} from '../../utils/setFunctions'
import {useHistory} from 'react-router-dom'
import Spinner from '../Loader/Spinner'

const useStyle = makeStyles({
  container: {
    padding: '0px 20px',
  },
})
function BoardContainer() {
  const classes = useStyle()
  const dispatch = useDispatch()
  const boards = useSelector(state => state.data)
  const fetch = useSelector(state => state.fetch)
  const {replace} = useHistory()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // it is not nesesary to check wether user fetch my boards data or not.
    // i put condition here because if user direct land in /boards/boardid page at that time we fetch board data as well as that individual column data; after that we go to home screen (/) at that it not nesessary to fetch my board data because it alredy fetch in /board/boardId. Thats why here add condition.
    if (!fetch.myBoards)
      setBoardsInStore(dispatch, replace, () => {
        setLoading(false)
      })
    else setLoading(false)
  }, [dispatch, fetch.myBoards, loading, replace])

  return (
    <>
      <Spinner isLoading={loading} />
      <Box className={classes.container}>
        {Object.keys(boards).map((key, index) => (
          <BoardItem key={key} board={boards[key]} />
        ))}
      </Box>
    </>
  )
}

export default BoardContainer
