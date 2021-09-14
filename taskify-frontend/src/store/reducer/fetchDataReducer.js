/* Structure of the taskify state store
  state : {

    myBoards : Boolean,
    boards :{
        bordId : Boolean
    }
  }
   */

import {FETCH_INDIVIDUAL_BOARD, FETCH_MYBOARDS} from '../types'

const initState = {
  myBoards: false,
  boards: {},
}

const fetchReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_MYBOARDS:
      return {
        ...state,
        myBoards: true,
      }
    case FETCH_INDIVIDUAL_BOARD:
      state.boards[action.payload] = true
      return {
        ...state,
      }
    default:
      return state
  }
}

export default fetchReducer
