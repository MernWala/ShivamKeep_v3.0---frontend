import { Navigate, Outlet } from 'react-router';
import { useLoginWithTokenQuery } from '../store/rtk/auth.api';
import { useAppSelector } from '../store/hooks';

export function ProtectedRoute() {
    const { user } = useAppSelector((state) => state.auth);

    const { data: response, isLoading, isError } = useLoginWithTokenQuery(undefined, {
        skip: !user,
    });

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (isLoading) {
        return <>Authenticating</>;
    }

    if (isError || !response || response.status !== 200) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
}