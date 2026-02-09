import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AthleteDashboard from './pages/AthleteDashboard';
import AICoachPage from './pages/athlete/AICoachPage';
import ProgressPage from './pages/athlete/ProgressPage';
import TrainerDashboard from './pages/TrainerDashboard';
import RecruiterPortal from './pages/RecruiterPortal';
import SearchPage from './pages/recruiter/SearchPage';
import WatchlistPage from './pages/recruiter/WatchlistPage';
import AlertsPage from './pages/recruiter/AlertsPage';
import ReportsPage from './pages/recruiter/ReportsPage';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            {/* Athlete routes */}
            <Route path="/athlete" element={<AthleteDashboard />} />
            <Route path="/athlete/ai-coach" element={<AICoachPage />} />
            <Route path="/athlete/progress" element={<ProgressPage />} />
            <Route path="/athlete/*" element={<AthleteDashboard />} />
            {/* Trainer routes */}
            <Route path="/trainer" element={<TrainerDashboard />} />
            <Route path="/trainer/*" element={<TrainerDashboard />} />
            {/* Recruiter routes */}
            <Route path="/recruiter" element={<RecruiterPortal />} />
            <Route path="/recruiter/search" element={<SearchPage />} />
            <Route path="/recruiter/watchlist" element={<WatchlistPage />} />
            <Route path="/recruiter/alerts" element={<AlertsPage />} />
            <Route path="/recruiter/reports" element={<ReportsPage />} />
            <Route path="/recruiter/*" element={<RecruiterPortal />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
