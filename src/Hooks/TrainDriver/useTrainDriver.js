import { TrainDriverContext, DailyScheduleContext } from '../../Context/index'
import React, { useContext, useEffect } from 'react'
import useQuery from 'Utils/QueryParams'

export default function useTrainDriver() {
  const {
    detailTrainDriver,
    getDetailTrainDriver,
    trainDriver,
    getDataTrainDriver,
  } = useContext(TrainDriverContext)
  const { getDataDailySchedule, dailySchedule } =
    useContext(DailyScheduleContext)

  return {
    detailTrainDriver,
    trainDriver,
    getDataTrainDriver,
    getDetailTrainDriver,
    getDataDailySchedule,
    dailySchedule,
  }
}
