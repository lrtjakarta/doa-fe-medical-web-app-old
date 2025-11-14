import React, { useContext, createContext, useState } from "react";
import Api from "../Services/Api";
import moment from "moment";

export const MedicalRecordContext = createContext({});

export default function MedicalRecordProvider(props) {
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [medicalRecordPersonal, setMedicalRecordPersonal] = useState([]);
  const [filterMedicalRecord, setFilterMedicalRecord] = useState([]);
  const [detailMedicalRecord, setDetailMedicalRecord] = useState({});

  const getDataMedicalRecord = async (query) => {
    console.log("query getDataMedicalRecord", query, query.querySend);
    //if(medicalRecord.length === 0){
    return Api.getCheckup({ params: query })
      .then(async (resdata) => {
        const result = resdata?.data.map((item) => {
          item.medicalCheckup = {
            updatedAt: item.updatedAt,
            createdAt: item.createdAt,
            status: item.status,
            changeData: item.changeData,
            changeDate: item.changeDate,
          };
          item.niktraindriver = item.profile?.idNumber;
          item.nametraindriver = item.profile?.name;
          item.trainDriverStatus = item.trainDriver?.trainDriverStatus;
          return item;
        });
        setMedicalRecord(result);
        setFilterMedicalRecord(result);
        return result;
      })
      .catch((err) => console.log("error", err));

    // }
    // else{
    //   return medicalRecord
    // }
  };

  const getDataMedicalRecordPersonal = async (nik) => {
    console.log("query getDataMedicalRecordPersonal", nik);
    //if(medicalRecord.length === 0){
    return Api.getCheckup({ params: { nik } })
      .then(async (resdata) => {
        const result = resdata?.data.map((item) => {
          item.medicalCheckup = {
            updatedAt: item.updatedAt,
            createdAt: item.createdAt,
            status: item.status,
            changeData: item.changeData,
            changeDate: item.changeDate,
          };
          item.niktraindriver = item.trainDriver?.nik;
          item.nametraindriver = item.trainDriver?.name;
          item.trainDriverStatus = item.trainDriver?.trainDriverStatus;
          return item;
        });
        setMedicalRecordPersonal(result);
        return result;
      })
      .catch((err) => console.log("error", err));

    // }
    // else{
    //   return medicalRecord
    // }
  };

  const getDetailMedicalRecord = async (nik) => {
    return Api.getCheckup({
      params: { nik, createdAt: moment().format("YYYY-MM-DD") },
    })
      .then((res) => {
        if (res.data.length > 0) {
          setMedicalRecord(res.data);
          setFilterMedicalRecord(res.data);
          return { ...res.data };
        }
        // return {}
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <MedicalRecordContext.Provider
      value={{
        getDataMedicalRecordPersonal,
        medicalRecordPersonal,
        getDataMedicalRecord,
        getDetailMedicalRecord,
        medicalRecord,
        setMedicalRecord,
        setFilterMedicalRecord,
        filterMedicalRecord,
        setDetailMedicalRecord,
        detailMedicalRecord,
      }}
      {...props}
    />
  );
}
