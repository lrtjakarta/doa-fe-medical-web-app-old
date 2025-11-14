import React, { useEffect, useRef, forwardRef, useState } from 'react';
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

function History(props) {
	let query = useQuery();
	const navigate = useNavigate();
	const classes = useStyles();
	const id = query.get('id');
	const nik = query.get('nik');
	const { getDataCheckup, checkup } = UseCheckup();

	const printRef = useRef();

	const { getDataLetter, filterLetter } = useLetter();

	const [dataHistory, setDataHistory] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			await getDataCheckup(id ? id : props.id);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (checkup?.history?.length > 0) {
			const sorted = [...checkup.history].sort(
				(a, b) =>
					new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
			);
			const latestData = sorted[sorted.length - 1];
			setDataHistory(latestData);
			console.log('data history terbaru', latestData);
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
			<Box ref={ref} sx={{ padding: detailLetter?.padding, mt: 2 }}>
				<Box>
					<Typography
						sx={{
							fontSize: {
								xl: 20,
								lg: 18,
								md: 18,
								sm: 14,
								xs: 14,
							},
							fontWeight: 'bold',
							mb: 2,
						}}
					>
						History Pemeriksaan
					</Typography>
				</Box>
				<Grid container justifyContent={'space-between'}>
					<Grid item xs={10}>
						<Typography style={{ fontSize: 16 }}>
							Telah dilakukan pemeriksaan kesehatan pada tanggal{' '}
							{moment(dataHistory?.updatedAt).format('DD-MM-YYYY')} pada pukul{' '}
							{moment(dataHistory?.updatedAt).format('HH:mm:ss')}
						</Typography>
						<table style={{ fontSize: 16 }}>
							<tr>
								<td>1. Nama</td>
								<td>:</td>
								<td>{dataHistory?.profile?.name}</td>
							</tr>
							<tr>
								<td>2. NIK</td>
								<td>:</td>
								<td>{dataHistory?.profile?.idNumber}</td>
							</tr>
							<tr>
								<td>3. Jabatan</td>
								<td>:</td>
								<td>{dataHistory?.profile?.jobPosition?.name}</td>
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
				<Grid container spacing={2} sx={{ mt: 2 }}>
					{dataHistory
						? dataHistory?.mrData.map(v => (
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
								dataHistory?.status === '1'
									? 'green'
									: dataHistory?.status === '2'
									? '#7746FF'
									: dataHistory?.status === '3'
									? '#FE0000'
									: '#ababab',
						}}
					>
						<p sx={{ m: 'auto' }} className={classes.textBoxTxt}>
							{dataHistory?.status === '1'
								? 'Fit to Work'
								: dataHistory?.status === '2'
								? 'Fit to Work with Note'
								: dataHistory?.status === '3'
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
								{dataHistory?.profile?.idNumber ? (
									<QRCode
										value={
											dataHistory?.profile?.idNumber
												? dataHistory?.profile?.idNumber
												: '-'
										}
										size={100}
									/>
								) : (
									''
								)}
							</p>
							<p align="center" className={classes.grayGridTxt}>
								{dataHistory?.profile?.name}
								<br />
								NIK : {dataHistory?.profile?.idNumber}
							</p>
						</Grid>
						<Grid item xs={6}>
							<p align="center" className={classes.textGridTxt}>
								Petugas Pemeriksa
							</p>
							<p align="center">
								{dataHistory?.createBy?._id ? (
									<QRCode
										value={
											dataHistory?.createBy?._id
												? dataHistory?.createBy?._id
												: '-'
										}
										size={100}
									/>
								) : (
									''
								)}
							</p>
							<p align="center" className={classes.grayGridTxt}>
								{dataHistory?.createBy?.name}
								<br />
								Code : {dataHistory?.createBy?._id}
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
				</Paper>
			</Container>
		</>
	);
}

export default History;
