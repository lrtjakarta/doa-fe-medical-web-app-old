import { Box, Grid } from '@mui/material';

import QrReader from 'react-qr-scanner';

import Typography18 from 'Component/Typography/Typography18';

import React from 'react';

function ScanWebCam({ handleScanWebCam }) {
	// handle
	const handleErrorWebCam = error => {
		console.log(error);
	};

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<Typography18
						title="Scan QR Code Pemeriksaan"
						fontWeight={700}
						color="#7E8299"
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<QrReader
						delay={300}
						style={{ width: '100%', height: 300 }}
						onError={handleErrorWebCam}
						onScan={handleScanWebCam}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ScanWebCam;
