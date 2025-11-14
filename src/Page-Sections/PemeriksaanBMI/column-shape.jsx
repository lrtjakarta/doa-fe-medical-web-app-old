import { Box, IconButton, Typography } from '@mui/material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography14 from 'Component/Typography/Typography14';
const ColumnShape = callback => [
	{
		Header: 'No',
		accessor: 'no',
		Cell: ({ value }) => {
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
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Umur',
		accessor: 'umur',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Tinggi Badan',
		accessor: 'tinggiBadan',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Berat Badan',
		accessor: 'beratBadan',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'FAT%',
		accessor: 'fat',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'VFA',
		accessor: 'vfa',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'BMR',
		accessor: 'bmr',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'BMI',
		accessor: 'bmi',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},

	// {
	// 	Header: 'Aksi',
	// 	accessor: 'edit',
	// 	Cell: ({ row }) => {
	// 		const { onView, onEdit } = callback;
	// 		return (
	// 			<Box>
	// 				<IconButton onClick={() => onView(row.original)}>
	// 					<InventoryOutlinedIcon sx={{ color: '#3E97FF' }} />
	// 				</IconButton>
	// 				<IconButton onClick={() => onEdit(row.original)}>
	// 					<ModeEditOutlineOutlinedIcon sx={{ color: '#F6C000' }} />
	// 				</IconButton>
	// 			</Box>
	// 		);
	// 	},
	// },
];
export default ColumnShape;
