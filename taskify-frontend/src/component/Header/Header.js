import React, {useEffect, useState} from 'react'
import {AppBar, Toolbar, makeStyles, Box} from '@material-ui/core'
import {Link, withRouter} from 'react-router-dom'
import MacaronLogo from '../SvgIcons/MacaronLogo'
import {colors} from '../../Theme/ColorPalette'
import HomeIcon from '@material-ui/icons/Home'
import CreateBoard from '../CreateBoard/CreateBoard'
import CustomAvatar from '../Avatar/CustomAvatar'
import {Api} from '../../utils/Api'
import {isLogin} from '../../utils/localstorage'
import {TextElement} from '../TextElement'

function Header(props) {
  const classes = useStyles()
  const [user, setUser] = useState(null)
  useEffect(() => {
    isLogin() &&
      (async () => {
        const {statusCode, data} = await Api.getRequest('/user/me')
        if (statusCode === 400 || statusCode === 500) {
          return
        }
        const user = JSON.parse(data)
        console.log({user})
        setUser(user)
      })()
  }, [])

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appContainer}>
        <Toolbar>
          <Link to="/">
            <HomeIcon fontSize="large" style={{fill: colors.lightBlue}} />
          </Link>
        </Toolbar>
        <Toolbar>
          <Link to="/" style={{textDecoration: 'none'}}>
            <TextElement textStyle={{color: colors.lightBlue}}>
              Taskify
            </TextElement>
          </Link>
        </Toolbar>
        <Box
          style={{
            marginRight: '2%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center ',
          }}
        >
          {props.location.pathname !== '/signin' &&
          props.location.pathname !== '/signup' ? (
            <>
              <CreateBoard />

              <CustomAvatar user={user} />
            </>
          ) : null}
        </Box>
      </AppBar>
    </Box>
  )
}

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
  },
  appContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 1px 12px rgba(0, 0, 0, 0.04)',
  },
})
export default withRouter(Header)
