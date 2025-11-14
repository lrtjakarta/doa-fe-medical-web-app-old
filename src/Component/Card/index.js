import { Avatar, Card, Container, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";

import useStyles from "./Styles";
// import logo

// import style
import StaticVar from "Config/StaticVar";
import useProfile from "Hooks/Profile/useProfile";
import useQuery from "Utils/QueryParams";

// data 1

export default function ComponentCard(props) {
  let query = useQuery();
  const nik = query.get("nik");
  const classes = useStyles();

  const { detailProfile, getDetailProfile } = useProfile();
  React.useEffect(() => {
    getDetailProfile(nik);
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        <Typography sx={{ color: "#000", fontSize: 16, mb: 2 }}>
          Biodata
        </Typography>
        <Card
          style={{
            width: "100%",
            padding: 30,
            height: { xs: 300, md: 220 },
            backgroundColor: "#fff",
          }}
        >
          <Grid container>
            <Grid item xs={3} sm={3} md={2} sx={{ mt: 2 }}>
              <Avatar
                src={`${StaticVar.URL_API + "/upload/" + detailProfile.photo}`}
                sx={{
                  ml: { xs: 5, md: 2 },
                  width: { xs: 60, sm: 100, md: 150 },
                  height: { xs: 60, sm: 100, md: 150 },
                }}
              />
            </Grid>
            <Grid item xs={10} sm={10} md={10}>
              <Grid container>
                <Grid item xs={6} sm={6} md={3}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Nama
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.name}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Jenis Kelamin
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.gender}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Tempat Lahir
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.birthPlace}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} md={3} sx={{ mt: { xs: 2, md: 0 } }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Tanggal Lahir
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {dayjs(detailProfile?.birthDate).format("DD-MM-YYYY")}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} md={3} sx={{ mt: { xs: 2, md: 0 } }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Nomor Telepon
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.phone}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Email
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.email}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    NIK
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.idNumber}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Divisi
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.division?.name}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Department
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.departement?.name}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Nomor Sertifikat
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.license}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} md={3} sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                    Alamat
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {detailProfile?.address ? detailProfile?.address : "-"}
                  </Typography>
                </Grid>

                {props?.duration ? (
                  <Grid item xs={6} sm={6} md={3} sx={{ mt: 2 }}>
                    <Typography sx={{ color: "#A2A2A2", fontSize: 14 }}>
                      Durasi Pemeriksaan
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {props?.duration}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
