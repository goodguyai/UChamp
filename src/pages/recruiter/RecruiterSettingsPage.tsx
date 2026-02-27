import { RECRUITERS } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import SettingsPage from '../shared/SettingsPage';

export default function RecruiterSettingsPage() {
  const user = getStoredUser();
  const recruiter = RECRUITERS.find(r => r.id === user?.id) || RECRUITERS[0];
  return (
    <SettingsPage
      role="recruiter"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      userEmail={recruiter.email}
    />
  );
}
