import { ATHLETES } from '../../lib/mockData';
import MessagesPage from '../shared/MessagesPage';

export default function AthleteMessagesPage() {
  const athlete = ATHLETES[0];
  return (
    <MessagesPage
      role="athlete"
      userId={athlete.id}
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
    />
  );
}
