import {Avatar, makeStyles} from '@material-ui/core'
import React, {useState} from 'react'
import {colors} from '../../Theme/ColorPalette'
import ProfileModal from '../ProfileModal/ProfileModal'

function CustomAvatar({user}) {
  const classes = useStyles()
  const [profileModal, setProfileModal] = useState(false)
  return (
    <>
      <Avatar
        alt="Profile"
        src={`https://joeschmoe.io/api/v1/${user?.name}`}
        className={classes.avatarImage}
        style={{backgroundColor: colors.darkGrey}}
        onClick={() => setProfileModal(!profileModal)}
      />

      {profileModal ? (
        <ProfileModal close={() => setProfileModal(false)} user={user} />
      ) : null}
    </>
  )
}

export default CustomAvatar

const useStyles = makeStyles({
  avatarImage: {
    width: '36px',
    height: '36px',
    cursor: 'pointer',
  },
})
