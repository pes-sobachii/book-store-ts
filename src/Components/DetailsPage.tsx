import React, { useEffect, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addItem } from '../Redux/cartSlice'
import { bookDetailsSelector, bookQuantitySelector, fetchBookDetails, increaseQuantity } from '../Redux/detailsSlice'
import { useAppDispatch } from '../Redux/store'
import { BookType } from '../Types/Types'

const DetailsPage: React.FC = () => {
	const { isbn } = useParams<'isbn'>()
	const dispatch = useAppDispatch()
	const book = useSelector(bookDetailsSelector)
	const quantity = useSelector(bookQuantitySelector)
	const [isAdded, setIsAdded] = useState<boolean>(false)
	const toggleToast = () => {
		setIsAdded(false)
	}

	useEffect(() => {
		if (isbn !== undefined) {
			dispatch(fetchBookDetails(isbn))
			console.log(isbn, 'reached')
		}
	}, [])

	if (!book) {
		return <>"Loading..."</>
	}

	return (
		<div className='container container-fluid mt-5'>
			<div className='row f-flex justify-content-around'>
				<div className='col-12 text-center col-lg-6 img-fluid mt-4'>
					<img src={book.image} alt={book.title} className='w-75' />
				</div>

				<div className='col-12 col-lg-6 mt-5'>
					<h3>{book.title}</h3>
					<p className='text-muted'>{book.isbn13}</p>

					<hr />

					<p>
						Status: <span className='stock_status fs-5 fw-bold'>In Stock</span>
					</p>

					<hr />

					<h4 className='mt-2'>Description:</h4>
					<p>{book.desc}</p>

					<hr />

					<p className='fs-2'>{'$' + book.price}</p>
					<hr />
					<div className='d-flex align-items-center justify-content-start flex-column flex-lg-row gap-2'>
						<div className='stockCounter d-inline-flex gap-2'>
							<span className='btn btn-danger minus'>-</span>

							<input
								type='number'
								className='form-control count d-inline'
								value={quantity}
								readOnly
							/>

							<span
								className='btn btn-primary plus'
								onClick={() => dispatch(increaseQuantity())}
							>
								+
							</span>
						</div>
						<button
							type='button'
							id='cart_btn'
							className='btn btn-primary border-0 rounded d-inline py-2 px-4'
							onClick={() => {
								dispatch(
									addItem({
										book,
										quantity,
									})
								)
								setIsAdded(true)
							}}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
			<ToastContainer
				position='top-center'
				className='p-5 mt-3'
				containerPosition='fixed'
			>
				<Toast
					show={isAdded}
					onClose={toggleToast}
					bg='info'
					delay={3000}
					autohide={true}
				>
					<Toast.Header>
						<strong className='me-auto'>(: Success</strong>
					</Toast.Header>
					<Toast.Body>The book was added!</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	)
}

export default DetailsPage
