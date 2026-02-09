import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import Landing from './pages/Landing';
import Login from './pages/Login';
// Athlete
import AthleteDashboard from './pages/AthleteDashboard';
import AICoachPage from './pages/athlete/AICoachPage';
import ProgressPage from './pages/athlete/ProgressPage';
import WorkoutsPage from './pages/athlete/WorkoutsPage';
import AthleteSettingsPage from './pages/athlete/AthleteSettingsPage';
import FilmRoomPage from './pages/athlete/FilmRoomPage';
// Trainer
import TrainerDashboard from './pages/TrainerDashboard';
import AthletesPage from './pages/trainer/AthletesPage';
import VerificationPage from './pages/trainer/VerificationPage';
import PortfolioPage from './pages/trainer/PortfolioPage';
import TrainerSettingsPage from './pages/trainer/TrainerSettingsPage';
// Recruiter
import RecruiterPortal from './pages/RecruiterPortal';
import SearchPage from './pages/recruiter/SearchPage';
import WatchlistPage from './pages/recruiter/WatchlistPage';
import AlertsPage from './pages/recruiter/AlertsPage';
import ReportsPage from './pages/recruiter/ReportsPage';
import RecruiterSettingsPage from './pages/recruiter/RecruiterSettingsPage';
// Parent
import ParentPortal from './pages/ParentPortal';
// 404
import NotFound from './pages/NotFound';

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
            <Route path="/athlete/workouts" element={<WorkoutsPage />} />
            <Route path="/athlete/progress" element={<ProgressPage />} />
            <Route path="/athlete/ai-coach" element={<AICoachPage />} />
            <Route path="/athlete/film-room" element={<FilmRoomPage />} />
            <Route path="/athlete/settings" element={<AthleteSettingsPage />} />
            <Route path="/athlete/*" element={<AthleteDashboard />} />
            {/* Trainer routes */}
            <Route path="/trainer" element={<TrainerDashboard />} />
            <Route path="/trainer/athletes" element={<AthletesPage />} />
            <Route path="/trainer/verification" element={<VerificationPage />} />
            <Route path="/trainer/portfolio" element={<PortfolioPage />} />
            <Route path="/trainer/settings" element={<TrainerSettingsPage />} />
            <Route path="/trainer/*" element={<TrainerDashboard />} />
            {/* Recruiter routes */}
            <Route path="/recruiter" element={<RecruiterPortal />} />
            <Route path="/recruiter/search" element={<SearchPage />} />
            <Route path="/recruiter/watchlist" element={<WatchlistPage />} />
            <Route path="/recruiter/alerts" element={<AlertsPage />} />
            <Route path="/recruiter/reports" element={<ReportsPage />} />
            <Route path="/recruiter/settings" element={<RecruiterSettingsPage />} />
            <Route path="/recruiter/*" element={<RecruiterPortal />} />
            {/* Parent portal */}
            <Route path="/parent" element={<ParentPortal />} />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
