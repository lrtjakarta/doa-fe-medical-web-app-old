import { Box, IconButton, Typography } from '@mui/material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography14 from 'Component/Typography/Typography14';
const ColumnShapeRiwayatKeseluruhan = callback => [
	{
		Header: 'No',
		accessor: 'no',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Nama',
		accessor: 'nama',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography14 title={value} />
					<Typography14 title={original?.nik} color="#898A8C" />
				</Box>
			);
		},
	},
	{
		Header: 'Tgl Pemeriksaan',
		accessor: 'tgl',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Waktu Pemeriksaan',
		accessor: '',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography14 title="Mulai" color="#898A8C" />
					<Typography14 title={original.waktuStart} />
					<Typography14 title="Selesai" color="#898A8C" />
					<Typography14 title={original.waktuFinish} />
					<Typography14 title="Durasi" color="#898A8C" />
					<Typography14 title={original.durasi} />
				</Box>
			);
		},
	},
	{
		Header: 'Status Pemeriksaan',
		accessor: 'status',
		Cell: ({ value }) => {
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
			const statusStyles = getStatusStyles(value);
			return (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: statusStyles
							? statusStyles.backgroundColor
							: 'transparent',
						height: '35px',
						borderRadius: '8px',
					}}
				>
					<Typography14
						fontWeight={700}
						title={value}
						color={statusStyles ? statusStyles.color : 'black'}
					/>
				</Box>
			);
		},
	},
	{
		Header: 'Aksi',
		accessor: 'edit',
		Cell: ({ row }) => {
			const { onView, onEdit } = callback;
			return (
				<Box>
					<IconButton onClick={() => onView(row.original)}>
						<InventoryOutlinedIcon sx={{ color: '#3E97FF' }} />
					</IconButton>
				</Box>
			);
		},
	},
];
export default ColumnShapeRiwayatKeseluruhan;
