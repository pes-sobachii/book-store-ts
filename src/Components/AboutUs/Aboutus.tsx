import React from 'react'
import './AboutUs.css'
import { FaFacebookSquare, FaTwitterSquare, FaMailBulk } from 'react-icons/fa'

const AboutUs = () => {
	const iconStyle: React.CSSProperties = {
		boxShadow: '0 0 3px rgba(0, 0, 0, .2)',
		padding: '0',
		margin: '0 15px',
	}
	const liStyle: React.CSSProperties = {
		margin: '0',
		padding: '0',
		display: 'inline-block',
	}

	return (
		<div className='mt-2 py-5 h-100'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-5 col-12'>
						<div className='about-img mb-3 w-100'>
							<img
								className='img-fluid'
								src='https://i.etsystatic.com/11642726/r/il/23aa43/2806731225/il_fullxfull.2806731225_aeq9.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className='col-lg-7 col-12'>
						<div className='about-title clearfix'>
							<h1 className='fs-1'>
								About <span className='fw-bold text-primary'>eBooks</span>
							</h1>
							<h3 className='muted fs-5 my-4'>
								Discover new books & authors at great prices.
							</h3>
							<p className='pb-2' style={{ lineHeight: '1.9' }}>
								EBooks is a direct, honest, fun, and reliable source for knowing
								what to read and what is new in the worlds of programming books.
								We're always striving to connect developers more seamlessly with
								the tools and information they need to easily build projects.
								Our constant quest for innovation starts here, with you.{' '}
							</p>
							<p style={{ lineHeight: '1.9' }}>
								As computing becomes a mainstream discipline embedded in the
								school curriculum and acts as an enabler for an increasing range
								of academic disciplines in higher education, the literature on
								introductory programming is growing. Programming is one of the
								most sought-after professional fields in the world. It presents
								candidates with a galore of opportunities to learn and earn. It,
								however, requires continuous learning and what can be better
								than books to learn from!
							</p>
							<div className='about-icons my-5'>
								<ul className='p-1 text-center'>
									<li style={liStyle}>
										<a href='https://www.facebook.com/'>
											<FaFacebookSquare
												id='social-fb'
												style={iconStyle}
												size={50}
											/>
										</a>{' '}
									</li>
									<li style={liStyle}>
										<a href='https://twitter.com/'>
											<FaTwitterSquare
												id='social-tw'
												style={iconStyle}
												size={50}
											/>
										</a>{' '}
									</li>
									<li style={liStyle}>
										{' '}
										<a href='mailto:bootsnipp@gmail.com'>
											<FaMailBulk id='social-em' style={iconStyle} size={50} />
										</a>{' '}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutUs
