import React, { createContext, useState } from 'react';
import Api from '../Services/Api';
import { decodeToken } from 'react-jwt';

export const ProfileContext = createContext({});

export default function ProfileProvider(props) {
	const [profileData, setProfileData] = useState([]);
	const [filterProfile, setFilterProfile] = useState([]);
	const [detailProfile, setDetailProfile] = useState({});
	const decodedToken = decodeToken(localStorage.getItem('access_token'));
	const [dataProfilUserId, setDataProfilUserId] = useState({});
	const [dataUserLogin, setDataUserLogin] = useState({});
	// console.log('decodedToken', decodedToken);
	const getDataProfile = async () => {
		// return []
		// if(profileData.length === 0){
		Api.getUserById(decodedToken.id).then(response => {
			setDataUserLogin(response.data);
			const departement = response.data?.departement;
			Api.getProfile({ params: { departement: departement } })
				.then(res => {
					// console.log('data', res.data.data)
					setProfileData(res.data.data);
					setFilterProfile(res.data.data);
				})
				.catch(err => console.log('error', err.response));
		});

		// }
	};

	const getDetailProfile = async nik => {
		console.log('nik getDetailProfile', nik);
		return Api.getProfile({ params: { idNumber: nik } })
			.then(res => {
				console.log('res getDetailProfile', res.data.data);
				if (res.data.data.length > 0) {
					setDetailProfile(res.data.data[0]);
					return { ...res.data.data[0] };
				}
			})
			.catch(err => console.log('error', err));
	};

	const getUserProfilById = async (_id, params) => {
		return await Api.getProfileUser(_id, { params: params })
			.then(res => {
				setDataProfilUserId(res.data?.profile);
				return res.data;
			})
			.catch(err => {
				console.log('error', err);
				return {};
			});
	};

	return (
		<ProfileContext.Provider
			value={{
				setProfileData,
				profileData,
				dataUserLogin,
				getDataProfile,
				filterProfile,
				setFilterProfile,
				getDetailProfile,
				detailProfile,
				setDetailProfile,
				dataProfilUserId,
				getUserProfilById,
			}}
			{...props}
		/>
	);
}
