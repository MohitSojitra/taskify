import {Box} from '@material-ui/core'
import React, {memo, useCallback, useMemo, useState} from 'react'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {addItemInContainer} from '../store/dipatures'
import {colors} from '../Theme/ColorPalette'
import {Api} from '../utils/Api'
import ColumnHeader from './ColumnHeader/ColumnHeader'

import AddItemComponent from './common/AddItemComponent'
import InputComponent from './common/InputComponent'
import DisplayItemContainer from './DisplayItem/DisplayItemContainer'
import Spinner from './Loader/Spinner'

function MainItemCard({columnId, index, boardId}) {
  const [isAddItemShow, setIsAddItemShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const data = useSelector(state => state.data)
  const container = useMemo(
    () => data[boardId].column[columnId],
    [boardId, columnId, data],
  )

  const [containerColumnColor, setContainerColumnColor] = useState(
    container.bgColor || colors.smokeWhite,
  )
  const [title, setTitle] = useState(container.name)

  const dispatch = useDispatch()

  const handleChange = useCallback(() => {
    setIsAddItemShow(!isAddItemShow)
  }, [isAddItemShow])

  const addItem = useCallback(
    async value => {
      setLoading(true)
      const {statusCode, data} = await Api.postRequest(
        `/board-item/${boardId}/column/${container._id}/item`,
        {name: value},
      )
      setLoading(false)
      if (statusCode === 400 || statusCode === 500) {
        toast.error(data)
        return
      }
      const {message, item, itemArrItem} = JSON.parse(data)
      toast(message)
      addItemInContainer(dispatch, {
        index,
        item,
        boardId,
        columnId,
        itemArrItem,
      })
    },
    [boardId, columnId, container._id, dispatch, index],
  )

  console.log('MainItemCard run....')
  // console.log({itemcontainer: container.items, arr: container.itemArr})
  return (
    <>
      <Spinner isLoading={loading} />
      <Draggable draggableId={container._id.toString()} index={index}>
        {provided => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div
              style={{
                width: '300px',
                backgroundColor: containerColumnColor,
                padding: '0px 20px',
                borderRadius: '6px',
                marginRight: '10px',
              }}
            >
              {/* Container | Column Header */}
              <Box {...provided.dragHandleProps}>
                <ColumnHeader
                  title={title}
                  setTitle={setTitle}
                  setContainerColumnColor={setContainerColumnColor}
                  containerColumnColor={containerColumnColor}
                  boardId={boardId}
                  columnId={container._id}
                  index={index}
                />
              </Box>

              {/* Conatiner | Column Body */}
              <Droppable droppableId={container._id.toString()}>
                {provided => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Box>
                        {container.itemArr.map(({item: itemId}, i) => (
                          <DisplayItemContainer
                            key={itemId}
                            itemId={itemId}
                            index={i}
                            boardId={boardId}
                            columnIndex={index}
                            columnId={container._id}
                          />
                        ))}
                        {provided.placeholder}
                      </Box>

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
                          buttonText={'Add New Card'}
                        />
                      )}
                    </div>
                  )
                }}
              </Droppable>
              {/* </DragDropContext> */}
            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}

export default memo(MainItemCard)
