import React, { useState } from 'react';

import { Box, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import ScanWebCam from 'Page-Sections/PemeriksaanHarian/ScanWebCam';
import ScanManual from 'Page-Sections/PemeriksaanHarian/ScanManual';

function ScanQR() {
	// useStase
	const [tab, setTab] = useState('1');

	// handle
	const tabChange = (_, value) => setTab(value);

	return (
		<Box sx={{ p: '30px' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<HeaderV1
						title="PEMERIKSAAN HARIAN"
						sub1="Home -"
						sub2="Medical -"
						sub4="Pemeriksaan Harian -"
						sub3="Scan QR Code"
						status="Aktif"
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
								<Tab disableRipple label="Scan QR Code" value="1" />
								<Tab disableRipple label="Input Manual" value="2" />
							</TabList>
						</Box>

						<TabPanel value="1">
							<ScanWebCam handleScanWebCam="" />
						</TabPanel>

						<TabPanel value="2">
							<ScanManual />
						</TabPanel>
					</TabContext>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ScanQR;
