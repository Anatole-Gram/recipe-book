import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitUser, setUserData, loginUser } from "./userThunks";
import type { NewUserResponse } from "./userThunks";
import type  { RequestProperty, User, DBUser, DBUserLogged } from "../store.types";
import { saveToken } from "@/utils/auth/authStorage";


interface userState {
    isAuth: boolean;
    authInitialized: boolean;
    data: User;
    requests: {
        submitUser: RequestProperty;
        userByid: RequestProperty;
        login: RequestProperty
    };
};


const initialState: userState = {
    isAuth: false,
    authInitialized: false,
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
        },        
        userByid: {
            status: '',
            error: null
        },
        login: {
            status: '',
            error: null
        },
    }
}



const userSlice = createSlice({
    name: 'user-slice', 
    initialState, 
    reducers:  {
        setAuthInitialized: (state, action: PayloadAction<boolean>) => {
            state.authInitialized = action.payload;
        }, 
        resetUserData: (state) => {
            state.isAuth = false;
            state.data = { id: 0, name: '', img: '', log: '' }
    },
        },
    extraReducers: (builder) => {
        builder
        //Create user and login
        .addCase(submitUser.pending, (state) => {
            state.requests.submitUser.status = 'loading';
            state.requests.submitUser.error = null;           
        })
        .addCase(submitUser.fulfilled, (state, action: PayloadAction<NewUserResponse>) =>{
            state.requests.submitUser.status = 'succeeded';
            state.data = action.payload.user;
            state.isAuth = true;
            saveToken(action.payload.user.id.toString())
        })

        .addCase(submitUser.rejected, (state, action) =>{
            state.requests.submitUser.status = 'faild';
            state.requests.submitUser.error = (action.payload as string) ?? action.error?.message ?? 'Uncnown error';
        })
        //loginByToken
        .addCase(setUserData.pending, (state) => {
            state.requests.userByid.status = 'loading';
            state.requests.userByid.error = null;     
        })
        .addCase(setUserData.fulfilled, (state, action: PayloadAction<DBUser>) => {
            state.requests.userByid.status = 'succeeded';
            const {id, name, img, auth} = action.payload;
            state.data = {id, name, img, log: auth.log};
            state.isAuth = true;
        })
        .addCase(setUserData.rejected, (state, action) => {
            state.requests.userByid.status = 'faild';
            state.requests.userByid.error = (action.payload as string) ?? action.error?.message ?? 'Uncnown error';
        }) 
        //loginByPass
        .addCase(loginUser.pending, (state) => {
            state.requests.login.status = 'loading';
            state.requests.login.error = null;    
        })
        .addCase(loginUser.fulfilled,  (state, action: PayloadAction<DBUserLogged>) => {
            state.requests.login.status = 'succeeded';
            const {id, name, img, log} = action.payload.user;
            state.data = {id, name, img, log};
            saveToken(id.toString())
            state.isAuth = true;
        })
        .addCase(loginUser.rejected,  (state, action) => {
            state.requests.login.status = 'faild';
            state.requests.login.error = (action.payload as string) ?? action.error?.message ?? 'Uncnown error';  
        })
    }
});

export const { setAuthInitialized, resetUserData } = userSlice.actions;
export default userSlice.reducer;