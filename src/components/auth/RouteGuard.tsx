import { Navigate } from 'react-router-dom';
import { getStoredUser } from '../../lib/mockAuth';

interface RouteGuardProps {
  role: 'athlete' | 'trainer' | 'recruiter';
  children: React.ReactNode;
}

export default function RouteGuard({ role, children }: RouteGuardProps) {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}
