import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react"
import {
  CategoryMedicalContext,
  CheckupContext,
  DailyScheduleContext,
  MedicalRecordContext,
} from "../../Context/index"
import usePagination from "@mui/material/usePagination"
import _ from "lodash"
import useQuery from "Utils/QueryParams"
import { useTheme } from "@emotion/react"
import moment from "moment"
import { decodeToken } from "react-jwt"
import Api from 'Services/Api'

export default function UseMedicalRecord(props) {
  const theme = useTheme()
  let query = useQuery()
  const nik = query.get("nik")
  const { items } = usePagination({
    count: 5,
  })
  const decodedToken = decodeToken(localStorage.getItem("access_token"));

  const today = moment().format("YYYY-MM-DD")

  const [searchText, setSearchText] = useState("")
  const [checkupStatus, setCheckupStatus] = useState("")
  const [filterStartDate, setfilterStartDate] = useState("")
  const [filterEndDate, setfilterEndDate] = useState("")

  const [loadingData, setLoadingData]= useState(false)
  const [loader, setLoader] = useState(false)
  

  const {
    medicalRecord,
    filterMedicalRecord,
    detailMedicalRecord,
    getDetailMedicalRecord,
    setFilterMedicalRecord,
    setMedicalRecord,
    getDataMedicalRecord,
    getDataMedicalRecordPersonal,
    medicalRecordPersonal
  } = useContext(MedicalRecordContext)
  const { getDataDailySchedule,dailySchedule } = useContext(DailyScheduleContext)
  const { getDataCheckup } = useContext(CheckupContext)

  useEffect(() => {
    const fetchData = async () => {
      if (nik) {
        await getDetailMedicalRecord(nik)
      }
    }
    fetchData()
  }, [])

  const handleChange = (value) => {
    setSearchText(value)
    // filterData(value)
  }

  const filterData = (value) => {
    var searchQuery = value.toString().toLowerCase()

    let listdata = [
      "niktraindriver",
      "nametraindriver",
    ].map((x, i) => {
      return medicalRecord.filter((el) => {
        if (el[x]) {
          return el[x].toString().toLowerCase().indexOf(searchQuery) !== -1
        }
      })
    })
    let filtertext = medicalRecord.filter((item) => item?.trainDriver?.name.toString().toLowerCase().indexOf(searchQuery) !== -1 || item?.trainDriver?.nik.toString().toLowerCase().indexOf(searchQuery) !== -1)
    setFilterMedicalRecord(filtertext)
  }
  const handleFilterCheckupStatus = (value) => {
    setCheckupStatus(value)
    if(value){
      const resFilter = medicalRecord.filter(item=>item?.medicalCheckup?.status === value)
      setFilterMedicalRecord(resFilter)
    }
    else{
      setFilterMedicalRecord(medicalRecord)
    }
  }

  const getDataHistory = (nik) =>{
    getDataMedicalRecordPersonal(nik)
  }

  const fetchDataSchedule = async (startDate,endDate) => {
    await setLoadingData(true)
    await Api.getUserById(decodedToken.id).then(async response=>{
      console.log('response fetchDataSchedule', response.data)
      const departement = response.data?.departement
      let querySend = {departement: departement}
    let querySendMr = {departement: departement}
    if (startDate && endDate) {
      querySend = {...querySend, dailyWorkDate: startDate,endDate}
    } else if (startDate) {
      querySend = {...querySend, dailyWorkDate: startDate,endDate:today}
    } else if (endDate) {
      querySend = {...querySend, dailyWorkDate:today,endDate}
    }
    else{
      querySend = {...querySend,dailyWorkDate:today,dailyWorkDate:today}
    }

    if (startDate && endDate) {
      querySendMr = {...querySendMr, startDate,endDate}
    } else if (startDate) {
      querySendMr = {...querySendMr, startDate,endDate:today}
    } else if (endDate) {
      querySendMr = {...querySendMr, startDate:today,endDate}
    }
    else{
      querySendMr = {...querySendMr,startDate:today,endDate:today}
    }

    console.log('query', querySend, querySendMr)
    const result = await getDataDailySchedule(querySend);
    const resMedic = await getDataMedicalRecord(querySendMr);
    console.log('result schedule', result)
    if(result){
      let dataMerge = result.filter(x=>x.workOrder.code !== "OFF").map(item=>{
        let dataMedic = resMedic?.filter(x=>x.profile.idNumber === item.profile.idNumber && x.dailyWorkOrder?.workOrder?.code === item?.workOrder?.code && x.created === moment(item.dailyWorkDate).format("YYYY-MM-DD"))// )
        return {...item, medicalCheckup: dataMedic.length > 0 ? dataMedic[0] : {}}
      })
      setMedicalRecord(dataMerge);
      setFilterMedicalRecord(dataMerge);
      setLoadingData(false)
      console.log('dataMerge', result, resMedic, dataMerge)
      return dataMerge
    }

    })
    
    
  }

  const handleSearch = async () => {
    // await setLoader(true)
    // let tempData = []
    if(searchText){
      filterData(searchText)
    }
    else{
      await fetchDataSchedule(
        filterStartDate,
        filterEndDate,
      )
      // let resultMedical =
      //   response.length > 0
      //     ? response.filter(
      //         (x) =>
      //           x?.medicalCheckup?.status === '1' ||
      //           x?.medicalCheckup?.status === '2' ||
      //           x?.medicalCheckup?.status === '3',
      //       )
      //     : null  
      // if (resultMedical) {
        // resultMedical.map(async (item) => {
        //   let id = item?.medicalCheckup?._id
        //   const responseDetail = await getDataCheckup(id)
        //   // tempData = [...tempData, responseDetail]
        // })
      // }
    }
    // await setLoader(false)
  }

  return {
    medicalRecord,
    filterMedicalRecord,
    setFilterMedicalRecord,
    setMedicalRecord,
    getDataMedicalRecord,
    fetchDataSchedule,
    detailMedicalRecord,
    searchText,
    getDataDailySchedule,
    setSearchText,
    filterData,
    handleChange,
    checkupStatus,
    setCheckupStatus,
    handleFilterCheckupStatus,
    filterStartDate,
    setfilterStartDate,
    filterEndDate,
    handleSearch,
    setfilterEndDate,
    setLoadingData,loader, setLoader,
    getDataMedicalRecordPersonal,  medicalRecordPersonal,
    getDataHistory,
    loadingData
  }
}
