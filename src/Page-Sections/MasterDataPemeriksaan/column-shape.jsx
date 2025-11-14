import { Box, IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography14 from 'Component/Typography/Typography14';
const ColumnShape = callback => [
	{
		Header: 'Pertanyaan',
		accessor: 'pertanyaan',
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
		accessor: 'kategori',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Tipe Jawaban',
		accessor: 'type',
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
