import {Box} from '@material-ui/core'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {
  addContainer,
  changeColumn,
  changePositionInDiffrentContainer,
  changePositionInSameContainer,
} from '../store/dipatures'
import {Api} from '../utils/Api'
import {setIndividualBoardInStore} from '../utils/setFunctions'
import AddItemComponent from './common/AddItemComponent'
import InputComponent from './common/InputComponent'
import {useHistory} from 'react-router-dom'

import MainItemCard from './MainItemCard'
import {TextElement} from './TextElement'
import Spinner from './Loader/Spinner'

function ContainerBody({boardId}) {
  const board = useSelector(state => state.data)
  const fetch = useSelector(state => state.fetch)
  const [loading, setLoading] = useState(true)
  const {replace} = useHistory()

  // const [data, setData] = useState([])
  const columnArr = useMemo(() => {
    return board[boardId]?.columnArr || []
  }, [board, boardId])
  const [isAddItemShow, setIsAddItemShow] = useState(false)
  const dispatch = useDispatch()
  const handleChange = useCallback(() => {
    setIsAddItemShow(!isAddItemShow)
  }, [isAddItemShow])

  const addItem = useCallback(
    async value => {
      setLoading(true)
      const {statusCode, data} = await Api.postRequest(
        `/board-column/${boardId}/column`,
        {name: value},
      )
      setLoading(false)
      if (statusCode === 400 || statusCode === 500) {
        toast.error(data)
        return
      }
      const {message, column, columnArrItem} = JSON.parse(data)

      addContainer(dispatch, {column, boardId, columnArrItem})
      toast(message)
    },
    [boardId, dispatch],
  )

  const handleDragEnd = useCallback(
    result => {
      console.log('result 1', result)
      if (!result.destination) return

      if (result.type === 'column') {
        //TODO: if column change
        changeColumn(dispatch, {
          sourceContainerIndex: result.source.index,
          destinationContainerIndex: result.destination.index,
          boardId: boardId,
        })
        return
      }

      if (result.source.droppableId === result.destination.droppableId) {
        //TODO: same container move item
        changePositionInSameContainer(dispatch, {
          sourceIndex: result.source.index,
          desinationIndex: result.destination.index,
          boardId: boardId,
          columnId: result.destination.droppableId,
        })
      } else {
        changePositionInDiffrentContainer(dispatch, {
          sourceColumbId: result.source.droppableId,
          destinationColumbId: result.destination.droppableId,
          sourceItemIndex: result.source.index,
          destinationItemIndex: result.destination.index,
          boardId,
        })
      }
    },
    [boardId, dispatch],
  )

  useEffect(() => {
    ;(async () => {
      if (!fetch.myBoards)
        setIndividualBoardInStore(dispatch, replace, boardId, true, () => {
          setLoading(false)
        })
      else if (!fetch.boards[boardId])
        setIndividualBoardInStore(dispatch, replace, boardId, false, () => {
          setLoading(false)
        })
      else setLoading(false)
    })()
  }, [boardId, dispatch, fetch.boards, fetch.myBoards, replace])

  return (
    <>
      <Spinner isLoading={loading} />
      <div style={{padding: '0px 0px 0px 50px'}}>
        <TextElement font="bold" fontType="h2">
          {board[boardId]?.name}
        </TextElement>
      </div>
      <Box
        style={{
          display: 'flex',
          flexGrow: 1,
          padding: '0px 20px',
          overflow: 'scroll',
        }}
      >
        <Box
          style={{
            display: 'flex',

            flexGrow: 1,
          }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId={boardId}
              direction="horizontal"
              type="column"
            >
              {provided => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: 'flex',
                    width: `calc(300px * ${columnArr.length} + ${columnArr.length}px * 50)`,
                  }}
                >
                  {board[boardId]?.column &&
                    columnArr.map(({columnId}, index) => (
                      <MainItemCard
                        key={columnId}
                        columnId={columnId}
                        index={index}
                        boardId={boardId}
                      />
                    ))}
                  {provided.placeholder}
                  <Box style={{width: '300px', justifySelf: 'flex-end'}}>
                    {isAddItemShow ? (
                      <InputComponent
                        handleChange={handleChange}
                        addItem={addItem}
                        buttonText={'Add'}
                        placeholder={'Please enter title'}
                      />
                    ) : (
                      <AddItemComponent
                        handleChange={handleChange}
                        buttonText={'Add New Container'}
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Droppable>
          </DragDropContext>

          {/* Show input component or a add component */}
        </Box>
      </Box>
    </>
  )
}

export default ContainerBody
