/* Structure of the taskify state store
  state : {

    myBoards : Boolean,
    boards :{
        bordId : Boolean
    }
  }
   */

import {
  FETCH_INDIVIDUAL_BOARD,
  FETCH_MYBOARDS,
  SET_INITIAL_STATE_FETCH_REDUCER,
} from '../types'

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
    case SET_INITIAL_STATE_FETCH_REDUCER:
      return {}
    default:
      return state
  }
}

export default fetchReducer
