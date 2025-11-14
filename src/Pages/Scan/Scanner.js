import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Alert,
  Dialog,
} from "@mui/material";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import DialogCustom from "../../Component/Dialog/index";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import UseCheckup from "Hooks/Checkup/useCheckup";
import useProfile from "Hooks/Profile/useProfile";

function Scanner(props) {
  const navigate = useNavigate();
  const {
    getDetailTrainDriver,
    // getDataDailySchedule,
    detailTrainDriver,
    // dailySchedule,
  } = useTrainDriver();
  const {
    getDetailProfile,
    getDataDailySchedule,
    detailProfile,
    dailySchedule,
  } = useProfile();

  const { handleCheckup } = UseCheckup();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [dataNik, setDataNik] = useState("");

  const handleSendDailyWork = (resultDailyWork) => {
    let sendDailySchedule = {
      LRVList: resultDailyWork?.LRVList,
      completeState: resultDailyWork?.completeState,
      createDate: resultDailyWork?.createDate,
      createDateString: resultDailyWork?.createDateString,
      createdAt: resultDailyWork?.createdAt,
      dailyWorkDate: resultDailyWork?.dailyWorkDate,
      dailyWorkDateString: resultDailyWork?.dailyWorkDateString,
      kaIncident: resultDailyWork?.kaIncident,
      loopRouteTrain: resultDailyWork?.loopRouteTrain,
      monthlyWorkDateString: resultDailyWork?.monthlyWorkDateString,
      readTakeGive: resultDailyWork?.readTakeGive,
      updatedAt: resultDailyWork?.updatedAt,
    };
    return sendDailySchedule;
  };

  const handleSubmitDialog = async (resultDailyWork) => {
    // const result = await getDetailTrainDriver(
    //   resultDailyWork?.trainDriver?.nik
    // );
    // if (result?._id && resultDailyWork) {
    //   const resultCheckup = await handleCheckup(
    //     result,
    //     handleSendDailyWork(resultDailyWork)
    //   );
    //   if (resultCheckup.status === "OK") {
    //     if (
    //       resultCheckup.result?.status === "4" ||
    //       resultCheckup.result?.status === "0" ||
    //       resultCheckup.result?.status === ""
    //     ) {
    //       props.history.push(
    //         "/medical/form?nik=" +
    //           resultDailyWork?.trainDriver?.nik +
    //           "&id=" +
    //           resultCheckup.result?._id
    //       );
    //     } else {
    //       toast.error(
    //         "Maaf anda tidak bisa melakukan pemeriksaan kesehatan lagi"
    //       );
    //     }
    //   }
    // }
    const result = await getDetailProfile(dataNik);
    if (result?._id && resultDailyWork) {
      const resultCheckup = await handleCheckup(result, resultDailyWork);
      if (resultCheckup.status === "OK") {
        if (
          resultCheckup.result?.status === "4" ||
          resultCheckup.result?.status === "0" ||
          resultCheckup.result?.status === ""
        ) {
          navigate(
            "/medical/form?nik=" + dataNik + "&id=" + resultCheckup.result?._id
          );
        } else {
          toast.error(
            "Maaf anda tidak bisa melakukan pemeriksaan kesehatan lagi"
          );
        }
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div>
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
                  {detailTrainDriver?.name}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {detailTrainDriver?.nik}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {detailTrainDriver?.jobrole}
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
                {false &&
                  dailySchedule.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.loopRouteTrain?.code}</TableCell>
                      <TableCell>{item.loopRouteTrain?.loop}</TableCell>
                      <TableCell>
                        {item.loopRouteTrain?.start} -{" "}
                        {item.loopRouteTrain?.end}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleSubmitDialog(item)}
                          variant="contained"
                          style={{ backgroundColor: `#BB7E36` }}
                        >
                          <Typography
                            style={{ textTransform: "none", color: "#ffffff" }}
                          >
                            Pilih
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        }
        submit={false}
        cancel={handleCloseDialog}
        valueConfirm={false}
        valueCancel={"Batal"}
      />
      <Container sx={{ mt: -4, width: "50%" }}>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={async (result, error) => {
            if (!!result) {
              let today = moment().format("YYYY-MM-DD");
              let nik = result?.text;
			  setDataNik(nik)
              console.log("nik", nik);
              const querySend = {
                idNumber: nik,
                dailyWorkDate: today,
              };
              // const resultDailyWork = await getDataDailySchedule(querySend);
              const resultDailyWork = await getDataDailySchedule(querySend);
              // const profile = await getDetailTrainDriver(result?.text);
              // console.log('resultDailyWork', resultDailyWork);
              // return;
              if (resultDailyWork.length > 0) {
                if (resultDailyWork.length > 1) {
                  // await getDetailTrainDriver(result?.text);
                  await getDetailProfile(nik);
                  setOpenDialog(true);
                } else {
                  const result = await getDetailProfile(nik);

                  if (result?._id && resultDailyWork.length > 0) {
                    let sendDailySchedule = await resultDailyWork[0];

                    const resultCheckup = await handleCheckup(
                      result,
                      sendDailySchedule
                    );
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
                  }
                }
              } else {
                handleOpenAlert();
              }
            }

            if (!!error) {
              // console.info(error);
            }
          }}
          style={{ width: "20%", mt: -20 }}
        />
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
    </div>
  );
}

export default Scanner;
