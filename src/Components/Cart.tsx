import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	addItem,
	countTotalPrice,
	decreaseBookQuantity,
	increaseBookQuantity,
	orderSelector,
	removeBook,
	totalPriceSelector,
	overallSelector,
	discountSelector
} from '../Redux/cartSlice'
import { useAppDispatch } from '../Redux/store'
import { BookType } from '../Types/Types'

export const Cart: React.FC = () => {
	const books = useSelector(orderSelector)
	const totalPrice = useSelector(totalPriceSelector).toFixed(2)
	const discount = useSelector(discountSelector).toFixed(2)
	const overallPrice = useSelector(overallSelector).toFixed(2)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(countTotalPrice())
	}, [books])

	return (
		<section className='shopping-cart pt-5 bg-light'>
			<div className='container'>
				<div className='text-center p-5'>
					<h2 className='text text-primary'>Shopping Cart</h2>
				</div>
				<div className='content bg-white'>
					<div className='row'>
						<div className='col-md-12 col-lg-8'>
							<div className='items m-auto'>
								{books.length === 0 ? (
									<h2 className='text-center fs-2 text-muted py-5'>
										You haven't added anything here :(
									</h2>
								) : (
									books.map((item) => {
										return (
											<div key={item.isbn13} className='product py-4 px-1'>
												<div className='row'>
													<div className='col-md-3'>
														<img
															className='img-fluid mx-auto d-block image'
															src={item.image}
															alt='Product'
														/>
													</div>
													<div className='col-md-8'>
														<div className='info text-center text-md-left pt-md-2'>
															<div className='row'>
																<div className='col-md-5 product-name fw-bold'>
																	<div className='product-name'>
																		<Link
																			to={`/book/${item.isbn13}`}
																			className='fs-5 text-decoration-none text-primary hover::text-info'
																		>
																			{item.title}
																		</Link>
																		<div className='product-info mt-3'>
																			<div>
																				ISBN:{' '}
																				<span className='value fw-normal'>
																					{item.isbn13}
																				</span>
																			</div>
																		</div>
																	</div>
																</div>
																<div className='d-flex gap-1 col-sm-4 col-6 px-xxl-4 mx-auto quantity'>
																	<button
																		className='btn btn-danger minus'
																		disabled={item.quantity < 2 ? true : false}
																		onClick={() => {
																			dispatch(
																				decreaseBookQuantity(item.isbn13)
																			)
																		}}
																	>
																		-
																	</button>

																	<input
																		type='number'
																		className='form-control count d-inline'
																		value={item.quantity}
																		readOnly
																	/>

																	<button
																		className='btn btn-primary plus'
																		onClick={() => {
																			console.log(item)

																			dispatch(
																				increaseBookQuantity(item.isbn13)
																			)
																		}}
																	>
																		+
																	</button>
																</div>
																<div className='col-md-3 price fw-bold mt-3 fs-4'>
																	<span>
																		{'$' + item.totalPrice.toFixed(2)}
																	</span>
																	<button
																		onClick={() =>
																			dispatch(removeBook(item.isbn13))
																		}
																		style={{ display: 'block' }}
																		className='btn w-100 text-center pt-5'
																	>
																		<img src='https://img.icons8.com/ios/50/null/delete--v1.png' />
																	</button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										)
									})
								)}
							</div>
						</div>
						<div className='col-md-12 col-lg-4'>
							<div className='summary fs-5 h-100 p-4 bg-info bg-opacity-25 border-top border-primary border-2'>
								<h3 className='fs-3 text-primary text-center py-2'>Summary</h3>
								<div className='summary-item p-2'>
									<span className='fw-bold'>Total</span>
									<span className='price'>{'$' + totalPrice}</span>
								</div>
								<div className='summary-item p-2'>
									<span className=' fw-bold'>Discount</span>
									<span className='price'>{'$' + discount}</span>
								</div>
								<div className='summary-item p-2'>
									<span className='fw-bold'>Shipping</span>
									<span className='price'>$0</span>
								</div>
								<div className='summary-item p-2'>
									<span className='fw-bold'>Overall</span>
									<span className='price'>
										{totalPrice > discount ? '$' + overallPrice : '$0'}
									</span>
								</div>
								<button
									type='button'
									className='btn btn-primary btn-lg mt-4 btn-block'
								>
									Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
