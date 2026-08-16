import { Routes, Route, Navigate, HashRouter } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { Recovery } from './pages/Recovery';

export default function App() {
  return (
    <HashRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route path="/auth">
          <Route index element={<Auth />} />
          <Route path="recover/:token" element={<Recovery />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}