import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function  ProtectedRoute() {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);

    if(!isAuth) {
        console.log('redirect')
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}