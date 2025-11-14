import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  titleTxt: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  answerTxt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    margin: 0,
  },
  questionTxt: {
    fontSize: 15,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  additionalTxt: {
    color: '#b3b3b3',
    fontWeight: 'bold',
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  noteTxt: {
    color: '#000',
    fontSize: 15,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  boxTxt: {
    mt: 3,
    width: '100%',
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textBoxTxt: {
    color: '#fff',
    margin: 'auto',
    alignItems: 'center',
    fontSize: 16,
    align: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  textGridTxt: {
    fontSize: 18,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  grayGridTxt: {
    fontSize: 17,
    fontWeight: 500,
    color: '#4a4949',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  imgGridTxt: {
    width: 150,
    height: 150,
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 100,
    },
  },
}))

export const qr = {
  mr: 0.5,
  mt: 2,
  fontSize: 14,
  color: '#000',
}
export const qrImg = {
  ml: -10,
  mt: 4,
}
