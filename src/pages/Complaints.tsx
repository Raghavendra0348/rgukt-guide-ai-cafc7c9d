import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Send,
  Plus,
  User,
  Calendar,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "resolved" | "closed";
  created_at: string;
  updated_at: string;
  admin_response?: string;
}

const statusConfig = {
  open: { label: "Open", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: AlertCircle },
  in_progress: { label: "In Progress", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock },
  resolved: { label: "Resolved", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle },
  closed: { label: "Closed", color: "bg-gray-500/10 text-gray-600 border-gray-500/20", icon: CheckCircle },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-gray-100 text-gray-700" },
  medium: { label: "Medium", color: "bg-orange-100 text-orange-700" },
  high: { label: "High", color: "bg-red-100 text-red-700" },
};

export default function Complaints() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("submit");
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  
  const [submitting, setSubmitting] = useState(false);
  
  // Mock complaints data
  const [complaints] = useState<Complaint[]>([
    {
      id: "CMP-001",
      title: "Hostel WiFi Issues",
      description: "The WiFi connection in Block A hostel is very unstable. It keeps disconnecting every few minutes.",
      category: "infrastructure",
      priority: "medium",
      status: "open",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "CMP-002",
      title: "Lab Equipment Not Working",
      description: "Several computers in the Computer Science lab are not functioning properly.",
      category: "academic",
      priority: "high",
      status: "in_progress",
      admin_response: "We are working on fixing the computers. Should be resolved by next week.",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Complaint submitted successfully!", {
        description: "We'll review your complaint and get back to you soon."
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "medium",
      });
      
      setSubmitting(false);
      setActiveTab("list");
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2b2929] via-gray-900 to-[#2b2929] flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2b2929] via-gray-900 to-[#2b2929] flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full shadow-xl bg-gray-800 border-gray-700">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Authentication Required
              </h2>
              <p className="text-gray-400 mb-6">
                Please sign in to submit and view complaints
              </p>
              <Button 
                onClick={() => window.location.href = '/student-auth'}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b2929] via-gray-900 to-[#2b2929] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-purple-500/20">
              <FileText className="w-4 h-4" />
              Complaint Portal
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Submit & Track Complaints
            </h1>
            <p className="text-gray-400">
              Report issues and track their resolution status effectively.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-800 border border-gray-700">
              <TabsTrigger value="submit" className="data-[state=active]:bg-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Submit Complaint
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-purple-600">
                <FileText className="w-4 h-4 mr-2" />
                My Complaints
              </TabsTrigger>
            </TabsList>

            {/* Submit Complaint Tab */}
            <TabsContent value="submit" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Submit a New Complaint</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below to report an issue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-gray-900 border-gray-700 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="hostel">Hostel</SelectItem>
                          <SelectItem value="mess">Mess</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-white">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about the issue..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-gray-900 border-gray-700 text-white min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {submitting ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Complaint
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Complaints Tab */}
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {complaints.length === 0 ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-12 pb-12 text-center">
                      <FileText className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                      <p className="text-gray-400">No complaints found</p>
                      <Button
                        onClick={() => setActiveTab("submit")}
                        className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600"
                      >
                        Submit Your First Complaint
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  complaints.map((complaint) => {
                    const statusInfo = statusConfig[complaint.status];
                    const priorityInfo = priorityConfig[complaint.priority];
                    const StatusIcon = statusInfo.icon;

                    return (
                      <Card
                        key={complaint.id}
                        className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all"
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className={statusInfo.color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusInfo.label}
                                </Badge>
                                <Badge className={priorityInfo.color}>
                                  {priorityInfo.label}
                                </Badge>
                                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                                  {complaint.category}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-white mb-2">
                                {complaint.title}
                              </h3>
                              <p className="text-sm text-gray-400 mb-3">
                                {complaint.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(complaint.created_at)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  ID: {complaint.id}
                                </div>
                              </div>
                            </div>
                          </div>

                          {complaint.admin_response && (
                            <div className="mt-4 pt-4 border-t border-gray-700">
                              <div className="flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 text-purple-400 mt-1" />
                                <div>
                                  <p className="text-xs font-semibold text-purple-400 mb-1">
                                    Admin Response:
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    {complaint.admin_response}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
