import { createSlice } from '@reduxjs/toolkit'

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
      ticket: [],
    },
    reducers: {
      setticket: (state, action) => {
        state.ticket = action.payload
      }
    }
  })

  export const { setticket } = ticketSlice.actions

  export const selectticket = (state) => state.ticket.ticket

  export default ticketSlice.reducer