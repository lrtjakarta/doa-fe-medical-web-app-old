import { Box, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { KeyboardArrowDown } from '@mui/icons-material';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography16 from 'Component/Typography/Typography16';
import SearchInput from 'Component/input-fields/SearchInput';
import Typography14 from 'Component/Typography/Typography14';
import AppTextField from 'Component/input-fields/AppTextField';

import React, { useState } from 'react';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import List_Pemeriksaan_BMI from 'Page-Sections/Data/DataPemeriksaanBMI';
import ColumnShape from 'Page-Sections/PemeriksaanBMI/column-shape';
import AppModalMedium from 'Component/Dialogs/AppModalMedium';
import Typography18 from 'Component/Typography/Typography18';

function ListPemeriksaanBMI() {
	// state
	const [openDialog, setOpenDialog] = useState(false);

	// handle
	const handleClose = () => {
		setOpenDialog(false);
	};
	const handleBack = () => {
		handleClose();
	};
	const handleSave = () => {};

	return (
		<Box sx={{ p: '30px' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
					<HeaderV1
						title="PEMERIKSAAN BULANAN"
						sub1="Home -"
						sub2="Medical -"
						sub3="Pemeriksaan Bulanan"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Typography16 title="Daftar Pemeriksaan Terbaru" fontWeight={500} />
				</Grid>
				<Grid
					item
					xs={12}
					sm={9}
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 2,
						alignItems: 'center',
					}}
				>
					<Typography14 title="Filter Bulan" />
					<Box sx={{ width: '200px' }}>
						<DatePicker
							label="Tgl Ditemukan"
							// value={foundDate}
							// onChange={date => setFoundDate(date)}
							slots={{
								textField: AppTextField,
							}}
							format="dd/MM/yyyy"
							slotProps={{
								textField: {
									fullWidth: true,
								},
							}}
							sx={{ m: '0px' }}
						/>
					</Box>
					<Box sx={{ width: '200px' }}>
						<SearchInput
							placeholder="Search..."
							// value={search}
							// onChange={e => setSearch(e.target.value)}
						/>
					</Box>
					<Button variant="contained" sx={{ backgroundColor: '#50CD89' }}>
						EXPORT EXCEL
					</Button>
					<Button
						variant="contained"
						startIcon={<AddOutlinedIcon />}
						onClick={() => setOpenDialog(true)}
					>
						Tambah
					</Button>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
					<CustomNewTable
						data={List_Pemeriksaan_BMI}
						columnShape={ColumnShape()}
					/>
				</Grid>
			</Grid>

			{/* Pop Up Add BMI */}
			<AppModalMedium open={openDialog} handleClose={handleClose}>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
					>
						<Typography18 title="TAMBAH PEMERIKSAAN" fontWeight={700} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							select
							fullWidth
							size="small"
							label="Nama"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						>
							<option value=""></option>
						</AppTextField>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="Umur"
							type="number"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="Tinggi Badan"
							type="number"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="Berat Badan"
							type="number"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="FAT%"
							type="number"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="VFA"
							type="number"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="BMR"
							type="number"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="BMI"
							type="number"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{
							mt: 3,
							display: 'flex',
							gap: 2,
							justifyContent: 'flex-end',
						}}
					>
						<Button variant="text" color="error" onClick={handleBack}>
							Kembali
						</Button>
						<Button variant="contained" onClick={handleSave}>
							Simpan
						</Button>
					</Grid>
				</Grid>
			</AppModalMedium>
		</Box>
	);
}

export default ListPemeriksaanBMI;
