import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'athlete' | 'trainer' | 'recruiter' | null;

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  currentAthleteId: string;
  setCurrentAthleteId: (id: string) => void;
  currentTrainerId: string;
  setCurrentTrainerId: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [currentAthleteId, setCurrentAthleteId] = useState('ath-1');
  const [currentTrainerId, setCurrentTrainerId] = useState('trainer-1');

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      currentAthleteId,
      setCurrentAthleteId,
      currentTrainerId,
      setCurrentTrainerId,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
