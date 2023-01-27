import { NavLink, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useState } from 'react'
import { fetchBooks, fetchByQuery } from '../Redux/mainSlice'
import { useAppDispatch } from '../Redux/store'
import { Link } from 'react-router-dom'

export const Header = () => {
	const [query, setQuery] = useState('')
	const dispatch = useAppDispatch()
	let navigate = useNavigate()
	const routeChange = () => {
		let path = `/`
		navigate(path)
	}

	return (
		<Navbar bg='info' expand='lg'>
			<Container fluid>
				<Navbar.Brand as={NavLink} to={'/'}>
					eBooks
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav
						className='me-auto my-2 my-lg-0'
						style={{ maxHeight: '100px' }}
						navbarScroll
					>
						<Nav.Link as={NavLink} to={'/'}>
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to={'/cart'}>
							Cart
						</Nav.Link>
						<Nav.Link as={NavLink} to={'/aboutus'}>
							About Us
						</Nav.Link>
					</Nav>
					<Form
						className='d-flex'
						onSubmit={(e) => {
							e.preventDefault()
							routeChange()
							if (query){
								dispatch(fetchByQuery(query))
							} else {
								dispatch(fetchBooks())
							}
						}}
					>
						<Form.Control
							type='search'
							placeholder='Search'
							className='me-2'
							aria-label='Search'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<Button variant='outline-success' type='submit'>
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
