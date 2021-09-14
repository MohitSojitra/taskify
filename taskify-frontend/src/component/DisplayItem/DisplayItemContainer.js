import {Box} from '@material-ui/core'
import React, {memo} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {useSelector} from 'react-redux'

import DisplayItem from './DisplayItem'

const DisplayItemContainer = memo(
  ({itemId, index, boardId, columnIndex, columnId}) => {
    console.log('DisplayItem run....')
    const item = useSelector(
      state => state.data[boardId].column[columnId].items[itemId],
    )

    return (
      <Draggable draggableId={item._id} index={index}>
        {provided => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DisplayItem
              item={item}
              boardId={boardId}
              columnIndex={columnIndex}
              index={index}
              columnId={columnId}
            />
          </Box>
        )}
      </Draggable>
    )
  },
)

export default DisplayItemContainer
