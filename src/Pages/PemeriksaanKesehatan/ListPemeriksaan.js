import { Box, Button, Grid } from '@mui/material';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { KeyboardArrowDown } from '@mui/icons-material';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography18 from 'Component/Typography/Typography18';
import AppTextField from 'Component/input-fields/AppTextField';
import SearchInput from 'Component/input-fields/SearchInput';

import React from 'react';
import BoxStatus from 'Component/Cards/BoxStatus';
import Typography16 from 'Component/Typography/Typography16';
import CustomNewTable from 'Component/CustomTable/CustomNewTable';
import List_Harian from 'Page-Sections/Data/DataHarian';
import ColumnShape from 'Page-Sections/PemeriksaanHarian/column-shape';
import { useNavigate } from 'react-router-dom';

function ListPemeriksaan() {
	const navigate = useNavigate();

	// handle
	const handlePemeriksaan = () => {
		navigate('scanQrCode');
	};

	return (
		<Box sx={{ p: '30px' }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<HeaderV1
						title="PEMERIKSAAN HARIAN"
						sub1="Home -"
						sub2="Medical -"
						sub3="Pemeriksaan Harian"
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
						<Button
							variant="contained"
							sx={{ height: '110px', width: '285px', borderRadius: '12px' }}
							startIcon={
								<QrCodeScannerOutlinedIcon
									sx={{ width: '45px', height: '45px' }}
								/>
							}
							onClick={handlePemeriksaan}
						>
							<Typography18
								fontWeight={700}
								title="Mulai Pemeriksaan Harian"
								color="#fff"
							/>
						</Button>
						<BoxStatus
							title="Fit to Work"
							icon={<FavoriteBorderOutlinedIcon sx={{ color: '#50CD89' }} />}
							numberTitle="999"
							numberColor="#50CD89"
						/>
						<BoxStatus
							title="Fit to Work with Note"
							icon={<ArticleOutlinedIcon sx={{ color: '#F6C000' }} />}
							numberTitle="999"
							numberColor="#F6C000"
						/>
						<BoxStatus
							title="Unfit to Work"
							icon={<HealingOutlinedIcon sx={{ color: '#ED1C24' }} />}
							numberTitle="999"
							numberColor="#ED1C24"
						/>
						<BoxStatus
							title="Retake"
							icon={<AutorenewOutlinedIcon sx={{ color: '#3E97FF' }} />}
							numberTitle="999"
							numberColor="#3E97FF"
						/>
					</Box>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Typography16 fontWeight={500} title="Daftar Pemeriksaan Terbaru" />
				</Grid>
				<Grid
					item
					xs={12}
					sm={9}
					sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<Box sx={{ display: 'flex', gap: 1 }}>
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
						<AppTextField
							select
							fullWidth
							size="small"
							label="Status"
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
						<SearchInput
							placeholder="Search..."
							// value={search}
							// onChange={e => setSearch(e.target.value)}
						/>
						<Button variant="contained">Cari</Button>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12}>
					<CustomNewTable
						data={List_Harian}
						columnShape={ColumnShape({
							onView: '',
							onEdit: '',
						})}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ListPemeriksaan;
