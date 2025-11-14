import { Box } from '@mui/material';
import Typography14 from 'Component/Typography/Typography14';

import React from 'react';
import Typography36 from 'Component/Typography/Typography36';

function BoxStatus({ title, icon, numberTitle, numberColor }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography14 fontWeight={600} title={title} />
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				{icon}
				<Typography36
					fontWeight={700}
					title={numberTitle}
					color={numberColor}
				/>
			</Box>
		</Box>
	);
}

export default BoxStatus;
