import { ATHLETES } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import SettingsPage from '../shared/SettingsPage';

export default function AthleteSettingsPage() {
  const user = getStoredUser();
  const athlete = ATHLETES.find(a => a.id === user?.id) || ATHLETES[0];
  return (
    <SettingsPage
      role="athlete"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      userEmail={user?.email || 'marcus.johnson@uchamp.com'}
    />
  );
}
