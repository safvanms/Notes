import React from 'react';
import './App.css';
import Card from "../src/Components/Card";
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './Components/Form';
import PageNotFound from './Components/PageNotFound';

export default function App() {
	return (
		<React.StrictMode>
			<div className="App">
			<BrowserRouter>
				<Header />
					<Routes>
						<Route index element={<Card />} />
						<Route path='/card' element={<Card />} />
						<Route path='/form' element={<Form />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</div >
		</React.StrictMode>
	);
}


