import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitUser, setUserData, loginUser, updateUserData } from "./userThunks";
import type { NewUserResponse } from "./userThunks";
import type  { RequestProperty, User, DBUser, DBUserLogged , UpdatedUser} from "../store.types";
import { saveToken } from "@/utils/auth/authStorage";
import { data } from "react-router-dom";


interface userState {
    isAuth: boolean;
    authInitialized: boolean;
    data: User;
    requests: {
        submitUser: RequestProperty;
        updatedata: RequestProperty;
        userByid: RequestProperty;
        login: RequestProperty
    };
};


const userData: User = {
        id: 0,
        name: '',
        img: '',
        log: '',
        recipeIds: [],
    }

const initialState: userState = {
    isAuth: false,
    authInitialized: false,
    data: {
        id: 0,
        name: '',
        img: '',
        log: '',
        recipeIds: [],
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
        updatedata: {
            status: '',
            error: null
        }

    }
}

const setUser = (state: userState, data?: User) => {
    state.data = data ?? userData
};

const userSlice = createSlice({
    name: 'user-slice', 
    initialState, 
    reducers:  {
        setAuthInitialized: (state, action: PayloadAction<boolean>) => {
            state.authInitialized = action.payload;
        }, 
        resetUserData: (state) => {
            state.isAuth = false;
            setUser(state)
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            Object.assign(state.data, action.payload);
        }
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
            state.data = {...action.payload.user, recipeIds: []};
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
            const {id, name, img, auth, recipeIds} = action.payload;
            state.data = {id, name, img, log: auth.log, recipeIds};
            state.isAuth = true;
        })
        .addCase(setUserData.rejected, (state, action) => {
            state.requests.userByid.status = 'faild';
            state.requests.userByid.error = (action.payload as string) ?? action.error?.message ?? 'Uncnown error';
        }) 
        //updateUserData
        .addCase(updateUserData.pending, (state) => {
            state.requests.updatedata.status = 'loading';
            state.requests.updatedata.error = null;     
        })
        .addCase(updateUserData.fulfilled, (state, action: PayloadAction<UpdatedUser>) => {
            state.requests.updatedata.status = 'succeeded';
            const {name, img, updatedAt} = action.payload;
            const update = Object.fromEntries(Object.entries({name, img, updatedAt}).filter(el => Boolean(el[0] && el[1])));
            Object.assign(state.data, update);
        })
        .addCase(updateUserData.rejected, (state, action) => {
            state.requests.updatedata.status = 'faild';
            state.requests.updatedata.error = (action.payload as string) ?? action.error?.message ?? 'Uncnown error';
        }) 
        //loginByPass
        .addCase(loginUser.pending, (state) => {
            state.requests.login.status = 'loading';
            state.requests.login.error = null;    
        })
        .addCase(loginUser.fulfilled,  (state, action: PayloadAction<DBUserLogged>) => {
            state.requests.login.status = 'succeeded';
            const {id, name, img, log} = action.payload.user;
            const {recipeIds} = action.payload.user;
            state.data = {id, name, img, log, recipeIds};
            saveToken(id.toString())
            state.isAuth = true;
        })
        .addCase(loginUser.rejected,  (state, action) => {
            state.requests.login.status = 'faild';
            state.requests.login.error = (action.payload as string) ?? action.error?.message ?? 'Uncnown error';  
        })
    }
});

export const { setAuthInitialized, resetUserData, updateUser } = userSlice.actions;
export default userSlice.reducer;