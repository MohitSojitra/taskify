import React, {useEffect, useState} from 'react'
import {makeStyles, Box} from '@material-ui/core'
import Images from '../../assets/index'
import HelpIcon from '../SvgIcons/HelpIcon'
import LogoutIcon from '../SvgIcons/LogoutIcon'
import {useHistory} from 'react-router-dom'
import EditIcon from '../SvgIcons/EditIcon'
import {TextElement} from '../TextElement'
import {colors} from '../../Theme/ColorPalette'
import {Api} from '../../utils/Api'
import {logout} from '../../utils/localstorage'

function ProfileModal(props) {
  const {close, user} = props
  // const [selectedProfile, setSelectedProfile] = useState('')

  const classes = useStyles()
  const history = useHistory()

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.detailsContainer}>
        <Box className={classes.profileContainer}>
          <img
            src={`https://joeschmoe.io/api/v1/${user?.name}`}
            className={classes.avatar}
            alt={user?.name}
          />
        </Box>
        <TextElement font="semiBold" fontType="h5" className={classes.userName}>
          {user?.name || 'John Doe'}
        </TextElement>
      </Box>
      <Box>
        <Box className={classes.dividerLine} />
        <Box className={classes.logoutInnerRow}>
          <HelpIcon />
          <TextElement
            font="semiBold"
            fontType="h6"
            className={classes.userName}
            style={{fontSize: '16px', marginTop: 0, marginLeft: '12px'}}
          >
            {'Help'}
          </TextElement>
        </Box>
        <Box
          className={classes.logoutInnerRow}
          onClick={() => {
            close()
            logout()
            history.push('/')
          }}
        >
          <LogoutIcon />
          <TextElement
            font="semiBold"
            fontType="h6"
            className={classes.userName}
            style={{fontSize: '16px', marginTop: 0, marginLeft: '12px'}}
          >
            {'Sign Out'}
          </TextElement>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: colors.white,
    position: 'absolute',
    right: '24px',
    top: '54px',
    width: '254px',
    zIndex: 99,
    padding: '8px',
    borderRadius: '20px',
    boxShadow:
      '0px 2px 20px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.08)',
  },
  avatar: {
    width: '72px',
    height: '72px',
  },
  userName: {
    color: colors.darkBlue,
    marginTop: '12px',
  },
  logoutInnerRow: {
    display: 'flex',
    alignItems: 'center',
    alignmentBaseline: 'central',
    margin: '0 20px 0 20px',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: colors.daisyWhite,
    },
  },
  dividerLine: {
    width: '98%',
    height: '10px',
    borderBottom: '1px solid #DCE1E7',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: '10px',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '24px',
  },
  profileContainer: {
    width: '72px',
    height: '72px',
    borderRadius: '36px',
    overflow: 'hidden',
    position: 'relative',
  },
  overlayProfile: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '72px',
    height: '72px',

    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'multiply',
    verticalAlign: 'middle',
    textAlign: 'center',
    color: 'transparent',
    transition: 'all 0.3s ease',
    TextDecoration: 'none',
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.5,
      zIndex: 1,

      transition: 'all 0.3s ease',
      textDecoration: 'none',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
  },
  editIcon: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    msTransform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
})

export default ProfileModal
