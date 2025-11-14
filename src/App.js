import React, { useEffect, useContext } from 'react';

import { jwtDecode } from 'jwt-decode';
import Routes from 'Routes';

import useQuery from 'Utils/QueryParams';

function App() {
	const query = useQuery();

	const accessToken = query.get('accessToken');
	const refreshToken = query.get('refreshToken');
	const amsToken = query.get("token");

	useEffect(() => {
		const setToken = () => {
			if (accessToken && refreshToken) {
				localStorage.setItem('access_token', accessToken);
				localStorage.setItem('refresh_token', refreshToken);
				localStorage.setItem("token_ams", amsToken);
			}
		};

		setToken();
		// return () => {};
	}, [accessToken, refreshToken]);

	return <Routes />;
}

export default App;
