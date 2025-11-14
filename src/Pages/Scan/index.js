import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import DialogCustom from "../../Component/Dialog/index";
import Scanner from "./Scanner";

import useCheckup from "Hooks/Checkup/useCheckup";
import useProfile from "Hooks/Profile/useProfile";
import moment from "moment";
import { toast } from "react-toastify";
import { appBarStyle, buttonStyle, TabStyle } from "./Styles";
import { MedicalRecordContext } from "Context";

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

function Scan(props) {
  const navigate = useNavigate();
  const {
    getDetailProfile,
    getDataDailySchedule,
    detailProfile,
    dailySchedule,
  } = useProfile();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(0);
  const [nik, setNik] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { medicalRecord, getDataMedicalRecord } =
    useContext(MedicalRecordContext);
  const { handleCheckup } = useCheckup();

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let today = moment().format("YYYY-MM-DD");

  const handleSendDailyWork = (resultDailyWork) => {
    console.log("resultDailyWork", resultDailyWork);
    let sendDailySchedule = {
      // LRVList:resultDailyWork?.LRVList,
      completeState: resultDailyWork?.completeState,
      createDate: resultDailyWork?.createDate,
      createDateString: resultDailyWork?.createDateString,
      createdAt: resultDailyWork?.createdAt,
      dailyWorkDate: resultDailyWork?.dailyWorkDate,
      // dailyWorkDateString:resultDailyWork?.dailyWorkDateString,
      // kaIncident:resultDailyWork?.kaIncident,
      loopRouteTrain: resultDailyWork?.loopRouteTrain,
      workOrder: resultDailyWork?.workOrder,
      monthlyWorkDateString: resultDailyWork?.monthlyWorkDateString,
      readTakeGive: resultDailyWork?.readTakeGive,
      updatedAt: resultDailyWork?.updatedAt,
      _id: resultDailyWork?._id,
    };
    return sendDailySchedule;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nik) {
      const querySend = { idNumber: nik, dailyWorkDate: today };
      const resultDailyWork = await getDataDailySchedule(querySend);
      console.log("resultDailyWork", resultDailyWork);
      if (resultDailyWork.length > 0) {
        if (resultDailyWork.length > 1) {
          await getDetailProfile(nik);
          setOpenDialog(true);
        } else {
          const result = await getDetailProfile(nik);

          if (result?._id && resultDailyWork.length > 0) {
            let sendDailySchedule = await resultDailyWork[0];
            // console.log('sendDailySchedule', sendDailySchedule);

            const resultCheckup = await handleCheckup(
              result,
              sendDailySchedule
            );
            // console.log('resultCheckup', resultCheckup);
            // return;
            if (resultCheckup.status === "OK") {
              if (
                resultCheckup.result?.status === "4" ||
                resultCheckup.result?.status === "0" ||
                resultCheckup.result?.status === ""
              ) {
                navigate(
                  "/medical/form?nik=" +
                    nik +
                    "&id=" +
                    resultCheckup.result?._id
                );
              } else {
                toast.error(
                  "Maaf anda tidak bisa melakukan pemeriksaan kesehatan lagi"
                );
              }
            }
          } else {
            toast.error("Maaf NIK tidak ditemukan untuk lanjut assessment");
          }
        }
      } else {
        // console.log("logic ini jalan");
        handleOpenAlert();
      }
    }
  };

  const handleClose = () => {
    navigate(-1);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitDialog = async (resultDailyWork) => {
	console.log('resultDailyWork', resultDailyWork)
	// return
    const result = await getDetailProfile(nik);
    if (result?._id && resultDailyWork) {
      const resultCheckup = await handleCheckup(
        result,
        resultDailyWork
      );
      if (resultCheckup.status === "OK") {
        if (
          resultCheckup.result?.status === "4" ||
          resultCheckup.result?.status === "0" ||
          resultCheckup.result?.status === ""
        ) {
          navigate(
            "/medical/form?nik=" + nik + "&id=" + resultCheckup.result?._id
          );
        } else {
          toast.error(
            "Maaf anda tidak bisa melakukan pemeriksaan kesehatan lagi"
          );
        }
      }
    }
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    const params = {
      startDate: today,
      endDate: today,
      departement: detailProfile?.departement,
    };
    getDataMedicalRecord(params);
  }, []);

  console.log("detail profile", detailProfile);
  // console.log("daily schedule ", dailySchedule);
  // console.log("medical record ", medicalRecord);
  return (
    <>
      <DialogCustom
        open={openDialog}
        close={handleCloseDialog}
        title={
          <div>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Pilih Dinasan yang akan diperiksa
            </Typography>
            <Grid
              container
              sx={{ borderTop: "2px solid #A2A2A2", pt: 2, mt: 2 }}
            >
              <Grid item md={2.5}>
                <Typography
                  sx={{ fontSize: 13, color: "#A2A2A2", fontWeight: 500 }}
                >
                  Nama
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: "#A2A2A2", fontWeight: 500 }}
                >
                  Nik
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: "#A2A2A2", fontWeight: 500 }}
                >
                  Jabatan
                </Typography>
              </Grid>
              <Grid item md={9.5}>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {detailProfile?.name}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {detailProfile?.idNumber}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {detailProfile?.jobPosition?.name}
                </Typography>
              </Grid>
            </Grid>
          </div>
        }
        content={
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Kode</TableCell>
                  <TableCell>Loop</TableCell>
                  <TableCell>Waktu</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailySchedule.map((item, i) => {
                  const alreadyAssesment = medicalRecord?.find(
                    (j) => j.dailyWorkOrder?._id === item._id
                  );

                  return (
                    <TableRow key={i}>
                      <TableCell>{item.workOrder?.code}</TableCell>
                      <TableCell>{item.workOrder?.loop || "-"}</TableCell>
                      <TableCell>
                        {item.workOrder?.start} - {item.workOrder?.end}
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={!!alreadyAssesment}
                          onClick={() => handleSubmitDialog(item)}
                          variant="contained"
                          style={{
                            backgroundColor: !!alreadyAssesment
                              ? "grey"
                              : `#BB7E36`,
                          }}
                        >
                          <Typography
                            style={{ textTransform: "none", color: "#ffffff" }}
                          >
                            Pilih
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        }
        submit={false}
        cancel={handleCloseDialog}
        valueConfirm={false}
        valueCancel={"Batal"}
      />

      <Container maxWidth="xl" sx={{ pt: 2, flex: 1, pb: 2 }}>
        <AppBar position="static" style={appBarStyle}>
          <Tabs
            indicatorColor="white"
            value={value}
            onChange={handleChange}
            textColor="gray"
            variant="fullWidth"
          >
            {/* Tab 1 */}
            <Tab sx={TabStyle} label="SCAN QRcode" {...a11yProps(0)} />

            {/* Tab 2 */}
            <Tab sx={TabStyle} label="INPUT MANUAL" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        {/* TabPanel 1 */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Scanner />
        </TabPanel>

        {/* TabPanel 2 */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Card
              sx={{ width: "70%", height: 300, align: "center", m: "auto" }}
            >
              <CardContent sx={{ mt: 5 }}>
                <Typography
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    color: "#BB7E36",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  QRcode tidak terbaca, silakan masukkan NIK secara manual
                </Typography>
                <Typography
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    fontSize: "17px",
                    opacity: 0.5,
                  }}
                >
                  Input NIK
                </Typography>
                <Grid sx={{ justifyContent: "center", display: "flex" }}>
                  <TextField
                    sx={{
                      "&:hover": {
                        border: "none",
                      },
                    }}
                    autoFocus
                    required
                    onChange={(e) => setNik(e.target.value)}
                    value={nik}
                    style={{ textAlign: "center" }}
                    fullWidth
                    placeholder="Masukan NIK"
                  />
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", display: "flex" }}>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={handleClose}
                >
                  Kembali
                </Button>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </CardActions>
            </Card>
          </form>
        </TabPanel>
      </Container>

      <Dialog open={openAlert}>
        <Alert
          onClose={handleCloseAlert}
          sx={{ width: "100%" }}
          variant="filled"
          severity="warning"
        >
          Data tidak ditemukan, pastikan data nik pada Karyawan sama dengan data
          nik di User Management OCC
        </Alert>
      </Dialog>
    </>
  );
}

export default Scan;
