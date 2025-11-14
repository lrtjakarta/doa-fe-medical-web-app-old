import React, { useContext, createContext, useState } from "react";
import Api from '../Services/Api';

export const MedicalOfficerContext = createContext({});

export default function MedicalOfficerProvider(props) {
  const [medicalOfficer, setMedicalOfficer] = useState([]);
  const [filterMedicalOfficer, setFilterMedicalOfficer] = useState([]);
  const [detailMedicalOfficer, setDetailMedicalOfficer] = useState({});
  
    const getDataMedicalOfficer = async () => {
      if(medicalOfficer.length === 0){
        Api.getMedicalOfficer().then(res=>{
          console.log("res.data",res.data)
          setMedicalOfficer(res.data)
          setFilterMedicalOfficer(res.data)
        }).catch(err=>console.log("error",err))
      }
    }

    const getDetailMedicalOfficer = async (id) => {
      if(medicalOfficer.length === 0){
        return Api.getMedicalOfficer({ params: { id } }).then(res=>{
          if(res.data.length > 0){
            setDetailMedicalOfficer(res.data[0])
            return {...res.data[0]}
          }
          return {}
        }).catch(err=>console.log("error",err))
      }
      else{
        const result = await medicalOfficer.filter(item=>item._id === id)
        if(result.length > 0){
          setDetailMedicalOfficer(result[0])
          return result[0]
        }
      }
    }

return (
  <MedicalOfficerContext.Provider value={{ setMedicalOfficer, medicalOfficer,
    getDataMedicalOfficer, filterMedicalOfficer,setFilterMedicalOfficer,getDetailMedicalOfficer,detailMedicalOfficer, setDetailMedicalOfficer,
    }} {...props} />
);
}