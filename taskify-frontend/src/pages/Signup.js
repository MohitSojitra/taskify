import React, {useCallback, useState} from 'react'
import {Box, makeStyles} from '@material-ui/core'
import AuthLayout from '../component/layout/AuthLayout'
import InputContainer from '../component/InputContainer'
import ButtonContainer from '../component/ButtonContainer'
// import { validateEmailValue, validatePasswordValue } from "../../utils/helper";
import {Link, useHistory} from 'react-router-dom'
import {TextElement} from '../component/TextElement'
import {colors} from '../Theme/ColorPalette'
import ErrorText from '../component/ErrorText'
import {validateEmailValue, validatePasswordValue} from '../utils/helper'
import {Api} from '../utils/Api'
import {toast} from 'react-toastify'
import Footer from '../component/Footer/Footer'
import Spinner from '../component/Loader/Spinner'

// import { registerWithEmailAndPassword } from "../../config/firebase";
// import { API_CODE } from "../../utils/strings";

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
  title: {
    textAlign: 'left',
    color: colors.lightBlack,
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
  forgotRouteLink: {
    marginTop: '10px',
    outline: 'none',
    textDecoration: 'none',
    color: colors.darkGrey,
  },
})
const styles = {
  link: {
    color: colors.lightBlue,
  },
  input: {
    width: '100%',
  },
  fNameInput: {
    width: '45%',
  },
  lNameInput: {
    width: '45%',
  },
  nameContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    marginTop: '20px',
  },
  privacy: {
    color: colors.darkGrey,
  },
}

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const classes = useStyle()

  // < ----------Input Handler----------------->
  const handleEmailInput = useCallback(e => {
    setEmail(e.target.value)
  }, [])
  const handlePasswordInput = useCallback(e => {
    setPassword(e.target.value)
  }, [])
  const handleFirstNameInput = useCallback(e => {
    setFirstName(e.target.value)
  }, [])

  // // <---------- Input Validator ----------------->
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

  const firstNameValidate = useCallback(() => {
    if (firstName === '') {
      setFirstNameError('Enter First Name')
    } else {
      setFirstNameError('')
    }
  }, [firstName])

  const handleSignup = useCallback(async () => {
    setLoading(true)
    const res = await Api.postRequest('/auth/signup', {
      name: firstName,
      email,
      password,
    })
    setLoading(false)
    history.push('/signin')
    toast(res)
  }, [email, firstName, history, password])

  return (
    <>
      <Spinner isLoading={loading} />
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
              {'Sign Up'}
            </TextElement>
            <Box className={classes.headerSubtitle}>
              <TextElement
                font="semiBold"
                fontType="h6"
                className={classes.textContainer}
              >
                {'Already have an account?'}
              </TextElement>
              <Link to="/signin" className={classes.routeLink}>
                <TextElement font="bold" fontType="h6" textStyle={styles.link}>
                  {' Sign in'}
                </TextElement>
              </Link>
            </Box>
            <Box className={classes.mainContainer}>
              <InputContainer
                textType="text"
                inputLable="First Name"
                inputValue={firstName}
                placeholder={'Enter first name'}
                onChange={handleFirstNameInput}
                onBlur={firstNameValidate}
                errorMessage={<ErrorText errorMessage={firstNameError} />}
                error={firstNameError === '' ? false : true}
                style={styles.input}
              />

              <InputContainer
                textType="text"
                inputLable="Email"
                inputValue={email}
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
                placeholder={'Enter Your Password'}
                onBlur={validatePasswordInput}
                errorMessage={<ErrorText errorMessage={passwordError} />}
                error={passwordError === '' ? false : true}
                onChange={handlePasswordInput}
                style={styles.input}
              />
              <ButtonContainer
                disabled={buttonDisabled}
                customButtonStyle={styles.button}
                title="Sign up"
                onClick={() => handleSignup()}
              />
            </Box>
          </Box>
        </AuthLayout>
      </Box>
      <Footer />
    </>
  )
}

export default SignUp
