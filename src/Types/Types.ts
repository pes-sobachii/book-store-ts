export interface QueryResultType {
	error: string
	total: string
	books: BookType[]
}

export interface BookType {
	title: string
	subtitle: string
	isbn13: string
	price: string
	image: string
	url: string
	quantity?: number
}

export interface SearchedBookType {
	error: string
	title: string
	subtitle: string
	authors: string
	publisher: string
	language: string
	isbn10: string
	isbn13: string
	pages: string
	year: string
	rating: string
	desc: string
	price: number
	image: string
	url: string
	pdf: BookPdfType
}

export interface CartBookType extends SearchedBookType {
	quantity: number
	totalPrice: number
	// price: number
}

export interface BookPdfType {
	'Chapter 2': string
	'Chapter 5': string
}

export interface initialDetailsStateType {
	book: SearchedBookType | null
	quantity: number
	isLoading: boolean
}
