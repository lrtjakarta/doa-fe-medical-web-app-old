import React, { useState, useEffect, useContext } from "react"
import {
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    FormControl,
    Select,
    Button,
    MenuItem
} from "@mui/material"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import SearchIcon from "@mui/icons-material/Search"
import Typography from "@mui/material/Typography"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link} from "react-router-dom"
//img
import Images from "Themes/Images"

// from chart
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from "chart.js"
import { Bar,Pie } from "react-chartjs-2"
import moment from "moment"

// style
import useStyles,{
    Img,
    mainBox,
    secondBox,
    mainTittle,
    secondTittle,
    third,
    container,
    buttonAddStyle
} from "./Styles"
import useDashboard from "Hooks/Dashboard/useDashboard"
import _ from "lodash"

// Chart.js (Pie)
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
)

export default function HomePages() {

    const { getDashboardMedicalCheckup,maxDataCheckup,selectYear,selectMonthly , setSelectMonthly,
        selectDay , setSelectDay,setSelectYear,listDayOfMonth,type,dataCheckup,dataMonthly,setListYear,listYear ,setCurrentYear,handleFilter,profile } = useDashboard() 

    const classes = useStyles()

    useEffect(() => {
        const fetchData = async () => {
            let year = moment(new Date()).format("YYYY")
            setCurrentYear(year)
            await getDashboardMedicalCheckup({ params: { type : "year" , value: year}})
            let minYear = year - 5
            let dataYear = []
            for (let index = minYear; index <= year; index++) {
                dataYear = [...dataYear,{label:index, value:index}]
            }
            setListYear(dataYear)
        }
        fetchData()
    }, [])

    return (
        <Container maxWidth="xl" sx={container}>
            <Box component="main" sx={mainBox}>
                <CssBaseline />
                <Container maxWidth="xl">
                    <Box
                        fullwidth
                        sx={{ borderRadius: 3, flexGrow: 1 }}
                    >

                        <Grid container justifyContent="space-between" alignContent="center" sx={{pt:4,pb:2}}>
                            <Grid item xs={3}>
                            <Grid container alignContent="center">
                                <Typography sx={{fontSize:20}}>Dashboard</Typography>
                            </Grid>
                            </Grid>
                            <Grid item xs={9}>
                            <Grid container justifyContent="flex-end" spacing={2}>
                                <div style={{marginLeft:10}}>
                                <Typography 
                                    className={classes.dateTxt}>Pilih Tanggal</Typography>
                                <TextField
                                    type={"Date"}
                                    value={selectDay}
                                    onChange={(e)=>{
                                        handleFilter(e.target.value,"createdAt")
                                        setSelectDay(e.target.value)
                                        setSelectYear("")
                                        setSelectMonthly("")
                                    }}
                                    placeholder="Pencarian"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    sx={{ padding: 0 }}
                                                >
                                                    <SearchIcon
                                                        sx={{
                                                            fontSize: 15,
                                                            color: "gray"
                                                        }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        style: {
                                            fontSize: 12,
                                            height: 35.5,
                                            backgroundColor: "#fff",
                                            boxShadow:
                                                "inset 0px 2px 4px rgba(0, 0, 0, 0.25)"
                                        }
                                    }}
                                    className={classes.searchTxt}
                                />
                                </div>
                                <div style={{marginLeft:10}}>
                                <Typography 
                                    className={classes.dateTxt}>Pilih Bulan</Typography>
                                <TextField
                                    type={"month"}
                                    value={selectMonthly}
                                    onChange={(e)=>{
                                        handleFilter(e.target.value,"monthly")
                                        setSelectMonthly(e.target.value)
                                        setSelectYear("")
                                        setSelectDay("")
                                    }}
                                    placeholder="Pencarian"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    sx={{ padding: 0 }}
                                                >
                                                    <SearchIcon
                                                        sx={{
                                                            fontSize: 15,
                                                            color: "gray"
                                                        }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        style: {
                                            fontSize: 12,
                                            height: 35.5,
                                            backgroundColor: "#fff",
                                            boxShadow:
                                                "inset 0px 2px 4px rgba(0, 0, 0, 0.25)"
                                        }
                                    }}
                                    className={classes.searchTxt}
                                />
                                </div>
                                <div style={{marginLeft:10}}>
                                <Typography
                                    className={classes.dateTxt}
                                >
                                    Pilih Tahun:
                                </Typography>
                                <FormControl
                                    sx={{
                                        "& .MuiSelect-select": {
                                            color: "primary.black",
                                            fontSize: 14,
                                            zIndex: 1
                                        },
                                        "& fieldset": {
                                            backgroundColor: "#ffffff",
                                            borderRadius: 2,
                                            border: "none",
                                            boxShadow:
                                                "inset 0px 2px 4px rgba(0, 0, 0, 0.25)"
                                        },
                                        "& .MuiSelect-icon": {
                                            zIndex: 1
                                        }
                                    }}
                                    fullWidth
                                    size="small"
                                >
                                    <Select
                                        labelId="checkup-status"
                                        label="Semua"
                                        id="checkup-status"
                                        onChange={(e)=>{
                                            handleFilter(e.target.value,"year")
                                            setSelectYear(e.target.value)
                                            setSelectMonthly("")
                                            setSelectDay("")
                                        }}
                                        value={selectYear}
                                    >
                                        {
                                            listYear.map((item,index)=>(
                                                <MenuItem key={index} value={item.value}>
                                                    {item.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                </div>
                            </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box
                                    elevation={3}
                                    sx={{
                                        bgcolor: "#fff",
                                        borderRadius: 2,
                                        padding: 2,
                                        mb: 2,
                                        flex: 1,
                                        boxShadow:
                                            "0px 0px 10px rgba(0, 0, 0, 0.3)"
                                    }}
                                >
                                    <Typography sx={third}>
                                        Pemeriksaan Kesehatan
                                    </Typography>
                                    <Bar
                                        data={{
                                            labels: type === "createdAt" ? [selectDay] : type === "monthly" ? listDayOfMonth : dataMonthly,
                                            datasets: [
                                                {
                                                    label: "Fit to Work",
                                                    data: dataCheckup.map(item=>item.fitwork),
                                                    backgroundColor:"green",
                                                    barThickness: type === "createdAt" ? 35 : type === "monthly" ? 10 : 27
                                                },
                                                {
                                                    label: "Fit to Work With Note",
                                                    data: dataCheckup.map(item=>item.fitworknote),
                                                    backgroundColor: "#FFFF00",
                                                    barThickness: type === "createdAt" ? 35 : type === "monthly" ? 10 : 27
                                                },
                                                {
                                                    label: "Unfit to Work",
                                                    data: dataCheckup.map(item=>item.unfitwork),
                                                    backgroundColor:"#FE0000",
                                                    barThickness: type === "createdAt" ? 35 : type === "monthly" ? 10 : 27
                                                }
                                            ]
                                        }}
                                        options={{
                                            scales: {
                                                x:{
                                                    beginAtZero: true,
                                                },
                                                y: {
                                                    beginAtZero: true,
                                                    max:type === "createdAt" ? maxDataCheckup?.semua + 1 : type === "monthly" ? maxDataCheckup?.semua + 1 : maxDataCheckup?.semua + 5
                                                }
                                            }
                                        }}
                                    ></Bar>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Container>
    )
}
