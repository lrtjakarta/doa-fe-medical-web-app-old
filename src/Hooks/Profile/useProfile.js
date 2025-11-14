import { ProfileContext, DailyScheduleContext } from '../../Context/index'
import React, { useContext, useEffect } from 'react'
import useQuery from 'Utils/QueryParams'

export default function useProfile() {
  const {
    detailProfile,
    getDetailProfile,
    profileData,
    getDataProfile,
  } = useContext(ProfileContext)
  const { getDataDailySchedule, dailySchedule } =
    useContext(DailyScheduleContext)

  return {
    detailProfile,
    profileData,
    getDataProfile,
    getDetailProfile,
    getDataDailySchedule,
    dailySchedule,
  }
}
