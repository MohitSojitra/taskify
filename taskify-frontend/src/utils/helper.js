import dayjs from 'dayjs'

export const validateEmail = email => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export const validateEmailValue = email => {
  if (email === '') {
    return 'Please Enter Email'
  } else if (!validateEmail(email)) {
    return ' Wrong Email formate please check again'
  } else {
    return ''
  }
}

export const validatePasswordValue = password => {
  if (password.length < 8) {
    return 'Please enter valid password'
  } else {
    return ''
  }
}

const Month = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

export const getPreetyDisplayDate = timestamp => {
  //TODO: format :-  Aug 26 at 4:10 PM
  const d = new Date(timestamp)
  const day = dayjs(d)
  const month = Month[day.$M]
  const date = day.$D
  const time = `${day.$H % 12 || 12}:${day.$m} ${day.$H < 12 ? 'AM' : 'PM'}`

  return month + ' ' + date + ' at ' + time
}

export const toastMessage = {
  sucessSignin: 'Singin Sucessfull',
  errorSigning: 'Something Wrong!',
}
