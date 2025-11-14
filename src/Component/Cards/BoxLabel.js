import { Box } from '@mui/material';
import Typography14 from 'Component/Typography/Typography14';
import Typography16 from 'Component/Typography/Typography16';
import React from 'react';

function BoxLabel({ titleInfo, icon, titleNumber, colorNumber }) {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Box sx={{ display: 'flex', gap: 1 }}>
				{icon}
				<Typography14 title={titleInfo} fontWeight={600} />
			</Box>
			<Typography16 title={titleNumber} fontWeight={700} color={colorNumber} />
		</Box>
	);
}

export default BoxLabel;
