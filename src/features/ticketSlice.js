import { createSlice } from '@reduxjs/toolkit'

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
      ticket: [
        {
            maVe: "Ve00001",
            maCX: "CX01",
            tenKH: "Pho Vi",
            email: "phovi56@gmail.com",
            sdt: "0777664353",
            maGhe: "A01",
            trangThai: 1,
            ghiChu: "thich gan em",
          }],
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