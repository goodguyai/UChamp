import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import Landing from './pages/Landing';
import AthleteDashboard from './pages/AthleteDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import RecruiterPortal from './pages/RecruiterPortal';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/athlete" element={<AthleteDashboard />} />
            <Route path="/trainer" element={<TrainerDashboard />} />
            <Route path="/recruiter" element={<RecruiterPortal />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
