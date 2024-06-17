import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSucess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { loginStart, loginSucess, loginFailure } = userSlice.actions;
export default userSlice.reducer