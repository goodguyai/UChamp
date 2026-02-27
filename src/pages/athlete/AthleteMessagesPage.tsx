import { ATHLETES } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import MessagesPage from '../shared/MessagesPage';

export default function AthleteMessagesPage() {
  const user = getStoredUser();
  const athlete = ATHLETES.find(a => a.id === user?.id) || ATHLETES[0];
  return (
    <MessagesPage
      role="athlete"
      userId={athlete.id}
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
    />
  );
}
