import { ATHLETES } from '../../lib/mockData';
import SettingsPage from '../shared/SettingsPage';

export default function AthleteSettingsPage() {
  const athlete = ATHLETES[0];
  return (
    <SettingsPage
      role="athlete"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      userEmail="marcus.johnson@uchamp.com"
    />
  );
}
