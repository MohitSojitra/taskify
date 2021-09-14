import {Box} from '@material-ui/core'
import React, {memo} from 'react'
import {TextElement} from '../TextElement'
import {colors} from '../../Theme/ColorPalette'
import FavoriteIcon from '@material-ui/icons/Favorite'
function Footer() {
  return (
    <Box
      style={{
        height: '40px',
        backgroundColor: colors.lightBlue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        bottom: 0,
      }}
    >
      <TextElement font="bold" fontType="h5">
        Made with
      </TextElement>
      <FavoriteIcon style={{fill: '#ed8e45', margin: '0px 10px'}} />
      <TextElement font="bold" fontType="h5">
        by Mohit Sojitra
      </TextElement>
    </Box>
  )
}

export default memo(Footer)
