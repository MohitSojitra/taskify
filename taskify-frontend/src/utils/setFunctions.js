import {toast} from 'react-toastify'
import {
  fetchIndividualBoard,
  fetchMyBoards,
  setBoards,
  setColumns,
} from '../store/dipatures'
import {Api} from './Api'
import {logout} from './localstorage'

export const setBoardsInStore = async (
  dispatch,
  replace,
  callBack = () => {},
) => {
  console.log('Is it run... setBoardsInStore')
  const {statusCode, data} = await Api.getRequest('/board')

  if (statusCode === 400 || statusCode === 500) {
    // toast.error(data)
    logout()
    replace('/signin')
    return
  }
  const res = JSON.parse(data)
  setBoards(dispatch, res.board)

  fetchMyBoards(dispatch)
  callBack()
}

export const setIndividualBoardInStore = async (
  dispatch,
  replace,
  boardId,
  isMyBoardFetch = false,
  callBack = () => {},
) => {
  console.log('Is it run... setIndividualBoardInStore', boardId, isMyBoardFetch)

  const url = '/board-column/' + boardId + '/column'
  if (isMyBoardFetch) await setBoardsInStore(dispatch)

  const {statusCode, data} = await Api.getRequest(url)
  if (statusCode === 400 || statusCode === 500) {
    logout()
    replace('/signin')
    return
  }
  const res = JSON.parse(data)
  console.log({res})
  setColumns(dispatch, {boardId, columns: res.columns})
  fetchIndividualBoard(dispatch, boardId)
  callBack()
}
