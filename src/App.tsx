import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RouteGuard from './components/auth/RouteGuard';
// Athlete
import AthleteDashboard from './pages/AthleteDashboard';
import AICoachPage from './pages/athlete/AICoachPage';
import ProgressPage from './pages/athlete/ProgressPage';
import WorkoutsPage from './pages/athlete/WorkoutsPage';
import AthleteSettingsPage from './pages/athlete/AthleteSettingsPage';
import FilmRoomPage from './pages/athlete/FilmRoomPage';
import CombinePrepPage from './pages/athlete/CombinePrepPage';
import AthleteMessagesPage from './pages/athlete/AthleteMessagesPage';
// Trainer
import TrainerDashboard from './pages/TrainerDashboard';
import AthletesPage from './pages/trainer/AthletesPage';
import VerificationPage from './pages/trainer/VerificationPage';
import PortfolioPage from './pages/trainer/PortfolioPage';
import TrainerSettingsPage from './pages/trainer/TrainerSettingsPage';
import TrainerMessagesPage from './pages/trainer/TrainerMessagesPage';
// Recruiter
import RecruiterPortal from './pages/RecruiterPortal';
import SearchPage from './pages/recruiter/SearchPage';
import WatchlistPage from './pages/recruiter/WatchlistPage';
import AlertsPage from './pages/recruiter/AlertsPage';
import ReportsPage from './pages/recruiter/ReportsPage';
import RecruiterSettingsPage from './pages/recruiter/RecruiterSettingsPage';
import ComparePage from './pages/recruiter/ComparePage';
import AthleteProfilePage from './pages/recruiter/AthleteProfilePage';
import AthleteDetailPage from './pages/trainer/AthleteDetailPage';
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
            <Route path="/signup" element={<Signup />} />
            {/* Athlete routes */}
            <Route path="/athlete" element={<RouteGuard role="athlete"><AthleteDashboard /></RouteGuard>} />
            <Route path="/athlete/workouts" element={<RouteGuard role="athlete"><WorkoutsPage /></RouteGuard>} />
            <Route path="/athlete/progress" element={<RouteGuard role="athlete"><ProgressPage /></RouteGuard>} />
            <Route path="/athlete/ai-coach" element={<RouteGuard role="athlete"><AICoachPage /></RouteGuard>} />
            <Route path="/athlete/film-room" element={<RouteGuard role="athlete"><FilmRoomPage /></RouteGuard>} />
            <Route path="/athlete/combine-prep" element={<RouteGuard role="athlete"><CombinePrepPage /></RouteGuard>} />
            <Route path="/athlete/messages" element={<RouteGuard role="athlete"><AthleteMessagesPage /></RouteGuard>} />
            <Route path="/athlete/settings" element={<RouteGuard role="athlete"><AthleteSettingsPage /></RouteGuard>} />
            <Route path="/athlete/*" element={<RouteGuard role="athlete"><AthleteDashboard /></RouteGuard>} />
            {/* Trainer routes */}
            <Route path="/trainer" element={<RouteGuard role="trainer"><TrainerDashboard /></RouteGuard>} />
            <Route path="/trainer/athletes" element={<RouteGuard role="trainer"><AthletesPage /></RouteGuard>} />
            <Route path="/trainer/verification" element={<RouteGuard role="trainer"><VerificationPage /></RouteGuard>} />
            <Route path="/trainer/portfolio" element={<RouteGuard role="trainer"><PortfolioPage /></RouteGuard>} />
            <Route path="/trainer/messages" element={<RouteGuard role="trainer"><TrainerMessagesPage /></RouteGuard>} />
            <Route path="/trainer/athlete/:id" element={<RouteGuard role="trainer"><AthleteDetailPage /></RouteGuard>} />
            <Route path="/trainer/settings" element={<RouteGuard role="trainer"><TrainerSettingsPage /></RouteGuard>} />
            <Route path="/trainer/*" element={<RouteGuard role="trainer"><TrainerDashboard /></RouteGuard>} />
            {/* Recruiter routes */}
            <Route path="/recruiter" element={<RouteGuard role="recruiter"><RecruiterPortal /></RouteGuard>} />
            <Route path="/recruiter/search" element={<RouteGuard role="recruiter"><SearchPage /></RouteGuard>} />
            <Route path="/recruiter/compare" element={<RouteGuard role="recruiter"><ComparePage /></RouteGuard>} />
            <Route path="/recruiter/athlete/:id" element={<RouteGuard role="recruiter"><AthleteProfilePage /></RouteGuard>} />
            <Route path="/recruiter/watchlist" element={<RouteGuard role="recruiter"><WatchlistPage /></RouteGuard>} />
            <Route path="/recruiter/alerts" element={<RouteGuard role="recruiter"><AlertsPage /></RouteGuard>} />
            <Route path="/recruiter/reports" element={<RouteGuard role="recruiter"><ReportsPage /></RouteGuard>} />
            <Route path="/recruiter/settings" element={<RouteGuard role="recruiter"><RecruiterSettingsPage /></RouteGuard>} />
            <Route path="/recruiter/*" element={<RouteGuard role="recruiter"><RecruiterPortal /></RouteGuard>} />
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
