import { Box, Button, Grid, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Typography18 from 'Component/Typography/Typography18';
import AppTextField from 'Component/input-fields/AppTextField';

import React from 'react';

function ScanManual() {
	const navigate = useNavigate();

	// handle
	const handleBack = () => {
		navigate(-1);
	};
	const handleSave = () => {
		navigate('/medical/pemeriksaanKesehatan/formInput');
	};

	return (
		<Stack direction="row" justifyContent="center">
			<Box
				sx={{
					width: '740px',
					height: '271px',
					backgroundColor: '#F9F9F9',
					borderRadius: '12px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 4,
				}}
			>
				<Typography18 title="Input Manual" fontWeight={700} color="#7E8299" />
				<AppTextField
					sx={{ width: '50%' }}
					label="Nomor Pemeriksaan"
					// value={codeItem}
					// onChange={e => setCodeItem(e.target.value)}
				/>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<Button variant="text" color="error" onClick={handleBack}>
						Batal
					</Button>
					<Button variant="contained" onClick={handleSave}>
						Simpan
					</Button>
				</Box>
			</Box>
		</Stack>
	);
}

export default ScanManual;
