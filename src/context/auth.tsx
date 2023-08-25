import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from 'utils/firesbase';

const UserContext = createContext<{
  user: User | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
