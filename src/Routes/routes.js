import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingScreen from 'Component/Loading Screen';

const Loadable = Component => props => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
};

// Home
const HomePages = Loadable(lazy(() => import('Pages/Home')));
// Form
const Form = Loadable(lazy(() => import('Pages/Form')));
// Hasil
const Hasil = Loadable(lazy(() => import('Pages/Hasil')));
// History Medical
const MedicalHistory = Loadable(lazy(() => import('Pages/Home/History')));
// Scan
const Scan = Loadable(lazy(() => import('Pages/Scan')));
// History
const History = Loadable(lazy(() => import('Pages/History')));
// Monthly
const Monthly = Loadable(lazy(() => import('Pages/Monthly')));

// Master Data BMI
const ListBMI = Loadable(
	lazy(() => import('Pages/MasterDataBMI/ListMasterBMI'))
);

// Dashboard
const Dashboard = Loadable(lazy(() => import('Pages/Dashboard')));

const mainRoutes = [
	{
		path: 'medical',
		element: <Navigate to="/medical/" />,
	},
	{
		path: 'medical',
		children: [
			{
				path: '',
				element: <HomePages />,
			},
			{
				path: 'form',
				element: <Form />,
			},
			{
				path: 'result',
				element: <Hasil />,
			},
			{
				path: 'historyMedical',
				element: <MedicalHistory />,
			},
			{
				path: 'scan',
				element: <Scan />,
			},
			{
				path: 'history',
				element: <History />,
			},
			{
				path: 'monthly',
				element: <Monthly />,
			},
			{
				path: 'BMI',
				element: <ListBMI />,
			},
		],
	},
];

export default mainRoutes;
