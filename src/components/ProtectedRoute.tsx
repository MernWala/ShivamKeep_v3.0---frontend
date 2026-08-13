import { Navigate, Outlet } from 'react-router';
import { useLoginWithTokenQuery } from '../store/rtk/auth.api';

export function ProtectedRoute() {
    const { data: response, isLoading, isError } = useLoginWithTokenQuery();
    if (isLoading) {
        return <>Authenticating</>;
    }

    if (isError || !response || response.status !== 200) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
}