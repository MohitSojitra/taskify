import React from 'react'
import {Box, Grid, makeStyles} from '@material-ui/core'
import SignInArt from '../../assets/images/Untitled_Artwork.svg'
import MacaronLogo from '../SvgIcons/MacaronLogo'
import {TextElement} from '../TextElement'
import {colors} from '../../Theme/ColorPalette'

const useStyle = makeStyles({
  container: {
    // margin: "0px 8%",
    // height: "80%"
  },
  mainGridContainer: {
    backgroundColor: colors.white,
    borderRadius: '16px',
  },
  heroImageContainer: {
    backgroundImage: `url(${SignInArt})`,

    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    padding: '70px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  heroTitle: {
    textAlign: 'left',
    color: colors.white,
    marginTop: '12px',
    letterSpacing: '1.3px',
  },
})
const AuthLayout = ({children}) => {
  const classes = useStyle()
  return (
    <>
      <Box className={classes.container}>
        <Grid container md={12} className={classes.mainGridContainer}>
          <Grid item md={6} sm={12} className={classes.heroImageContainer}>
            <TextElement textStyle={{color: colors.white}}>Taskify</TextElement>
            <TextElement
              font="regular"
              fontType="h1"
              className={classes.heroTitle}
            >
              {'Start creating kid stories'}
            </TextElement>
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            style={{display: 'flex', alignItems: 'center'}}
          >
            {children}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AuthLayout
