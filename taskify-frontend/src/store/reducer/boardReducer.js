import {
  ADD_BOARD,
  ADD_CONTAINER,
  ADD_ITEM,
  CHANGE_COLUMN,
  CHANGE_ITEM_POSITION_IN_SAME_CONTAINER,
  CHNAGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER,
  DELETE_BOARD,
  DELETE_CONTAINER,
  DELETE_ITEM,
  EDIT_BOARD,
  EDIT_CONTAINER,
  EDIT_ITEM,
  SET_BOARDS,
  SET_COLUMNS,
} from '../types'
import {v4 as uuidv4} from 'uuid'
import {setItem} from '../../utils/localstorage'
import {Api} from '../../utils/Api'
/* Structure of the taskify state store
state : {
    boardId :{
        name,
        columnArr : [{_id , columnId}, ...]
        column :{
           _id :  {
                _id
                name,
                itemArr :[{_id , itemId}, ...]
                items:{
                   _id : {
                        _id 
                        name
                    }
                  }
            }
          }
    }
}
 */

const initState = {}

const boardReducer = (state = initState, action) => {
  let newState, payload

  switch (action.type) {
    case ADD_BOARD:
      newState = {
        [action.payload._id]: {...action.payload, columnArr: [], column: {}},
        ...state,
      }
      setItem({
        ...newState,
      })
      return newState

    case DELETE_BOARD:
      delete state[action.payload]
      setItem({
        ...state,
      })
      return {...state}

    case EDIT_BOARD:
      state[action.payload._id] = {
        ...state[action.payload._id],
        name: action.payload.name,
        bgColor: action.payload.bgColor,
      }
      setItem({
        ...state,
      })
      return {...state}

    case SET_BOARDS:
      newState = {}
      // eslint-disable-next-line array-callback-return
      action.payload.map(board => {
        newState[board._id] = board
      })
      setItem({
        ...newState,
      })
      return newState

    case SET_COLUMNS:
      // console.log('Before', state[action.payload.boardId].column)
      state[action.payload.boardId].column = action.payload.columns
      // console.log('After', state[action.payload.boardId].column)
      setItem({
        ...state,
      })
      return {...state}

    case ADD_ITEM:
      state[action.payload.boardId].column[action.payload.columnId].items = {
        ...state[action.payload.boardId].column[action.payload.columnId].items,
        [action.payload.item._id]: {...action.payload.item},
      }
      state[action.payload.boardId].column[
        action.payload.columnId
      ].itemArr.push(action.payload.itemArrItem)

      setItem({...state})
      return {...state}

    case DELETE_ITEM:
      state[action.payload.boardId].column[
        action.payload.columnId
      ].itemArr.splice(action.payload.index, 1)
      delete state[action.payload.boardId].column[action.payload.columnId]
        .items[action.payload.itemId]
      setItem({...state})
      return {...state}

    case EDIT_ITEM:
      console.log(
        'BEFOIRE : ',
        state[action.payload.boardId].column[action.payload.columnId].items[
          action.payload.item._id
        ],
      )
      state[action.payload.boardId].column[action.payload.columnId].items[
        action.payload.item._id
      ] = {
        ...state[action.payload.boardId].column[action.payload.columnId].items[
          action.payload.item._id
        ],
        name: action.payload.item.name,
        description: action.payload.item.description,
        bgColor: action.payload.item.bgColor,
      }
      console.log(
        'afteer : ',
        state[action.payload.boardId].column[action.payload.columnId].items[
          action.payload.item._id
        ],
      )
      setItem({...state})
      return {...state}

    case EDIT_CONTAINER:
      state[action.payload.boardId].column[action.payload.columnId] = {
        ...state[action.payload.boardId].column[action.payload.columnId],
        name: action.payload.column.name,
        bgColor: action.payload.column.bgColor,
      }
      setItem({
        ...state,
      })
      return {
        ...state,
      }

    case ADD_CONTAINER:
      // console.log(action.payload.column)
      const column = {
        ...action.payload.column,
        itemArr: [],
        items: {},
      }
      state[action.payload.boardId].column = {
        ...state[action.payload.boardId].column,
        [column._id]: {...column},
      }
      state[action.payload.boardId].columnArr.push(action.payload.columnArrItem)
      // console.log(state)
      setItem({
        ...state,
      })
      return {
        ...state,
      }

    case DELETE_CONTAINER:
      state[action.payload.boardId].columnArr.splice(action.payload.index, 1)
      delete state[action.payload.boardId].column[action.payload.columnId]
      setItem({
        ...state,
      })
      return {
        ...state,
      }

    case CHANGE_ITEM_POSITION_IN_SAME_CONTAINER:
      const {sourceIndex, desinationIndex, boardId, columnId} = action.payload
      const chnageItem = state[boardId].column[columnId].itemArr[sourceIndex]

      state[boardId].column[columnId].itemArr.splice(sourceIndex, 1)
      state[boardId].column[columnId].itemArr.splice(
        desinationIndex,
        0,
        chnageItem,
      )

      Api.postRequest(
        '/board-column/' +
          boardId +
          '/column/' +
          columnId +
          '/changeItemPositionInSameContainer',
        {
          items: state[boardId].column[columnId].itemArr,
        },
      )

      setItem({...state})

      return {...state}

    case CHNAGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER:
      let {
        boardId: bId,
        sourceColumbId,
        destinationColumbId,
        sourceItemIndex,
        destinationItemIndex,
      } = action.payload

      //grab itemArrIndex which change
      const itemArrIndex =
        state[bId].column[sourceColumbId].itemArr[sourceItemIndex]
      // grab item
      const item = state[bId].column[sourceColumbId].items[itemArrIndex.item]

      // remove itemArrIndex from source columb
      state[bId].column[sourceColumbId].itemArr.splice(sourceItemIndex, 1)
      //remove item
      delete state[bId].column[sourceColumbId].items[itemArrIndex.item]

      // add item in destination columb
      state[bId].column[destinationColumbId].itemArr.splice(
        destinationItemIndex,
        0,
        itemArrIndex,
      )
      console.log({item})
      // add item
      state[bId].column[destinationColumbId].items = {
        ...state[bId].column[destinationColumbId].items,
        [itemArrIndex.item]: item,
      }

      Api.postRequest(
        '/board-column/' +
          bId +
          '/column/changeItemPositionInDiffrentContainer',
        {
          sourceColumbId,
          sourceItems: state[bId].column[sourceColumbId].itemArr,
          destinationColumbId,
          destinationItems: state[bId].column[destinationColumbId].itemArr,
        },
      )

      setItem({...state})
      return {...state}

    case CHANGE_COLUMN:
      payload = action.payload

      const deltedContainerId =
        state[payload.boardId].columnArr[payload.sourceContainerIndex]
      state[payload.boardId].columnArr.splice(payload.sourceContainerIndex, 1)
      state[payload.boardId].columnArr.splice(
        payload.destinationContainerIndex,
        0,
        deltedContainerId,
      )
      // console.log('Column Arr', state[payload.boardId].columnArr)
      Api.postRequest('/board/' + payload.boardId + '/changeColumbPosition', {
        columns: state[payload.boardId].columnArr,
      })

      setItem({...state})
      return {...state}

    default:
      setItem(state)
      return state
  }
}

export default boardReducer
