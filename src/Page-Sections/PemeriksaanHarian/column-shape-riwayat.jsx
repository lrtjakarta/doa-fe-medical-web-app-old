import { Box, IconButton, Typography } from '@mui/material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography14 from 'Component/Typography/Typography14';
const ColumnShapeRiwayat = callback => [
	{
		Header: 'Tanggal',
		accessor: 'tgl',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography14 title={value} />
					<Typography14 title={original?.time} color="#898A8C" />
				</Box>
			);
		},
	},
	{
		Header: 'Hasil',
		accessor: 'hasil',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Catatan',
		accessor: 'catatan',
		Cell: ({ value, row: { original } }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
];
export default ColumnShapeRiwayat;
