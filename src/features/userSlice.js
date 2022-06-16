import { createSlice } from '@reduxjs/toolkit'
const email=window.localStorage.getItem('email')
const uid=window.localStorage.getItem('uid')
const displayName=window.localStorage.getItem('displayName')

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: !email && !uid ? null : {
        email,
        uid,
        displayName
      }
    },
    reducers: {
      login: (state, action) => {
        state.user = action.payload
        window.localStorage.setItem('email',action.payload.email)
        window.localStorage.setItem('uid',action.payload.uid)
        window.localStorage.setItem('displayName',action.payload.displayName)
      },
      logout: (state) => {
        state.user = null
        window.localStorage.removeItem('email')
        window.localStorage.removeItem('uid')
        window.localStorage.removeItem('displayName')
      },
    },
  })

  export const { login, logout } = userSlice.actions

  export const selectUser = (state) => state.user.user

  export default userSlice.reducer