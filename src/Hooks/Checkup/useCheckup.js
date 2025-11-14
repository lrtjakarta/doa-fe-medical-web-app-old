import {
  CheckupContext,
  MasterMedicalContext,
  MedicalRecordContext,
} from "Context";
import UseMonthly from "Hooks/Monthly/useMonthly";
import moment from "moment";
import { useContext, useState } from "react";
import { decodeToken } from "react-jwt";
import useQuery from "Utils/QueryParams";

export default function UseCheckup(props) {
  let query = useQuery();
  const nik = query.get("nik");
  const id = query.get("id");

  // token
  const decodedToken = decodeToken(localStorage.getItem("access_token"));

  const {
    checkup,
    filterCheckup,
    getDataCheckup,
    postDataCheckup,
    putDataCheckup,
    getHistoryDataCheckup,
    historycheckup,
    dataBefore,
  } = useContext(CheckupContext);
  const { masterMedical, getDataMasterMedical } =
    useContext(MasterMedicalContext);
  const { medicalRecord, getDataMedicalRecord } =
    useContext(MedicalRecordContext);

  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ];

  const [dailyWorkTrainDriver, setDailyWorkTrainDriver] = useState({});
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [titleDialog, setTitleDialog] = useState(null);
  const [contentDialog, setContentDialog] = useState(null);
  const [valueOkDialog, setValueOkDialog] = useState("");
  const [valueSubmitDialog, setValueSubmitDialog] = useState(false);
  const [valueCancelDialog, setValueCancelDialog] = useState("");
  const [typeDialog, setTypeDialog] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formCheckup, setFormCheckup] = useState([]);
  const [skipped, setSkipped] = useState(new Set());

  const [openDialog, setOpenDialog] = useState(false);
  const [timesleep, setTimeSleep] = useState("");
  const [timewakeup, setTimeWakeUp] = useState("");

  const { fetchDetailMonthlyTrainDriver, detailMonthly } = UseMonthly();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getLoadMedical = async (id) => {
    const resultCheckup = await getDataCheckup(id);
    // if(resultCheckup.status){
    //   setFormCheckup(resultCheckup.mrData)
    //   setCheckRetake(true);
    // }
    // else{
    //   const resultCheckup = await getDataMasterMedical()
    //   console.log("resultCheckup",resultCheckup)
    //   setFormCheckup(resultCheckup)
    //   setCheckRetake(false);
    // }
    // console.log('resultCheckup', resultCheckup);
    const dataMonthly = await fetchDetailMonthlyTrainDriver(
      resultCheckup?.trainDriver?._id,
      moment().format("YYYY-MM")
    );

    let dataLoad = resultCheckup.mrData.map((itemMr) => {
      let _dataDetail = itemMr.dataDetails.map((itemDetail) => {
        if (itemDetail._id === "62b82011965312546dc4fbc5") {
          return {
            ...itemDetail,
            answer: { value: dataMonthly ? Number(dataMonthly?.weight) : 0 },
          };
        } else if (itemDetail._id === "62b82011965312546dc4fbc6") {
          return {
            ...itemDetail,
            answer: { value: dataMonthly ? Number(dataMonthly?.height) : 0 },
          };
        } else {
          return itemDetail;
        }
      });
      return { ...itemMr, dataDetails: _dataDetail };
    });
    setFormCheckup(dataLoad);
  };

  const handleRetake = async (data) => {
    let sendData = {};
    if (data.medicalCheckup?.status === "4") {
      sendData = { ...sendData, checkup1At: new Date() };
    } else {
      sendData = { ...sendData, checkup2At: new Date() };
    }

    return putDataCheckup(sendData, data.medicalCheckup?._id);
  };

  const handleSubmit = (data) => {
    let sendData = {
      note,
      status,
      mrData: formCheckup,
      soap: data?.soap,
    };
    let _history = [];
    if (status !== "0") {
      const { history, ...dataBeforeWithoutHistory } = dataBefore || {};

      if (dataBefore?.history?.length > 0) {
        _history = [...dataBefore.history, dataBeforeWithoutHistory];
      } else {
        _history = [dataBeforeWithoutHistory];
      }

      sendData = {
        ...sendData,
        history: _history,
      };
    }

    if (status === "1" || status === "2" || status === "3") {
      sendData = {
        ...sendData,
        status,
        finishAt: new Date(),
      };
    } else {
      if (data.checkButton && status === "4") {
        sendData = { ...sendData, status: "5", retake2At: new Date() };
      } else {
        sendData = { ...sendData, status, retake1At: new Date() };
      }
    }

    return putDataCheckup(sendData, id);
  };

  const handleCheckup = async (detailProfile, dailySchedule) => {
    const profile = decodedToken;
    // console.log('profile', profile);
    const resultMasterMedical = await getDataMasterMedical();
    // console.log('resultMasterMedical', resultMasterMedical);
    let sendData = {
      profile: detailProfile,
      dailyWorkOrder: dailySchedule,
      status: "0",
      mrData: resultMasterMedical,
      createBy: {
        _id: profile.id,
        name: profile.name,
        idNumber: profile.idNumber,
        // phone:profile.phone,
        // qrcode:profile.qrcode,
        // photo:profile.photo,
        // user:profile.user
      },
      createdAt: moment().format("YYYY-MM-DD"),
    };
    console.log("senddata handleCheckup", sendData);
    return postDataCheckup(sendData);
  };

  // filter records by search text
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return {
    titleDialog,
    setTitleDialog,
    openDialog,
    setOpenDialog,
    contentDialog,
    setContentDialog,
    valueOkDialog,
    setValueOkDialog,
    typeDialog,
    setTypeDialog,
    valueCancelDialog,
    setValueCancelDialog,
    valueSubmitDialog,
    setValueSubmitDialog,
    handleCloseDialog,
    handleSubmit,
    handleCheckup,
    filterCheckup,
    checkup,
    formCheckup,
    getDataCheckup,
    setFormCheckup,
    getLoadMedical,
    setDailyWorkTrainDriver,
    setNote,
    activeStep,
    setActiveStep,
    getDataMedicalRecord,
    setStatus,
    completed,
    setCompleted,
    status,
    steps,
    handleRetake,
    isStepOptional,
    isStepSkipped,
    handleNext,
    handleBack,
    handleSkip,

    timesleep,
    setTimeSleep,
    timewakeup,
    setTimeWakeUp,

    getHistoryDataCheckup,
    historycheckup,
  };
}
