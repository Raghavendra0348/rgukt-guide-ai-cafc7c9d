// Mock data storage and utilities for frontend-only mode
export interface MockUser {
  id: string;
  email: string;
  password: string;
  full_name: string;
  role: 'admin' | 'student';
  created_at: string;
}

export interface MockComplaint {
  id: string;
  user_id: string;
  category: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachment_url?: string;
  attachment_data?: string; // Base64 encoded file data
  attachment_name?: string;
  admin_response?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

// Initialize default users
export const DEFAULT_USERS: MockUser[] = [
  {
    id: 'admin-001',
    email: 'admin@rgukt.ac.in',
    password: 'admin123',
    full_name: 'Admin User',
    role: 'admin',
    created_at: new Date().toISOString()
  },
  {
    id: 'student-001',
    email: 'student@rgukt.ac.in',
    password: 'student123',
    full_name: 'Test Student',
    role: 'student',
    created_at: new Date().toISOString()
  }
];

// Initialize with sample complaints
export const DEFAULT_COMPLAINTS: MockComplaint[] = [
  {
    id: 'complaint-001',
    user_id: 'student-001',
    category: 'infrastructure',
    title: 'Hostel WiFi Issues',
    description: 'The WiFi connection in Block A hostel is very unstable. It keeps disconnecting every few minutes.',
    status: 'open',
    priority: 'medium',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'complaint-002',
    user_id: 'student-001',
    category: 'academic',
    title: 'Lab Equipment Not Working',
    description: 'Several computers in the Computer Science lab are not functioning properly.',
    status: 'in_progress',
    priority: 'high',
    admin_response: 'We are working on fixing the computers. Should be resolved by next week.',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// LocalStorage keys
const STORAGE_KEYS = {
  USERS: 'mock_users',
  COMPLAINTS: 'mock_complaints',
  SESSION: 'mock_session',
  CURRENT_USER: 'mock_current_user'
};

// Initialize localStorage with default data if empty
export function initializeMockData() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMPLAINTS)) {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(DEFAULT_COMPLAINTS));
  }
}

// Users
export function getMockUsers(): MockUser[] {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : DEFAULT_USERS;
}

export function saveMockUsers(users: MockUser[]) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function findUserByEmail(email: string): MockUser | null {
  const users = getMockUsers();
  return users.find(u => u.email === email) || null;
}

export function findUserById(id: string): MockUser | null {
  const users = getMockUsers();
  return users.find(u => u.id === id) || null;
}

export function createMockUser(email: string, password: string, fullName: string, role: 'admin' | 'student' = 'student'): MockUser {
  const users = getMockUsers();
  const newUser: MockUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email,
    password,
    full_name: fullName,
    role,
    created_at: new Date().toISOString()
  };
  users.push(newUser);
  saveMockUsers(users);
  return newUser;
}

// Complaints
export function getMockComplaints(): MockComplaint[] {
  const data = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
  return data ? JSON.parse(data) : DEFAULT_COMPLAINTS;
}

export function saveMockComplaints(complaints: MockComplaint[]) {
  localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
}

export function createMockComplaint(complaint: Omit<MockComplaint, 'id' | 'created_at' | 'updated_at'>): MockComplaint {
  const complaints = getMockComplaints();
  const newComplaint: MockComplaint = {
    ...complaint,
    id: `complaint-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  complaints.push(newComplaint);
  saveMockComplaints(complaints);
  return newComplaint;
}

export function updateMockComplaint(id: string, updates: Partial<MockComplaint>): MockComplaint | null {
  const complaints = getMockComplaints();
  const index = complaints.findIndex(c => c.id === id);
  if (index === -1) return null;

  complaints[index] = {
    ...complaints[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  saveMockComplaints(complaints);
  return complaints[index];
}

export function deleteMockComplaint(id: string): boolean {
  const complaints = getMockComplaints();
  const filtered = complaints.filter(c => c.id !== id);
  if (filtered.length === complaints.length) return false;
  saveMockComplaints(filtered);
  return true;
}

// Session management
export interface MockSession {
  user_id: string;
  email: string;
  expires_at: string;
}

export function getMockSession(): MockSession | null {
  const data = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!data) return null;

  const session = JSON.parse(data) as MockSession;
  // Check if session expired
  if (new Date(session.expires_at) < new Date()) {
    clearMockSession();
    return null;
  }
  return session;
}

export function setMockSession(userId: string, email: string) {
  const session: MockSession = {
    user_id: userId,
    email,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
  };
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));

  // Also store current user for quick access
  const user = findUserById(userId);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }
}

export function clearMockSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export function getCurrentMockUser(): MockUser | null {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

// Utility to reset all mock data
export function resetMockData() {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
  localStorage.removeItem(STORAGE_KEYS.SESSION);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  initializeMockData();
}

// Initialize on import
initializeMockData();
