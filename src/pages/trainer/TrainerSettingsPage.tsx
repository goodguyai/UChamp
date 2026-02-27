import { TRAINERS } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import SettingsPage from '../shared/SettingsPage';

export default function TrainerSettingsPage() {
  const user = getStoredUser();
  const trainer = TRAINERS.find(t => t.id === user?.id) || TRAINERS[0];
  return (
    <SettingsPage
      role="trainer"
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
      userEmail={trainer.email}
    />
  );
}
