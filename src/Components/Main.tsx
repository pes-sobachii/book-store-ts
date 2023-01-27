import React, { useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { booksIsLoading, booksSelector } from '../Redux/mainSlice'
import { BookType } from '../Types/Types'
import ProductCard from './Card'
import DetailsPage from './DetailsPage'

const Main: React.FC = () => {
	const books = useSelector(booksSelector)
	const isLoading = useSelector(booksIsLoading)

	if (isLoading){
		return <h3 className='mt-5 text-center'>Loading...</h3>
	}
		return (
			<div className='container-xxl p-4 mt-5'>
				<div className='row g-xl-5 g-10'>
					{books.length !== 0 ? (
						books.map((item) => <ProductCard key={item.isbn13} item={item} />)
					) : (
						<h3 className='mt-5 text-center'>We couldn't find anything by the query</h3>
					)}
				</div>
			</div>
		)
}

export default Main
