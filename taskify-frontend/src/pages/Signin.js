import React, {useCallback, useRef, useState} from 'react'
import {Box, makeStyles} from '@material-ui/core'
import AuthLayout from '../component/layout/AuthLayout'
import InputContainer from '../component/InputContainer'
import ButtonContainer from '../component/ButtonContainer'
import {Link, useHistory} from 'react-router-dom'
import {TextElement} from '../component/TextElement'
import {colors} from '../Theme/ColorPalette'
import ErrorText from '../component/ErrorText'
import {
  toastMessage,
  validateEmailValue,
  validatePasswordValue,
} from '../utils/helper'
import {Api} from '../utils/Api'
import {toast} from 'react-toastify'
import {setToken} from '../utils/localstorage'
import Footer from '../component/Footer/Footer'
import Spinner from '../component/Loader/Spinner'
import SpeedyAccess from '../component/SpeedyAccess'

const useStyle = makeStyles({
  container: {
    width: '100%',
    padding: '25px 55px',
  },
  headerSubtitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  textContainer: {
    textAlign: 'left',
    letterSpacing: '0.81071px',
    color: colors.lightGrey,
  },
  routeLink: {
    textDecoration: 'none',
    marginLeft: 4,
  },
  mainContainer: {
    alignItems: 'flex-start',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
  },
  forgotContainer: {
    marginTop: '10px',
  },
  forgotRouteLink: {
    outline: 'none',
    textDecoration: 'none',
    color: colors.darkGrey,
  },
  title: {
    color: colors.lightBlack,
  },
})
const styles = {
  link: {
    color: colors.lightBlue,
  },
  input: {
    width: '100%',
  },
  button: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    marginTop: '20px',
  },
}

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const buttonRef = useRef()

  const history = useHistory()

  const classes = useStyle()

  const handleEmailInput = useCallback(e => {
    setEmail(e.target.value)
  }, [])
  const handlePasswordInput = useCallback(e => {
    setPassword(e.target.value)
  }, [])
  const emailValidate = useCallback(() => {
    const validateStr = validateEmailValue(email)
    if (password.length >= 8 && passwordError === '' && validateStr === '') {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
    setEmailError(validateStr)
  }, [email, password.length, passwordError])

  const validatePasswordInput = useCallback(() => {
    const validateStr = validatePasswordValue(password)
    if (email.length > 1 && emailError === '' && validateStr === '') {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
    setPasswordError(validateStr)
  }, [email.length, emailError, password])

  const handleLogin = async () => {
    setLoading(true)
    const {statusCode, data} = await Api.postRequest('/auth/signin', {
      email,
      password,
    })
    setLoading(false)
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    const {status, token} = await JSON.parse(data)

    if (status === 'ok') {
      setToken(token)
      toast(toastMessage.sucessSignin)
      history.push('/')
      return
    }

    toast.error(toastMessage.errorSigning)
  }

  const _handleSpeedyAccess = useCallback(() => {
    setEmail('test@gmail.com')
    setPassword('test12345')
    setButtonDisabled(false)
  }, [])

  return (
    <>
      <Spinner isLoading={loading} />
      <SpeedyAccess onAccess={_handleSpeedyAccess} />
      <Box
        style={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AuthLayout>
          <Box className={classes.container}>
            <TextElement font="bold" fontType="h2" className={classes.title}>
              {'Sign in'}
            </TextElement>
            <Box className={classes.headerSubtitle}>
              <TextElement
                font="semiBold"
                fontType="h6"
                className={classes.textContainer}
              >
                {'Don’t have an account?'}
              </TextElement>
              <Link to="/signup" className={classes.routeLink}>
                <TextElement font="bold" fontType="h6" textStyle={styles.link}>
                  {' Sign up'}
                </TextElement>
              </Link>
            </Box>
            <Box className={classes.mainContainer}>
              <InputContainer
                textType="text"
                inputLable="Email"
                inputValue={email}
                value={email}
                placeholder={'Enter Your Email'}
                onChange={handleEmailInput}
                onBlur={emailValidate}
                errorMessage={<ErrorText errorMessage={emailError} />}
                error={emailError === '' ? false : true}
                style={styles.input}
              />
              <InputContainer
                textType="password"
                inputLable="Password"
                inputValue={password}
                value={password}
                placeholder={'Enter Password'}
                onBlur={validatePasswordInput}
                errorMessage={<ErrorText errorMessage={passwordError} />}
                error={passwordError === '' ? false : true}
                onChange={handlePasswordInput}
                style={styles.input}
              />
              {/* <TextElement font="regular" fontType="h7" className={classes.forgotContainer}>
                            <p to="/forgotpassword" className={classes.forgotRouteLink}>
                                {" Forgot your password?"}
                            </p>
                        </TextElement> */}
              <ButtonContainer
                ref={buttonRef}
                disabled={buttonDisabled}
                customButtonStyle={styles.button}
                title={'Sign in'}
                onClick={() => handleLogin()}
              />
            </Box>
          </Box>
        </AuthLayout>
      </Box>
      <Footer />
    </>
  )
}

export default SignIn
