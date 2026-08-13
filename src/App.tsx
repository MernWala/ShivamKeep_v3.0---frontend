import { Routes, Route, Navigate, HashRouter } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <HashRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route path="/auth" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}