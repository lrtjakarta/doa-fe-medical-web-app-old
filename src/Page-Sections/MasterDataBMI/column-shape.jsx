import { Box, IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography14 from 'Component/Typography/Typography14';
const ColumnShape = callback => [
	{
		Header: 'No',
		accessor: '',
		Cell: ({ row }) => {
			return (
				<Box>
					<Typography14 title={row.index + 1} />
				</Box>
			);
		},
	},
	{
		Header: 'IMT',
		accessor: '',
		Cell: ({ value, row: { original } }) => {
			const min = original?.referenceMin < 17;
			const max = original?.referenceMax > 27;
			const normal = original?.referenceMin + ' - ' + original?.referenceMax;
			return (
				<Box>
					{/* <Typography14 title={min ? '< 17' : max ? '> 27' : normal} /> */}
					<Typography14 title={normal} />
				</Box>
			);
		},
	},
	{
		Header: 'Kelompok',
		accessor: 'group',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Kategori',
		accessor: 'category',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Aksi',
		accessor: 'edit',
		Cell: ({ row }) => {
			const { onEdit, onDelete } = callback;
			return (
				<Box>
					<IconButton onClick={() => onEdit(row.original)}>
						<EditOutlinedIcon sx={{ color: '#3E97FF' }} />
					</IconButton>
					<IconButton onClick={() => onDelete(row.original)}>
						<DeleteOutlinedIcon sx={{ color: '#ED1C24' }} />
					</IconButton>
				</Box>
			);
		},
	},
];
export default ColumnShape;
