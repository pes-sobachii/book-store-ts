import React, { useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import { Header } from './Components/Header'
import { Cart } from './Components/Cart'
import Main from './Components/Main'
import { booksSelector, fetchBooks } from './Redux/mainSlice'
import { useSelector } from 'react-redux/es/exports'
import { useAppDispatch } from './Redux/store'
import DetailsPage from './Components/DetailsPage'
import AboutUs from './Components/AboutUs/Aboutus'

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchBooks())
	}, [])


	return (
		<>
			<Header />
			<Routes>
				<Route path='' element={<Main />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/book/:isbn' element={<DetailsPage />} />
				<Route path='/aboutus' element={<AboutUs />} />
			</Routes>
		</>
	)
}

export default App
