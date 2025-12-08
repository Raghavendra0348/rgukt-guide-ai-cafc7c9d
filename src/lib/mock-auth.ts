// Mock authentication utilities
import {
  findUserByEmail,
  createMockUser,
  setMockSession,
  clearMockSession,
  getMockSession,
  getCurrentMockUser,
  type MockUser
} from './mock-data';

export interface MockAuthResult {
  user: MockUser | null;
  error: Error | null;
}

export interface MockAuthSession {
  user: MockUser;
  expires_at: string;
}

// Sign up a new user
export async function mockSignUp(
  email: string,
  password: string,
  fullName: string
): Promise<MockAuthResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return {
      user: null,
      error: new Error('User already registered')
    };
  }

  // Create new user
  const newUser = createMockUser(email, password, fullName, 'student');

  // Auto sign in
  setMockSession(newUser.id, newUser.email);

  return {
    user: newUser,
    error: null
  };
}

// Sign in existing user
export async function mockSignIn(
  email: string,
  password: string
): Promise<MockAuthResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = findUserByEmail(email);

  if (!user) {
    return {
      user: null,
      error: new Error('Invalid email or password')
    };
  }

  if (user.password !== password) {
    return {
      user: null,
      error: new Error('Invalid email or password')
    };
  }

  // Set session
  setMockSession(user.id, user.email);

  return {
    user,
    error: null
  };
}

// Sign out
export async function mockSignOut(): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  clearMockSession();
}

// Get current session
export async function mockGetSession(): Promise<{ session: MockAuthSession | null }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const session = getMockSession();
  const user = getCurrentMockUser();

  if (!session || !user) {
    return { session: null };
  }

  return {
    session: {
      user,
      expires_at: session.expires_at
    }
  };
}

// Get current user
export async function mockGetUser(): Promise<{ user: MockUser | null }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const user = getCurrentMockUser();
  return { user };
}

// Check if user is admin
export function isAdminUser(user: MockUser | null): boolean {
  return user?.role === 'admin';
}

// Auth state change listener (mock)
export type AuthStateChangeCallback = (event: 'SIGNED_IN' | 'SIGNED_OUT', session: MockAuthSession | null) => void;

let authListeners: AuthStateChangeCallback[] = [];

export function onMockAuthStateChange(callback: AuthStateChangeCallback) {
  authListeners.push(callback);

  // Call immediately with current state
  const user = getCurrentMockUser();
  const session = getMockSession();

  if (user && session) {
    callback('SIGNED_IN', { user, expires_at: session.expires_at });
  } else {
    callback('SIGNED_OUT', null);
  }

  // Return unsubscribe function
  return {
    unsubscribe: () => {
      authListeners = authListeners.filter(l => l !== callback);
    }
  };
}

// Trigger auth state change (internal use)
export function triggerAuthStateChange(event: 'SIGNED_IN' | 'SIGNED_OUT') {
  const user = getCurrentMockUser();
  const session = getMockSession();

  const sessionData = (event === 'SIGNED_IN' && user && session)
    ? { user, expires_at: session.expires_at }
    : null;

  authListeners.forEach(listener => {
    listener(event, sessionData);
  });
}
