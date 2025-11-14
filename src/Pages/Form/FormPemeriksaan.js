import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
  RadioGroup,
  Snackbar,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import moment from "moment";
import _ from "lodash";
import Radio from "@mui/material/Radio";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuery from "Utils/QueryParams";

import ContentEditor from "Component/ContentEditor";
import Duration from "Component/Duration";
import Submit from "Component/Submit";
import Dialog from "Component/Dialog/index";

import UseCheckup from "Hooks/Checkup/useCheckup";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import UseSoap from "Hooks/Soap/useSoap";
import UseMedicalRecord from "Hooks/MedicalRecord/useMedicalRecord";

import {
  formControlStyle,
  formNumber,
  selectBoxStyles,
  TabStyle,
} from "./Styles";

function FormPemeriksaan() {
  const navigate = useNavigate();
  let query = useQuery();
  const nik = query.get("nik");
  const id = query.get("id");

  const {
    openDialog,
    setOpenDialog,
    valueOkDialog,
    setValueOkDialog,
    valueCancelDialog,
    setValueCancelDialog,
    valueSubmitDialog,
    setValueSubmitDialog,
    titleDialog,
    setTitleDialog,
    handleCloseDialog,
    contentDialog,
    setContentDialog,
    setNote,
    typeDialog,
    setTypeDialog,
    note,
    setStatus,
    status,
    handleSubmit,
    handleNext,
    getLoadMedical,
    formCheckup,
    handleBack,
    activeStep,
    checkup,
    setFormCheckup,
    timesleep,
    setTimeSleep,
    timewakeup,
    setTimeWakeUp,
    getHistoryDataCheckup,
    historycheckup,
  } = UseCheckup();
  const { detailTrainDriver } = useTrainDriver();
  const {
    diagnosis,
    pharmacology,
    newPharmacology,
    newDiagnosis,
    setSelectPharmacology,
    selectPharmacology,
    newNameDiagnosis,
    setNewNameDiagnosis,
    handleChangePharmacology,
    newCodeDiagnosis,
    setNewCodeDiagnosis,
    selectDiagnosis,
    handleChangeDiagnosis,
    handleSubmitNewDiagnosis,
    newMedicine,
    setNewMedicine,
    setAnamnesis,
    anamnesis,
    physical,
    setPhysical,
    newDosage,
    setNewDosage,
    handleSubmitNewPharmacology,
    newQty,
    setNewQty,
  } = UseSoap();
  const { fetchDataSchedule } = UseMedicalRecord();

  const [tanggal, setTanggal] = useState("");
  const [notif, setNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");

  const resultListData = formCheckup.filter(
    (item) => item.category !== "undefined"
  );

  const handleChange = (e, item, data) => {
    const value = e.target.value;

    if (item._id === "62b86117965312546dc4fbd3") {
      // Waktu Tidur

      let datachange = formCheckup.map((itemform) => {
        if (itemform.category === data.category) {
          let _datadetail = itemform.dataDetails.map((itemdetail) => {
            if (itemdetail._id === item._id) {
              return {
                ...itemdetail,
                answer: {
                  value: value,
                },
              };
            } else {
              return itemdetail;
            }
          });
          return {
            ...itemform,
            dataDetails: _datadetail,
          };
        } else {
          return itemform;
        }
      });
      setFormCheckup(datachange);
      setTimeSleep(value);
    } else if (item._id === "62b86117965312546dc4fbd4") {
      // Waktu Bangun

      if (timesleep !== "") {
        let duration = moment(value, "HH:mm:ss").diff(
          moment(timesleep, "HH:mm:ss"),
          "minutes"
        );
        let duration_transform = 0;
        if (duration / 60 < 0) {
          duration_transform = 24 + duration / 60;
        } else {
          duration_transform = duration / 60;
        }
        let duration_hours = duration_transform.toFixed(2);
        let datachange = formCheckup.map((itemform) => {
          if (itemform.category === data.category) {
            let _datadetail = itemform.dataDetails.map((itemdetail) => {
              if (itemdetail._id === "62b82011965312546dc4fbbb") {
                return {
                  ...itemdetail,
                  answer: {
                    value: duration_hours,
                  },
                };
              } else if (itemdetail._id === item._id) {
                return {
                  ...itemdetail,
                  answer: {
                    value: value,
                  },
                };
              } else {
                return itemdetail;
              }
            });
            return {
              ...itemform,
              dataDetails: _datadetail,
            };
          } else {
            return itemform;
          }
        });
        setFormCheckup(datachange);
      }

      setTimeWakeUp(value);
    } else {
      let datachange = formCheckup.map((itemform) => {
        if (itemform.category === data.category) {
          let _datadetail = itemform.dataDetails.map((itemdetail) => {
            if (itemdetail._id === item._id) {
              return {
                ...itemdetail,
                answer: {
                  value: value,
                },
              };
            } else {
              return itemdetail;
            }
          });
          return {
            ...itemform,
            dataDetails: _datadetail,
          };
        } else {
          return itemform;
        }
      });
      setFormCheckup(datachange);
    }
  };

  const formSubmit = async () => {
    let sendData = {
      checkButton: checkup?.status === "4" ? true : false,
      soap: {
        anamnesis,
        physical,
        diagnosis: selectDiagnosis,
        pharmacology: selectPharmacology,
      },
    };
    const result = await handleSubmit(sendData);
    if (result?.status === "OK") {
      setNotifMsg("Berhasil menambah data");
      setNotif(true);
      if (result?.result?.status === "4" || result?.result?.status === "5") {
        navigate("/medical");
        // props.history.push('/medical')
      } else {
        navigate("/medical/result?nik=" + nik + "&id=" + id);
        // props.history.push('/medical/result?nik=' + nik + '&id=' + id)
      }
    } else {
      setNotifMsg("Gagal menambah data");
      setNotif(true);
    }
  };

  const handleSubmitDialog = () => {
    switch (typeDialog) {
      case "1":
        formSubmit();
        break;
      default:
        setOpenDialog(false);
        break;
    }
  };

  useEffect(() => {
    if (id) {
      getLoadMedical(id);
    }
  }, []);

  useEffect(() => {
    fetchDataSchedule();
  }, []);

  return (
    <Box>
      <Grid container justifyContent={"space-between"}>
        <div>
          <div
            style={{
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Duration title={"Durasi Pemeriksaan"} checkup={checkup} />
            <Typography sx={{ fontSize: 13 }}>
              Waktu Pemeriksaan :{" "}
              {moment(checkup?.createdAt).format("HH:mm:ss")} WIB
            </Typography>
            {checkup?.status === "4" ? (
              <Typography sx={{ fontSize: 13 }}>
                Waktu Retake : {moment(checkup?.retake1At).format("HH:mm:ss")}{" "}
                WIB
              </Typography>
            ) : checkup?.status === "5" ? (
              <Typography sx={{ fontSize: 13 }}>
                Waktu Retake : {moment(checkup?.retake2At).format("HH:mm:ss")}{" "}
                WIB
              </Typography>
            ) : null}
            {checkup?.status === "4" ? (
              <Typography sx={{ fontSize: 13 }}>
                Waktu Pemeriksaan Ulang Pertama :{" "}
                {moment(checkup?.checkup1At).format("HH:mm:ss")}
              </Typography>
            ) : checkup?.status === "5" ? (
              <Typography sx={{ fontSize: 13 }}>
                Waktu Pemeriksaan Ulang Kedua :{" "}
                {moment(checkup?.checkup2At).format("HH:mm:ss")}
              </Typography>
            ) : null}

            <Typography sx={{ fontSize: 13 }}>
              Status Pemeriksaan :{" "}
              {checkup?.status === "0"
                ? "Sedang diperiksa"
                : checkup?.status === "4"
                ? "Retake"
                : checkup?.status === "5"
                ? "Retake 2"
                : ""}
            </Typography>
          </div>
        </div>
        <div>
          <Typography
            align="right"
            sx={{ color: "#A2A2A2" }}
            style={{
              fontSize: {
                lg: 14,
                md: 13,
                sm: 14,
                xs: 12,
              },
            }}
          >
            Tanggal dan Waktu Pemeriksaan
          </Typography>
          <Typography
            align="right"
            sx={{
              color: "#000",
              alignItems: "center",
              mt: 1,
              mr: 1,
              fontSize: {
                lg: 14,
                md: 13,
                sm: 14,
                xs: 13,
              },
            }}
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          >
            {moment(checkup?.createdAt).format("DD-MM-YYYY HH:mm")} WIB
          </Typography>
        </div>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}></Stepper>
        <React.Fragment>
          <Paper>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#464748", color: "#fff" }}>
                  <TableCell style={{ color: "#FFF" }}>Pemeriksaaan</TableCell>
                  <TableCell style={{ width: 200, color: "#FFF" }}>
                    Hasil
                  </TableCell>
                  <TableCell style={{ width: 200, color: "#FFF" }}>
                    Catatan
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ width: 150, color: "#FFF" }}
                  >
                    Rekam Medis
                  </TableCell>
                </TableRow>
                {_.orderBy(resultListData, ["category"], ["asc"])?.map(
                  (data, indexheader) => {
                    let show = false;
                    if (indexheader === activeStep) {
                      show = true;
                    }
                    let dataorder = _.orderBy(
                      data?.dataDetails,
                      ["index"],
                      ["asc"]
                    );
                    return (
                      <>
                        {show ? (
                          <>
                            <TableRow>
                              <TableCell colSpan={4}>
                                <Typography variant="h4">
                                  #{indexheader + 1}.{" "}
                                  {data.dataDetails[0]?.category?.name}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            {dataorder?.map((item, index) => {
                              let limit = false;
                              if (item?.reference) {
                                //console.log(item)
                                if (
                                  Number(item?.answer?.value) <
                                  Number(item?.reference?.min)
                                ) {
                                  limit = true;
                                }
                                if (
                                  Number(item?.answer?.value) >
                                  Number(item?.reference?.max)
                                ) {
                                  limit = true;
                                }
                              }
                              return (
                                <TableRow>
                                  <TableCell>
                                    <Typography
                                      align="left"
                                      sx={{ color: "#000" }}
                                      style={{
                                        fontSize: {
                                          lg: 14,
                                          md: 13,
                                          sm: 14,
                                          xs: 12,
                                        },
                                      }}
                                    >
                                      {index + 1}. {item.name}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    {item?.answerType === "column" ? (
                                      <FormControl sx={{ width: 200, ml: -1 }}>
                                        <Grid
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <TextField
                                            style={{
                                              backgroundColor: limit
                                                ? "red"
                                                : "transparent",
                                              color: limit ? "white" : "black",
                                            }}
                                            type={item?.unit?.type}
                                            value={item?.answer?.value}
                                            disabled={
                                              item._id ===
                                              "62b82011965312546dc4fbbb"
                                                ? true
                                                : false
                                            }
                                            onChange={(e) =>
                                              handleChange(e, item, data)
                                            }
                                            // label={item?.unit?.value}
                                            color="success"
                                          ></TextField>
                                          {item?.unit?.value
                                            ? item?.unit?.value
                                            : item?.unit?.value1
                                            ? item?.unit?.value1 +
                                              "/" +
                                              item?.unit?.value2
                                            : ""}
                                        </Grid>
                                        {item?.reference?.min
                                          ? "Range Nilai " +
                                            item?.reference?.min +
                                            " - " +
                                            item?.reference?.max
                                          : ""}
                                      </FormControl>
                                    ) : item?.answerType === "datetime" ? (
                                      <FormControl sx={{ width: 200, ml: -1 }}>
                                        <Grid
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <input
                                            aria-label="Date and time"
                                            style={{
                                              backgroundColor: limit
                                                ? "red"
                                                : "transparent",
                                              color: limit ? "white" : "black",
                                            }}
                                            type="datetime-local"
                                            value={item?.answer?.value}
                                            onChange={(e) => {
                                              let datachange = formCheckup.map(
                                                (itemform) => {
                                                  if (
                                                    itemform.category ===
                                                    data.category
                                                  ) {
                                                    let _datadetail =
                                                      itemform.dataDetails.map(
                                                        (itemdetail) => {
                                                          if (
                                                            itemdetail._id ===
                                                            item._id
                                                          ) {
                                                            return {
                                                              ...itemdetail,
                                                              answer: {
                                                                value: moment(
                                                                  e.target.value
                                                                ).format(
                                                                  "YYYY-MM-DD HH:mm:ss"
                                                                ),
                                                              },
                                                            };
                                                          } else {
                                                            return itemdetail;
                                                          }
                                                        }
                                                      );
                                                    return {
                                                      ...itemform,
                                                      dataDetails: _datadetail,
                                                    };
                                                  } else {
                                                    return itemform;
                                                  }
                                                }
                                              );
                                              setFormCheckup(datachange);
                                            }}
                                          />
                                          {/* <TextField
                                                  style={{
                                                    backgroundColor: limit ? 'red' : 'transparent',
                                                    color: limit ? 'white' : 'black',
                                                  }}
                                                  type={item?.unit?.type}
                                                  // label={item?.unit?.value}
                                                  color='success'></TextField> */}
                                          {item?.unit?.value
                                            ? item?.unit?.value
                                            : item?.unit?.value1
                                            ? item?.unit?.value1 +
                                              "/" +
                                              item?.unit?.value2
                                            : ""}
                                        </Grid>
                                        {item?.reference?.min
                                          ? "Range Nilai " +
                                            item?.reference?.min +
                                            " - " +
                                            item?.reference?.max
                                          : ""}
                                      </FormControl>
                                    ) : (item?.answerType === "option" &&
                                        item?.reference?.min === "0" &&
                                        item?.reference?.max === "0") ||
                                      !item?.reference?.min ? (
                                      <FormControl sx={{ width: 200, ml: -1 }}>
                                        <RadioGroup
                                          aria-labelledby="demo-controlled-radio-buttons-group"
                                          name="controlled-radio-buttons-group"
                                          value={item?.answer?.value}
                                          onChange={(e) => {
                                            let datachange = formCheckup.map(
                                              (itemform) => {
                                                if (
                                                  itemform.category ===
                                                  data.category
                                                ) {
                                                  let _datadetail =
                                                    itemform.dataDetails.map(
                                                      (itemdetail) => {
                                                        if (
                                                          itemdetail._id ===
                                                          item._id
                                                        ) {
                                                          return {
                                                            ...itemdetail,
                                                            answer: {
                                                              value:
                                                                e.target.value,
                                                            },
                                                          };
                                                        } else {
                                                          return itemdetail;
                                                        }
                                                      }
                                                    );
                                                  return {
                                                    ...itemform,
                                                    dataDetails: _datadetail,
                                                  };
                                                } else {
                                                  return itemform;
                                                }
                                              }
                                            );
                                            setFormCheckup(datachange);
                                          }}
                                        >
                                          <FormControlLabel
                                            value={item?.unit?.value1}
                                            control={<Radio />}
                                            label={item?.unit?.value1}
                                          />
                                          <FormControlLabel
                                            value={item?.unit?.value2}
                                            control={<Radio />}
                                            label={item?.unit?.value2}
                                          />
                                          {item?.unit?.value3 ? (
                                            <FormControlLabel
                                              value={item?.unit?.value3}
                                              control={<Radio />}
                                              label={item?.unit?.value3}
                                            />
                                          ) : null}
                                        </RadioGroup>
                                      </FormControl>
                                    ) : (item?.answerType === "option" &&
                                        item?.reference?.min !== "0") ||
                                      item?.reference?.max !== "0" ? (
                                      <FormControl sx={{ width: 200, ml: -1 }}>
                                        <Grid container>
                                          <div>
                                            <TextField
                                              value={item?.answer?.value1}
                                              type={item?.unit?.typeValue1}
                                              onChange={(e) => {
                                                let datachange =
                                                  formCheckup.map(
                                                    (itemform) => {
                                                      if (
                                                        itemform.category ===
                                                        data.category
                                                      ) {
                                                        let _datadetail =
                                                          itemform.dataDetails.map(
                                                            (itemdetail) => {
                                                              if (
                                                                itemdetail._id ===
                                                                item._id
                                                              ) {
                                                                return {
                                                                  ...itemdetail,
                                                                  answer: {
                                                                    value1:
                                                                      e.target
                                                                        .value,
                                                                    value2:
                                                                      itemdetail
                                                                        ?.answer
                                                                        ?.value2,
                                                                  },
                                                                };
                                                              } else {
                                                                return itemdetail;
                                                              }
                                                            }
                                                          );
                                                        return {
                                                          ...itemform,
                                                          dataDetails:
                                                            _datadetail,
                                                        };
                                                      } else {
                                                        return itemform;
                                                      }
                                                    }
                                                  );
                                                setFormCheckup(datachange);
                                              }}
                                              style={formNumber}
                                              color="success"
                                            ></TextField>

                                            <Typography sx={{ ml: 1 }}>
                                              {item?.unit?.value1}
                                            </Typography>
                                          </div>
                                          <div>
                                            <TextField
                                              value={item?.answer?.value2}
                                              type={item?.unit?.typeValue2}
                                              onChange={(e) => {
                                                let datachange =
                                                  formCheckup.map(
                                                    (itemform) => {
                                                      if (
                                                        itemform.category ===
                                                        data.category
                                                      ) {
                                                        let _datadetail =
                                                          itemform.dataDetails.map(
                                                            (itemdetail) => {
                                                              if (
                                                                itemdetail._id ===
                                                                item._id
                                                              ) {
                                                                return {
                                                                  ...itemdetail,
                                                                  answer: {
                                                                    value1:
                                                                      itemdetail
                                                                        ?.answer
                                                                        ?.value1,
                                                                    value2:
                                                                      e.target
                                                                        .value,
                                                                  },
                                                                };
                                                              } else {
                                                                return itemdetail;
                                                              }
                                                            }
                                                          );
                                                        return {
                                                          ...itemform,
                                                          dataDetails:
                                                            _datadetail,
                                                        };
                                                      } else {
                                                        return itemform;
                                                      }
                                                    }
                                                  );
                                                setFormCheckup(datachange);
                                              }}
                                              style={formNumber}
                                              color="success"
                                            ></TextField>
                                            <Typography sx={{ ml: 1 }}>
                                              {item?.unit?.value2}
                                            </Typography>
                                          </div>
                                        </Grid>
                                      </FormControl>
                                    ) : (item?.answerType === "option" &&
                                        !item?.reference?.min) ||
                                      item?.reference?.max ? (
                                      <FormControl sx={{ width: 200, ml: -1 }}>
                                        <Grid container>
                                          <div>
                                            <TextField
                                              value={item?.answer?.value1}
                                              type={item?.unit?.typeValue1}
                                              onChange={(e) => {
                                                let datachange =
                                                  formCheckup.map(
                                                    (itemform) => {
                                                      if (
                                                        itemform.category ===
                                                        data.category
                                                      ) {
                                                        let _datadetail =
                                                          itemform.dataDetails.map(
                                                            (itemdetail) => {
                                                              if (
                                                                itemdetail._id ===
                                                                item._id
                                                              ) {
                                                                return {
                                                                  ...itemdetail,
                                                                  answer: {
                                                                    value2:
                                                                      itemdetail
                                                                        .answer
                                                                        .value2,
                                                                    value1:
                                                                      e.target
                                                                        .value,
                                                                  },
                                                                };
                                                              } else {
                                                                return itemdetail;
                                                              }
                                                            }
                                                          );
                                                        return {
                                                          ...itemform,
                                                          dataDetails:
                                                            _datadetail,
                                                        };
                                                      } else {
                                                        return itemform;
                                                      }
                                                    }
                                                  );
                                                setFormCheckup(datachange);
                                              }}
                                              style={formNumber}
                                              color="success"
                                            ></TextField>

                                            <Typography sx={{ ml: 1 }}>
                                              {item?.unit?.value1}
                                            </Typography>
                                          </div>
                                          <div>
                                            <TextField
                                              value={item?.answer?.value2}
                                              type={item?.unit?.typeValue2}
                                              onChange={(e) => {
                                                let datachange =
                                                  formCheckup.map(
                                                    (itemform) => {
                                                      if (
                                                        itemform.category ===
                                                        data.category
                                                      ) {
                                                        let _datadetail =
                                                          itemform.dataDetails.map(
                                                            (itemdetail) => {
                                                              if (
                                                                itemdetail._id ===
                                                                item._id
                                                              ) {
                                                                return {
                                                                  ...itemdetail,
                                                                  answer: {
                                                                    value1:
                                                                      itemdetail
                                                                        .answer
                                                                        .value1,
                                                                    value2:
                                                                      e.target
                                                                        .value,
                                                                  },
                                                                };
                                                              } else {
                                                                return itemdetail;
                                                              }
                                                            }
                                                          );
                                                        return {
                                                          ...itemform,
                                                          dataDetails:
                                                            _datadetail,
                                                        };
                                                      } else {
                                                        return itemform;
                                                      }
                                                    }
                                                  );
                                                setFormCheckup(datachange);
                                              }}
                                              style={formNumber}
                                              color="success"
                                            ></TextField>
                                            <Typography sx={{ ml: 1 }}>
                                              {item?.unit?.value2}
                                            </Typography>
                                          </div>
                                        </Grid>
                                      </FormControl>
                                    ) : null}
                                  </TableCell>
                                  <TableCell>
                                    <FormControl>
                                      <TextField
                                        value={item?.note}
                                        onChange={(e) => {
                                          let datachange = formCheckup.map(
                                            (itemform) => {
                                              if (
                                                itemform.category ===
                                                data.category
                                              ) {
                                                let _datadetail =
                                                  itemform.dataDetails.map(
                                                    (itemdetail) => {
                                                      if (
                                                        itemdetail._id ===
                                                        item._id
                                                      ) {
                                                        return {
                                                          ...itemdetail,
                                                          note: e.target.value,
                                                        };
                                                      } else {
                                                        return itemdetail;
                                                      }
                                                    }
                                                  );
                                                return {
                                                  ...itemform,
                                                  dataDetails: _datadetail,
                                                };
                                              } else {
                                                return itemform;
                                              }
                                            }
                                          );
                                          setFormCheckup(datachange);
                                        }}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                          ),
                                          style: {
                                            fontSize: 12,
                                            mr: -15,
                                            ml: -3,
                                            minWidth: 300,
                                            maxHeight: 35,
                                            backgroundColor: "#fff",
                                            boxShadow:
                                              "inset -2px 2px 4px 0px #d9d9d9",
                                          },
                                        }}
                                        sx={formControlStyle}
                                        color="success"
                                      ></TextField>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={async () => {
                                        let datahistory =
                                          await getHistoryDataCheckup(
                                            detailTrainDriver._id,
                                            item._id
                                          );
                                        if (datahistory.length > 0) {
                                          setOpenDialog(true);

                                          // console.log(
                                          // 	'getHistoryDataCheckup',
                                          // 	detailTrainDriver._id,
                                          // 	item._id
                                          // );
                                          setTitleDialog(
                                            <Typography
                                              style={{
                                                color: "#bf272b",
                                              }}
                                            >
                                              Riwayat Pemeriksaan
                                            </Typography>
                                          );
                                          setContentDialog(
                                            <Table>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell>Tgl</TableCell>
                                                  <TableCell>Hasil</TableCell>
                                                  <TableCell>Catatan</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                {datahistory.map(
                                                  (itemHistory) => {
                                                    let show = false;
                                                    if (
                                                      itemHistory?.mrDataAnswer
                                                        ?.value
                                                    ) {
                                                      show = true;
                                                    }
                                                    return (
                                                      <>
                                                        {show ? (
                                                          <TableRow>
                                                            <TableCell>
                                                              {moment(
                                                                itemHistory?.createAt
                                                              ).format(
                                                                "DD-MM-YYYY HH:mm:ss"
                                                              )}
                                                            </TableCell>
                                                            <TableCell>
                                                              {
                                                                itemHistory
                                                                  ?.mrDataAnswer
                                                                  ?.value
                                                              }{" "}
                                                              {
                                                                itemHistory
                                                                  ?.mrDataUnit
                                                                  ?.value
                                                              }
                                                            </TableCell>
                                                            <TableCell>
                                                              {
                                                                itemHistory?.mrDataNote
                                                              }
                                                            </TableCell>
                                                          </TableRow>
                                                        ) : null}
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </TableBody>
                                            </Table>
                                          );
                                          setValueCancelDialog("Tutup");
                                        } else {
                                          alert("Data Riwayat tidak ditemukan");
                                        }
                                      }}
                                    >
                                      Lihat
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </>
                        ) : null}
                      </>
                    );
                  }
                )}
              </TableHead>
            </Table>
          </Paper>

          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
              pt: 2,
              pb: 4,
            }}
          >
            {activeStep > 0 ? (
              <Button
                onClick={handleBack}
                variant="contained"
                sx={{
                  color: "#A56C28",
                  bgcolor: "#fff",
                  border: "2px solid #A56C28",
                  width: 200,
                  "&:hover": {
                    backgroundColor: "#BB7E36",
                    color: "#fff",
                    border: "none",
                  },
                }}
              >
                <ArrowBackIosNewIcon sx={{ mr: 1 }} /> Kembali
              </Button>
            ) : null}
            {activeStep === resultListData.length - 1 ? null : (
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  bgcolor: "#BB7E36",
                  border: "none",
                  width: 200,
                  "&:hover": {
                    backgroundColor: "#BB7E36",
                    color: "#fff",
                    border: "none",
                  },
                }}
                onClick={handleNext}
              >
                Selanjutnya
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Box>

      {activeStep === resultListData.length - 1 && (
        <>
          <Submit
            statusForm={checkup?.status}
            chooseBtn={status}
            handleClick={setStatus}
          />
          <Container maxWidth="xl">
            {status === "2" || status === "3" ? (
              <>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 28, fontWeight: 600, mr: 1, mt: 2 }}
                  >
                    S
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Anamnesis</Typography>
                    <TextField
                      value={anamnesis}
                      onChange={(e) => setAnamnesis(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Tulis catatan disini "
                      sx={{ width: "100%" }}
                      InputProps={{
                        style: {
                          fontSize: 12,
                          height: 40,
                          backgroundColor: "#fff",
                        },
                      }}
                      fullWidth
                    />
                  </Box>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 28, fontWeight: 600, mr: 1, mt: 2 }}
                  >
                    O
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Pemeriksaan Fisik</Typography>
                    <ContentEditor
                      handleChange={(event, editor) =>
                        setPhysical(editor.getData())
                      }
                      value={physical}
                    />
                  </Box>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 28, fontWeight: 600, mr: 1, mt: 2 }}
                  >
                    A
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Diagnosis</Typography>
                    <CreatableSelect
                      isMulti
                      styles={selectBoxStyles}
                      menuPortalTarget={document.body}
                      placeholder="Pilih Diagnosis"
                      options={diagnosis}
                      isSearchable={true}
                      isClearable={true}
                      value={selectDiagnosis}
                      onChange={(selected) =>
                        handleChangeDiagnosis(selected ? selected : {})
                      }
                    />
                    {newDiagnosis ? (
                      <Box
                        sx={{
                          mt: 1,
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography>Nama Diagnosis</Typography>
                        <TextField
                          value={newNameDiagnosis}
                          onChange={(e) => setNewNameDiagnosis(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder="Nama Diagnosis "
                          sx={{ width: "100%" }}
                          InputProps={{
                            style: {
                              fontSize: 12,
                              height: 40,
                              backgroundColor: "#fff",
                            },
                          }}
                          fullWidth
                        />
                        <Typography>Kode Diagnosis</Typography>
                        <TextField
                          value={newCodeDiagnosis}
                          onChange={(e) => setNewCodeDiagnosis(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder="Kode Diagnosis"
                          sx={{ width: "100%" }}
                          InputProps={{
                            style: {
                              fontSize: 12,
                              height: 40,
                              backgroundColor: "#fff",
                            },
                          }}
                          fullWidth
                        />
                        <Button
                          variant="contained"
                          sx={{
                            color: "#fff",
                            bgcolor: "#BB7E36",
                            width: 150,
                            mt: 1,
                            "&:hover": {
                              backgroundColor: "#BB7E36",
                              color: "#fff",
                              border: "none",
                            },
                          }}
                          onClick={handleSubmitNewDiagnosis}
                        >
                          Pilih dan Tambah
                        </Button>
                      </Box>
                    ) : null}
                  </Box>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 28, fontWeight: 600, mr: 1, mt: 2 }}
                  >
                    P
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Farmakologi / Non Farmakologi</Typography>

                    <ContentEditor
                      handleChange={(event, editor) =>
                        setSelectPharmacology(editor.getData())
                      }
                      value={selectPharmacology}
                    />
                  </Box>
                </div>
              </>
            ) : status && status !== "1" ? (
              <TextField
                value={note}
                onChange={(e) => setNote(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Tulis catatan disini "
                sx={{ width: "100%", mt: 1 }}
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            ) : null}
          </Container>
          <Box sx={{ mt: 0, pb: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              to="/medical"
              component={Link}
              sx={{
                color: "#BB7E36",
                bgcolor: "#f2f2f2",
                border: 0.5,
                width: "30%",
                mr: 3,
                mt: 3,
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  border: "none",
                },
              }}
            >
              Cancel
            </Button>
            {status !== "" ? (
              <Button
                onClick={() => {
                  setTypeDialog("1");
                  setOpenDialog(true);
                  setValueOkDialog("OK");
                  setValueSubmitDialog(true);
                  setValueCancelDialog("Cancel");
                  setTitleDialog(
                    <Box
                      sx={{
                        pt: 0.7,
                        pb: 0.7,
                        pl: 2,
                        pr: 2,
                        borderRadius: 2,
                        bgcolor:
                          status === "1"
                            ? "#079b4d"
                            : status === "2"
                            ? "#5a6eff"
                            : status === "3"
                            ? "#ed1c24"
                            : "#BB7E36",
                      }}
                    >
                      <Typography
                        style={{
                          color: "#fff",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                      >
                        Apakah anda yakin melakukan pemeriksaan dengan status
                        {status === "1"
                          ? " Fit To Work"
                          : status === "2"
                          ? " Fit To Work with Note"
                          : status === "3"
                          ? " Unfit To Work"
                          : " Retake"}{" "}
                        ?
                      </Typography>
                    </Box>
                  );
                  setContentDialog("");
                }}
                variant="contained"
                sx={{
                  color: "#fff",
                  bgcolor: "#BB7E36",
                  border: 0.5,
                  width: "30%",
                  mr: 3,
                  mt: 3,
                  "&:hover": {
                    backgroundColor: "#BB7E36",
                    color: "#fff",
                    border: "none",
                  },
                }}
              >
                Submit
              </Button>
            ) : null}
          </Box>
        </>
      )}

      <Dialog
        open={openDialog}
        close={handleCloseDialog}
        title={titleDialog}
        content={contentDialog}
        confirm={handleSubmitDialog}
        submit={valueSubmitDialog}
        cancel={handleCloseDialog}
        valueConfirm={valueOkDialog}
        valueCancel={valueCancelDialog}
        colorButtonConfirm={"#BB7E36"}
      />
    </Box>
  );
}

export default FormPemeriksaan;
