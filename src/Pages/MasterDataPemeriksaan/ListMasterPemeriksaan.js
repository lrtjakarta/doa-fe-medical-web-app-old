import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { KeyboardArrowDown } from '@mui/icons-material';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';
import Typography14 from 'Component/Typography/Typography14';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import AppModalMedium from 'Component/Dialogs/AppModalMedium';
import Typography18 from 'Component/Typography/Typography18';
import Typography16 from 'Component/Typography/Typography16';

import List_Master_Pemeriksaan from 'Page-Sections/Data/DataMasterPemeriksaan';
import ColumnShape from 'Page-Sections/MasterDataPemeriksaan/column-shape';

import { MasterMedicalContext } from 'Context';
import { useContext } from 'react';

function ListMasterPemeriksaan() {
	// usecontext
	const { masterMedical, getDataMasterMedical } =
		useContext(MasterMedicalContext);

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

	useEffect(() => {
		getDataMasterMedical();
	}, []);

	console.log('masterMedical', masterMedical);

	return (
		<Box sx={{ p: '30px' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
					<HeaderV1
						title="MASTER PEMERIKSAAN"
						sub1="Home -"
						sub2="Admin -"
						sub4="Medical -"
						sub3="List Master Pemeriksaan"
						status="Aktif"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={9}
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
					}}
				>
					<Box sx={{ width: '200px' }}>
						{' '}
						<AppTextField
							select
							fullWidth
							size="small"
							label="Status"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ m: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						>
							<option value=""></option>
						</AppTextField>
					</Box>
					<Box sx={{ width: '200px' }}>
						<SearchInput
							placeholder="Search..."
							// value={search}
							// onChange={e => setSearch(e.target.value)}
						/>
					</Box>

					<Typography14 title="Showing 5 items" color=" #A1A5B7" />
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<Button
						variant="contained"
						startIcon={<AddOutlinedIcon />}
						onClick={() => setOpenDialog(true)}
					>
						Tambah
					</Button>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
					<CustomNewTable
						data={List_Master_Pemeriksaan}
						columnShape={ColumnShape({
							onEdit: '',
							onDelete: '',
						})}
					/>
				</Grid>
			</Grid>

			{/* Pop Up Add Petanyaan */}
			<AppModalMedium open={openDialog} handleClose={handleClose}>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<Typography18 title="TAMBAH PERTANYAAN" fontWeight={700} />
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography16 title="DETAIL PERTANYAAN" fontWeight={700} />
					</Grid>
					<Grid item xs={12} sm={12}>
						<AppTextField
							fullWidth
							size="small"
							label="Pertanyaan"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							select
							fullWidth
							size="small"
							label="Kategori"
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
							label="Tipe Jawaban"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<AppTextField
							fullWidth
							size="small"
							label="Unit"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
						<Typography16 title="REFERENSI (MIN / MAX)" fontWeight={700} />
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						<Typography14 title="Masukkan referensi Min / Max" />
					</Grid>
					<Grid item xs={12} sm={4}>
						<AppTextField
							fullWidth
							size="small"
							label="Min"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<AppTextField
							fullWidth
							size="small"
							label="Max"
							sx={{ mt: '0px' }}
							// value={stasiunById}
							// onChange={e => setStasiunById(e.target.value)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}
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

export default ListMasterPemeriksaan;
