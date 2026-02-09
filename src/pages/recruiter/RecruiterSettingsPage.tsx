import { RECRUITERS } from '../../lib/mockData';
import SettingsPage from '../shared/SettingsPage';

export default function RecruiterSettingsPage() {
  const recruiter = RECRUITERS[0];
  return (
    <SettingsPage
      role="recruiter"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      userEmail={recruiter.email}
    />
  );
}
