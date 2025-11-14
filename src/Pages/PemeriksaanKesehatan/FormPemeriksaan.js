import { Box, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import BoxLabel from 'Component/Cards/BoxLabel';
import BoxProfil from 'Component/Cards/BoxProfil';
import HeaderV1 from 'Component/CustomHeader/HeaderV1';

import React, { useState } from 'react';
import FormHarian from 'Page-Sections/PemeriksaanHarian/FormHarian';
import RiwayatHarian from 'Page-Sections/PemeriksaanHarian/RiwayatHarian';

function FormPemeriksaan() {
	// useStase
	const [tab, setTab] = useState('1');

	// handle
	const tabChange = (_, value) => setTab(value);

	return (
		<Box sx={{ p: '30px' }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<HeaderV1
						title="PEMERIKSAAN HARIAN"
						sub1="Home -"
						sub2="Medical -"
						sub3="Form Pemeriksaan Harian"
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ my: '20px' }}>
					<BoxProfil />
				</Grid>
				<Grid item xs={12} sm={3}>
					<BoxLabel
						titleInfo="Total Pemeriksaan"
						icon={<FavoriteBorderOutlinedIcon sx={{ color: '#50CD89' }} />}
						titleNumber="999"
						colorNumber="#50CD89"
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<BoxLabel
						titleInfo="Belum Diperiksa"
						icon={<CancelOutlinedIcon sx={{ color: '#ED1C24' }} />}
						titleNumber="999"
						colorNumber="#ED1C24"
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<BoxLabel
						titleInfo="Retake"
						icon={<AutorenewOutlinedIcon sx={{ color: '#F6C000' }} />}
						titleNumber="999"
						colorNumber="#F6C000"
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<BoxLabel
						titleInfo="Timer Retake"
						icon={<TimerOutlinedIcon sx={{ color: '#3E97FF' }} />}
						titleNumber="999"
						colorNumber="#3E97FF"
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<TabContext value={tab}>
						<Box
							sx={{
								paddingTop: 1,
								paddingLeft: 2,
								'& .MuiTab-root': {
									fontSize: 12,
									fontWeight: 600,
								},
							}}
						>
							<TabList
								onChange={tabChange}
								textColor="#3F4254"
								indicatorColor="primary"
							>
								<Tab disableRipple label="Form Pemeriksaan Harian" value="1" />
								<Tab disableRipple label="Riwayat Harian" value="2" />
							</TabList>
						</Box>

						<TabPanel value="1">
							<FormHarian />
						</TabPanel>

						<TabPanel value="2">
							<RiwayatHarian />
						</TabPanel>
					</TabContext>
				</Grid>
			</Grid>
		</Box>
	);
}

export default FormPemeriksaan;
