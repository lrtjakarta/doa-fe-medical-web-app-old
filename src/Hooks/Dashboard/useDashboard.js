import { DashboardContext } from '../../Context/index';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment'
import _ from "lodash"

export default function useDashboard() {
  const { dashboardCheckup,getDashboardMedicalCheckup } = useContext(DashboardContext)

  const [currentYear, setCurrentYear] = useState("")
  const [type, setType] = useState("")
  const [selectYear , setSelectYear] = useState("")
  const [selectMonthly , setSelectMonthly] = useState("")
  const [selectDay , setSelectDay] = useState("")
  const [listYear, setListYear] = useState([])
  const [listDayOfMonth, setListDayOfMonth] = useState([])

  const profile = JSON.parse(localStorage.user)

  const handleFilter = (value,type) => {
    if(type === "monthly"){
        const numDaysInMonth = moment(value, "YYYY-MM").daysInMonth();
        let dataDays = []
        for (let index = 1; index <= numDaysInMonth; index++) {
            dataDays = [...dataDays,index]
        }
        setListDayOfMonth(dataDays)
    }
    setType(type)
    getDashboardMedicalCheckup({ params: { type , value}})
  }

  const dataMonthly = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const dataCheckup = type === "createdAt" ? dashboardCheckup.filter(item=>item._id === selectDay) 
   : type === "monthly" ? listDayOfMonth.map((val,index)=>{
    const byMonthly = dashboardCheckup.filter(item=>moment(item._id).format("D") === val.toString());
    val = byMonthly.length > 0 ? byMonthly[0] : {}
    return val
  }) : dataMonthly.map((val,index)=>{
    const byYear = dashboardCheckup.filter(item=>moment(item._id).format("M") === (index + 1).toString());
    val = byYear.length > 0 ? byYear[0] : {}
    return val
  })

  const maxDataCheckup = _.maxBy(dataCheckup,"semua")

  return {
    dataCheckup,currentYear, setCurrentYear,type, setType,maxDataCheckup,
    setListYear,listYear ,handleFilter,profile,selectYear , setSelectYear,selectMonthly , setSelectMonthly,
    selectDay , setSelectDay,listDayOfMonth,
    dashboardCheckup,getDashboardMedicalCheckup,dataMonthly
  }
}