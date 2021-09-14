import React from 'react'
import {Typography} from '@material-ui/core'
import {fontSize, sizes, fonts} from '../Theme/Typography'

const textTypeStyle = textType => {
  switch (textType) {
    case fontSize.h1:
      return {
        fontSize: sizes.h1,
      }
    case fontSize.h2:
      return {
        fontSize: sizes.h2,
      }
    case fontSize.h3:
      return {
        fontSize: sizes.h3,
      }
    case fontSize.h4:
      return {
        fontSize: sizes.h4,
      }
    case fontSize.h5:
      return {
        fontSize: sizes.h5,
      }
    case fontSize.h6:
      return {
        fontSize: sizes.h6,
      }
    case fontSize.h7:
      return {
        fontSize: sizes.h7,
      }
    case fontSize.h8:
      return {
        fontSize: sizes.h8,
      }
    case fontSize.h9:
      return {
        fontSize: sizes.h9,
      }
    default:
      break
  }
}

const TextElement = props => {
  const {
    textStyle,
    children,
    font = 'regular' || 'bold' || 'light' || 'medium' || 'semiBold',
    fontType = 'h1' ||
      'h2' ||
      'h3' ||
      'h4' ||
      'h5' ||
      'h6' ||
      'h7' ||
      'h8' ||
      'h9',
    ...rest
  } = props

  return (
    <Typography
      style={Object.assign(
        {textAlign: 'left'},
        styles.text,

        styles[font],
        textTypeStyle(fontSize[fontType]),
        textStyle,
      )}
      {...rest}
    >
      {children}
    </Typography>
  )
}

export {TextElement}

export const styles = {
  text: {
    fontSize: sizes.base,
    ...fonts.regular,
  },
  regular: {
    ...fonts.regular,
  },
  bold: {
    ...fonts.bold,
  },
  light: {
    ...fonts.light,
  },
  medium: {
    ...fonts.medium,
  },
  semiBold: {
    ...fonts.semiBold,
  },
}
