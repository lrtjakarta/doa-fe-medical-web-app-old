import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 320;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const boxHeader = {
};

export const appBar = {
  bgcolor: "#b2b2b2",
  mt:8,
  display:'flex',
  flex:1,
  flexDirection:'row',
  pt:2,
  pb:2,
  pl:3,
  pr:5,
  justifyContent:'space-between',
  zIndex: (theme) => theme.zIndex.drawer + 1,
  boxShadow:'none'
};

export const toolBar = {
  ml: -7,
  mt: -1,
};

export const imgApp = {
  width: 20,
  height: 10,
};

export const Admin = {
  justifyContent: "right",
  display: "flex",
  flexGrow: 1,
};

export const adminTittle = {
  ml: 1,
  mt: 0.8,
  color: "#fff",
  fontWeight: 200,
};

export const Icon = {
  ml: 1,
  mt: 1.2,
  color: "#fff",
};

export const home = {
  color: "white",
  display: "block",
};

export const report = {
  color: "white",
  display: "block",
};

export const boxProfile = {
  flexGrow: 0,
};

export const tittleProfile = {
  fontSize: 14,
  color: "#fff",
};

export const account = {
  color: "white",
};

export const menuList = {
  mt: "45px",
};

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mainTxt: {
    fontWeight: 600,
    color: "#fff",
    mt: 14,
    fontSize: 26,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  secondTxt: {
    fontWeight: 500,
    fontSize: 16,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 6,
    },
  },
  littleTxt: {
    width: 170,
    fontWeight: 450,
    fontSize: 13,

    color: "#b3b3b3",
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
    },
  },
  bigTxt: {
    width: 175,
    fontSize: 15,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  qr: {
    mt: 10,
    fontSize: 14,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  buttonImg: {
    width: 128,
    height: 128,

    color: "#000",
    [theme.breakpoints.down("sm")]: {
      width: 108,
      height: 108,
    },
  },
  qrImg: {
    align: "right",
    [theme.breakpoints.down("xs")]: {
      alignItems: "right",
    },
  },
}));
