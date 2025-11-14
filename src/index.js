import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { BrowserRouter } from 'react-router-dom';
import Provider from 'Context';

import MultiProvider from 'Config/MultiProvider';

import Themes from 'Themes/Mui';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter basename="app">
		<MultiProvider
			providers={[
				<Provider.ProfileProvider />,
				<Provider.CheckupProvider key={1} />,
				<Provider.TrainDriverProvider />,
				<Provider.MasterMedicalProvider key={3} />,
				<Provider.MedicalRecordProvider key={4} />,
				<Provider.DailyScheduleProvider key={5} />,
				<Provider.CheckupProvider key={6} />,
				<Provider.MonthlyProvider key={7} />,
				<Provider.SoapProvider key={8} />,
				<Provider.DashboardProvider key={9} />,
				<Provider.LetterProvider key={10} />,
				<Provider.MasterBMIProvider key={11} />,
			]}
		>
			<ThemeProvider theme={Themes.default}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<App />
				</LocalizationProvider>
			</ThemeProvider>
		</MultiProvider>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
