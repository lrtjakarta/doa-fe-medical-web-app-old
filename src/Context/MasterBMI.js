import API from 'Services/Api';
import React, { createContext, useCallback, useState } from 'react';

export const MasterBMIContext = createContext({});

export default function MasterBMIProvider(props) {
	const [dataMasterBMI, setDataMasterBMI] = useState([]);

	const getMasterBMI = async params => {
		await API.getBMI({ params: params })
			.then(res => {
				setDataMasterBMI(res.data);
			})
			.catch(err => console.log('error', err));
	};

	return (
		<MasterBMIContext.Provider
			value={{
				dataMasterBMI,
				getMasterBMI,
			}}
			{...props}
		/>
	);
}
