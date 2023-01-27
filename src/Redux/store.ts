import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartSlice from './cartSlice'
import detailsSlice from './detailsSlice'
import mainSlice from './mainSlice'

export const store = configureStore({
	reducer: {
		main: mainSlice,
		cart: cartSlice,
		details: detailsSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()