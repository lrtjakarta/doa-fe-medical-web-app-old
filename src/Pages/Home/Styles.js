import { styled, makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
  },
  titleTxt: {
    fontSize: 13,
    color: '#fff',
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  table: {
    minWidth: 650,
    borderRadius: 3,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  boxTxt: {
    mt: 3,
    width: '100%',
    height: 30,
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
    fontSize: 16,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  grayGridTxt: {
    fontSize: 15,
    fontWeight: 500,
    color: '#4a4949',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  tableHead: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      border: 'none',
    },
  },
  tableBody: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      // marginTop: 10,
      gap: 10,
      alignItems: 'center',
    },
  },
  buttonBase: {
    width: 100,
    height: 100,
  },

  searchTxt: {
    width: '100%',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 1.5,
      borderColor: '#fff',
      borderRadius: 5,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  tableCellTxt: {
    fontSize: 18,
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      display: 'flex',
      flexDirection: 'column',
    },
  },
  tableLeftTxt: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      borderTopLeftRadius: 'none',
      borderBottomLeftRadius: 'none',
    },
  },

  tableRightTxt: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  dateTxt: {
    width: '100%',
  },
  answerTxt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    margin: 0,
  },
  questionTxt: {
    fontSize: 12,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  noteTxt: {
    color: '#000',
    fontSize: 12,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  additionalTxt: {
    color: '#b3b3b3',
    fontWeight: 'bold',
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
}))

export const tableRowFirstStyle = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
  border: 'none',
  fontWeight: 300,
}

export const textJudulStyle = {
  fontWeight: 'bold',
  fontSize: '24px',
  color: '#BB7E36',
}

export const paperStyle = {
  margin: 'auto',
  paddingRight: 40,
  maxwidth: 350,
}

export const buttonBaseStyle = {
  ml: 2,
  mr: -3,
  m: 1,
}

export const buttonBaseDuaStyle = {
  width: 100,
  height: 100,
  ml: 2,
  mr: -5,
  mt: 1,
}

export const textPaperStyle = {
  color: '#35405B',
  fontSize: '20px',
  ml: 1,
}

export const textPaperSatuStyle = {
  color: '#fff',
  m: 'auto',
  ml: 0,
  mb: 5,
  fontSize: 17,
}

export const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

export const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
})

export const tableRowAwalStyle = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
  bgcolor: '#f8f8f8',
  padding: '20px',
  border: 'none',
  fontWeight: 300,
}

export const tableCellStyle = {
  color: '#35405B',
  fontWeight: 'bold',
  paddingTop: 0,
  fontSize: 16,
}

export const tableLeftStyle = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
  border: 'none',
}

export const tableRightStyle = {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
  border: 'none',
}

export const tableRowStyle = {
  border: 'none',
  fontWeight: 300,
  // padding: "100px",
  // margin: 5,
  // backgroundColor: "red",
}

export const tableRowAkhirStyle = {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
  border: 'none',
}

export const tableStyle = {
  minWidth: 250,
  borderCollapse: 'separate',
  borderSpacing: '0px 10px',
  borderRadius: 3,
}
