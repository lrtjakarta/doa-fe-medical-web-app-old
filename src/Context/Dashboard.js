import React, { useContext, createContext, useState } from "react"
import Api from "../Services/Api"
import { toast } from "react-toastify"

const month = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Apr" },
    { value: "05", label: "May" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Agt" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Okt" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Des" }
]

export const DashboardContext = createContext({})

export default function DashboardProvider(props) {
    const [dashboardCheckup, setDashboardCheckup] = useState([])

    const getDashboardMedicalCheckup = async (query) => {
        try {
            let res = await Api.getDashboardCheckup(query)
            setDashboardCheckup(res.data)
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <DashboardContext.Provider
            value={{ getDashboardMedicalCheckup,dashboardCheckup, setDashboardCheckup}}
            {...props}
        />
    )
}
