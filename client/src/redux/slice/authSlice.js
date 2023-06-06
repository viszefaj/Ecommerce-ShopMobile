import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    password: null,
    role: null,
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const { email, password, role } = action.payload
            state.isLoggedIn = true;
            state.email = email;
            state.password = password;
            state.role = role;

        },

        REMOVE_ACTIVE_USER(state, action) {
            state.isLoggedIn = false;
            state.email = null;
            state.password = null;
            state.role = null;

        }
    },

});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectPassword = (state) => state.auth.password;
export const selectRole = (state) => state.auth.role;

export default authSlice.reducer