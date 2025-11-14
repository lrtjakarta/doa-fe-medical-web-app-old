import SearchIcon from '@mui/icons-material/Search';
import {
	Backdrop,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Popover,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import React, {
	forwardRef,
	useContext,
	useEffect,
	useRef,
	useState,
	useMemo,
} from 'react';
import { CSVLink } from 'react-csv';
import { decodeToken } from 'react-jwt';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import Images from 'Themes/Images';
import DoctorImage from '../../Assets/Images/examination.png';
import RedoImage from '../../Assets/Images/redo.png';
import useStyles, { tableRowFirstStyle } from './Styles';

// style
import { DurationModification } from 'Component';
import UseMedicalRecord from 'Hooks/MedicalRecord/useMedicalRecord';
import _ from 'lodash';
import UseCheckup from '../../Hooks/Checkup/useCheckup';
import {
	Img,
	tableCellStyle,
	tableRowAkhirStyle,
	tableRowAwalStyle,
	tableRowStyle,
	tableStyle,
	textJudulStyle,
	textPaperSatuStyle,
	textPaperStyle,
} from './Styles';
// import useTrainDriver from '../../Hooks/TrainDriver/useTrainDriver'
import { ProfileContext } from 'Context';
import useLetter from '../../Hooks/Letter/useLetter';

export default function HomePages(props) {
	const classes = useStyles();
	const navigate = useNavigate();
	const {
		filterMedicalRecord,
		medicalRecord,
		handleSearch,
		searchText,
		handleChange,
		fetchDataSchedule,
		checkupStatus,
		handleFilterCheckupStatus,
		filterStartDate,
		filterEndDate,
		setfilterStartDate,
		setfilterEndDate,
		loadingData,
		loader,
		setLoader,
		filterData,
	} = UseMedicalRecord();

	// token
	const decodedToken = decodeToken(localStorage.getItem('access_token'));
	const profileUser = decodedToken;

	const { getDataLetter, filterLetter } = useLetter();

	// const detailLetter = {};
	const detailLetter = filterLetter.filter(
		item => item.type === 'Pemeriksaan Kesehatan'
	)[0];
	// filterLetter.filter(
	//   (item) => item.type === 'Pemeriksaan Kesehatan',
	// )[0]

	// const { getDataTrainDriver, trainDriver } = useTrainDriver()
	// const {
	//   getDataTrainDriver
	// } = useContext(TrainDriverContext)
	// const getDataTrainDriver =() => {return []}
	const {
		getDataProfile,
		profileData,
		dataUserLogin,
		dataProfilUserId,
		getUserProfilById,
	} = useContext(ProfileContext);

	const { handleRetake, getDataCheckup, checkup } = UseCheckup();

	const [openDialog, setOpenDialog] = useState(false);
	const previewRef = React.useRef();

	var opt = {
		margin: [
			// detailLetter?.padding,
			detailLetter?.padding || 10,
			// detailLetter?.padding || 10,
			detailLetter?.padding || 10,
		],
		filename: `medical-record-${moment().format('YYYYMMDDHHmmss')}.pdf`,
		html2canvas: {
			dpi: 360,
			letterRendering: true,
			useCORS: true,
			scale: 2,
		},
		pagebreak: { mode: ['css'], pagebreak: { avoid: 'tr' } },
		jsPDF: {
			unit: 'mm',
			orientation: 'portrait',
			format: [220, 410],
		},
	};

	var print = useRef();
	var element = useRef([]);
	const fetchData = async () => {
		await getDataProfile();
		await fetchDataSchedule();
		await getDataLetter();
	};

	useEffect(() => {
		fetchData();
	}, [checkup]);

	const navigateScanPages = () => {
		// navigate('/medical/scan')
		navigate('/medical/scan');
	};

	const navigateHeightandWeightPage = () => {
		navigate('/medical/monthly');
	};

	const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

	const handleSubmitRetake = async data => {
		const result = await handleRetake(data);
		if (result?.status === 'OK') {
			navigate(
				`/app/medical/form?nik=${data?.profile?.idNumber}&id=${data?.medicalCheckup?._id}`
			);
		}
	};

	const handlePrint = () => {
		// Pastikan konten terlihat sebelum generate PDF
		print.current.style.display = 'block';
		print.current.style.visibility = 'visible';
		print.current.style.position = 'relative';
		print.current.style.left = '0';

		setTimeout(() => {
			html2pdf().from(print.current).set(opt).save();
			setLoader(false);
		}, 10000);
	};

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const sortedMedicalRecords = useMemo(() => {
		return _.orderBy(
			filterMedicalRecord,
			['dailyWorkDate', 'loopRouteTrain.start'],
			['asc', 'asc']
		).filter(item => ['1', '2', '3'].includes(item?.medicalCheckup?.status));
	}, [filterMedicalRecord]);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const openPopover = Boolean(anchorEl);

	let headers = [
		{ label: 'Nama', key: 'name' },
		{ label: 'Nik', key: 'nik' },
		{ label: 'Jenis Kelamin', key: 'gender' },
		{ label: 'Jadwal', key: 'jadwal' },
		{ label: 'Mulai Periksa', key: 'checkupstart' },
		{ label: 'Selesai Periksa', key: 'checkupend' },
		{ label: 'Ket. Dinas', key: 'statusdinas' },
		{ label: 'Status Pemeriksaan', key: 'statuscheckup' },
		{ label: 'Log Retake', key: 'logretake' },
	];

	let headersRecap = [
		{ label: 'No', key: 'number' },
		{ label: 'Nama', key: 'name' },
		{ label: 'Usia', key: 'age' },
		{
			label:
				moment(filterStartDate ? filterStartDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' s/d ' +
				moment(filterEndDate ? filterEndDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' (FTW)',
			key: 'fittowork',
		},
		{
			label:
				moment(filterStartDate ? filterStartDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' s/d ' +
				moment(filterEndDate ? filterEndDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' (FTWN)',
			key: 'fittoworkwithnote',
		},
		{
			label:
				moment(filterStartDate ? filterStartDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' s/d ' +
				moment(filterEndDate ? filterEndDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' (TU)',
			key: 'retake',
		},
		{
			label:
				moment(filterStartDate ? filterStartDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' s/d ' +
				moment(filterEndDate ? filterEndDate : new Date()).format(
					'DD MMMM YYYY'
				) +
				' (PU)',
			key: 'unfittowork',
		},
	];

	let headersSoap = [
		{ label: 'No', key: 'number' },
		{ label: 'Tanggal', key: 'date' },
		{ label: 'Nama', key: 'name' },
		{ label: 'Anamnesa', key: 'anamnesis' },
		{ label: 'Pemeriksaan Fisik', key: 'physical' },
		{ label: 'Diagnosis', key: 'diagnosis' },
		{ label: 'Terapi/Edukasi', key: 'pharmacology' },
	];

	let dataRecap = profileData?.map((item, index) => {
		var firstDate = moment(item.birthDate, 'YYYY-MM-DD');
		var secondDate = moment(new Date(), 'YYYY-MM-DD');
		var duration = moment.duration(secondDate.diff(firstDate));
		var years = duration.asYears();
		let fittowork = filterMedicalRecord?.filter(
			item => item?.medicalCheckup?.status === '1'
		);
		let fittoworkwithnote = filterMedicalRecord?.filter(
			item => item?.medicalCheckup?.status === '2'
		);
		let retake = filterMedicalRecord?.filter(
			item =>
				item?.medicalCheckup?.status === '4' ||
				item?.medicalCheckup?.status === '5'
		);
		let unfittowork = filterMedicalRecord?.filter(
			item => item?.medicalCheckup?.status === '3'
		);
		return {
			number: index + 1,
			name: item?.name,
			age: item.birthDate ? Math.round(years) : 0,
			fittowork: fittowork?.filter(val => val.profile._id === item._id).length,
			fittoworkwithnote: fittoworkwithnote?.filter(
				val => val.profile._id === item._id
			).length,
			retake: retake?.filter(val => val.profile._id === item._id).length,
			unfittowork: unfittowork?.filter(val => val.profile._id === item._id)
				.length,
		};
	});

	let dataSoap = filterMedicalRecord
		?.filter(
			item =>
				item?.medicalCheckup?.status === '2' ||
				item?.medicalCheckup?.status === '3'
		)
		.map((val, index) => {
			let dataDiagnosis = val?.medicalCheckup?.soap?.diagnosis.map(
				item => item.name
			);
			return {
				number: index + 1,
				date: moment(val?.medicalCheckup?.createdAt).format(
					'DD-MM-YYYY HH:mm:ss'
				),
				name: val?.profile?.name,
				anamnesis: val?.medicalCheckup?.soap?.anamnesis,
				physical: val?.medicalCheckup?.soap?.physical.replace(
					/<\/?[^>]+(>|$)/g,
					''
				),
				diagnosis: dataDiagnosis?.toString(),
				pharmacology: val?.medicalCheckup?.soap?.pharmacology.replace(
					/<\/?[^>]+(>|$)/g,
					''
				),
			};
		});

	let data = filterMedicalRecord?.map((item, index) => {
		return {
			no: index + 1,
			name: item?.profile?.name,
			nik: item?.profile?.idNumber,
			gender: item?.profile?.gender,
			jadwal: item?.loopRouteTrain?.start,
			checkupstart: moment(item?.medicalCheckup?.createdAt).format(
				'DD-MM-YYYY HH:mm:ss'
			),
			checkupend: moment(item?.medicalCheckup?.finishAt).format(
				'DD-MM-YYYY HH:mm:ss'
			),
			statusdinas: item?.loopRouteTrain?.note,
			statuscheckup:
				item?.medicalCheckup?.status === '1'
					? 'Fit to Work'
					: item?.medicalCheckup?.status === '2'
					? 'Fit to Work with Note'
					: item?.medicalCheckup?.status === '3'
					? 'Unfit to Work'
					: item?.medicalCheckup?.status === '4'
					? 'Retake'
					: item?.medicalCheckup?.status === '5'
					? 'Retake 2'
					: 'Belum diperiksa',
			logretake:
				item?.medicalCheckup?.changeData?.status === '4' ||
				item?.medicalCheckup?.changeData?.status === '5'
					? moment(item?.medicalCheckup?.changeDate).format('HH:mm:ss')
					: null,
		};
	});

	const Content = forwardRef((props, ref) => {
		const { dataDetail, mrData } = props;
		useEffect(() => {
			if (dataDetail?.createBy?._id) {
				getUserProfilById(dataDetail.createBy._id);
			}
		}, [dataDetail?.createBy?._id]);
		return (
			<Box ref={ref} sx={{ height: 1512 }}>
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
													height: 25,
													marginRight: 5,
													objectFit: 'cover',
													objectPosition: 'center',
												}}
											/>
											<Typography sx={{ fontStyle: 'italic', fontSize: 14 }}>
												LRT
											</Typography>
											<Typography
												sx={{
													fontSize: 15,
													fontWeight: 200,
													fontStyle: 'italic',
												}}
											>
												JAKARTA
											</Typography>
										</Grid>
									</TableCell>
									<TableCell align="center" sx={{ width: '50%' }}>
										<Typography
											sx={{ textTransform: 'uppercase', fontSize: 14 }}
										>
											{detailLetter?.titleHead}
											{dataDetail?.status === '1'
												? ' Fit to Work'
												: dataDetail?.status === '2'
												? ' Fit to Work with Note'
												: dataDetail?.status === '3'
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
												<Typography sx={{ fontSize: 12 }}>
													Nomor Dokumen
												</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '25%',
													py: 0,
												}}
											>
												<Typography sx={{ fontSize: 12 }}>
													{detailLetter?.numberHead}
												</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '15%',
													py: 0,
												}}
											>
												<Typography sx={{ fontSize: 12 }}>
													Nomor Revisi
												</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '15%',
													py: 0,
												}}
											>
												<Typography sx={{ fontSize: 12 }}>
													{detailLetter?.revisionNumber}
												</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													borderRight: '1.6px solid #000000',
													width: '10%',
													py: 0,
												}}
											>
												<Typography sx={{ fontSize: 12 }}>Halaman</Typography>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													width: '15%',
													py: 0,
												}}
											>
												<Typography sx={{ fontSize: 12 }}>
													{detailLetter?.page}
												</Typography>
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
						py: 3,
						textAlign: 'center',
					}}
				>
					{/* <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
						{detailLetter?.titleDoc}
					</Typography> */}
					{dataUserLogin?.departement === '662773fa84d37c2a2f2431f4' ? (
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
						<Typography style={{ fontSize: 12 }}>
							Telah dilakukan pemeriksaan kesehatan pada tanggal{' '}
							{moment(dataDetail?.createdAt).format('DD-MM-YYYY')} pada pukul{' '}
							{moment(dataDetail?.createdAt).format('HH:mm:ss')}
						</Typography>
						<table style={{ fontSize: 12 }}>
							<tr>
								<td>1. Nama</td>
								<td>:</td>
								<td>{dataDetail?.profile?.name}</td>
							</tr>
							<tr>
								<td>2. NIK</td>
								<td>:</td>
								<td>{dataDetail?.profile?.idNumber}</td>
							</tr>
							<tr>
								<td>3. Jabatan</td>
								<td>:</td>
								<td>{dataDetail?.profile?.jobrole}</td>
							</tr>
						</table>
					</Grid>
					<Grid item xs={2}>
						<QRCode
							value={dataDetail?._id ? dataDetail?._id : '-'}
							size={100}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					{mrData
						? mrData.map(v => (
								<Grid item xs={12} sm={6} md={6}>
									{v.dataDetails.length > 0 ? (
										<>
											<Box
												sx={{
													pl: 1,
													bgcolor: '#464748',
													minWidth: '100%',
													height: 32,
													flex: 1,
													alignContent: 'center',
													display: 'flex',
													justifyContent: 'flex-start',
												}}
											>
												<p align="left" className={classes.titleTxt}>
													{v.dataDetails[0]?.category?.name}
												</p>
											</Box>
											<Paper>
												<Table>
													{v.dataDetails?.map((x, index) => (
														<TableRow>
															<TableCell sx={{ py: 1.5 }}>
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
					<Typography sx={{ mt: 2, mb: 2 }}>
						Berdasarkan hasil diatas, yang bersangkutan dinyatakan
					</Typography>
					<Box
						className={classes.boxTxt}
						sx={{
							backgroundColor:
								dataDetail?.status === '1'
									? 'green'
									: dataDetail?.status === '2'
									? '#FFFF00'
									: dataDetail?.status === '3'
									? '#FE0000'
									: '#ababab',
						}}
					>
						<p sx={{ m: 'auto' }} className={classes.textBoxTxt}>
							{dataDetail?.status === '1'
								? 'Fit to Work'
								: dataDetail?.status === '2'
								? 'Fit to Work with Note'
								: dataDetail?.status === '3'
								? 'Unfit to Work'
								: 'Belum diperiksa'}
						</p>
					</Box>
				</Box>
				<Box sx={{ minHeight: 0 }}>
					{dataDetail?.soap && dataDetail?.soap?.anamnesis ? (
						<Box sx={{ mt: 2, mb: 2 }}>
							<div style={{ marginTop: 5, marginBottom: 5 }}>
								<Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
									Anamnesis
								</Typography>
								<Typography style={{ fontSize: 12, fontWeight: 400 }}>
									{dataDetail?.soap?.anamnesis}
								</Typography>
							</div>

							<div style={{ marginTop: 10, marginBottom: 5 }}>
								<Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
									Pemeriksaan Fisik
								</Typography>
								<Typography
									style={{ fontSize: 12 }}
									dangerouslySetInnerHTML={{
										__html: `${dataDetail?.soap?.physical}`,
									}}
								></Typography>
							</div>
							<div style={{ marginTop: 10, marginBottom: 5 }}>
								<Typography style={{ fontSize: 14, fontWeight: 'bol d' }}>
									Diagnosis
								</Typography>
								{dataDetail?.soap?.diagnosis.map((item, i) => (
									<Typography key={i} style={{ fontSize: 12, fontWeight: 400 }}>
										{item.name}
									</Typography>
								))}
							</div>

							<div style={{ marginTop: 10, marginBottom: 5 }}>
								<Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
									Farmakologi / Non Farmakologi
								</Typography>
								<Typography
									style={{ fontSize: 12 }}
									dangerouslySetInnerHTML={{
										__html: `${dataDetail?.soap?.pharmacology}`,
									}}
								></Typography>
							</div>
						</Box>
					) : null}
				</Box>
				<Box sx={{ flexGrow: 1, mt: 2 }}>
					<Grid container spacing={2} sx={{ alignItems: 'center' }}>
						<Grid item xs={12} md={6} sm={6}>
							<p align="center" className={classes.textGridTxt}>
								Masinis
							</p>
							<p align="center">
								{dataDetail?.profile?.idNumber ? (
									<QRCode
										value={
											dataDetail?.profile?.idNumber
												? dataDetail?.profile?.idNumber
												: '-'
										}
										size={100}
									/>
								) : (
									''
								)}
							</p>
							<p align="center" className={classes.grayGridTxt}>
								{dataDetail?.profile?.name}
								<br />
								NIK : {dataDetail?.profile?.idNumber}
							</p>
						</Grid>
						<Grid item xs={12} md={6} sm={6}>
							<p align="center" className={classes.textGridTxt}>
								Petugas Pemeriksa
							</p>
							<p align="center">
								{dataDetail?.createBy?._id ? (
									<QRCode
										value={
											dataDetail?.createBy?._id
												? dataDetail?.createBy?._id
												: '-'
										}
										size={100}
									/>
								) : (
									''
								)}
							</p>
							<p align="center" className={classes.grayGridTxt}>
								{dataDetail?.createBy?.name}
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
			<Backdrop
				sx={{ color: '#fff', zIndex: 99999 }}
				open={loader}
				onClick={() => setLoader(false)}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{/* Generate Download Hasil PDF */}

			<Container maxWidth="xl" sx={{ pt: 10, mt: -10, pb: 10 }}>
				<Box sx={{ mt: 2, mb: 2 }}>
					<Typography sx={textJudulStyle}>
						Halo, Selamat Datang di Aplikasi OPL PT.LRT Jakarta sebagai medis
					</Typography>
					<Stack justifyContent="space-between" flexDirection="row">
						<Typography
							sx={{
								fontSize: 17,
								color: '#464748',
								fontWeight: 500,
							}}
						>
							Disini anda dapat mengakses total pemeriksaan , form pemeriksaan
							medis, riwayat pemeriksaan.
						</Typography>
						<Typography
							sx={{
								fontSize: 17,
								color: '#464748',
								fontWeight: 500,
							}}
						>
							{`${day[new Date().getDay()]}, ${new Date().getDate()} - ${
								new Date().getMonth() + 1
							} - ${new Date().getFullYear()}`}
						</Typography>
					</Stack>
				</Box>

				<Box fullwidth sx={{ borderRadius: 3 }} mt={4}>
					<Grid
						justifyContent="space-evenly"
						alignItems="center"
						container
						spacing={2}
						columns={{ xs: 4, sm: 6, md: 12 }}
						sx={{
							'& .MuiPaper-root': {
								boxShadow: 'none',
							},
						}}
					>
						{/* 1 */}
						<Grid item xs={3}>
							<Grid container spacing={2} alignItems="center">
								<Grid item xs={12} md={12} sm={12}>
									<Paper
										onClick={navigateScanPages}
										className={classes.paperTxt}
										sx={{
											borderRadius: 2,
											backgroundColor: '#BB7E36',
											cursor: 'pointer',
											'&:hover': {
												backgroundColor: 'rgba(187, 126, 54, .8)',
											},
										}}
									>
										<Stack
											direction="row"
											spacing={4}
											alignItems="center"
											justifyContent="center"
											sx={{ height: 120, px: 2 }}
										>
											<Box>
												<Img
													src={DoctorImage}
													style={{ marginLeft: 20 }}
													width="90%"
												/>
											</Box>
											<Typography sx={textPaperSatuStyle}>
												Pemeriksaan Harian
											</Typography>
										</Stack>
									</Paper>
								</Grid>
								{/* <Grid item xs={12} md={6} sm={6}>
                  <Paper
                    onClick={navigateHeightandWeightPage}
                    className={classes.paperTxt}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#BB7E36',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(187, 126, 54, .8)',
                      },
                    }}>
                    <Stack
                      direction='row'
                      spacing={4}
                      alignItems='center'
                      justifyContent='center'
                      sx={{ height: 120, px: 2 }}>
                      <Box>
                        <Img
                          src={DoctorImage}
                          style={{ marginLeft: 15 }}
                          width='90%'
                        />
                      </Box>
                      <Typography sx={textPaperSatuStyle}>
                        Pemeriksaan <br /> Berat Badan & Tinggi Bulanan
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid> */}
							</Grid>
						</Grid>

						{/* 3 */}
						<Grid item xs={9}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={6} sm={6}>
									<Paper
										className={classes.paperTxt}
										sx={{
											height: 'auto',
											borderRadius: 2,
											backgroundColor: 'rgb(228,228,228)',
											'&:hover': {
												backgroundColor: 'rgba(187, 126, 54, .8)',
											},
										}}
									>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center"
											justifyContent="space-between"
											sx={{ py: 1, mr: 2.5 }}
										>
											<Stack direction="row" alignItems="center">
												<Box sx={{ mr: -0.5, ml: -0.5 }}>
													<Img src={Images.heart} width="50%" />
												</Box>
												<Typography
													sx={{
														fontSize: 18,
														color: '#A2A2A2',
														mr: '0px !important',
													}}
												>
													Fit to Work
												</Typography>
											</Stack>
											<Typography sx={textPaperStyle} variant="body2">
												{
													medicalRecord.filter(
														item => item?.medicalCheckup?.status === '1'
													).length
												}
											</Typography>
										</Stack>
									</Paper>
								</Grid>
								<Grid item xs={12} md={6} sm={6}>
									<Paper
										className={classes.paperTxt}
										sx={{
											height: 'auto',
											borderRadius: 2,
											backgroundColor: 'rgb(228,228,228)',
											'&:hover': {
												backgroundColor: 'rgba(187, 126, 54, .8)',
											},
										}}
									>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center"
											justifyContent="space-between"
											sx={{ py: 1, mr: 2.5 }}
										>
											<Stack direction="row" spacing={3} alignItems="center">
												<Box>
													<Img src={Images.danger} width="50%" />
												</Box>
												<Typography
													sx={{
														fontSize: 18,
														color: '#A2A2A2',
														marginLeft: '-5px !important',
													}}
												>
													Unfit to Work
												</Typography>
											</Stack>
											<Typography sx={textPaperStyle} variant="body2">
												{
													medicalRecord.filter(
														item => item?.medicalCheckup?.status === '3'
													).length
												}
											</Typography>
										</Stack>
									</Paper>
								</Grid>
								<Grid item xs={12} md={6} sm={6}>
									<Paper
										className={classes.paperTxt}
										sx={{
											height: 'auto',
											borderRadius: 2,
											backgroundColor: 'rgb(228,228,228)',
											'&:hover': {
												backgroundColor: 'rgba(187, 126, 54, .8)',
											},
										}}
									>
										<Stack
											direction="row"
											spacing={1}
											justifyContent="space-between"
											alignItems="center"
											sx={{ py: 1, mr: 2.5, ml: 0.5 }}
										>
											<Stack direction="row" spacing={2} alignItems="center">
												<Box>
													<Img src={Images.report} width="50%" />
												</Box>
												<Typography
													sx={{
														fontSize: 18,
														color: '#A2A2A2',
														marginLeft: '0 !important',
													}}
												>
													Fit to Work with Note
												</Typography>
											</Stack>
											<Typography sx={textPaperStyle} variant="body2">
												{
													medicalRecord.filter(
														item => item?.medicalCheckup?.status === '2'
													).length
												}
											</Typography>
										</Stack>
									</Paper>
								</Grid>
								<Grid item xs={12} md={6} sm={6}>
									<Paper
										className={classes.paperTxt}
										sx={{
											height: 'auto',
											borderRadius: 2,
											backgroundColor: 'rgb(228,228,228)',
											'&:hover': {
												backgroundColor: 'rgba(187, 126, 54, .8)',
											},
										}}
									>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center"
											justifyContent="space-between"
											sx={{ py: 1, mx: 2.5 }}
										>
											<Stack direction="row" spacing={3} alignItems="center">
												<Box sx={{ mr: -0.5, ml: -0.5 }}>
													<Img src={RedoImage} width="100%" />
												</Box>
												<Typography
													sx={{
														fontSize: 18,
														color: '#A2A2A2',
														position: 'relative',
														right: '10px',
													}}
												>
													Retake
												</Typography>
											</Stack>
											<Typography sx={textPaperStyle} variant="body2">
												{medicalRecord.filter(
													item => item?.medicalCheckup?.status === '4'
												).length +
													medicalRecord.filter(
														item => item?.medicalCheckup?.status === '5'
													).length}
											</Typography>
										</Stack>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>

				<Box sx={{ flexGrow: 1, mt: 3, mb: 3 }}>
					<Grid container spacing={3} alignItems="end">
						<Grid item xs={3}>
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
								}}
							>
								Daftar Pemeriksaan Terbaru
							</Typography>
						</Grid>

						<Grid item xs={9}>
							<Grid
								spacing={1}
								container
								alignItems="end"
								sx={{
									display: 'flex',
									flexDirection: 'row',
								}}
							>
								<Grid item xs={1.8}>
									<Typography className={classes.dateTxt} sx={{ mt: 1 }}>
										Tgl Mulai:
									</Typography>
									<TextField
										type={'Date'}
										value={filterStartDate}
										placeholder="Pencarian"
										onChange={async e => {
											setfilterStartDate(e.target.value);
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<IconButton sx={{ padding: 0 }}>
														<SearchIcon
															sx={{
																fontSize: 15,
																color: 'gray',
															}}
														/>
													</IconButton>
												</InputAdornment>
											),
											style: {
												fontSize: 12,
												height: 35.5,
												backgroundColor: '#fff',
												boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
											},
										}}
										className={classes.searchTxt}
									/>
								</Grid>
								<Grid item xs={1.8}>
									<Typography className={classes.dateTxt} sx={{ mt: 1 }}>
										Tgl Selesai:
									</Typography>
									<TextField
										type={'Date'}
										value={filterEndDate}
										placeholder="Pencarian"
										onChange={async e => {
											setfilterEndDate(e.target.value);
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<IconButton sx={{ padding: 0 }}>
														<SearchIcon
															sx={{
																fontSize: 15,
																color: 'gray',
															}}
														/>
													</IconButton>
												</InputAdornment>
											),
											style: {
												fontSize: 12,
												height: 35.5,
												backgroundColor: '#fff',
												boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
											},
										}}
										className={classes.searchTxt}
									/>
								</Grid>
								<Grid item xs={2.2}>
									<Typography className={classes.dateTxt} sx={{ mt: 1 }}>
										Status Pemeriksaan:
									</Typography>
									<FormControl
										sx={{
											'& .MuiSelect-select': {
												width: '100%',
												color: 'primary.black',
												fontSize: 14,
												zIndex: 1,
											},
											'& fieldset': {
												backgroundColor: '#ffffff',
												borderRadius: 2,
												border: 'none',
												boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
											},
											'& .MuiSelect-icon': {
												zIndex: 1,
											},
										}}
										fullWidth
										size="small"
									>
										<InputLabel id="demo-simple-select-helper-label">
											Semua
										</InputLabel>
										<Select
											labelId="checkup-status"
											label="Semua"
											id="checkup-status"
											value={checkupStatus}
											onChange={e => {
												handleFilterCheckupStatus(e.target.value);
											}}
										>
											<MenuItem value={''}>Semua</MenuItem>
											<MenuItem value={'1'}>Fit to Work</MenuItem>
											<MenuItem value={'2'}>Fit to Work with Note</MenuItem>
											<MenuItem value="3">Unfit to Work</MenuItem>
											<MenuItem value="4">Retake</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={2.6}>
									<Grid
										container
										spacing={1}
										sx={{ alignItems: 'flex-end', pr: 2 }}
									>
										<Grid item xs={9}>
											<TextField
												value={searchText}
												placeholder="Pencarian"
												onChange={e => handleChange(e.target.value)}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<IconButton>
																<SearchIcon
																	sx={{
																		fontSize: 15,
																		color: 'gray',
																	}}
																/>
															</IconButton>
														</InputAdornment>
													),
													style: {
														fontSize: 12,
														height: 35.5,
														backgroundColor: '#fff',
														boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
													},
												}}
												className={classes.searchTxt}
											/>
										</Grid>
										<Grid item xs={3}>
											<Button
												variant="contained"
												onClick={handleSearch}
												sx={{
													fontSize: 10,
													fontWeight: 600,
													color: '#fff',
													backgroundColor: '#BB7E36',
												}}
											>
												Cari
											</Button>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={1.6}>
									<Grid container>
										<Button
											fullWidth
											variant="contained"
											onClick={event => setAnchorEl(event.currentTarget)}
											sx={{
												fontSize: 10,
												fontWeight: 600,
												color: '#fff',
												backgroundColor: '#217346',
											}}
										>
											Export (Excel)
										</Button>
										<Popover
											open={openPopover}
											anchorEl={anchorEl}
											onClose={() => setAnchorEl(null)}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'left',
											}}
										>
											<Paper>
												<CSVLink
													data={data}
													headers={headers}
													filename={`medical-record-${moment().format(
														'YYYYMMDDHHmmss'
													)}.csv`}
													separator=";"
												>
													<Button sx={{ display: 'block', width: '100%' }}>
														<Typography
															align="left"
															sx={{
																color: '#000',
																fontWeight: 'bold',
																fontSize: 12,
															}}
														>
															Detail Data Medis
														</Typography>
													</Button>
												</CSVLink>
												<CSVLink
													data={dataRecap}
													headers={headersRecap}
													filename={`rekap-medical-${moment().format(
														'YYYYMMDDHHmmss'
													)}.csv`}
													separator=";"
												>
													<Button sx={{ display: 'block', width: '100%' }}>
														<Typography
															align="left"
															sx={{
																color: '#000',
																fontWeight: 'bold',
																fontSize: 12,
															}}
														>
															Rekapan Medis
														</Typography>
													</Button>
												</CSVLink>

												<CSVLink
													data={dataSoap}
													headers={headersSoap}
													filename={`analisa-soap-${moment().format(
														'YYYYMMDDHHmmss'
													)}.csv`}
													separator=";"
												>
													<Button sx={{ display: 'block', width: '100%' }}>
														<Typography
															align="left"
															sx={{
																color: '#000',
																fontWeight: 'bold',
																fontSize: 12,
															}}
														>
															Analisa SOAP
														</Typography>
													</Button>
												</CSVLink>
											</Paper>
										</Popover>
									</Grid>
								</Grid>
								<Grid item xs={2}>
									<Button
										fullWidth
										variant="contained"
										sx={{ fontSize: 10, fontWeight: 600 }}
										// onClick={async () => {
										// 	await setLoader(true);
										// 	await handlePrint();
										// }}
										onClick={handleOpenDialog}
									>
										Lihat & Download (PDF)
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>

				<Card sx={{ minWidth: 275 }}>
					<TableContainer
						sx={{
							padding: '10px',
						}}
					>
						<Table sx={tableStyle}>
							<TableHead>
								<TableRow>
									<TableCell sx={tableCellStyle}>
										<p>No.</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="left">
										<p>Nama</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p> NIK</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Kode Dinas</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Jadwal</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p> Waktu Pemeriksaan</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Keterangan Dinas</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Status Pemeriksaan</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Log Retake</p>
									</TableCell>
									<TableCell sx={tableCellStyle} align="center">
										<p>Aksi</p>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filterMedicalRecord.length ? (
									_.orderBy(
										filterMedicalRecord,
										[
											'medicalCheckup.createdAt',
											'workOrder.start',
											'dailyWorkDate',
										],
										['desc', 'asc', 'asc']
									).map((x, idx) => {
										let createBy = x?.medicalCheckup?.createBy;
										let start = moment(x?.medicalCheckup?.createdAt);
										let finish = moment(x?.medicalCheckup?.finishAt);
										let _timeduration = finish.diff(start, 'seconds');
										let timedurationcheckup =
											Math.floor(_timeduration / 60) +
											' Menit ' +
											(_timeduration % 60) +
											' detik';
										return (
											<TableRow
												key={idx}
												sx={{
													bgcolor: '#f3f3f3',
												}}
											>
												<TableCell
													style={tableRowAwalStyle}
													component="th"
													scope="row"
												>
													{idx + 1}
												</TableCell>
												<TableCell align="left" style={tableRowStyle}>
													<Typography>{x?.profile?.name}</Typography>
												</TableCell>
												<TableCell align="center" style={tableRowStyle}>
													<Typography>{x?.profile?.idNumber}</Typography>
												</TableCell>
												<TableCell align="center" style={tableRowStyle}>
													<Typography>{x?.workOrder?.code}</Typography>
												</TableCell>
												<TableCell align="center" style={tableRowStyle}>
													<Typography>
														{moment(x?.dailyWorkDate).format('DD/MM/YYYY') +
															' '}
														{x?.loopRouteTrain?.start}
													</Typography>
												</TableCell>
												<TableCell align="left" style={tableRowStyle}>
													{x?.medicalCheckup?.status === '4' ? (
														<DurationModification
															title="Waktu Tunggu"
															startTime={x?.medicalCheckup?.retake1At}
														/>
													) : null}
													{x?.medicalCheckup?.status === '5' ? (
														<DurationModification
															title="Waktu Tunggu"
															startTime={x?.medicalCheckup?.retake2At}
														/>
													) : null}
													{x?.medicalCheckup?.status ? (
														<Typography>
															Mulai Periksa :{' '}
															{moment(
																new Date(x?.medicalCheckup?.createdAt),
																'DD/MM/YYYY HH:mm:ss'
															).format('HH:mm:ss')}
														</Typography>
													) : null}
													{x?.medicalCheckup?.status === '4' ||
													x?.medicalCheckup?.status === '5' ? (
														<Typography>
															Retake 1 :{' '}
															{moment(
																new Date(x?.medicalCheckup?.retake1At),
																'DD/MM/YYYY HH:mm:ss'
															).format('HH:mm:ss')}
														</Typography>
													) : null}
													{x?.medicalCheckup?.status === '5' ? (
														<Typography>
															CheckUp 1 :{' '}
															{moment(
																new Date(x?.medicalCheckup?.checkup1At),
																'DD/MM/YYYY HH:mm:ss'
															).format('HH:mm:ss')}
														</Typography>
													) : null}
													{x?.medicalCheckup?.status === '5' ? (
														<Typography>
															Retake 2 :{' '}
															{moment(
																new Date(x?.medicalCheckup?.retake2At),
																'DD/MM/YYYY HH:mm:ss'
															).format('HH:mm:ss')}
														</Typography>
													) : null}
													{x?.medicalCheckup?.status === '1' ||
													x?.medicalCheckup?.status === '2' ||
													x?.medicalCheckup?.status === '3' ? (
														<Typography>
															Selesai Periksa :{' '}
															{moment(
																new Date(x?.medicalCheckup?.finishAt),
																'DD/MM/YYYY HH:mm:ss'
															).format('HH:mm:ss')}
														</Typography>
													) : null}
													{x?.medicalCheckup?.status === '1' ||
													x?.medicalCheckup?.status === '2' ||
													x?.medicalCheckup?.status === '3' ? (
														<Typography>
															Durasi Pemeriksaan: {timedurationcheckup}
														</Typography>
													) : null}
												</TableCell>
												<TableCell align="center" style={tableRowStyle}>
													<Typography>{x?.loopRouteTrain?.note}</Typography>
												</TableCell>
												<TableCell align="center">
													<Grid container justifyContent={'center'}>
														<Typography
															style={{
																fontWeight: 600,
																border: 'none',
																marginTop: 8,
																marginRight: 4,
																color:
																	x?.medicalCheckup?.status === '2'
																		? '#000'
																		: '#fff',
																padding: '1px 6px',
																borderRadius: 4,
																backgroundColor:
																	x?.medicalCheckup?.status === '1'
																		? 'green'
																		: x?.medicalCheckup?.status === '2'
																		? '#FFFF00'
																		: x?.medicalCheckup?.status === '3'
																		? '#FE0000'
																		: x?.medicalCheckup?.status === '4'
																		? '#000'
																		: x?.medicalCheckup?.status === '5'
																		? '#000'
																		: '#ababab',
																fontSize: '14px',
															}}
														>
															{x?.medicalCheckup?.status === '1'
																? 'Fit to Work'
																: x?.medicalCheckup?.status === '2'
																? 'Fit to Work with Note'
																: x?.medicalCheckup?.status === '3'
																? 'Unfit to Work'
																: x?.medicalCheckup?.status === '4'
																? 'Retake'
																: x?.medicalCheckup?.status === '5'
																? 'Retake 2'
																: 'Belum diperiksa'}
															<br />
															{x?.medicalCheckup?.note}
														</Typography>
													</Grid>
												</TableCell>
												<TableCell align="center">
													{x?.medicalCheckup?.changeData?.status === '4' ||
													x?.medicalCheckup?.changeData?.status === '5' ? (
														<Typography>
															{moment(x?.medicalCheckup?.changeDate).format(
																'HH:mm:ss'
															)}
															<br />
															{x?.medicalCheckup?.changeData?.note}
														</Typography>
													) : null}
												</TableCell>
												<TableCell
													align="center"
													style={tableRowAkhirStyle}
													sx={{
														display: 'flex',
														flexDirection: 'column',
														gap: 1,
													}}
												>
													{x?.medicalCheckup?.status === '4' ||
													x?.medicalCheckup?.status === '5' ? (
														<Button
															sx={{
																color: '#fff',
																bgcolor: '#BB7E36',
																textTransform: 'none',
																fontWeight: 500,
																width: '30%',
																'&:hover': {
																	backgroundColor: '#BB7E36',
																	color: '#fff',
																	border: 'none',
																},
															}}
															onClick={() => handleSubmitRetake(x)}
														>
															Retake
														</Button>
													) : x?.medicalCheckup?.status === '1' ||
													  x?.medicalCheckup?.status === '2' ||
													  x?.medicalCheckup?.status === '3' ? (
														<>
															<Button
																variant="contained"
																size="small"
																color="primary"
																onClick={() => {
																	navigate(
																		'/medical/result?nik=' +
																			x?.profile?.idNumber +
																			'&id=' +
																			x?.medicalCheckup?._id
																	);
																}}
															>
																Hasil
															</Button>
															{/* masinis itu sendiri */}
															{createBy?._id === profileUser?.id && (
																<Button
																	variant="contained"
																	size="small"
																	color="warning"
																	onClick={() => {
																		navigate(
																			'/medical/form?action=edit&nik=' +
																				x?.profile?.idNumber +
																				'&id=' +
																				x.medicalCheckup?._id
																		);
																	}}
																>
																	Edit
																</Button>
															)}
															{x?.medicalCheckup?.history?.length > 0 ? (
																<Button
																	variant="contained"
																	size="small"
																	color="success"
																	onClick={() => {
																		navigate(
																			'/medical/historyMedical?nik=' +
																				x?.profile?.idNumber +
																				'&id=' +
																				x.medicalCheckup?._id
																		);
																	}}
																>
																	History
																</Button>
															) : null}
														</>
													) : null}
												</TableCell>
											</TableRow>
										);
									})
								) : (
									<TableRow>
										<TableCell
											style={tableRowFirstStyle}
											component="th"
											scope="row"
											colSpan={9}
										>
											{loadingData ? (
												<center>
													<CircularProgress />
													<Typography
														sx={{
															fontSize: 20,
															textAlign: 'center',
														}}
													>
														Loading Data...
													</Typography>
												</center>
											) : (
												<Typography
													sx={{
														fontSize: 20,
														textAlign: 'center',
													}}
												>
													Data Kosong
												</Typography>
											)}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Card>

				{/* Dialog Download PDF */}
				<Dialog
					open={openDialog}
					onClose={handleCloseDialog}
					fullWidth
					maxWidth="lg"
				>
					<DialogTitle>Preview Hasil Pemeriksaan</DialogTitle>
					<DialogContent
						dividers
						sx={{
							minHeight: 400,
							overflowY: 'auto',
						}}
					>
						<div ref={previewRef}>
							{sortedMedicalRecords.map((row, index) => (
								<div key={row?.medicalCheckup?._id || index}>
									<Content
										key={index}
										dataDetail={row?.medicalCheckup}
										mrData={row?.medicalCheckup?.mrData}
									/>
								</div>
							))}
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog}>Tutup</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								html2pdf().from(previewRef.current).set(opt).save();
							}}
						>
							Download PDF
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</>
	);
}
