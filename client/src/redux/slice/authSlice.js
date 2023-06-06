import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    password: null,
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            console.log(action.payload);
            const { email, password } = action.payload
            state.isLoggedIn = true;
            state.email = email;
            state.password = password;

        },

        REMOVE_ACTIVE_USER(state, action) {
            state.isLoggedIn = false;
            state.email = null;
            state.password = null;

        }
    },

});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectPassword = (state) => state.auth.password;

export default authSlice.reducer