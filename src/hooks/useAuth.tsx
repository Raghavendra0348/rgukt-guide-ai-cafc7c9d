import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { MockUser } from '@/lib/mock-data';
import {
  mockSignUp,
  mockSignIn,
  mockSignOut,
  mockGetSession,
  onMockAuthStateChange,
  isAdminUser,
  triggerAuthStateChange
} from '@/lib/mock-auth';

type AppRole = 'admin' | 'student';

interface MockSession {
  user: MockUser;
  expires_at: string;
}

interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  loading: boolean;
  role: AppRole | null;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AppRole | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const subscription = onMockAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setRole(session?.user?.role ?? null);
      setLoading(false);
    });

    // Check for existing session
    mockGetSession().then(({ session }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setRole(session?.user?.role ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { user, error } = await mockSignUp(email, password, fullName);

    if (user) {
      triggerAuthStateChange('SIGNED_IN');
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { user, error } = await mockSignIn(email, password);

    if (user) {
      triggerAuthStateChange('SIGNED_IN');
    }

    return { error };
  };

  const signOut = async () => {
    await mockSignOut();
    triggerAuthStateChange('SIGNED_OUT');
  };

  const value = {
    user,
    session,
    loading,
    role,
    isAdmin: isAdminUser(user),
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
