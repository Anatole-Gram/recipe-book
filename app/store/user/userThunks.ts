import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { DBUser, DBUserLogged } from "@/store/store.types";

export type BodyResponse = {
        name: string;
        img: string;
        log: string;
        pas: string;
};
export type NewUserResponse = {
    message: string;
    user: {
        id: number;
        name: string;
        img: string;
        log: string;
    };
}

export const submitUser = createAsyncThunk<
    NewUserResponse,
    BodyResponse,
    {state: RootState, rejectValue: string}
    >(
        'user/registrate',
        async (body, {rejectWithValue}) => {
            try {


            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const text = await res.text();
                return rejectWithValue(text || `HTTP ${res.status}`);
            }
                const data = await res.json();
                return data;
            } catch (err: any) {
                return rejectWithValue(err?.message || 'Network error');
            }
        }
    );

export const setUserData = createAsyncThunk<
    DBUser, 
    number,
    {state: RootState, rejectValue: string}>(
        'user/fetchUserData',
        async (id, {rejectWithValue}) => {
            try {
                const res = await fetch(`api/users/${id}`);
                if(!res.ok) {
                    const text = await res.text();
                    return rejectWithValue(text || `HTTP ${res.status}`);
                }
                const data = await res.json();
                return data;
            } catch (err: any) {
                return rejectWithValue(err?.message || 'Network error');
            }
        }
    );


export const loginUser = createAsyncThunk< DBUserLogged, {log: string, pas: string}, {state: RootState, rejectValue: string}>(
    'user/login', 
    async (payload, {rejectWithValue}) => {
        try {
            const res = await fetch(`api/login`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            if(!res.ok) {
                const text = await res.text();
                return rejectWithValue(text || `HTTP ${res.status}`)
            };
            const data = await res.json();
            return data
        } catch (err: any) {
            return rejectWithValue(err?.message || 'Network error');
        }
});