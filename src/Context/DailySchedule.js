import moment from "moment";
import React, { useContext, createContext, useState } from "react";
import Api from '../Services/Api';

export const DailyScheduleContext = createContext({});

export default function DailyScheduleProvider(props) {
  const [dailySchedule, setDailySchedule] = useState([]);
  const [filterDailySchedule, setFilterDailySchedule] = useState([]);
  const [detailDailySchedule, setDetailDailySchedule] = useState({});
  
    const getDataDailySchedule = async (query) => {
      //if(dailySchedule.length === 0){
      console.log('query getDailySchedule', query)
        return Api.getDailySchedule({params:query}).then(res=>{
          console.log('data getDailySchedule', res.data)
          setDailySchedule(res.data.data)
          setFilterDailySchedule(res.data.data)
          return res.data.data
        }).catch(err=>console.log("error",err))
      // }
      // else{
      //   return dailySchedule
      // }
    }

    const getDetailDailySchedule = async (id) => {
      if(dailySchedule.length === 0){
        return Api.getDailySchedule({ params: { id } }).then(res=>{
          if(res.data.length > 0){
            setDetailDailySchedule(res.data[0])
            return {...res.data[0]}
          }
          return {}
        }).catch(err=>console.log("error",err))
      }
      else{
        const result = await dailySchedule.filter(item=>item._id === id)
        if(result.length > 0){
          setDetailDailySchedule(result[0])
          return result[0]
        }
      }
    }

return (
  <DailyScheduleContext.Provider value={{ setDailySchedule, dailySchedule,
    getDataDailySchedule, filterDailySchedule,setFilterDailySchedule,getDetailDailySchedule,detailDailySchedule, setDetailDailySchedule,
    }} {...props} />
);
}