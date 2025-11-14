import {
	Box,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	styled,
} from '@mui/material';
import React from 'react';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: '15px',
	// fontWeight: 600,
	color: '#35405B',
	'&:first-of-type': {
		paddingLeft: 24,
	},
	'&:last-of-type': {
		paddingRight: 24,
		textAlign: 'right',
	},
}));

function CustomTableHeader({ tebleBodyConten, tableCellHeader }) {
	return (
		<Box>
			<Table
				sx={{
					minWidth: 650,
					borderCollapse: 'separate',
					borderSpacing: '0px 10px',
					borderRadius: 3,
				}}
			>
				<TableHead>
					<TableRow>
						{tableCellHeader.map(item => {
							return <HeadTableCell>{item}</HeadTableCell>;
						})}
					</TableRow>
				</TableHead>
				<TableBody>{tebleBodyConten}</TableBody>
			</Table>
		</Box>
	);
}

export default CustomTableHeader;
