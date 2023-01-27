import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BookType } from '../Types/Types'
import { RootState } from './store'

interface initStateType {
	books: BookType[]
	isLoading: boolean
}

const initialState: initStateType = {
	books: [],
	isLoading: false,
}

export const fetchBooks = createAsyncThunk('main/fetch', async () => {
	const response = await fetch('https://api.itbook.store/1.0/new')
	const data = await response.json()

	return data.books
})

export const fetchByQuery = createAsyncThunk(
	'main/fetchByQuery',
	async (query: string) => {
		const response = await fetch('https://api.itbook.store/1.0/search/' + query)
		const data = await response.json()

		return data.books
	}
)

const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchBooks.pending, (state) => {
			state.isLoading = true
			state.books = []
		})
		builder.addCase(fetchBooks.fulfilled, (state, { payload }) => {
			state.books = payload
			state.isLoading = false
		})
		builder.addCase(fetchBooks.rejected, (state) => {
			state.books = []
			state.isLoading = false
		})
		builder.addCase(fetchByQuery.pending, (state) => {
			state.isLoading = true
			state.books = []
		})
		builder.addCase(fetchByQuery.fulfilled, (state, { payload }) => {
			state.books = payload
			state.isLoading = false
		})
		builder.addCase(fetchByQuery.rejected, (state) => {
			state.books = []
			state.isLoading = false
		})
	},
})

// export const {  } = mainSlice.actions

export const booksSelector = (state: RootState) => state.main.books
export const booksIsLoading = (state: RootState) => state.main.isLoading

export default mainSlice.reducer
