import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitUser } from "./userThunks";
import type { NewUserResponse } from "./userThunks";
import type  { RequestProperty, User } from "../store.types";


interface userState {
    userIsAuth: boolean;
    data: User;
    requests: {
        submitUser: RequestProperty;
    };
};


const initialState: userState = {
    userIsAuth: false,
    data: {
        id: 0,
        name: '',
        img: '',
        log: ''
    },
    requests: {
        submitUser: {
            status: '',
            error: null
        }
    }
}

const userSlice = createSlice({
    name: 'user-slice', 
    initialState, 
    reducers:  {

    }, 
    extraReducers: (builder) => {
        builder
        .addCase(submitUser.pending, (state) => {
            state.requests.submitUser.status = 'loading recipes';
            state.requests.submitUser.error = null;           
        })
        .addCase(submitUser.fulfilled, (state, action: PayloadAction<NewUserResponse>) =>{
            state.requests.submitUser.status = 'succeeded';
            state.data = action.payload.user;
        })

        .addCase(submitUser.rejected, (state, action) =>{
            state.requests.submitUser.status = 'faild';
            state.requests.submitUser.error = (action.payload as string) ?? action.error?.message ?? 'Uncnown error';
        })
    }
});


export default userSlice.reducer;