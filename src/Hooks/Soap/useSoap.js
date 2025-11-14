import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useContext,
  } from "react"
  import { SoapContext } from "../../Context/index"
  import { TrainDriverContext } from "../../Context/index"
  import usePagination from "@mui/material/usePagination"
  import _ from "lodash"
  import useQuery from "Utils/QueryParams"
  import { useTheme } from "@emotion/react"
  import apis from "Services/Api"
  import { toast } from "react-toastify"
  
  export default function UseSoap(props) {
    let query = useQuery()
    const nik = query.get("nik")
  
    const [anamnesis, setAnamnesis] = useState("")
    const [physical, setPhysical] = useState("")
    const [selectDiagnosis, setSelectDiagnosis] = useState([])
    const [newNameDiagnosis, setNewNameDiagnosis] = useState("")
    const [newCodeDiagnosis, setNewCodeDiagnosis] = useState("")
    const [selectPharmacology, setSelectPharmacology] = useState("")
    const [newMedicine, setNewMedicine] = useState("")
    const [newDosage, setNewDosage] = useState("")
    const [newQty, setNewQty] = useState("")
    const [newDiagnosis, setNewDiagnosis] = useState(false)
    const [newPharmacology, setNewPharmacology] = useState(false)
    const {getDataDiagnosis,diagnosis,setDiagnosis,filterDiagnosis,filterPharmacology,pharmacology,getDataPharmacology,postDataPharmacology,postDataDiagnosis} = useContext(SoapContext)
  
    useEffect(() => {
        const fetchData = async () => {
            await getDataDiagnosis()
            await getDataPharmacology()
        }
        fetchData()
    }, [])

    const handleChangeDiagnosis = (val) => {
        if(val.length > 0) {
            if(val[val.length-1].__isNew__){
                setNewDiagnosis(true)
                setNewNameDiagnosis(val[val.length-1].value)
                setSelectDiagnosis(val)
            }
            else{
                setNewDiagnosis(false)
                setSelectDiagnosis(val)
            }
        }
        else{
            setSelectDiagnosis([])
        }
    }

    const handleSubmitNewDiagnosis = async () => {
        const sendData = { code:newCodeDiagnosis, name: newNameDiagnosis }
        const result = await postDataDiagnosis(sendData)
        if(result.status === "OK"){
            await getDataDiagnosis() 
            setNewDiagnosis(false)
            setNewNameDiagnosis("")
            setNewCodeDiagnosis("")
        }
    }

    const handleChangePharmacology = (val) => {
        if(val.__isNew__){
            setNewPharmacology(true)
            setNewMedicine(val.value)
            setSelectPharmacology(val)
        }
        else{
            setNewMedicine(false)
            setSelectPharmacology(val)
        }
    }

    const handleSubmitNewPharmacology = async () => {
        const sendData = { medicine:newMedicine,dosage:newDosage,qty:newQty }
        const result = await postDataPharmacology(sendData)
        if(result.status === "OK"){
            await getDataPharmacology() 
            setNewPharmacology(false)
            setNewMedicine("")
            setNewDosage("")
            setNewQty("")
        }
    }

    return {
        getDataPharmacology,
        handleChangeDiagnosis,
        setAnamnesis,anamnesis,
        physical, setPhysical,
        diagnosis,setDiagnosis,pharmacology,
        filterDiagnosis,filterPharmacology,setSelectDiagnosis,
        newDiagnosis,
        handleSubmitNewDiagnosis,
        handleChangePharmacology,
        handleSubmitNewPharmacology,
        newNameDiagnosis, setNewNameDiagnosis,
        newCodeDiagnosis, setNewCodeDiagnosis,
        selectPharmacology, setSelectPharmacology,
        newPharmacology,
        newMedicine,setNewMedicine,
        newDosage,setNewDosage,
        newQty,setNewQty,
        selectDiagnosis
    }
  }
  