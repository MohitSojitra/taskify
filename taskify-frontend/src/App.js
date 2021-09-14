import './App.css'
import Home from './pages/Home'
import {Provider} from 'react-redux'
import store from './store'
import {colors} from './Theme/ColorPalette'
import {Box, useMediaQuery} from '@material-ui/core'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'
import MyBoards from './pages/MyBoards'
import Header from './component/Header/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicRoute from './Routes/PublicRoute'
import PrivateRoute from './Routes/PrivateRoute'
import {createTheme, ThemeProvider} from '@material-ui/core/styles'
import SizeNotSupport from './component/SizeNotSupport'

const theme = createTheme()
function App() {
  const isLessThenMd = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Box className="App">
          <Box
            style={{
              backgroundColor: colors.lightWhite,
              minHeight: '100vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {!isLessThenMd ? (
              <Router>
                <Header />
                <Switch>
                  <PublicRoute exact path="/signup" component={SignUp} />
                  <PublicRoute exact path="/signin" component={SignIn} />
                  <PrivateRoute exact path="/" component={MyBoards} />
                  <PrivateRoute exact path="/board/:boardId" component={Home} />
                </Switch>
              </Router>
            ) : (
              <SizeNotSupport />
            )}
          </Box>

          <ToastContainer position="bottom-right" />
        </Box>
      </Provider>
    </ThemeProvider>
  )
}

export default App
