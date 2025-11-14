import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";

// Component
import Card from "Component/Card/index";

import Riwayat from "../History/index";
import FormPemeriksaan from "./FormPemeriksaan";

import PropTypes from "prop-types";

import UseCheckup from "Hooks/Checkup/useCheckup";

import {
  TabStyle,
} from "./Styles";

// Tabs,Tab,dan Tabpanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, pt: 2, width: "100%" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Form(props) {
  

  const [value, setValue] = useState(0);
  const theme = useTheme();
  const {
    checkup,
  } = UseCheckup();


 

  const handleTab = (event, newValue) => {
    setValue(newValue);
  };
  // console.log('diagnosis', diagnosis)

  const [no, setNo] = useState("");
  const [notif, setNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");

  


  return (
    <>
     

      <Container maxWidth="xl" sx={{ pt: 2, flex: 1 }}>
        <Card />
        <Snackbar
          open={notif}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }

            setNotif(false);
          }}
        >
          <Alert
            onClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }

              setNotif(false);
            }}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {notifMsg}
          </Alert>
        </Snackbar>
        <Container sx={{ mt: 3 }} maxWidth="xl">
         
          <Tabs
            indicatorColor="white"
            value={value}
            onChange={handleTab}
            textColor="gray"
            variant="fullWidth"
          >
            {/* Tab 1 */}
            <Tab sx={TabStyle} label="Form Pemeriksaan" {...a11yProps(0)} />

            {/* Tab 2 */}
            <Tab sx={TabStyle} label="Riwayat pemeriksaan" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0} dir={theme.direction}>
           <FormPemeriksaan />
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Riwayat checkup={checkup} />
          </TabPanel>
        </Container>

         {/* <Grid container spacing={1} maxWidth="xl" sx={{ mb: 1 }}>
            <Grid item xs={6} md={3}>
              <Paper
                //className={classes.paperTxt}
                sx={{
                  height: 'auto',
                  borderRadius: 2,
                  backgroundColor: 'primary.white',
                  // "&:hover": {
                  //   backgroundColor: "rgba(187, 126, 54, .8)",
                  // },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 1, mr: 2.5 }}
                >
                  <Stack direction="row" alignItems="center">
                    <Box sx={{ mr: -0.5, ml: -0.5 }}>
                      <Img src={Images.heart} width="50%" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: '#A2A2A2',
                        mr: '0px !important',
                      }}
                    >
                      Total Pemeriksaan
                    </Typography>
                  </Stack>
                  <Typography sx={textPaperStyle} variant="body2">
                    {medicalRecord.length}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper
                //className={classes.paperTxt}
                sx={{
                  height: 'auto',
                  borderRadius: 2,
                  backgroundColor: 'primary.white',
                  // "&:hover": {
                  //   backgroundColor: "rgba(187, 126, 54, .8)",
                  // },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 1, mr: 2.5 }}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box>
                      <Img src={Images.danger} width="50%" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: '#A2A2A2',
                        marginLeft: '-5px !important',
                      }}
                    >
                      Belum Diperiksa
                    </Typography>
                  </Stack>
                  <Typography sx={textPaperStyle} variant="body2">
                    {medicalRecord.length -
                      medicalRecord.filter(
                        item =>
                          item?.medicalCheckup?.status === '1' ||
                          item?.medicalCheckup?.status === '2' ||
                          item?.medicalCheckup?.status === '3' ||
                          item?.medicalCheckup?.status === '4' ||
                          item?.medicalCheckup?.status === '5'
                      ).length}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper
                //className={classes.paperTxt}
                sx={{
                  height: 'auto',
                  borderRadius: 2,
                  backgroundColor: 'primary.white',
                  // "&:hover": {
                  //   backgroundColor: "rgba(187, 126, 54, .8)",
                  // },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 1, mx: 2.5 }}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box>
                      <Img src={RedoImage} width="100%" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: '#A2A2A2',
                        position: 'relative',
                        right: '10px',
                      }}
                    >
                      Retake
                    </Typography>
                  </Stack>
                  <Typography sx={textPaperStyle} variant="body2">
                    {medicalRecord.filter(
                      item => item?.medicalCheckup?.status === '4'
                    ).length +
                      medicalRecord.filter(
                        item => item?.medicalCheckup?.status === '5'
                      ).length}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper
                //className={classes.paperTxt}
                sx={{
                  height: 'auto',
                  borderRadius: 2,
                  backgroundColor: 'primary.white',
                  // "&:hover": {
                  //   backgroundColor: "rgba(187, 126, 54, .8)",
                  // },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 1, mx: 2.5 }}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box>
                      <Img src={TimerImage} width="100%" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: '#A2A2A2',
                        position: 'relative',
                        right: '10px',
                      }}
                    >
                      Timer Retake
                    </Typography>
                  </Stack>
                  <Typography variant="body2">
                    {_.orderBy(
                      medicalRecord.filter(
                        item =>
                          item?.medicalCheckup?.status === '4' ||
                          item?.medicalCheckup?.status === '5'
                      ),
                      ['medicalCheckup', ['asc']]
                    ).map(item => {
                      let datastring =
                        //item?.medicalCheckup?.retake2At
                        calculateTimeLeft(
                          moment(item?.medicalCheckup?.retake1At).format(
                            'MM/DD/YYYY HH:mm:ss'
                          )
                        ).hours +
                        ':' +
                        calculateTimeLeft(
                          moment(item?.medicalCheckup?.retake1At).format(
                            'MM/DD/YYYY HH:mm:ss'
                          )
                        ).minutes +
                        ':' +
                        calculateTimeLeft(
                          moment(item?.medicalCheckup?.retake1At).format(
                            'MM/DD/YYYY HH:mm:ss'
                          )
                        ).seconds;
                      return <div style={{ fontSize: 14 }}>{datastring}</div>;
                    })}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid> */}
      </Container>
    </>
  );
}

export default Form;
