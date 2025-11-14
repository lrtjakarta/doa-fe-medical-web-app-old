import React, { useEffect, useRef, forwardRef, useContext } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import QRCode from 'react-qr-code';
import useStyles from './Styles';
import UseCheckup from 'Hooks/Checkup/useCheckup';
import useQuery from 'Utils/QueryParams';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import {
	Paper,
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody,
} from '@mui/material';
import moment from 'moment';
import Images from 'Themes/Images';
import useLetter from 'Hooks/Letter/useLetter';
import StaticVar from 'Config/StaticVar';
import { decodeToken } from 'react-jwt';
import { ProfileContext } from 'Context';

function MedicalRecord(props) {
	let query = useQuery();
	const navigate = useNavigate();
	const classes = useStyles();
	const id = query.get('id');
	const nik = query.get('nik');
	const { getDataCheckup, checkup } = UseCheckup();
	const { dataProfilUserId, getUserProfilById } = useContext(ProfileContext);

	const decodedToken = decodeToken(localStorage.getItem('access_token'));
	const profileNik = decodedToken; //JSON.parse(localStorage.profile)
	const printRef = useRef();

	const { getDataLetter, filterLetter } = useLetter();

	useEffect(() => {
		const fetchData = async () => {
			await getDataCheckup(id ? id : props.id);
			getDataLetter();
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (checkup) {
			getUserProfilById(checkup?.createBy?._id);
		}
	}, [checkup]);

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});

	const detailLetter = filterLetter.filter(
		item => item.type === 'Pemeriksaan Kesehatan'
	)[0];

	const Content = forwardRef((props, ref) => {
		return (
			<Box ref={ref} sx={{ padding: detailLetter?.padding }}>
				<center style={{ marginBottom: 10 }}>
					<Box>
						<Table>
							<TableHead>
								<TableRow sx={{ border: '1.5px solid #000000' }}>
									<TableCell
										align="center"
										sx={{
											borderRight: '1.6px solid #000000',
											width: '50%',
										}}
									>
										<Grid container justifyContent="center" alignItems="center">
											<img
												src={Images.logoIcon}
												alt="img"
												style={{
													height: 30,
													marginRight: 5,
													objectFit: 'cover',
													objectPosition: 'center',
												}}
											/>
											<Typography sx={{ fontStyle: 'italic', fontSize: 18 }}>
												LRT
											</Typography>
											<Typography
												sx={{
													fontSize: 18,
													fontWeight: 200,
													fontStyle: 'italic',
												}}
											>
												JAKARTA
											</Typography>
										</Grid>
									</TableCell>
									<TableCell align="center" sx={{ width: '50%' }}>
										<Typography sx={{ textTransform: 'uppercase' }}>
											{detailLetter?.titleHead}
											{checkup?.status === '1'
												? ' Fit to Work'
												: checkup?.status === '2'
												? ' Fit to Work with Note'
												: checkup?.status === '3'
												? ' Unfit to Work'
												: ' Belum diperiksa'}
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow sx={{ p: 0, border: '1.5px solid #000000' }}>
									<TableCell colSpan={2} sx={{ p: 0 }}>
										<TableRow>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '20%',
													py: 0,
												}}
											>
												<Typography>Nomor Dokumen</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '25%',
													py: 0,
												}}
											>
												<Typography>{detailLetter?.numberHead}</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '15%',
													py: 0,
												}}
											>
												<Typography>Nomor Revisi</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '15%',
													py: 0,
												}}
											>
												<Typography>{detailLetter?.revisionNumber}</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '10%',
													py: 0,
												}}
											>
												<Typography>Halaman</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													width: '15%',
													py: 0,
												}}
											>
												<Typography>{detailLetter?.page}</Typography>
											</TableCell>
										</TableRow>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Box>
				</center>
				<Box
					sx={{
						justifyContent: 'center',
						py: 1,
						textAlign: 'center',
					}}
				>
					{dataProfilUserId?.departement?.name ===
					'Departemen Pengendali Operasi (POP)' ? (
						<Typography sx={{ fontSize: 16, fontWeight: 600 }}>
							FORMULIR PEMERIKSAAN PENGENDALI OPERASI
						</Typography>
					) : (
						<Typography sx={{ fontSize: 16, fontWeight: 600 }}>
							{detailLetter?.titleDoc}
						</Typography>
					)}
				</Box>
				<Grid container justifyContent={'space-between'}>
					<Grid item xs={10}>
						<Typography style={{ fontSize: 16 }}>
							Telah dilakukan pemeriksaan kesehatan pada tanggal{' '}
							{moment(checkup?.createdAt).format('DD-MM-YYYY')} pada pukul{' '}
							{moment(checkup?.createdAt).format('HH:mm:ss')}
						</Typography>
						<table style={{ fontSize: 16 }}>
							<tr>
								<td>1. Nama</td>
								<td>:</td>
								<td>{checkup?.profile?.name}</td>
							</tr>
							<tr>
								<td>2. NIK</td>
								<td>:</td>
								<td>{checkup?.profile?.idNumber}</td>
							</tr>
							<tr>
								<td>3. Jabatan</td>
								<td>:</td>
								<td>{checkup?.profile?.jobPosition?.name}</td>
							</tr>
						</table>
					</Grid>
					<Grid item xs={2}>
						<QRCode
							value={
								StaticVar.LIVE_APP +
								'/#/app/medical/result?nik=' +
								nik +
								'&id=' +
								id
							}
							size={100}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					{checkup
						? checkup?.mrData.map(v => (
								<Grid item xs={6} sm={6} md={6}>
									{v.dataDetails.length > 0 ? (
										<>
											<Box
												sx={{
													pl: 1,
													bgcolor: '#464748',
													minWidth: '100%',
													height: 36,
													flex: 1,
													alignContent: 'center',
													display: 'flex',
													justifyContent: 'flex-start',
												}}
											>
												<div className={classes.titleTxt}>
													{v.dataDetails[0]?.category?.name}
												</div>
											</Box>
											<Paper>
												<Table>
													{v.dataDetails?.map((x, index) => (
														<TableRow>
															<TableCell sx={{ py: 1.2 }}>
																<span className={classes.answerTxt}>
																	{index + 1}. {x.name}{' '}
																</span>
																<i className={classes.noteTxt}>
																	Hasil :{' '}
																	<b>
																		{x.answer?.value
																			? x.answer?.value
																			: x.answer?.value1
																			? x.answer?.value1
																			: x.answer?.value2
																			? x.answer?.value2
																			: x.answer?.value3}
																	</b>{' '}
																	{x.answerType === 'column'
																		? x.unit?.value
																			? x.unit?.value
																			: x.unit?.value1 + '/' + x.unit?.value2
																		: null}
																</i>
																<br />
																{x.note ? (
																	<span className={classes.noteTxt}>
																		Catatan : {x.note ? x.note : '-'}
																	</span>
																) : null}
															</TableCell>
														</TableRow>
													))}
												</Table>
											</Paper>
										</>
									) : null}
								</Grid>
						  ))
						: null}
				</Grid>
				<Box>
					<Typography sx={{ mt: 1, mb: 1, fontSize: 15 }}>
						Berdasarkan hasil diatas, yang bersangkutan dinyatakan
					</Typography>
					<Box
						className={classes.boxTxt}
						sx={{
							backgroundColor:
								checkup?.status === '1'
									? 'green'
									: checkup?.status === '2'
									? '#7746FF'
									: checkup?.status === '3'
									? '#FE0000'
									: '#ababab',
						}}
					>
						<p sx={{ m: 'auto' }} className={classes.textBoxTxt}>
							{checkup?.status === '1'
								? 'Fit to Work'
								: checkup?.status === '2'
								? 'Fit to Work with Note'
								: checkup?.status === '3'
								? 'Unfit to Work'
								: 'Belum diperiksa'}
						</p>
					</Box>
				</Box>
				<Box>
					{checkup?.soap && checkup?.soap?.anamnesis ? (
						<Box sx={{ mt: 1 }}>
							<div style={{ marginBottom: 5 }}>
								<Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
									Anamnesis
								</Typography>
								<Typography style={{ fontSize: 14, fontWeight: 400 }}>
									{checkup?.soap?.anamnesis}
								</Typography>
							</div>

							<div style={{ marginTop: 5, marginBottom: 5 }}>
								<Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
									Pemeriksaan Fisik
								</Typography>
								<Typography
									style={{ fontSize: 14 }}
									dangerouslySetInnerHTML={{
										__html: `${checkup?.soap?.physical}`,
									}}
								></Typography>
							</div>
							<div style={{ marginTop: 5, marginBottom: 5 }}>
								<Typography style={{ fontSize: 16, fontWeight: 'bol d' }}>
									Diagnosis
								</Typography>
								{checkup?.soap?.diagnosis.map((item, i) => (
									<Typography key={i} style={{ fontSize: 14, fontWeight: 400 }}>
										{item.name}
									</Typography>
								))}
							</div>

							<div style={{ marginTop: 5, marginBottom: 5 }}>
								<Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
									Farmakologi / Non Farmakologi
								</Typography>
								<Typography
									style={{ fontSize: 14 }}
									dangerouslySetInnerHTML={{
										__html: `${checkup?.soap?.pharmacology}`,
									}}
								></Typography>
							</div>
						</Box>
					) : null}
				</Box>
				<Box sx={{ flexGrow: 1, mt: 3 }}>
					<Grid container spacing={2} sx={{ alignItems: 'center' }}>
						<Grid item xs={6}>
							<p align="center" className={classes.textGridTxt}>
								Nama
							</p>
							<p align="center">
								{checkup?.profile?.idNumber ? (
									<QRCode
										value={
											checkup?.profile?.idNumber
												? checkup?.profile?.idNumber
												: '-'
										}
										size={100}
									/>
								) : (
									''
								)}
							</p>
							<p align="center" className={classes.grayGridTxt}>
								{checkup?.profile?.name}
								<br />
								NIK : {checkup?.profile?.idNumber}
							</p>
						</Grid>
						<Grid item xs={6}>
							<p align="center" className={classes.textGridTxt}>
								Petugas Pemeriksa
							</p>
							<p align="center">
								{checkup?.createBy?._id ? (
									<QRCode
										value={
											checkup?.createBy?._id ? checkup?.createBy?._id : '-'
										}
										size={100}
									/>
								) : (
									''
								)}
							</p>
							<p align="center" className={classes.grayGridTxt}>
								{checkup?.createBy?.name}
								<br />
								NIK : {dataProfilUserId?.idNumber}
							</p>
						</Grid>
					</Grid>
				</Box>
			</Box>
		);
	});

	return (
		<>
			<Container maxWidth="xl">
				<Paper sx={{ pb: 2, pt: 2 }}>
					<Content ref={printRef} />
					<Box sx={{ p: detailLetter?.padding }}>
						<Grid container sx={{ justifyContent: 'space-between' }}>
							<div style={{ display: 'flex', flex: 1 }}>
								<Button
									onClick={
										() => navigate(-1) //props.history.goBack()
									}
									variant="contained"
									sx={{
										color: '#A56C28',
										bgcolor: '#fff',
										border: '2px solid #A56C28',
										width: '20%',
										fontSize: 18,
										mr: 3,
										mt: 3,
										'&:hover': {
											backgroundColor: '#BB7E36',
											color: '#fff',
											border: 'none',
										},
									}}
								>
									<ArrowBackIosNewIcon sx={{ mr: 1 }} /> Kembali
								</Button>
							</div>

							<div
								style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
								class="no-print"
							>
								<Button
									component={Link}
									to={'/medical'}
									variant="contained"
									sx={{
										color: '#fff',
										bgcolor: '#BB7E36',
										border: '1px solid #A56C28',
										width: '45%',
										fontSize: 18,
										mr: 3,
										mt: 3,
										'&:hover': {
											backgroundColor: '#BB7E36',
											color: '#fff',
											border: 'none',
										},
									}}
								>
									Selesai
								</Button>
								<Button
									onClick={handlePrint}
									variant="contained"
									color="primary"
									sx={{
										border: '1px solid #A56C28',
										fontSize: 18,
										width: '45%',
										mt: 3,
										'&:hover': {
											backgroundColor: '#BB7E36',
											color: '#fff',
											border: 'none',
										},
									}}
								>
									Cetak
								</Button>
							</div>
						</Grid>
					</Box>
				</Paper>
			</Container>
		</>
	);
}

export default MedicalRecord;
