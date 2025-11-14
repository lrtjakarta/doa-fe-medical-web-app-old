import { Typography } from '@mui/material';
import React from 'react';

function Typography14(props) {
	const { fontWeight, color, title } = props;
	return (
		<Typography
			sx={{
				fontSize: 14,
				fontWeight: fontWeight ? fontWeight : 400,
				color: color,
				...props,
			}}
		>
			{title}
		</Typography>
	);
}

export default Typography14;
