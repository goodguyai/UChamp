import { TRAINERS } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import MessagesPage from '../shared/MessagesPage';

export default function TrainerMessagesPage() {
  const user = getStoredUser();
  const trainer = TRAINERS.find(t => t.id === user?.id) || TRAINERS[0];
  return (
    <MessagesPage
      role="trainer"
      userId={trainer.id}
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
    />
  );
}
