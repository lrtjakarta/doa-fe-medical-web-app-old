import axios from 'axios';
import StaticVar from '../Config/StaticVar';
import { isExpired } from 'react-jwt';

let isRefreshing = false;
let refreshQueue = [];

// ===> api create
const api = axios.create({
	baseURL: StaticVar.URL_API,
	timeout: 1000000,
	//   headers: {
	//     "Content-Type": "application/json",
	//     Accept: "application/json",
	//   },
});

api.interceptors.request.use(
	async config => {
		// get token
		const accessToken = localStorage.getItem('access_token');
		const refreshToken = localStorage.getItem('refresh_token');

		// check if token exists
		if (refreshToken && accessToken) {
			const accessTokenIsExpired = isExpired(accessToken);
			const refreshTokenIsExpired = isExpired(refreshToken);

			// check refresh token expire
			if (refreshTokenIsExpired) {
				// const navigate = useNavigate();
				// navigate to login page
				localStorage.clear();
				console.log('login expired');
				const message = { status: 401 };
				window.parent.postMessage(
					{ type: 'token expired', data: message },
					'*'
				);

				return;
			} else {
				// check access token expire
				if (accessTokenIsExpired) {
					// if access token has expired and we're not alredy refreshing
					if (!isRefreshing) {
						isRefreshing = true;
						// send refresh token api
						try {
							const data = { refreshToken };
							// console.log("data", data);
							const refresh = await axios.post(
								`${StaticVar.URL_API}/auth/refresh`,
								data
							);
							const newAccesToken = refresh.data.accessToken;
							const newRefreshToken = refresh.data.refreshToken;

							// udpate tokens
							localStorage.setItem('access_token', newAccesToken);
							localStorage.setItem('refresh_token', newRefreshToken);

							// send tokens to parent window
							window.parent.postMessage(
								{
									type: 'new token',
									data: {
										accessToken: newAccesToken,
										refreshToken: newRefreshToken,
									},
								},
								'*'
							);

							// Call all the requests that were waiting for the access token refresh
							refreshQueue.forEach(cb => cb(newAccesToken));
							refreshQueue = [];
							isRefreshing = false;
							console.log('succes refresh token');
						} catch (error) {
							isRefreshing = false;
							console.log('error refresh', error);
							localStorage.clear();
							const message = { status: 401 };
							window.parent.postMessage(
								{ type: 'token expired', data: message },
								'*'
							);
							return;
							//  throw new Error("Failed to refresh token");
						}
					}

					return new Promise(resolve => {
						refreshQueue.push(token => {
							config.headers.Authorization = `Bearer ${token}`;
							resolve(config);
						});
					});
				}

				// If the access token has not expired, set the Authorization header
				// config.headers.Authorization = `Bearer ${accessToken}`;
				// config.headers["x-access-token"] = accessToken;
				config.headers.Authorization = `Bearer ${localStorage.getItem(
					'access_token'
				)}`;
			}
		}

		// console.log("return config");
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	response => {
		// console.log("response", response);
		return response;
	},
	error => {
		// console.log("err response", error.response);
		if (error.response.status === 401) {
			const message = { status: 401 };
			window.parent.parent.postMessage(
				{ type: 'token expired', data: message },
				'*'
			);
			// removeTokensFromLocalStorage();
			// window.location.href = "/login?expired";

			return;
		}
		return Promise.reject(error);
	}
);

const getCheckup = data => api.get('/medical/checkup', data);
const getHistoryCheckup = data => api.get('/medical/checkup/history', data);
const postCheckup = data => api.post('/medical/checkup/register', data, {headers: {"token-ams": localStorage.getItem('token_ams')}});

const getDiagnosis = data => api.get('/medical/diagnosis', data);
const postDiagnosis = data => api.post('/medical/diagnosis/register', data);

const getPharmacology = data => api.get('/medical/pharmacology', data);
const postPharmacology = data =>
	api.post('/medical/pharmacology/register', data);

const putCheckup = (data, id) => api.put(`/medical/checkup/${id}`, data, {headers: {"token-ams": localStorage.getItem('token_ams')}});
// const getTrainDriver = (data) => api.get('/users/traindriver', data)
const getProfile = data => api.get('/work-order/profile', data);
const getProfileUser = id => api.get('/work-order/profile/user/' + id);
const getUserById = id => api.get('/user/' + id);
const getMasterMedical = data => api.get('/medical/master', data);
const getDailySchedule = data => api.get('/work-order/realization', data);
//   api.get('/operational/scheduletraindriver', data)
const getMonthly = data => api.get('/medical/monthly', data);
const postMonthly = data => api.post('/medical/monthly/register', data);
const putMonthly = ( id, data,) => api.put(`/medical/monthly/${id}`, data);
const deleteMonthly = id => api.delete(`/medical/monthly/${id}`);

const getDashboardCheckup = data => api.get('/medical/checkup/dashboard', data);

const getLetter = data => api.get('/operational/letter', data);
const updateLetter = (id, data) => api.put('/operational/letter/' + id, data);

// Master BMI
const getBMI = data => api.get('/medical/masterBMI', data);
const postBMI = data => api.post('/medical/masterBMI/register', data);
const putBMI = (id, data) => api.put(`/medical/masterBMI/${id}`, data);
const deleteBMI = id => api.delete(`/medical/masterBMI/${id}`);

export const apis = {
	getCheckup,
	getHistoryCheckup,
	getDiagnosis,
	postDiagnosis,
	getPharmacology,
	postPharmacology,
	getProfile,
	getProfileUser,
	getUserById,
	getMasterMedical,
	postCheckup,
	getDailySchedule,
	putCheckup,
	getMonthly,
	postMonthly,
	putMonthly,
	deleteMonthly,
	getDashboardCheckup,
	getLetter,
	updateLetter,

	getBMI,
	postBMI,
	putBMI,
	deleteBMI,
};

export default apis;
