import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react"
import { MonthlyContext } from "../../Context/index"
import { TrainDriverContext } from "../../Context/index"
import usePagination from "@mui/material/usePagination"
import _ from "lodash"
import useQuery from "Utils/QueryParams"
import { useTheme } from "@emotion/react"
import apis from "Services/Api"
import { toast } from "react-toastify"

export default function UseMedicalRecord(props) {
  const theme = useTheme()
  let query = useQuery()
  const nik = query.get("nik")
  const { items } = usePagination({
    count: 5,
  })

  const [searchText, setSearchText] = useState("")
  const [name, setName] = useState({})
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [fat, setFat] = useState("")
  const [vfa, setVfa] = useState("")
  const [bmr, setBmr] = useState("")
  const [bmi, setBmi] = useState("")
  const [note, setNote] = useState("")
  const [openFormName, setOpenFormName] = useState(false)
  const [value, setValue] = useState(new Date())
  const [openNote, setOpenNote] = React.useState(false);

  const {
    monthly,
    filterMonthly,
    detailMonthly,
    getDetailMonthly,
    setFilterMonthly,
    setMonthly,
    getDataMonthly,
    deleteDataMonthly
  } = useContext(MonthlyContext)

  const { trainDriver, getDataTrainDriver, setTrainDriver } =
    useContext(TrainDriverContext)

  const loading = openFormName && trainDriver.length === 0

  const fetchDetailMonthlyTrainDriver = async(trainDriverId, date) =>{
    console.log('trainDriverId', trainDriverId)
    console.log('date', date)
    let dataget = await getDetailMonthly(trainDriverId, date)
    console.log('1.dataget', dataget)
    return dataget
  }


  const handleFilterMonthly = (value) => {
    setSearchText(value)

    if (value) {
      const searchQuery = value.toString().toLowerCase()
      let listdata = [
        "trainDriverName",
        "age",
        "bmi",
        "bmr",
        "fat",
        "height",
        "weight",
      ].map((x, i) => {
        return monthly.filter((el) => {
          if (el[x]) {
            return el[x].toString().toLowerCase().indexOf(searchQuery) !== -1
          }
        })
      })

      const dataset = _.maxBy(listdata, function (o) {
        return o.length
      })
      setFilterMonthly(dataset)
    } else {
      setFilterMonthly(monthly)
    }
  }

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const data = {
      trainDriver: name,
      age,
      height,
      weight,
      fat,
      vfa,
      bmr,
      bmi,
      note,
      createBy: user,
    }
    apis
      .postMonthly(data)
      .then((res) => {
        toast.success("Data berhasil ditambahkan")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch((err) => {
        toast.error("Data gagal ditambahkan")
        console.log(err)
      })
  }

  const handleFilterMonth = (value) => {
    const filter = monthly.filter((el) => {
      return (
        new Date(el.createdAt).getFullYear() === value.getFullYear() &&
        new Date(el.createdAt).getMonth() === value.getMonth()
      )
    })
    setFilterMonthly(filter)
  }

  return {
    monthly,
    filterMonthly,
    setFilterMonthly,
    setMonthly,
    getDataMonthly,
    detailMonthly,
    searchText,
    setSearchText,
    handleFilterMonthly,
    name,
    setName,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    fat,
    setFat,
    vfa,
    setVfa,
    bmr,
    setBmr,
    bmi,
    setBmi,
    note,
    setNote,
    openNote,
    setOpenNote,
    handleSubmit,
    trainDriver,
    getDataTrainDriver,
    setTrainDriver,
    openFormName,
    setOpenFormName,
    loading,
    value,
    setValue,
    handleFilterMonth,
    deleteDataMonthly,
    getDetailMonthly,
    fetchDetailMonthlyTrainDriver
  }
}
