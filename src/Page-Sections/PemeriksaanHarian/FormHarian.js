import {
	Box,
	Grid,
	TableRow,
	TableCell,
	styled,
	IconButton,
	Button,
	Stack,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { KeyboardArrowDown } from '@mui/icons-material';

import CustomTableHeader from 'Component/CustomTable/CustomTableHeader';
import Typography14 from 'Component/Typography/Typography14';
import Typography16 from 'Component/Typography/Typography16';
import Typography18 from 'Component/Typography/Typography18';
import AppTextField from 'Component/input-fields/AppTextField';
import Typography12 from 'Component/Typography/Typography12';
import AppModalMedium from 'Component/Dialogs/AppModalMedium';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';

import List_Pemeriksaan from 'Page-Sections/Data/DataPemeriksaan';
import List_Riwayat from 'Page-Sections/Data/DataRiwayat';

import ColumnShapeRiwayat from './column-shape-riwayat';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuillEditor from 'Component/TextEditors/QuillEditor';

const BodyTableCell = styled(TableCell)(() => ({
	fontSize: 12,
	fontWeight: 600,
	'&:last-of-type': {
		textAlign: 'center',
	},
}));

function FormHarian() {
	const navigate = useNavigate();
	// state
	const [dataHHeader, setDataHeader] = useState([
		'No',
		'Pemeriksaan',
		'Hasil',
		'Catatan',
		'Rekam Medis',
	]);
	const [dataBody, setDataBody] = useState(List_Pemeriksaan);
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogStatus, setDialogStatus] = useState(false);
	const [styleStatus, setStyleStatus] = useState(null);
	const [formStatus, setFormStatus] = useState('');
	const [formStatusBefore, setFormStatusBefore] = useState('');

	// handle
	const handleClose = () => {
		setOpenDialog(false);
	};
	const handleCloseStatus = () => {
		setDialogStatus(false);
	};
	const handleOpenStatus = () => {
		setDialogStatus(true);
		const getStatusStyles = status => {
			switch (status) {
				case 'Fit to Work':
					return { backgroundColor: '#E8FFF3', color: '#50CD89' };
				case 'Fit to Work with Note':
					return { backgroundColor: '#FFF8DD', color: '#F6C000' };
				case 'Unfit to Work':
					return { backgroundColor: '#FFF5F8', color: '#ED1C24' };
				case 'Retake':
					return { backgroundColor: '#E8FFF3', color: '#3E97FF' };
				default:
					return null; // Mengembalikan null jika status tidak ditemukan
			}
		};

		// Mendapatkan gaya berdasarkan status
		const _statusStyles = getStatusStyles(formStatus);
		setStyleStatus(_statusStyles);
	};
	const handleBack = () => {
		navigate('/medical/pemeriksaanKesehatan');
	};
	const handleSave = () => {
		handleOpenStatus();
	};
	const handleSubmit = () => {};

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid
					item
					xs={12}
					sm={12}
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<Box>
						<Typography18
							title="Durasi Pemeriksaan: 00:00:08"
							fontWeight={700}
						/>
						<Typography18
							title="Waktu Pemeriksaan: 11:19:18 WIB"
							fontWeight={700}
						/>
						<Typography18
							title="Status Pemeriksaan: Sedang Diperiksa"
							fontWeight={700}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}
					>
						<Typography16 title="Tanggal dan Waktu Pemeriksaan" />
						<Typography16 title="06-03-2024 11:11 WIB" fontWeight={700} />
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ my: 2 }}>
					<CustomTableHeader
						tableCellHeader={dataHHeader}
						tebleBodyConten={
							<>
								{dataBody.length > 0
									? dataBody.map(item => {
											const getStatusStyles = (status, name) => {
												switch (status) {
													case 'Kg':
														return {
															text: 'Kg',
														};
													case 'Cm':
														return {
															text: 'Cm',
														};
													case 'Mmhg':
														switch (name) {
															case 'Tekanan arah (Sistolik)':
																return {
																	text: 'Mmhg',
																	ket: 'Range: 90-140',
																	name: 'Tekanan arah (Sistolik)',
																};
															case 'Tekanan arah (Diastolik)':
																return {
																	text: 'Mmhg',
																	ket: 'Range: 60-100',
																	name: 'Tekanan arah (Diastolik)',
																};
															default:
																return null; // Mengembalikan null jika status tidak ditemukan
														}
													case 'x/Menit':
														return {
															text: 'x/Menit',
														};
													case 'C':
														return {
															text: 'C',
															ket: 'Range: 34-37.5',
														};
													case '%':
														return {
															text: '%',
															ket: 'Range: 90-100',
														};
													case 'mg/dL':
														return {
															text: 'mg/dL',
															ket: 'Range: 0-200',
														};
													case '':
														switch (name) {
															case 'Kesadaran':
																return {
																	name: 'Kesadaran',
																	label1: 'Baik',
																	label2: 'Tidak Baik',
																};
															case 'Adakah pemeriksaan fisik yang mengganggu dinasan?':
																return {
																	name: 'Adakah pemeriksaan fisik yang mengganggu dinasan?',
																	label1: 'Ya',
																	label2: 'Tidak',
																};
															case 'Pemeriksaan Lapang Pandang':
																return {
																	name: 'Pemeriksaan Lapang Pandang',
																	label1: 'Negatif',
																	label2: 'Menyempit',
																};
															case 'Pemeriksaan Keseimbangan':
																return {
																	name: 'Pemeriksaan Keseimbangan',
																	label1: 'Negatif',
																	label2: 'Positif',
																};
															case 'Pemeriksaan Keseimbangan':
																return {
																	name: 'Pemeriksaan Keseimbangan',
																	label1: 'Negatif',
																	label2: 'Positif',
																	label3: 'Tidak diperiksa',
																};
															default:
																return null; // Mengembalikan null jika status tidak ditemukan
														}
													default:
														return null; // Mengembalikan null jika status tidak ditemukan
												}
											};
											const statusStyles = getStatusStyles(
												item.Hasil,
												item.pemeriksaan
											);
											console.log('data status', statusStyles);
											return (
												<TableRow>
													<BodyTableCell>
														<Typography14 title={item.no} />
													</BodyTableCell>
													<BodyTableCell>
														<Typography14 title={item.pemeriksaan} />
													</BodyTableCell>
													<BodyTableCell sx={{ width: '100px' }}>
														{item.Hasil !== '' ? (
															<>
																<Box
																	sx={{
																		display: 'flex',
																		gap: 1,
																		alignItems: 'center',
																	}}
																>
																	<AppTextField
																		size="small"
																		sx={{ mt: '0px' }}
																		// value={stasiunById}
																		// onChange={e => setStasiunById(e.target.value)}
																	/>
																	<Typography14
																		title={
																			statusStyles ? statusStyles.text : ''
																		}
																	/>
																</Box>
																{statusStyles.text === 'Mmhg' &&
																statusStyles.name ===
																	'Tekanan arah (Sistolik)' ? (
																	<Typography12
																		title={statusStyles ? statusStyles.ket : ''}
																	/>
																) : statusStyles.text === 'Mmhg' &&
																  statusStyles.name ===
																		'Tekanan arah (Diastolik)' ? (
																	<Typography12
																		title={statusStyles ? statusStyles.ket : ''}
																	/>
																) : statusStyles.text === 'C' ? (
																	<Typography12
																		title={statusStyles ? statusStyles.ket : ''}
																	/>
																) : statusStyles.text === '%' ? (
																	<Typography12
																		title={statusStyles ? statusStyles.ket : ''}
																	/>
																) : statusStyles.text === 'mg/dL' ? (
																	<Typography12
																		title={statusStyles ? statusStyles.ket : ''}
																	/>
																) : null}
															</>
														) : (
															<Box>
																<RadioGroup
																// value={value}
																// onChange={handleChange}
																>
																	{statusStyles.name === 'Kesadaran' ? (
																		<>
																			<FormControlLabel
																				value={statusStyles.label1}
																				control={<Radio />}
																				label={statusStyles.label1}
																			/>
																			<FormControlLabel
																				value={statusStyles.label2}
																				control={<Radio />}
																				label={statusStyles.label2}
																			/>
																		</>
																	) : statusStyles.name ===
																	  'Adakah pemeriksaan fisik yang mengganggu dinasan?' ? (
																		<>
																			<FormControlLabel
																				value={statusStyles.label1}
																				control={<Radio />}
																				label={statusStyles.label1}
																			/>
																			<FormControlLabel
																				value={statusStyles.label2}
																				control={<Radio />}
																				label={statusStyles.label2}
																			/>
																		</>
																	) : statusStyles.name ===
																	  'Pemeriksaan Lapang Pandang' ? (
																		<>
																			<FormControlLabel
																				value={statusStyles.label1}
																				control={<Radio />}
																				label={statusStyles.label1}
																			/>
																			<FormControlLabel
																				value={statusStyles.label2}
																				control={<Radio />}
																				label={statusStyles.label2}
																			/>
																		</>
																	) : statusStyles.name ===
																	  'Pemeriksaan Keseimbangan' ? (
																		<>
																			<FormControlLabel
																				value={statusStyles.label1}
																				control={<Radio />}
																				label={statusStyles.label1}
																			/>
																			<FormControlLabel
																				value={statusStyles.label2}
																				control={<Radio />}
																				label={statusStyles.label2}
																			/>
																		</>
																	) : null}
																</RadioGroup>
															</Box>
														)}
													</BodyTableCell>
													<BodyTableCell>
														<AppTextField
															fullWidth
															size="small"
															label="catatan"
															sx={{ mt: '0px' }}
															// value={stasiunById}
															// onChange={e => setStasiunById(e.target.value)}
														/>
													</BodyTableCell>
													<BodyTableCell>
														<IconButton onClick={() => setOpenDialog(true)}>
															<VisibilityOutlinedIcon
																sx={{ color: '#3E97FF' }}
															/>
														</IconButton>
													</BodyTableCell>
												</TableRow>
											);
									  })
									: null}
							</>
						}
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mb: 2 }}>
					<Typography18
						title="BERDASARKAN PEMERIKSAAN DIATAS, YANG BERSANGKUTAN DINYATAKAN"
						fontWeight={700}
					/>
				</Grid>
				<Grid item xs={12} sm={12} sx={{ display: 'flex', gap: 2 }}>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Typography18 title="Status Fit" fontWeight={600} />
						<AppTextField
							select
							// fullWidth
							size="small"
							label="Status"
							SelectProps={{
								native: true,
								IconComponent: KeyboardArrowDown,
							}}
							sx={{ mt: '0px' }}
							value={formStatus}
							onChange={e => setFormStatus(e.target.value)}
						>
							<option value=""></option>
							<option value="Fit to Work">Fit to Work</option>
							<option value="Fit to Work with Note">
								Fit to Work with Note
							</option>
							<option value="Unfit to Work">Unfit to Work</option>
						</AppTextField>
					</Box>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Typography18 title="Status Fit saat ini" fontWeight={600} />
						<AppTextField
							// fullWidth
							size="small"
							label=""
							sx={{ mt: '0px' }}
							value={formStatusBefore}
							onChange={e => setFormStatusBefore(e.target.value)}
						/>
					</Box>
				</Grid>
				{formStatus === 'Unfit to Work' ||
				formStatus === 'Fit to Work with Note' ? (
					<>
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<AppTextField
								fullWidth
								size="small"
								label="Anamnesia"
								sx={{ mt: '0px', mb: 2 }}
								// value={stasiunById}
								// onChange={e => setStasiunById(e.target.value)}
							/>
							<Typography16 title="Pemeriksaan Fisik" fontWeight={700} />
							<QuillEditor />
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 3 }}>
							<AppTextField
								fullWidth
								size="small"
								label="Diagnosis"
								sx={{ mt: '0px', mb: 2 }}
								// value={stasiunById}
								// onChange={e => setStasiunById(e.target.value)}
							/>
							<Typography16
								title="Farmakologi/Non Farmakologi"
								fontWeight={700}
							/>
							<QuillEditor />
						</Grid>
					</>
				) : null}

				<Grid item xs={12} sm={12}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
						<Button variant="text" color="error" onClick={handleBack}>
							Cancel
						</Button>
						<Button variant="contained" onClick={handleSave}>
							Submit
						</Button>
					</Box>
				</Grid>
			</Grid>

			{/* Pop Up Status */}
			<AppModalMedium open={dialogStatus} handleClose={handleCloseStatus}>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
					<Typography16 title="Apakah anda yakin melakukan pemeriksaan status “Fit To Work”?" />
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Typography18 title="Status Fit sebelumnya" />
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'transparent',
								height: '35px',
								borderRadius: '8px',
							}}
						>
							<Typography14
								fontWeight={700}
								title={formStatusBefore}
								color="#A1A5B7"
							/>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Typography18 title="Status Fit yang dipilih" />
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: styleStatus
									? styleStatus.backgroundColor
									: 'transparent',
								height: '35px',
								width: '200px',
								borderRadius: '8px',
							}}
						>
							<Typography14
								fontWeight={700}
								title={formStatus}
								color={styleStatus ? styleStatus.color : 'black'}
							/>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}
				>
					<Button variant="text" color="error" onClick={handleCloseStatus}>
						Cancel
					</Button>
					<Button variant="contained" onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</AppModalMedium>

			{/* Pop Up Riwayat */}
			<AppModalMedium open={openDialog} handleClose={handleClose}>
				<Box>
					<Stack direction="row" justifyContent="center">
						<Typography18 title="RIWAYAT PEMERIKSAAN" fontWeight={700} />
					</Stack>
					<CustomNewTable
						data={List_Riwayat}
						columnShape={ColumnShapeRiwayat()}
					/>
					<Box
						sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}
					>
						<Button variant="text" color="error" onClick={handleClose}>
							Batal
						</Button>
						<Button variant="contained">Simpan</Button>
					</Box>
				</Box>
			</AppModalMedium>
		</Box>
	);
}

export default FormHarian;
