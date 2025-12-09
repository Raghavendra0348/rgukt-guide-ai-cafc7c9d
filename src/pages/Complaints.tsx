import { useState, useEffect } from "react";
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
  MessageSquare,
  Upload,
  X,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { submitComplaint, getUserComplaints, type Complaint } from "@/lib/complaints-api";



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
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("submit");
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user complaints on mount and when user changes
  useEffect(() => {
    if (user) {
      loadComplaints();
    }
  }, [user]);

  const loadComplaints = async () => {
    setLoading(true);
    const userComplaints = await getUserComplaints();
    setComplaints(userComplaints);
    setLoading(false);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };
  
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    
    try {
      const complaintData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        attachment_data: uploadedImages.length > 0 ? uploadedImages[0] : undefined,
        attachment_name: uploadedImages.length > 0 ? "complaint-image.jpg" : undefined,
      };

      const result = await submitComplaint(complaintData);
      
      if (result) {
        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          priority: "medium",
        });
        setUploadedImages([]);
        
        // Reload complaints to show the new one
        await loadComplaints();
        
        // Switch to list tab to show the new complaint
        setActiveTab("list");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect admin to dashboard (admins shouldn't access complaints page)
  if (user && isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full shadow-xl bg-white border-purple-100">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Admin Access Restricted
              </h2>
              <p className="text-gray-600 mb-6">
                Admins cannot submit complaints. Please use the dashboard to manage existing complaints.
              </p>
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full shadow-xl bg-white border-purple-100">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Authentication Required
              </h2>
              <p className="text-gray-600 mb-6">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-purple-200 shadow-sm">
              <FileText className="w-4 h-4" />
              Complaint Portal
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Submit & Track Complaints
            </h1>
            <p className="text-gray-600">
              Report issues and track their resolution status effectively.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white border border-purple-200 shadow-sm">
              <TabsTrigger value="submit" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                <Plus className="w-4 h-4 mr-2" />
                Submit Complaint
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                <FileText className="w-4 h-4 mr-2" />
                My Complaints
              </TabsTrigger>
            </TabsList>

            {/* Submit Complaint Tab */}
            <TabsContent value="submit" className="mt-6">
              <Card className="bg-white border-purple-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Submit a New Complaint</CardTitle>
                  <CardDescription className="text-gray-600">
                    Fill out the form below to report an issue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-700 font-medium">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-gray-700 font-medium">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200">
                            <SelectItem value="infrastructure">🏗️ Infrastructure</SelectItem>
                            <SelectItem value="academic">📚 Academic</SelectItem>
                            <SelectItem value="hostel">🏠 Hostel</SelectItem>
                            <SelectItem value="mess">🍽️ Mess</SelectItem>
                            <SelectItem value="transport">🚌 Transport</SelectItem>
                            <SelectItem value="other">📋 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-gray-700 font-medium">Priority</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                        >
                          <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200">
                            <SelectItem value="low">🟢 Low</SelectItem>
                            <SelectItem value="medium">🟡 Medium</SelectItem>
                            <SelectItem value="high">🔴 High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-700 font-medium">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about the issue..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[150px]"
                        required
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">Attach Images (Optional)</Label>
                      <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 bg-purple-50/50 hover:bg-purple-50 transition-colors">
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-3">
                            <Upload className="w-6 h-6 text-purple-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Click to upload images
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>

                      {/* Image Preview Grid */}
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-purple-200 shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700">
                                Image {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
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
                  <Card className="bg-white border-purple-100 shadow-lg">
                    <CardContent className="pt-12 pb-12 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-10 h-10 text-purple-600" />
                      </div>
                      <p className="text-gray-600 text-lg mb-2">No complaints found</p>
                      <p className="text-gray-500 text-sm mb-6">Start by submitting your first complaint</p>
                      <Button
                        onClick={() => setActiveTab("submit")}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                      >
                        <Plus className="w-4 h-4 mr-2" />
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
                        className="bg-white border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all shadow-md"
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className={statusInfo.color + " border-2"}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusInfo.label}
                                </Badge>
                                <Badge className={priorityInfo.color + " font-medium"}>
                                  {priorityInfo.label}
                                </Badge>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border border-purple-200">
                                  {complaint.category}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {complaint.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
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

                              {/* Display complaint image if available */}
                              {complaint.attachment_data && (
                                <div className="mt-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <ImageIcon className="w-4 h-4 text-purple-600" />
                                    <p className="text-xs font-medium text-gray-700">Attached Image:</p>
                                  </div>
                                  <div className="relative group">
                                    <img
                                      src={complaint.attachment_data}
                                      alt={complaint.attachment_name || "Complaint attachment"}
                                      className="w-full max-w-md h-auto rounded-lg border-2 border-purple-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                      onClick={() => window.open(complaint.attachment_data, '_blank')}
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-lg pointer-events-none"></div>
                                  </div>
                                  {complaint.attachment_name && (
                                    <p className="text-xs text-gray-500 mt-1">📎 {complaint.attachment_name}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {complaint.admin_response && (
                            <div className="mt-4 pt-4 border-t border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <MessageSquare className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-semibold text-purple-700 mb-1">
                                    Admin Response:
                                  </p>
                                  <p className="text-sm text-gray-700 leading-relaxed">
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
