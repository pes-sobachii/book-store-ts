import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { addItem } from '../Redux/cartSlice'
import { useAppDispatch } from '../Redux/store'
import { BookType } from '../Types/Types'

const ProductCard: React.FC<{
	item: BookType
}> = ({ item }) => {
	const { image, title, subtitle, isbn13 } = item
	const dispatch = useAppDispatch()

	return (
		<div className='col-xl-3 col-lg-4 col-sm-6 col-12 py-lg-1 py-3'>
			<Card
				style={{ width: '17rem', height: '30rem' }}
				className={'product-card bg-light text-center mx-auto p-3 p-relative'}
			>
				<div className='img-wrapper mx-auto'>
					<Card.Img
						src={image}
						className='img-fluid mx-auto object-fit-cover'
					/>
				</div>
				<Card.Body>
					<Card.Title style={{ fontSize: '14px' }}>{title}</Card.Title>
					<Card.Text style={{ fontSize: '12px' }}>{subtitle}</Card.Text>
					<div
						style={{ left: '0', bottom: '0', position: 'absolute' }}
						className='buttons-wrapper w-100 pb-4'
					>
						<Link to={`/book/${isbn13}`} className='link-details'>
							<Button variant='info' className='mx-1'>
								Read More
							</Button>
						</Link>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default ProductCard
