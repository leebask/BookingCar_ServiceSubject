import { createSlice } from '@reduxjs/toolkit'

export const cartourSlice = createSlice({
    name: 'cartour',
    initialState: {
      cartour: [],
    },
    reducers: {
      setCartour: (state, action) => {
        state.cartour = action.payload
      }
    }
  })

  export const { setCartour } = cartourSlice.actions

  export const selectCartour = (state) => state.cartour.cartour

  export default cartourSlice.reducer