import {
  ADD_ITEM,
  ADD_CONTAINER,
  CHANGE_ITEM_POSITION_IN_SAME_CONTAINER,
  CHNAGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER,
  CHANGE_COLUMN,
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
  SET_BOARDS,
  EDIT_CONTAINER,
  DELETE_CONTAINER,
  EDIT_ITEM,
  DELETE_ITEM,
  FETCH_MYBOARDS,
  FETCH_INDIVIDUAL_BOARD,
  SET_COLUMNS,
  ADD_MEMBER_IN_BOARD,
  REMOVE_MEMBER_IN_BOARD,
  SET_INITIAL_STATE_BOARD_REDUCER,
  SET_INITIAL_STATE_FETCH_REDUCER,
} from '../types'

// export const addItemInContainer = (dispatch, data) => {
//     try {
//         dispatch({
//             type: ADD_ITEM,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const addContainer = (dispatch, data) => {
//     try {
//         dispatch({
//             type: ADD_CONTAINER,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const changePositionInSameContainer = (dispatch, data) => {
//     try {
//         dispatch({
//             type: CHANGE_ITEM_POSITION_IN_SAME_CONTAINER,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const changePositionInDiffrentContainer = (dispatch, data) => {
//     try {
//         dispatch({
//             type: CHNAGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const changeColumn = (dispatch, data) => {
//     try {
//         dispatch({
//             type: CHANGE_COLUMN,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const addBoard = (dispatch, data) => {
//     try {
//         dispatch({
//             type: ADD_BOARD,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const editBoard = (dispatch, data) => {
//     try {
//         dispatch({
//             type: EDIT_BOARD,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const deleteBoard = (dispatch, data) => {
//     try {
//         dispatch({
//             type: DELETE_BOARD,
//             payload: data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

const createFunc = type => {
  return (dispatch, data) => {
    try {
      dispatch({
        type: type,
        payload: data,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

// Boards dispature
export const addItemInContainer = createFunc(ADD_ITEM)
export const editItemInContainer = createFunc(EDIT_ITEM)
export const deleteItemInContainer = createFunc(DELETE_ITEM)

export const addContainer = createFunc(ADD_CONTAINER)
export const editContainer = createFunc(EDIT_CONTAINER)
export const deleteContainer = createFunc(DELETE_CONTAINER)

export const changePositionInSameContainer = createFunc(
  CHANGE_ITEM_POSITION_IN_SAME_CONTAINER,
)

export const changePositionInDiffrentContainer = createFunc(
  CHNAGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER,
)

export const changeColumn = createFunc(CHANGE_COLUMN)
export const addBoard = createFunc(ADD_BOARD)
export const editBoard = createFunc(EDIT_BOARD)
export const deleteBoard = createFunc(DELETE_BOARD)
export const setBoards = createFunc(SET_BOARDS)
export const setColumns = createFunc(SET_COLUMNS)

// Fetch dispature
export const fetchMyBoards = createFunc(FETCH_MYBOARDS)
export const fetchIndividualBoard = createFunc(FETCH_INDIVIDUAL_BOARD)

//member
export const addMemberInBoard = createFunc(ADD_MEMBER_IN_BOARD)
export const removeMemberInBoard = createFunc(REMOVE_MEMBER_IN_BOARD)

export const setInitialStateBoard = createFunc(SET_INITIAL_STATE_BOARD_REDUCER)
export const setInitialStateFetch = createFunc(SET_INITIAL_STATE_FETCH_REDUCER)
