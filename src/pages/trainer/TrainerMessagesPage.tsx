import { TRAINERS } from '../../lib/mockData';
import MessagesPage from '../shared/MessagesPage';

export default function TrainerMessagesPage() {
  const trainer = TRAINERS[0];
  return (
    <MessagesPage
      role="trainer"
      userId={trainer.id}
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
    />
  );
}
