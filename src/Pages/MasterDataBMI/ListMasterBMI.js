import { Box, Grid, Button, Stack } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { KeyboardArrowDown } from '@mui/icons-material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';
import Typography14 from 'Component/Typography/Typography14';
import AppModalMedium from 'Component/Dialogs/AppModalMedium';
import Typography18 from 'Component/Typography/Typography18';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import Typography16 from 'Component/Typography/Typography16';
import QuillEditor from 'Component/TextEditors/QuillEditor';

import List_Master_BMI from 'Page-Sections/Data/DataMasterBMI';
import ColumnShape from 'Page-Sections/MasterDataBMI/column-shape';

// api & context
import API from 'Services/Api';
import { MasterBMIContext } from 'Context';

import React, { useContext, useEffect, useState } from 'react';
import Typography20 from 'Component/Typography/Typography20';

function ListMasterBMI() {
	// context
	const { dataMasterBMI, getMasterBMI } = useContext(MasterBMIContext);

	// state
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogDelete, setDialogDelete] = useState(false);
	const [formMin, setFormMin] = useState('');
	const [formMax, setFormMax] = useState('');
	const [formGroup, setFormGroup] = useState('');
	const [formCategory, setFormCategory] = useState('');
	const [dataRow, setDataRow] = useState(null);

	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');

	// handle
	const handleClose = () => {
		setOpenDialog(false);
	};
	const handleBack = () => {
		handleClose();
	};

	const resetForm = () => {
		setFormMin('');
		setFormMax('');
		setFormGroup('');
		setFormCategory('');
	};

	const handleSubmit = async e => {
		await setLoading(true);

		const result = await handleSave(e);
		if (result.statusText === 'OK') {
			setLoading(false);
			setOpenDialog(false);
			window.location.reload();
			console.log('Data BMI Berhasil!!');
			resetForm();
			setDataRow(null);
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	const handleSave = () => {
		const postData = {
			referenceMin: formMin,
			referenceMax: formMax,
			category: formCategory,
			group: formGroup,
		};

		if (dataRow !== null) {
			console.log('update data');
			return API.putBMI(dataRow._id, postData);
		} else {
			console.log('add data');
			return API.postBMI(postData);
		}
	};

	const handleEdit = row => {
		setOpenDialog(true);
		setDataRow(row);
		setFormMin(row?.referenceMin);
		setFormMax(row?.referenceMax);
		setFormGroup(row?.group);
		setFormCategory(row?.category);
	};

	const handleDelete = row => {
		setDialogDelete(true);
		setDataRow(row);
	};

	const handleSaveDelete = () => {
		API.deleteBMI(dataRow._id).then(res => {
			setDialogDelete(false);
			window.location.reload();
			setDataRow(null);
		});
	};

	useEffect(() => {
		getMasterBMI();
	}, []);

	// console.log('dataMasterBMI', dataMasterBMI)

	return (
		<Box sx={{ p: '30px' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} sx={{ mb: 0 }}>
					<HeaderV1
						title="BODY MASS INDEX"
						sub1="Home -"
						sub2="Medical -"
						sub3="Body Mass Index"
					/>
				</Grid>
				{/* <Grid
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
				</Grid> */}
				<Grid
					item
					xs={12}
					sm={12}
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
				<Grid item xs={12} sm={12}>
					<CustomNewTable
						data={dataMasterBMI}
						columnShape={ColumnShape({
							onEdit: handleEdit,
							onDelete: handleDelete,
						})}
					/>
				</Grid>
			</Grid>

			{/* Pop Up Add Pertanyaan */}
			<AppModalMedium open={openDialog} handleClose={handleClose}>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
					>
						<Typography18 title="FORM BODY MASS INDEX" fontWeight={700} />
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography14 title="BMI" fontWeight={600} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="BMI Minimum"
							sx={{ mt: '0px' }}
							type="number"
							value={formMin}
							onChange={e => setFormMin(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextField
							fullWidth
							size="small"
							label="BMI Maksimum"
							sx={{ mt: '0px' }}
							type="number"
							value={formMax}
							onChange={e => setFormMax(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography14 title="Kategori" fontWeight={600} />
					</Grid>
					<Grid item xs={12} sm={12}>
						<AppTextField
							fullWidth
							size="small"
							label=""
							sx={{ mt: '0px' }}
							value={formCategory}
							onChange={e => setFormCategory(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography14 title="Kelompok" fontWeight={600} />
					</Grid>
					<Grid item xs={12} sm={12}>
						<AppTextField
							fullWidth
							size="small"
							placeholder="Kurus, Normal, Gemuk"
							sx={{ mt: '0px' }}
							value={formGroup}
							onChange={e => setFormGroup(e.target.value)}
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
						<Button variant="contained" onClick={handleSubmit}>
							Simpan
						</Button>
					</Grid>
				</Grid>
			</AppModalMedium>

			{/* Pop Up Delete */}
			<AppModalMedium
				open={dialogDelete}
				handleClose={() => setDialogDelete(false)}
			>
				<Stack direction="row" spacing={2}>
					<Box
						sx={{
							backgroundColor: 'red',
							width: 80,
							height: 80,
							borderRadius: '50%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<DeleteForeverRoundedIcon sx={{ fontSize: 65, color: '#fff' }} />
					</Box>
					<Box sx={{ pt: 1 }}>
						<Typography20 title="Delete Data ?" fontWeight={700} />
						<Stack spacing={1} sx={{ pt: 1 }}>
							<Typography14 title="Anda akan kehilangan data Anda secara permanen." />
							<Typography14
								title={
									'-' +
									' ' +
									dataRow?.referenceMin +
									' - ' +
									dataRow?.referenceMax
								}
							/>
							<Typography14 title={'-' + ' ' + dataRow?.group} />
							<Typography14 title={'-' + ' ' + dataRow?.category} />
						</Stack>
					</Box>
				</Stack>
				<Stack
					direction="row"
					justifyContent="flex-end"
					spacing={2}
					sx={{ mt: 2 }}
				>
					<Button
						variant="outlined"
						color="inherit"
						onClick={() => setDialogDelete(false)}
					>
						Kembali
					</Button>
					<Button variant="contained" color="error" onClick={handleSaveDelete}>
						Hapus
					</Button>
				</Stack>
			</AppModalMedium>
		</Box>
	);
}

export default ListMasterBMI;
