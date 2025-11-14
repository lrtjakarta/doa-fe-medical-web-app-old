import React, { useContext, createContext, useState } from 'react';
import Api from '../Services/Api';

export const CheckupContext = createContext({});

export default function CheckupProvider(props) {
	const [checkup, setCheckup] = useState(null);
	const [historycheckup, setHistoryCheckup] = useState([]);
	const [filterCheckup, setFilterCheckup] = useState([]);
	const [detailCheckup, setDetailCheckup] = useState({});
	const [dataBefore, setDataBefore] = useState(null);

	const getDataCheckup = id => {
		return Api.getCheckup({ params: { id } })
			.then(res => {
				if (res.data.length > 0) {
					setCheckup(res.data[0]);
					setDataBefore(res.data[0]);
					setFilterCheckup(res.data[0]);
					if (res.data[0].status === '0') {
						return { ...res.data[0], status: true };
					} else if (res.data[0].status === '4') {
						return { ...res.data[0], status: true };
					} else {
						return { ...res.data[0], status: false };
					}
				} else {
					return { status: false };
				}
			})
			.catch(err => console.log('error', err));
	};

	const getHistoryDataCheckup = (idTrainDriver, idCheckUp) => {
		return Api.getHistoryCheckup({ params: { idTrainDriver, idCheckUp } })
			.then(res => {
				setHistoryCheckup(res.data);
				return res.data;
			})
			.catch(err => console.log('error', err));
	};

	const postDataCheckup = sendData => {
		console.log('sendData PostDataCheckup', sendData);
		return Api.postCheckup(sendData)
			.then(res => {
				return { status: 'OK', result: res.data };
			})
			.catch(err => {
				console.log('error', err);
				return { status: 'Failed', result: [] };
			});
	};

	const putDataCheckup = (sendData, id) => {
		return Api.putCheckup(sendData, id)
			.then(res => {
				return { status: 'OK', result: res.data };
			})
			.catch(err => {
				console.log('error', err);
				return { status: 'Failed', result: [] };
			});
	};

	return (
		<CheckupContext.Provider
			value={{
				getHistoryDataCheckup,
				historycheckup,
				getDataCheckup,
				postDataCheckup,
				putDataCheckup,
				checkup,
				setCheckup,
				setFilterCheckup,
				filterCheckup,
				setDetailCheckup,
				detailCheckup,
				dataBefore,
			}}
			{...props}
		/>
	);
}
