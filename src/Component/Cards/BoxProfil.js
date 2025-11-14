import { Box } from '@mui/material';

import Typography20 from 'Component/Typography/Typography20';

import PhotoProfil from 'Assets/avatar.png';
import PhotoQr from 'Assets/qr-code.png';

import React from 'react';
import Typography14 from 'Component/Typography/Typography14';

function BoxProfil() {
	return (
		<Box sx={{ display: 'flex', gap: 3 }}>
			<img src={PhotoProfil} style={{ width: '112px', height: '112px' }} />
			<Box>
				<Typography20 title="Khairul Mustan" fontWeight={600} />
				<Box sx={{ display: 'flex', gap: 8, mt: 1 }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Box>
							<Typography14 title="NIK" color="#A1A5B7" />
							<Typography14 title="1234567" fontWeight={700} />
						</Box>
						<Box>
							<Typography14 title="Telepon" color="#A1A5B7" />
							<Typography14 title="+6285237890" fontWeight={700} />
						</Box>
						<Box>
							<Typography14 title="Departement" color="#A1A5B7" />
							<Typography14 title="ASP" fontWeight={700} />
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Box>
							<Typography14 title="Jenis Kelamin" color="#A1A5B7" />
							<Typography14 title="Laki-laki" fontWeight={700} />
						</Box>
						<Box>
							<Typography14 title="Email" color="#A1A5B7" />
							<Typography14 title="example@gmail.com" fontWeight={700} />
						</Box>
						<Box>
							<Typography14 title="Alamat" color="#A1A5B7" />
							<Typography14 title="Jakarta" fontWeight={700} />
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Box>
							<Typography14 title="Tempat Lahit" color="#A1A5B7" />
							<Typography14 title="Jakarta" fontWeight={700} />
						</Box>
						<Box>
							<Typography14 title="Tanggal Lahir" color="#A1A5B7" />
							<Typography14 title="05/06/1991" fontWeight={700} />
						</Box>
						<Box>
							<Typography14 title="Divisi" color="#A1A5B7" />
							<Typography14
								title="Operasional dan Pelayanan"
								fontWeight={700}
							/>
						</Box>
					</Box>
					<Box>
						<Typography14 title="Sertifikat" color="#A1A5B7" />
						<Typography14 title="NS001" fontWeight={700} />
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<img src={PhotoQr} style={{ width: '100px', height: '100px' }} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default BoxProfil;
