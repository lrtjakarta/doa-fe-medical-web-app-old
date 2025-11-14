import React, { createContext, useState } from "react";
import Api from '../Services/Api';

export const TrainDriverContext = createContext({});

export default function TrainDriverProvider(props) {
  const [trainDriver, setTrainDriver] = useState([]);
  const [filterTrainDriver, setFilterTrainDriver] = useState([]);
  const [detailTrainDriver, setDetailTrainDriver] = useState({});
  
    const getDataTrainDriver = async () => {
      // return []
      if(trainDriver.length === 0){
        Api.getProfile().then(res=>{
          console.log('data', res.data)
          setTrainDriver(res.data)
          setFilterTrainDriver(res.data)
        }).catch(err=>console.log("error",err.response))
      }
    }

    const getDetailTrainDriver = async (nik) => {
      // console.log("nik",nik)
      return Api.getProfile({ params: { idNumber: nik } }).then(res=>{
        if(res.data.length > 0){
          setDetailTrainDriver(res.data[0])
          return {...res.data[0]}
        }
      }).catch(err=>console.log("error",err))
    }

return (
  <TrainDriverContext.Provider value={{ setTrainDriver, trainDriver,
    getDataTrainDriver, filterTrainDriver,setFilterTrainDriver,getDetailTrainDriver,
    detailTrainDriver, setDetailTrainDriver,
    }} {...props} />
);
}