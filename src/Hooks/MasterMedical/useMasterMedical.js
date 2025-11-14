import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useContext,
  } from "react";
import { CategoryMedicalContext, MasterMedicalContext } from "../../Context/index"
import usePagination from "@mui/material/usePagination";
import _ from "lodash";
import useQuery from "Utils/QueryParams";
import { useTheme } from "@emotion/react";
  
  export default function UseMasterMedical(props) {
    const { masterMedical,filterMasterMedical,getDetailMasterMedical,setFilterMasterMedical, setMasterMedical, getDataMasterMedical} = useContext(MasterMedicalContext)


    useEffect(()=>{
      getDataMasterMedical()
    },[])

    
  
    return {
      masterMedical,
      filterMasterMedical,
      setFilterMasterMedical,
      setMasterMedical
    };
  }
  