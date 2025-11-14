import React, { useContext, createContext, useState } from "react";
import Api from '../Services/Api';

export const SoapContext = createContext({});

export default function SoapProvider(props) {

  const [soap, setSoap] = useState(null);
  const [filterSoap, setFilterSoap] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [filterDiagnosis, setFilterDiagnosis] = useState([]);
  const [pharmacology, setPharmacology] = useState([]);
  const [filterPharmacology, setFilterPharmacology] = useState([]);
  const [detailSoap, setDetailSoap] = useState({});

  const getDataDiagnosis = (id) => {
    return Api.getDiagnosis({ params: { id} }).then(res=>{
      if(res.data.length > 0){
        const result = res?.data.map(item=>{
        item.label = item.name
        item.value = item.name 
        return item
      })
        setDiagnosis(result)
        setFilterDiagnosis(result)
        return {...result}
      }
    }).catch(err=>console.log("error",err))
  }

  const postDataDiagnosis = (sendData) => {
    return Api.postDiagnosis(sendData).then(res=>{
      return {status:"OK",result: res.data}
    }).catch(err=>{
      console.log("error",err)
      return {status:"Failed",result: []}
    })
  }

  const getDataPharmacology = (id) => {
    return Api.getPharmacology({ params: { id} }).then(res=>{
      if(res.data.length > 0){
        const result = res?.data.map(item=>{
        item.label = item.medicine
        item.value = item.medicine 
        return item
      })
        setPharmacology(result)
        setFilterPharmacology(result)
        return {...result}
      }
    }).catch(err=>console.log("error",err))
  }

  const postDataPharmacology = (sendData) => {
    return Api.postPharmacology(sendData).then(res=>{
      return {status:"OK",result: res.data}
    }).catch(err=>{
      console.log("error",err)
      return {status:"Failed",result: []}
    })
  }

  const putDataSoap = (sendData,id) => {
    return Api.putSoap(sendData,id).then(res=>{
      return {status:"OK",result: res.data}
    }).catch(err=>{
      console.log("error",err)
      return {status:"Failed",result: []}
    })
  }

return (
  <SoapContext.Provider value={{ getDataDiagnosis,postDataDiagnosis,getDataPharmacology,pharmacology,
    filterPharmacology,postDataPharmacology,putDataSoap,diagnosis,filterDiagnosis,soap,setSoap, setFilterSoap,
    filterSoap,setDetailSoap,detailSoap}} {...props} />
);
}