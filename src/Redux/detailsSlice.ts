import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BookType, initialDetailsStateType, SearchedBookType } from '../Types/Types'
import { RootState } from './store'

const initialState: initialDetailsStateType = {
	book: null,
	quantity: 1,
	isLoading: false,
}

const formatDesc = (desc: string) => {
	//formatting of terribly written description property from the server's data
	desc = desc
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&amp;/g, '&')

	const i = desc.lastIndexOf('. ')
	
	return desc.substring(0, i) + '.'
}

export const fetchBookDetails = createAsyncThunk(
	'details/fetch',
	async (isbn: string) => {
		const response = await fetch(`https://api.itbook.store/1.0/books/${isbn}`)
		const data = await response.json()
		const result = {
			...data,
			desc: formatDesc(data.desc),
			price: Number(data.price.substring(1, data.price.length)),
		}
		return result
	}
)

const detailsSlice = createSlice({
	name: 'details',
	initialState,
	reducers: {
		increaseQuantity: (state) => {
			state.quantity += 1
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBookDetails.pending, (state) => {
			state.isLoading = true
			state.quantity = 0
			state.book = null
		})
		builder.addCase(fetchBookDetails.fulfilled, (state, { payload }) => {
			state.book = payload
			state.quantity = 1
			state.isLoading = false
		})
		builder.addCase(fetchBookDetails.rejected, (state) => {
			state.book = null
			state.quantity = 0
			state.isLoading = false
		})
	},
})

export const { increaseQuantity } = detailsSlice.actions

export const bookDetailsSelector = (state: RootState) => state.details.book
export const bookQuantitySelector = (state: RootState) => state.details.quantity

export default detailsSlice.reducer
