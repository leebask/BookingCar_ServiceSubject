import { createSlice } from '@reduxjs/toolkit'

export const carsSlice = createSlice({
    name: 'cars',
    initialState: {
      cars: [],
    },
    reducers: {
      setCars: (state, action) => {
        state.cars = action.payload
      }
    }
  })

  export const { setCars } = carsSlice.actions

  export const selectCars = (state) => state.cars.cars

  export default carsSlice.reducer