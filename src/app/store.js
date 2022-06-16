import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import carsReducer from '../features/carsSlice'
import cartourReducer from '../features/cartourSlice'
import ticketReducer from '../features/ticketSlice'



export const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer,
    cartour: cartourReducer,
    ticket: ticketReducer,
  },

})
