import {Box} from '@material-ui/core'
import React, {memo, useCallback} from 'react'
import {colors} from '../../Theme/ColorPalette'
import {TextElement} from '../TextElement'
import CloseIcon from '@material-ui/icons/Close'
function Member({user, removeMember}) {
  const _removeMember = useCallback(() => {
    removeMember(user.userId._id)
  }, [removeMember, user.userId._id])

  return (
    <Box
      style={{
        backgroundColor: colors.green,
        padding: '15px',
        margin: '5px',
        display: 'flex',
        borderRadius: '8px ',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TextElement fontType={'h8'}>{user.userId.email}</TextElement>
      <CloseIcon
        fontSize={'small'}
        style={{marginLeft: '5px', cursor: 'pointer'}}
        onClick={_removeMember}
      />
    </Box>
  )
}

export default memo(Member)
