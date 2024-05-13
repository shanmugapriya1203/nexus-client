import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        updateSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading=false,
            state.error=null
        },
        updateFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        deleteUserStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser = null
            state.loading=false,
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        signoutSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        }
    },
   


});

export const { signInStart, signoutSuccess,signInSuccess, signInFailure,updateStart,updateSuccess,updateFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure } = userSlice.actions; // Correct export of action creators

export default userSlice.reducer;