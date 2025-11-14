import React, { useContext, createContext, useState } from 'react';
import Api from '../Services/Api';
import moment from 'moment';

export const MonthlyContext = createContext({});

export default function MonthlyProvider(props) {
	const [monthly, setMonthly] = useState([]);
	const [filterMonthly, setFilterMonthly] = useState([]);
	const [detailMonthly, setDetailMonthly] = useState({});

	const getDataMonthly = async params => {
		//if(monthly.length === 0){
		Api.getMonthly({ params: params })
			.then(async resdata => {
				// const result = resdata?.data.map((item) => {
				//   item.trainDriverName = item.trainDriver?.name
				//   // item.nametraindriver = item.trainDriver?.name
				//   // item.trainDriverStatus = item.trainDriver?.trainDriverStatus
				//   return item
				// })
				// console.log('datamonthly', result)
				setMonthly(resdata?.data);
				// setFilterMonthly(result);
			})
			.catch(err => console.log('error', err));

		//}
	};

	const getDetailMonthly = async (trainDriverId, date) => {
		console.log(trainDriverId, date);
		return Api.getMonthly({ params: { trainDriverId, date } })
			.then(res => {
				if (res.data.length > 0) {
					setDetailMonthly(res.data[0]);
					return res.data[0];
				} else {
					return {};
				}
				//
			})
			.catch(err => {
				console.log('error', err);
				return {};
			});
	};

	const deleteDataMonthly = async (_id, date) => {
		return Api.deleteMonthly(_id)
			.then(res => {
				console.log('res delete', res.data, date);
				getDataMonthly(date);
				// return {}
			})
			.catch(err => console.log('error', err));
	};

	return (
		<MonthlyContext.Provider
			value={{
				getDataMonthly,
				getDetailMonthly,
				monthly,
				setMonthly,
				setFilterMonthly,
				deleteDataMonthly,
				filterMonthly,
				setDetailMonthly,
				detailMonthly,
			}}
			{...props}
		/>
	);
}
