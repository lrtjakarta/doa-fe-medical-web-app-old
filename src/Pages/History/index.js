import React, { useEffect, useState } from 'react';

// icon
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import {
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonBase,
  Stack,
  Pagination,
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Container,
  Card,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import moment from "moment";

import usePagination from '@mui/material/usePagination';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { DurationModification, Header } from "Component";

import useStyles, { tableRowFirstStyle } from './Styles';

// img

import Images from 'Themes/Images';

// style
import { List, tableStyle,
  tableRowStyle,
  tableRowAwalStyle,
  tableRowAkhirStyle, tableCellStyle, textJudulStyle, textPaperSatuStyle, textPaperStyle } from './Styles';
import UseMedicalRecord from 'Hooks/MedicalRecord/useMedicalRecord';
import useQuery from "Utils/QueryParams";
import _ from "lodash"

export default function HomePages(props) {
  const classes = useStyles();
  const { items } = usePagination({
    count: 5,
  });

  const [value, setValue] = useState(new Date());
  const {
    filterMedicalRecord,
    medicalRecord,
    getDataMedicalRecord,
    searchText,
    handleChange,
    fetchDataSchedule,
    checkupStatus,
    handleFilterCheckupStatus,
    filterDateCheckUp,
    setfilterDateCheckUp,
    medicalRecordPersonal,
    getDataHistory,
  } = UseMedicalRecord()
  let query = useQuery();
  const nik = query.get('nik');
  useEffect(() => {
    // fetchDataSchedule()
    getDataHistory(nik)
  }, []);

  // useEffect(()=>{
  //   getDataMedicalRecord() 
  // },[])
  
  return (
    <>
      <Container maxWidth="xl">

        <Box sx={{ flexGrow: 1, mt: 10, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Typography
                sx={{
                  mt:4,
                  fontSize: {
                    xl: 20,
                    lg: 18,
                    md: 18,
                    sm: 14,
                    xs: 14,
                  },
                  fontWeight: 'bold',
                }}
              >
                RIwayat Pemeriksaan Keseluruhan
              </Typography>
            </Grid>
            <Grid item xs={7}>
            <Grid container spacing={3}>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Typography sx={{ mt: 1 }}>
                  Start Date :
                </Typography>
                <MobileDatePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: 5,
                        border: "none",

                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: "none",
                            borderColor: "none",
                            borderRadius: 2,
                            boxShadow:
                              "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                          },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "none",
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "none",
                          },
                      }}
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Typography sx={{ mt: 1 }}>
                  End Date :
                </Typography>
                <MobileDatePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: 5,
                        border: "none",

                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: "none",
                            borderColor: "none",
                            borderRadius: 2,
                            boxShadow:
                              "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                          },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "none",
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "none",
                          },
                      }}
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="row">
                <TextField
                    sx={{mt:4}}
                    placeholder="Pencarian"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <SearchIcon sx={{ fontSize: 15, color: "gray" }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        fontSize: 12,
                        height: 35.5,
                        backgroundColor: "#fff",
                        boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
                      },
                    }}
                    className={classes.searchTxt}
                  />
              </Grid>
            </Grid>
            </Grid>
            </Grid>
          </Grid>
        </Box>

        <Card sx={{ minWidth: 275 }}>
          
        <Card sx={{ minWidth: 275 }}>
          <TableContainer
            sx={{
              padding: "10px",
            }}
          >
            <Table sx={tableStyle}>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyle}>
                    <p>No.</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="left">
                    <p>Nama</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    <p> NIK</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    <p> Tgl Pemeriksaan</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    <p> Waktu Pemeriksaan</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    <p>Status Pemeriksaan</p>
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="center">
                    <p>Aksi</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalRecordPersonal.length ? (
                  _.orderBy(medicalRecordPersonal, ["medicalCheckup.createdAt"], ["desc"]).map((x, idx) => {
                    let start = moment(x?.medicalCheckup?.createdAt)
                    let finish = moment(x?.medicalCheckup?.finishAt)
                    let _timeduration = finish.diff(start, "seconds")
                    let timedurationcheckup = Math.floor(_timeduration/60) + " Menit " +  (_timeduration%60) + " detik"
                    return(
                    <TableRow
                      key={idx}
                      sx={{
                        bgcolor: "#f3f3f3"
                      }}
                    >
                      <TableCell
                        style={tableRowAwalStyle}
                        component="th"
                        scope="row"
                      >
                        {idx + 1}
                      </TableCell>
                      <TableCell align="left" style={tableRowStyle}>
                        <Typography>{x?.trainDriver?.name}</Typography>
                      </TableCell>
                      <TableCell align="center" style={tableRowStyle}>
                        <Typography>{x?.trainDriver?.nik}</Typography>
                      </TableCell>
                      <TableCell align="center" style={tableRowStyle}>
                        <Typography>{moment(x?.medicalCheckup?.createdAt).format("DD-MM-YYYY")}</Typography>
                      </TableCell>
                      <TableCell align="left" style={tableRowStyle}>
                          {
                            x?.medicalCheckup?.status === "4" ?
                            <DurationModification title="Waktu Tunggu" startTime={x?.medicalCheckup?.retake1At}/>: null
                          }
                          {
                            x?.medicalCheckup?.status === "5" ?
                            <DurationModification title="Waktu Tunggu" startTime={x?.medicalCheckup?.retake2At}/>: null
                          }
                          {
                            x?.medicalCheckup?.status ? 
                          <Typography>Mulai Periksa : {moment(new Date(x?.medicalCheckup?.createdAt),"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss")}</Typography>
                          : null }
                          {
                            x?.medicalCheckup?.status === "4" || x?.medicalCheckup?.status === "5" ? 
                            <Typography>Retake 1 : {moment(new Date(x?.medicalCheckup?.retake1At),"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss")}</Typography> :
                            null
                          }
                          {
                            x?.medicalCheckup?.status === "5" ? 
                            <Typography>CheckUp 1 : {moment(new Date(x?.medicalCheckup?.checkup1At),"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss")}</Typography> :
                            null
                          }
                          {
                            x?.medicalCheckup?.status === "5" ? 
                            <Typography>Retake 2 : {moment(new Date(x?.medicalCheckup?.retake2At),"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss")}</Typography> :
                            null
                          }
                          {
                            x?.medicalCheckup?.status === "1" || x?.medicalCheckup?.status === "2" || x?.medicalCheckup?.status === "3"? 
                          <Typography>Selesai Periksa : {moment(new Date(x?.medicalCheckup?.finishAt),"DD/MM/YYYY HH:mm:ss").format("HH:mm:ss")}</Typography>
                          : null }
                          {
                            x?.medicalCheckup?.status === "1" || x?.medicalCheckup?.status === "2" || x?.medicalCheckup?.status === "3"? 
                          <Typography>Durasi Pemeriksaan: { timedurationcheckup }</Typography>
                          : null }
                          
                      </TableCell>
                      <TableCell align="center">
                        <Grid container justifyContent={"center"}>
                        <Typography 
                        style={{
                            fontWeight: 600,
                            border: "none",
                            marginTop:8,
                            marginRight:4,
                            color: x?.medicalCheckup?.status === "1"
                                ? "green"
                                : x?.medicalCheckup?.status === "2"
                                ? "#7746FF"
                                : x?.medicalCheckup?.status === "3"
                                ? "#FE0000"
                                : x?.medicalCheckup?.status === "4"
                                ? "#000"
                                : x?.medicalCheckup?.status === "5"
                                ? "#000"
                                : "#ababab",
                            fontSize: "14px",
                        }}>
                          {x?.medicalCheckup?.status === "1"
                          ? "Fit to Work"
                          : x?.medicalCheckup?.status === "2"
                          ? "Fit to Work with Note"
                          : x?.medicalCheckup?.status === "3"
                          ? "Unfit to Work"
                          : x?.medicalCheckup?.status === "4"
                          ? "Retake"
                          : x?.medicalCheckup?.status === "5"
                          ? "Retake 2"
                          : "Belum diperiksa"}
                        </Typography> 
                        
                          </Grid>

                          
                      </TableCell>
                      <TableCell
                        align="center"
                        style={tableRowAkhirStyle}
                      >
                          <Button variant="contained" color="primary" onClick={()=>{
                              props.history.push("/app/medical/result?nik="+x?.trainDriver?.nik+"&id="+x?.medicalCheckup?._id)
                            }}>
                            Lihat Hasil
                          </Button>
                      </TableCell>
                    </TableRow>
                  )})
                ) : (
                  <TableRow>
                    <TableCell
                      style={tableRowFirstStyle}
                      component="th"
                      scope="row"
                      colSpan={8}
                    >
                      <Typography sx={{ fontSize: 20, textAlign: "center" }}>
                        Data Kosong
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        </Card>

        {/* <Box
          mt={3}
          sx={{
            justifyContent: 'right',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <List>
            {items.map(({ page, type, selected, ...item }, index) => {
              let children = null;

              if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                children = '…';
              } else if (type === 'page') {
                children = (
                  <button
                    sx={{ alignItems: 'right' }}
                    type="button"
                    style={{
                      border: 'none',
                      borderRadius: 3,
                      fontWeight: selected ? 'bold' : undefined,
                      backgroundColor: selected ? '#BB7E36' : '#fff',
                      color: selected ? '#fff' : '#BCBCBC',
                      width: 40,
                      padding: 10,
                      margin: 4,
                    }}
                    {...item}
                  >
                    {page}
                  </button>
                );
              } else {
                children = (
                  <Typography
                    sx={{
                      alignItems: 'right',
                      bgcolor: 'none',
                      border: 'none',
                      color: '#86868C',
                      mt: 1.5,
                    }}
                    component={'button'}
                    {...item}
                  >
                    {type}
                  </Typography>
                );
              }

              return <li key={index}>{children}</li>;
            })}
          </List>
        </Box> */}
      </Container>
    </>
  );
}
