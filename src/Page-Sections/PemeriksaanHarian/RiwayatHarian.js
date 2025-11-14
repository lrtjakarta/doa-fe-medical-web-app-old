import { Box, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import Typography18 from 'Component/Typography/Typography18';
import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';

import ColumnShapeRiwayatKeseluruhan from './column-shape-riwayat-keseluruhan';

import List_Riwayat_Keseluruhan from 'Page-Sections/Data/DataRiwayatKeseluruhan';

import React from 'react';

function RiwayatHarian() {
	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Typography18
						title="Riwayat Pemeriksaan Keseluruhan"
						fontWeight={700}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					sx={{
						display: 'flex',
						gap: 1,
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<Box sx={{ width: '200px' }}>
						{' '}
						<DatePicker
							label="Tanggal"
							// value={startDate}
							// onChange={date => setStartDate(date)}
							slots={{
								textField: AppTextField,
							}}
							slotProps={{
								textField: {
									fullWidth: true,
									size: 'small',
								},
							}}
							sx={{ mt: '0px' }}
							format="dd/MM/yyyy"
						/>
					</Box>
					<Box sx={{ width: '200px' }}>
						<DatePicker
							label="Tanggal"
							// value={startDate}
							// onChange={date => setStartDate(date)}
							slots={{
								textField: AppTextField,
							}}
							slotProps={{
								textField: {
									fullWidth: true,
									size: 'small',
								},
							}}
							sx={{ mt: '0px' }}
							format="dd/MM/yyyy"
						/>
					</Box>
					<Box sx={{ width: '200px' }}>
						<SearchInput
							placeholder="Search..."
							// value={search}
							// onChange={e => setSearch(e.target.value)}
						/>
					</Box>

					<Button variant="contained">Cari</Button>
				</Grid>
				<Grid item xs={12} sm={12}>
					<CustomNewTable
						data={List_Riwayat_Keseluruhan}
						columnShape={ColumnShapeRiwayatKeseluruhan({ onView: '' })}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default RiwayatHarian;
