import { styled, makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  boxHeaderTxt: {
    ml: 1,
    color: "#fff",
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  questionTxt: {
    fontSize: 16,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  noteTxt: {
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  mainTxt: {
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  secondTxt: {
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
}));

export const selectBoxStyles = {
  control: styles => ({ ...styles, height: 32,width:"100%", backgroundColor: "#ffffff", borderRadius: 5, border: "1px solid #6e6e6e" }),
  menuPortal: base => ({ ...base, zIndex: 9999 })
};

export const formNumber = {
  boxShadow: 'inset -2px 2px 4px 0px #d9d9d9',
  width: 150,
  height: 36,
  marginRight:20,
  bgcolor: '#fff',
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    border: 'none',
    borderColor: '#fff',
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
};

export const TabStyle = {
  color: "gray",
  bgcolor: "#DCDCDC",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#BB7E36",
    color: "#fff",
    textDecoration: "none",
  },
  "&.Mui-selected": {
    backgroundColor: "#BB7E36",
    color: "#fff",
  },
};

export const appBarStyle = {
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  overflow: "hidden",
};

export const formControlStyle = {
  minWidth: 231,
  height: 36,
  bgcolor: "white",
  color: "black",
};

export const textPaperStyle = {
  color: "#35405B",
  fontSize: "20px",
  ml: 1,
};

export const textPaperSatuStyle = {
  color: "#fff",
  m: "auto",
  ml: 0,
  mb: 5,
  fontSize: 17,
};

export const BoxTittle = {
  height:40,
  borderRadius:1,
  bgcolor: "#464748",
  minWidth: "100%",
};

export const textFieldStyle = {
  width: "100%",
  mr: -6,
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: 1.5,
    borderColor: "#fff",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
};

export const textAreaStyle = {
  width: 200,
  mr: 2,
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: 1.5,
    borderColor: "#fff",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
};

export const nextButton = {
  bgcolor: "#fff",
  color: "gray",
  ml: 3,
  "&:hover": {
    backgroundColor: "#BB7E36",
    color: "#fff",
    border: "none",
  },
  "&.Mui-selected": {
    backgroundColor: "#BB7E36",
    color: "#fff",
  },
};

export const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export const tableRowAwalStyle = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: "hidden",
  bgcolor: "#f8f8f8",
  padding: "20px",
  border: "none",
  fontWeight: 300,
};

export const tableCellStyle = {
  color: "#35405B",
  fontWeight: "bold",
  fontSize: 16,
  lineHeight: 0.5,
};

export const tableLeftStyle = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: "hidden",
  border: "none",
};

export const tableRightStyle = {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: "hidden",
  border: "none",
};

export const tableRowStyle = {
  border: "none",
  fontWeight: 300,
  // padding: "100px",
  // margin: 5,
  // backgroundColor: "red",
};

export const tableRowAkhirStyle = {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: "hidden",
  border: "none",
};

export const tableStyle = {
  minWidth: 250,
  borderCollapse: "separate",
  borderSpacing: "0px 10px",
  borderRadius: 3,
};
