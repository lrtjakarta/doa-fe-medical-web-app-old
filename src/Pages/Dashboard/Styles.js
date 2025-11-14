import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import {makeStyles} from "@mui/styles"

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
  },
  table: {
    minWidth: 650,
    borderRadius: 3,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  tableHead: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      border: "none",
    },
  },
  tableBody: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      // marginTop: 10,
      gap: 10,
      alignItems: "center",
    },
  },
  buttonBase: {
    width: 100,
    height: 100,
  },

  searchTxt: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: 1.5,
      borderColor: "#fff",
      borderRadius: 5,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  tableCellTxt: {
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
      display: "flex",
      flexDirection: "column",
    },
  },
  tableLeftTxt: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    border: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      borderTopLeftRadius: "none",
      borderBottomLeftRadius: "none",
    },
  },

  tableRightTxt: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
    border: "none",
    [theme.breakpoints.down("sm")]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  dateTxt: {
    width: "100%",
  },
}));

export const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const buttonAddStyle = {
  bgcolor: "#BB7E36",
  textTransform: "none",
  fontWeight: "bold",
  height:35,
  width:150,
  justifyContent:'space-between',
  "&:hover": {
    backgroundColor: "transparent",
    color:'#BB7E36',
    height:33,width:150,
    border: "2px solid #BB7E36",
  },
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const mainBox = { flexGrow: 1, pt: 8, m: "auto" };

export const secondBox = {
  fontWeight: "bold",
  fontSize: "20px",
  color: "#BB7E36",
};

export const paperBox = {
  borderRadius: "20px",
  margin: "auto",
  maxwidth: 350,
};

export const buttonBase = {
  width: 75,
  height: 75,
  ml: 4,
  mr: -5,
  mb: 0,
  mt: 2,
};

export const mainTittle = {
  fontWeight: "bold",
  fontSize: "20px",
  color: "#BB7E36",
};

export const secondTittle = {
  fontWeight: 300,
  fontSize: "16px",
  color: "#464748",
};

export const buttonDownloadStyle = {
  color: "#6C757D",
  bgcolor: "#fff",
  fontweight: "400",
  borderRadius: "10px",
  textTransform: "none",
  // fontWeight: "bold",
  boxShadow: "none",
  border: "1px solid #BB7E36",
  ml: 6,
  mt: -7,
  "&:hover": {
    backgroundColor: "#BB7E36",
    color: "#fff",
    border: "1px solid #BB7E36",
  },
};

export const third = {
  m: 1,
  fontWeight: "bold",
};

export const job = {
  fontWeight: 200,
  fontSize: 18,
  color: "#A2A2A2",
  ml: 0,
};

export const amount = {
  cursor: "pointer",
  color: "#35405B",
  fontSize: "50px",
  ml: -3,
  mt: -1,
};

export const container = {
  display: "flex",
};

export const boxBar = {
  backgroundColor: "white",
  width: "48%",
  height: "30%",
  p: 2,
};

export const boxPie = {
  backgroundColor: "white",
  width: "25%",
  height: "30%",
  ml: 90,
};

export const pieBox = { height: "90%", m: "auto", mt: 1, mb: 4 };
