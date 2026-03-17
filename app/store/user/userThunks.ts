import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

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
                return data as NewUserResponse;
            } catch (err: any) {
                return rejectWithValue(err?.message || 'Network error');
            }
        }
    );