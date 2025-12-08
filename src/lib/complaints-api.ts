// Mock Complaints API - Frontend only implementation
import { toast } from "sonner";
import {
  getMockComplaints,
  createMockComplaint,
  updateMockComplaint,
  deleteMockComplaint,
  getCurrentMockUser,
  findUserById,
  type MockComplaint,
  type MockUser
} from "./mock-data";

export interface Complaint {
  id: string;
  user_id: string;
  category: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachment_url?: string;
  attachment_data?: string;
  attachment_name?: string;
  admin_response?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ComplaintFormData {
  category: string;
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  attachment_url?: string;
  attachment_data?: string;
  attachment_name?: string;
}

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Submit a new complaint
export async function submitComplaint(data: ComplaintFormData): Promise<Complaint | null> {
  try {
    console.log('📝 Submitting complaint...', data);
    await delay(300); // Simulate network delay

    const user = getCurrentMockUser();

    if (!user) {
      console.error('❌ No user found - authentication required');
      toast.error("Authentication required", {
        description: "Please sign in to submit a complaint"
      });
      return null;
    }

    console.log('✅ User authenticated:', user.id);

    const complaintData: Omit<MockComplaint, 'id' | 'created_at' | 'updated_at'> = {
      user_id: user.id,
      category: data.category,
      title: data.title,
      description: data.description,
      priority: data.priority || 'medium',
      status: 'open',
      attachment_url: data.attachment_url,
      attachment_data: data.attachment_data,
      attachment_name: data.attachment_name
    };

    const complaint = createMockComplaint(complaintData);

    console.log('✅ Complaint created:', complaint.id);
    toast.success("Complaint submitted successfully", {
      description: "We'll review your complaint and get back to you soon."
    });

    return complaint;
  } catch (error) {
    console.error('❌ Error submitting complaint:', error);
    toast.error("Failed to submit complaint", {
      description: error instanceof Error ? error.message : "Unknown error"
    });
    return null;
  }
}

// Get user's complaints
export async function getUserComplaints(): Promise<Complaint[]> {
  try {
    console.log('📋 Fetching user complaints...');
    await delay(200); // Simulate network delay

    const user = getCurrentMockUser();

    if (!user) {
      console.error('❌ No user found');
      return [];
    }

    const allComplaints = getMockComplaints();
    const userComplaints = allComplaints.filter(c => c.user_id === user.id);

    // Sort by created_at descending
    userComplaints.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    console.log(`✅ Found ${userComplaints.length} complaints`);
    return userComplaints;
  } catch (error) {
    console.error('❌ Error fetching complaints:', error);
    toast.error("Failed to fetch complaints");
    return [];
  }
}

// Get all complaints (admin only)
export async function getAllComplaints(): Promise<Complaint[]> {
  try {
    console.log('📋 Fetching all complaints (admin)...');
    await delay(200); // Simulate network delay

    const user = getCurrentMockUser();

    if (!user || user.role !== 'admin') {
      console.error('❌ Unauthorized - admin access required');
      toast.error("Unauthorized access");
      return [];
    }

    const complaints = getMockComplaints();

    // Sort by created_at descending
    complaints.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    console.log(`✅ Found ${complaints.length} total complaints`);
    return complaints;
  } catch (error) {
    console.error('❌ Error fetching all complaints:', error);
    toast.error("Failed to fetch complaints");
    return [];
  }
}

// Update complaint status (admin only)
export async function updateComplaintStatus(
  id: string,
  status: Complaint['status'],
  adminResponse?: string
): Promise<Complaint | null> {
  try {
    console.log(`🔄 Updating complaint ${id} status to ${status}...`);
    await delay(200); // Simulate network delay

    const user = getCurrentMockUser();

    if (!user || user.role !== 'admin') {
      console.error('❌ Unauthorized - admin access required');
      toast.error("Unauthorized access");
      return null;
    }

    const updates: Partial<MockComplaint> = { status };
    if (status === 'resolved' || status === 'closed') {
      updates.resolved_at = new Date().toISOString();
    }
    if (adminResponse) {
      updates.admin_response = adminResponse;
    }

    const updated = updateMockComplaint(id, updates);

    if (!updated) {
      toast.error("Complaint not found");
      return null;
    }

    console.log('✅ Status updated successfully');
    toast.success("Status updated successfully");
    return updated;
  } catch (error) {
    console.error('❌ Error updating status:', error);
    toast.error("Failed to update status");
    return null;
  }
}

// Add admin response (admin only)
export async function addAdminResponse(
  id: string,
  response: string
): Promise<Complaint | null> {
  try {
    console.log(`💬 Adding admin response to complaint ${id}...`);
    await delay(200); // Simulate network delay

    const user = getCurrentMockUser();

    if (!user || user.role !== 'admin') {
      console.error('❌ Unauthorized - admin access required');
      toast.error("Unauthorized access");
      return null;
    }

    const updated = updateMockComplaint(id, {
      admin_response: response
    });

    if (!updated) {
      toast.error("Complaint not found");
      return null;
    }

    console.log('✅ Response added successfully');
    toast.success("Response added successfully");
    return updated;
  } catch (error) {
    console.error('❌ Error adding response:', error);
    toast.error("Failed to add response");
    return null;
  }
}

// Upload attachment (mock implementation)
export async function uploadAttachment(
  file: File
): Promise<{ url: string; data: string; name: string } | null> {
  try {
    console.log('📎 Uploading attachment:', file.name);
    await delay(500); // Simulate upload delay

    const user = getCurrentMockUser();

    if (!user) {
      console.error('❌ No user found');
      toast.error("Authentication required");
      return null;
    }

    // Convert file to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const result = {
          url: `mock://attachment/${Date.now()}-${file.name}`,
          data: base64,
          name: file.name
        };
        console.log('✅ File uploaded (mock)');
        toast.success("File uploaded successfully");
        resolve(result);
      };

      reader.onerror = () => {
        console.error('❌ Failed to read file');
        toast.error("Failed to upload file");
        reject(null);
      };

      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('❌ Error uploading attachment:', error);
    toast.error("Failed to upload attachment");
    return null;
  }
}

// Delete complaint (admin only)
export async function deleteComplaint(id: string): Promise<boolean> {
  try {
    console.log(`🗑️ Deleting complaint ${id}...`);
    await delay(200); // Simulate network delay

    const user = getCurrentMockUser();

    if (!user || user.role !== 'admin') {
      console.error('❌ Unauthorized - admin access required');
      toast.error("Unauthorized access");
      return false;
    }

    const success = deleteMockComplaint(id);

    if (!success) {
      toast.error("Complaint not found");
      return false;
    }

    console.log('✅ Complaint deleted successfully');
    toast.success("Complaint deleted successfully");
    return true;
  } catch (error) {
    console.error('❌ Error deleting complaint:', error);
    toast.error("Failed to delete complaint");
    return false;
  }
}

// Get complaint by ID
export async function getComplaintById(id: string): Promise<Complaint | null> {
  try {
    await delay(100); // Simulate network delay

    const complaints = getMockComplaints();
    return complaints.find(c => c.id === id) || null;
  } catch (error) {
    console.error('❌ Error fetching complaint:', error);
    return null;
  }
}
