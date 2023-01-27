import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BookType, CartBookType, SearchedBookType } from '../Types/Types'
import { RootState } from './store'

interface initialCartStateType {
	order: CartBookType[]
	totalPrice: number
	discount: number
	overall: number
}

const initialState: initialCartStateType = {
	order: [],
	totalPrice: 0,
	discount: Math.random() * 20,
	overall: 0,
}

const cartSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		addItem: (state, { payload }) => {
			const isInState = state.order.some(
				(item) => item.isbn13 === payload.book.isbn13
			)

			if (!isInState) {
				state.order.push({
					...payload.book,
					quantity: payload.quantity,
					totalPrice: payload.quantity * payload.book.price,
				})
			} else {
				state.order = state.order.map((item) => {
					if (item.isbn13 === payload.book.isbn13) {
						const quantity = item.quantity + payload.quantity
						const totalPrice = quantity * item.price
						return { ...item, quantity, totalPrice }
						console.log(item)
					}
					return item
				})
				
			}
		},
		increaseBookQuantity: (state, { payload }) => {
			state.order = state.order.map((item) =>
				item.isbn13 === payload
					? { ...item, quantity: (item.quantity += 1), totalPrice: item.totalPrice + item.price }
					: item
			)
		},
		decreaseBookQuantity: (state, { payload }) => {
			state.order = state.order.map((item) =>
				item.isbn13 === payload
					? {
							...item,
							quantity: (item.quantity -= 1),
							totalPrice: item.totalPrice - item.price,
					  }
					: item
			)
		},
		countTotalPrice: (state) => {
			state.totalPrice = state.order.reduce((acc, item) => {
				return acc + item.totalPrice
			}, 0)
			state.overall = state.totalPrice - state.discount
		},
		removeBook: (state, {payload}) => {
			state.order = state.order.filter((item) => item.isbn13 !== payload)
		},
	},
})

export const {
	addItem,
	increaseBookQuantity,
	decreaseBookQuantity,
	countTotalPrice,
	removeBook,
} = cartSlice.actions

export const orderSelector = (state: RootState) => state.cart.order
export const totalPriceSelector = (state: RootState) => state.cart.totalPrice
export const discountSelector = (state: RootState) => state.cart.discount
export const overallSelector = (state: RootState) => state.cart.overall

export default cartSlice.reducer
