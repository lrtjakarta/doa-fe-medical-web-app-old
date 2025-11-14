import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Typography,
  Container,
} from "@mui/material";
import {
  AppBar,
  boxHeader,
  appBar
} from "./Styles";

import useStyles from "./Styles";
import UseMedicalRecord from "Hooks/MedicalRecord/useMedicalRecord";

export default function Header(props) {

  //console.log("props?.status",props?.status)

  return (
    <>
      <Box sx={boxHeader}>
      <AppBar position="fixed" sx={appBar}>
        <div>
          <Container maxWidth="xl">
          <div> 
          {
            props.title ? props.title
            :null
          }
          </div>
          <div> 
          {
            props.subTitle ? props.subTitle
            :null
          }
          </div>
          </Container>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
        {/* <Typography sx={{fontSize:13}}>Durasi Pemeriksaan : 10:10:55</Typography>
        <Typography sx={{fontSize:13}}>Waktu Pemeriksaan : 19-06-2022 10:55 WIB</Typography>
        <div style={{backgroundColor:'#BB7E36',borderRadius:4,paddingLeft:10,paddingRight:10}}>
        
        <Typography sx={{fontSize:16}}>
        Status : Retake
        </Typography>
        </div> */}
        </div>
        </AppBar>
      </Box>
    </>
  );
}
