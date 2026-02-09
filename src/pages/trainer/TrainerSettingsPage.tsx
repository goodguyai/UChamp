import { TRAINERS } from '../../lib/mockData';
import SettingsPage from '../shared/SettingsPage';

export default function TrainerSettingsPage() {
  const trainer = TRAINERS[0];
  return (
    <SettingsPage
      role="trainer"
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
      userEmail={trainer.email}
    />
  );
}
