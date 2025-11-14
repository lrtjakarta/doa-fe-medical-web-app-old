import React, { useEffect, useState, useContext } from "react";

// icon
import {
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonBase,
  Stack,
  Pagination,
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Card,
} from "@mui/material";
import moment from "moment";

import usePagination from "@mui/material/usePagination";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { KeyboardArrowDown } from "@mui/icons-material";

import useStyles, { tableRowFirstStyle } from "./Styles";
import { useNavigate } from "react-router-dom";

// img

import Images from "Themes/Images";

// style
import {
  List,
  paperStyle,
  searchStyle,
  tableCellStyle,
  textJudulStyle,
  textPaperSatuStyle,
  textPaperStyle,
  tableCellStyleRight,
  tableCellStyleLeft,
  boxModalStyle,
} from "./Styles";
import UseMonthly from "Hooks/Monthly/useMonthly";
import format from "date-fns/format";
import { ProfileContext } from "Context";
import AppModalMedium from "Component/Dialogs/AppModalMedium";
import Typography18 from "Component/Typography/Typography18";
import AppTextField from "Component/input-fields/AppTextField";
import HeaderV1 from "Component/CustomHeader/HeaderV1";

// API & Context
import API from "Services/Api";
import { MasterBMIContext } from "Context";
import { MonthlyContext } from "Context";

const calculateBMI = (weight, height) => {
  return (weight / (height * height)).toFixed(2);
};

const calculateBMR = (weight, height, age) => {
  // Example BMR calculation using the Mifflin-St Jeor Equation for men
  return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2);
};

const calculateFat = (bmi, age) => {
  // Simple estimation, for real use cases you might need a more accurate method
  return (1.2 * bmi + 0.23 * age - 16.2).toFixed(2);
};

const calculateVFA = (bmi, age) => {
  // Example calculation, VFA calculation is usually more complex
  return (0.1 * bmi + 0.1 * age).toFixed(2);
};

export default function HomePages(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { items } = usePagination({
    count: 5,
  });

  // context
  const { dataMasterBMI, getMasterBMI } = useContext(MasterBMIContext);
  const { getDataProfile, profileData } = useContext(ProfileContext);
  const { getDataMonthly, monthly } = useContext(MonthlyContext);

  // state
  const [formDataStatus, setFormDataStatus] = useState(false);
  const [dataRow, setDataRow] = useState(null);
  const [msgAge, setMsgAge] = useState("");
  const [formData, setFormData] = useState({
    TB: "",
    BB: "",
    Age: null,
    // FAT: '',
    BMI: "",
    // BMR: '',
    // VFA: '',
  });
  const [formMonth, setFormMonth] = useState(new Date());
  const [formNote, setFormNote] = useState("");
  const [formFat, setFormFat] = useState("");
  const [formVfa, setFormVfa] = useState("");
  const [formBmr, setFormBmr] = useState("");
  const [notifMsg, setNotifMsg] = useState("");
  const [dataBulanan, setDataBulanan] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [typeData, setTypeData] = useState("");
  const [searchName, setSearchName] = useState("");

  // handle
  const resetForm = () => {
    setFormData({
      TB: "",
      BB: "",
      Age: null,
      // FAT: '',
      BMI: "",
      // BMR: '',
      // VFA: '',
    });
    setFormFat("");
    setFormVfa("");
    setFormBmr("");
    setFormNote("");
    setDataRow("");
  };
  const handleInput = (type, row) => {
    // console.log("data row", row);
    // return

    setTypeData(type);
    if (type === "Add") {
      let newData = {
        ...formData,
        Age: row?.birthday ? new Date(row?.birthday) : null,
      };
      setDataRow(row);
      setFormData(newData);
      setFormDataStatus(true);
      if (row?.birth?.date !== null) {
        hitungUmur(row?.birth?.date);
      } else {
        setMsgAge("Data Tanggal Lahir Anda tidak Ada, silahkan isi manual");
      }
    } else if (type === "Edit") {
      const birthday = row.birthday;
      const date = new Date(birthday.year, birthday.month - 1, birthday.day);
      const _dataRow = {
        TB: row.height,
        BB: row.weight,
        Age: new Date(date),
      };
      setFormData(_dataRow);
      setFormFat(row?.fat);
      setFormVfa(row?.vfa);
      setFormBmr(row?.bmr);
      setFormNote(row?.note);
      setDataRow(row);
      setFormDataStatus(true);
      // console.log(row);
    }
  };

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, Age: date });
  };

  const handleSearch = async () => {
    const filter = {
      monthly: new Date(formMonth).toISOString().slice(0, 7),
    };
    const filterName = {
      name: searchName,
    };
    const respon = await API.getMonthly({ params: filter });
    const responProfile = await API.getProfile({ params: filterName });

    // return
    if (respon.statusText === "OK") {
      if (responProfile.statusText === "OK") {
        console.log("Filter Nama Personal");
        fetchData(responProfile?.data?.data, respon.data);
      } else {
        console.log("Filter Awal");
        fetchData(profileData, respon.data);
      }
      setDataBulanan(respon.data);
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    const result = await handleSave(e);
    // return;
    if (result.statusText === "OK") {
      setFormDataStatus(false);
      window.location.reload();
      console.log("Data Pemeriksaan Bulanan Berhasil!!");
      resetForm();
    } else {
      setNotifMsg("Gagal!");
      console.log("Gagal!");
    }
  };

  const handleSave = () => {
    if (formData.Age === null || formData.TB === "" || formData.BB === "") {
      alert("Silahkan isi yang kosong");
      return;
    }
    const _profile = {
      id: dataRow?._id,
      name: dataRow?.name,
      idNumber: dataRow.idNumber,
      position: dataRow?.jobPosition.name,
      departement: dataRow?.departement.name,
      gender: dataRow?.gender,
    };

    const birthDate =
      formData.Age instanceof Date
        ? formData.Age
        : new Date(formData.Age.year, formData.Age.month - 1, formData.Age.day);

    const _year = moment(birthDate).format("yyyy");
    const _month = moment(birthDate).format("MM");
    const _daily = moment(birthDate).format("DD");

    const _dataBMI = dataMasterBMI.filter(
      (bmi) =>
        formData.BMI >= bmi.referenceMin && formData.BMI <= bmi.referenceMax
    );

    const _bulan = formMonth ? format(new Date(formMonth), "yyyy-MM") : null;

    const postData = {
      monthly: _bulan, // 2024-07
      profile: _profile,
      age: { year: _year, month: _month, day: _daily },
      height: formData.TB,
      weight: formData.BB,
      fat: formFat, //Number
      vfa: formVfa, //Number
      bmr: formBmr, //Number
      bmi: formData.BMI, //Number
      bmiReference: _dataBMI[0], //Mapping dari Master Data BMI,
      note: formNote,
      createBy: null,
    };

    // console.log("data Post", postData, dataRow.idMonthly);

    if (typeData === "Edit") {
      return API.putMonthly(dataRow.idMonthly, postData);
    } else {
      return API.postMonthly(postData);
    }
  };

  const hitungUmur = (tanggalLahirStr) => {
    if (!tanggalLahirStr) return null;

    const today = new Date();
    const birthDate = new Date(tanggalLahirStr);

    let umur = today.getFullYear() - birthDate.getFullYear();
    const bulan = today.getMonth() - birthDate.getMonth();

    if (bulan < 0 || (bulan === 0 && today.getDate() < birthDate.getDate())) {
      umur--;
    }

    return umur;
  };

  const hitungUmurFromObject = (ageObj) => {
    if (!ageObj || !ageObj.year || !ageObj.month || !ageObj.day) return null;

    // JS Date: bulan dimulai dari 0 (Januari = 0)
    const birthDate = new Date(ageObj.year, ageObj.month - 1, ageObj.day);
    const today = new Date();

    let umur = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      umur--;
    }

    return umur;
  };

  const fetchData = (profile, bulanan) => {
    try {
      const _mergedName = profile.map((item) => {
        const Monthly = bulanan.find(
          (petugas) => petugas.profile?.id === item._id
        );
        let umur = null;
        let birthProfile = item?.birth?.date;

        if (Monthly?.age) {
          const { year, month, day } = Monthly?.age || {};
          umur = hitungUmur(new Date(year, month - 1, day));
        } else {
          umur = hitungUmur(birthProfile);
        }

        const _status = Monthly ? "Ada" : "Tidak Ada";
        return {
          ...item,
          age: umur,
          idMonthly: Monthly?._id,
          birthday: Monthly?.age || birthProfile,
          height: Monthly?.height,
          weight: Monthly?.weight,
          fat: Monthly?.fat,
          vfa: Monthly?.vfa,
          bmr: Monthly?.bmr,
          bmi: Monthly?.bmi,
          bmiReference: Monthly?.bmiReference,
          note: Monthly?.note,
          status: _status,
        };
      });

      setMergedData(_mergedName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const date = new Date().toISOString().slice(0, 7);
    getDataProfile();
    getMasterBMI();
    getDataMonthly({ monthly: date });
  }, []);

  useEffect(() => {
    setDataBulanan(monthly);
    fetchData(profileData, monthly);
  }, [monthly, profileData]);

  useEffect(() => {
    if (formData.TB && formData.BB && formData.Age) {
      const height = parseFloat(formData.TB) / 100; // Convert cm to meters
      const weight = parseFloat(formData.BB);
      const age = calculateAge(formData.Age);

      if (!isNaN(height) && !isNaN(weight) && age >= 0) {
        const bmi = calculateBMI(weight, height);
        // const bmr = calculateBMR(weight, height, age);
        // const fat = calculateFat(bmi, age);
        // const vfa = calculateVFA(bmi, age);

        setFormData((prevValues) => ({
          ...prevValues,
          BMI: bmi !== prevValues.BMI ? bmi : prevValues.BMI,
          // BMR: bmr !== prevValues.BMR ? bmr : prevValues.BMR,
          // FAT: fat !== prevValues.FAT ? fat : prevValues.FAT,
          // VFA: vfa !== prevValues.VFA ? vfa : prevValues.VFA,
        }));
      }
    }
  }, [formData.TB, formData.BB, formData.Age]);

  return (
    <Box sx={{ p: "30px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <HeaderV1
            title="Daftar Tinggi & Berat Badan"
            sub1="Home -"
            sub2="Medical -"
            sub3="Daftar Tinggi & Berat Badan"
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <DatePicker
            label="Bulan Tahun"
            value={formMonth}
            onChange={(date) => setFormMonth(date)}
            slots={{
              textField: AppTextField,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
            sx={{ mt: "0px" }}
            // format="dd/MM/yyyy"
            views={["month", "year"]}
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <AppTextField
            fullWidth
            size="small"
            label=""
            placeholder="Nama Personal"
            sx={{ mt: "0px" }}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button variant="contained" onClick={handleSearch}>
            Cari
          </Button>
        </Grid>
      </Grid>

      <Card
        variant="outlined"
        sx={{
          minWidth: 275,
          bgcolor: "#f6f7ff",
          boxShadow: "none",
          border: "none",
          mt: 3,
        }}
      >
        <TableContainer
          sx={{
            padding: "10px",
          }}
        >
          <Table
            sx={{
              minWidth: 250,
              borderCollapse: "separate",
              borderSpacing: "0px 5px",
            }}
          >
            <TableHead>
              <TableRow
                className={classes.tableRowTxt}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  bgcolor: "#464748",
                  color: "#fff",
                  borderRadius: "10px",
                  pt: "10px",
                }}
              >
                <TableCell sx={tableCellStyleLeft}>
                  <p>No.</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="left">
                  <p>Nama Personal</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>Umur</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>Tinggi Badan</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>Berat Badan</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>FAT %</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>VFA</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>BMR</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>BMI</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>HASIL</p>
                </TableCell>
                <TableCell sx={tableCellStyle} align="center">
                  <p>Catatan</p>
                </TableCell>
                <TableCell
                  sx={tableCellStyleRight}
                  align="center"
                  style={{ width: 100 }}
                >
                  <p>Aksi</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                pt: "10px",
              }}
            >
              {mergedData.length > 0 ? (
                mergedData.map((x, idx) => {
                  return (
                    <TableRow
                      className={classes.tableRowTxt}
                      key={idx}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: "#fff",
                        pt: "10px",
                      }}
                    >
                      <TableCell
                        className={classes.tableLeftTxt}
                        component="th"
                        scope="row"
                      >
                        {idx + 1}
                      </TableCell>
                      <TableCell align="left">{x?.name || "-"}</TableCell>
                      <TableCell align="center">
                        {x?.age ? `${x?.age} th` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {x?.height ? `${x?.height} cm` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {x?.weight ? `${x?.weight} kg` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {x?.fat ? `${x?.fat} %` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {x?.vfa ? `${x?.vfa}` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {x?.bmr ? `${x?.bmr}` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {x?.bmi ? `${x?.bmi}` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {x?.bmiReference ? x?.bmiReference?.category : "-"}
                      </TableCell>
                      
                      <TableCell align="center">
                        {x?.note ? `${x?.note}` : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {/* <Button variant="contained" color="secondary" onClick={()=>deleteDataMonthly(x._id, value)}>Hapus</Button> */}
                        {x?.status === "Tidak Ada" ? (
                          <Button
                            variant="contained"
                            onClick={() => handleInput("Add", x)}
                          >
                            Input
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={() => handleInput("Edit", x)}
                          >
                            Edit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    style={tableRowFirstStyle}
                    component="th"
                    scope="row"
                    colSpan={9}
                  >
                    <Typography sx={{ fontSize: 20, textAlign: "center" }}>
                      Data Kosong
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Pop Up */}
      <AppModalMedium
        open={formDataStatus}
        onClose={() => setFormDataStatus(false)}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "center", mb: 3 }}
          >
            <Typography18 title="FORM PEMERIKSAAN" fontWeight={700} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextField
              fullWidth
              size="small"
              label="Nama Personal"
              sx={{ mt: "0px" }}
              value={dataRow?.name}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <DatePicker
              label="Tanggal Lahir"
              value={formData.Age}
              // disabled
              onChange={(date) => handleDateChange(date)}
              slots={{
                textField: AppTextField,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  helperText: msgAge,
                  InputLabelProps: {
                    required: true, // Menambahkan required agar label memiliki tanda (*)
                  },
                },
              }}
              sx={{ mt: "0px" }}
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextField
              required
              fullWidth
              size="small"
              label="Tinggi Badan"
              sx={{ mt: "0px" }}
              type="number"
              value={formData.TB}
              onChange={handleChange("TB")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextField
              required
              fullWidth
              size="small"
              label="Berat Badan"
              sx={{ mt: "0px" }}
              type="number"
              value={formData.BB}
              onChange={handleChange("BB")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextField
              fullWidth
              size="small"
              label="FAT%"
              sx={{ mt: "0px" }}
              type="number"
              value={formFat}
              onChange={(e) => setFormFat(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextField
              fullWidth
              size="small"
              label="VFA"
              sx={{ mt: "0px" }}
              type="number"
              value={formVfa}
              onChange={(e) => setFormVfa(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextField
              fullWidth
              size="small"
              label="BMR"
              sx={{ mt: "0px" }}
              type="number"
              value={formBmr}
              onChange={(e) => setFormBmr(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextField
              fullWidth
              size="small"
              label="BMI"
              sx={{ mt: "0px" }}
              type="number"
              value={formData.BMI}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextField
              fullWidth
              size="small"
              label="Catatan"
              sx={{ mt: "0px" }}
              value={formNote}
              onChange={(e) => setFormNote(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <Button
              variant="text"
              color="error"
              onClick={() => {
                setFormDataStatus(false);
                resetForm();
              }}
            >
              Kembali
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </AppModalMedium>
    </Box>
  );
}
