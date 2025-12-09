import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  FileText,
  Calendar,
  User,
  MessageSquare,
  Save,
  Edit,
  Image as ImageIcon,
  Filter,
  XCircle,
  TrendingUp,
  Activity,
  ZoomIn
} from "lucide-react";
import { getAllComplaints, updateComplaintStatus, type Complaint } from "@/lib/complaints-api";
import { toast } from "sonner";

const statusConfig = {
  open: {
    label: "Open",
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    icon: AlertCircle
  },
  in_progress: {
    label: "In Progress",
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    icon: Clock
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-500/10 text-green-700 border-green-200",
    icon: CheckCircle
  },
  closed: {
    label: "Closed",
    color: "bg-gray-500/10 text-gray-700 border-gray-200",
    icon: XCircle
  },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-gray-100 text-gray-700 border-gray-300" },
  medium: { label: "Medium", color: "bg-orange-100 text-orange-700 border-orange-300" },
  high: { label: "High", color: "bg-red-100 text-red-700 border-red-300" },
  urgent: { label: "Urgent", color: "bg-red-500 text-white border-red-600" },
};

const categoryEmojis: Record<string, string> = {
  infrastructure: "🏗️",
  academic: "📚",
  hostel: "🏠",
  mess: "🍽️",
  transport: "🚌",
  other: "📋"
};

export function AdminComplaintsManager() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [newStatus, setNewStatus] = useState<Complaint['status']>("open");
  const [adminResponse, setAdminResponse] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    setLoading(true);
    const data = await getAllComplaints();
    setComplaints(data);
    setLoading(false);
  };

  const handleUpdateComplaint = async () => {
    if (!selectedComplaint) return;

    setUpdating(true);
    const result = await updateComplaintStatus(
      selectedComplaint.id,
      newStatus,
      adminResponse || undefined
    );

    if (result) {
      toast.success("Complaint updated successfully");
      setIsDialogOpen(false);
      setSelectedComplaint(null);
      setAdminResponse("");
      loadComplaints();
    }

    setUpdating(false);
  };

  const openUpdateDialog = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setAdminResponse(complaint.admin_response || "");
    setIsDialogOpen(true);
  };

  const openImageDialog = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageDialogOpen(true);
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  // Stats
  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'open').length,
    in_progress: complaints.filter(c => c.status === 'in_progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Complaints</p>
                <p className="text-4xl font-bold text-purple-700">{stats.total}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Open</p>
                <p className="text-4xl font-bold text-blue-700">{stats.open}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-200 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-4xl font-bold text-yellow-700">{stats.in_progress}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <p className="text-4xl font-bold text-green-700">{stats.resolved}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints Management */}
      <Card className="shadow-xl border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-purple-600" />
                  Complaints Management
                </CardTitle>
                <CardDescription className="mt-1">
                  View, filter, and manage all student complaints
                </CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-lg">
                {filteredComplaints.length} of {complaints.length}
              </Badge>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-purple-200 focus:border-purple-400"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white border-purple-200">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-white border-purple-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="infrastructure">🏗️ Infrastructure</SelectItem>
                  <SelectItem value="academic">📚 Academic</SelectItem>
                  <SelectItem value="hostel">🏠 Hostel</SelectItem>
                  <SelectItem value="mess">🍽️ Mess</SelectItem>
                  <SelectItem value="transport">🚌 Transport</SelectItem>
                  <SelectItem value="other">📋 Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-white border-purple-200">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg mb-2">No complaints found</p>
              <p className="text-gray-400 text-sm">
                {complaints.length === 0 ? 'No complaints have been submitted yet' : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => {
                const statusInfo = statusConfig[complaint.status];
                const priorityInfo = priorityConfig[complaint.priority];
                const StatusIcon = statusInfo.icon;

                return (
                  <Card
                    key={complaint.id}
                    className="hover:shadow-xl transition-all duration-300 border-l-4 bg-gradient-to-r from-white to-gray-50"
                    style={{
                      borderLeftColor:
                        complaint.status === 'open' ? '#3b82f6' :
                        complaint.status === 'in_progress' ? '#eab308' :
                        complaint.status === 'resolved' ? '#22c55e' :
                        '#6b7280'
                    }}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-purple-100 text-purple-700 font-mono text-xs px-3 py-1">
                              #{complaint.id.slice(0, 8)}
                            </Badge>
                            <Badge className={`${statusInfo.color} border px-3 py-1`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                            <Badge className={`${priorityInfo.color} border px-3 py-1`}>
                              {priorityInfo.label} Priority
                            </Badge>
                            <Badge variant="outline" className="px-3 py-1">
                              {categoryEmojis[complaint.category]} {complaint.category}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {complaint.title}
                          </h3>
                        </div>
                        <Button
                          size="lg"
                          onClick={() => openUpdateDialog(complaint)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Manage
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {complaint.description}
                      </p>

                      {/* Image */}
                      {complaint.attachment_data && (
                        <div className="mb-4">
                          <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Attached Image:
                          </Label>
                          <div className="relative group inline-block">
                            <img
                              src={complaint.attachment_data}
                              alt={complaint.attachment_name || "Complaint attachment"}
                              className="w-full max-w-md h-auto rounded-lg border-2 border-purple-200 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                              onClick={() => openImageDialog(complaint.attachment_data!)}
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          {complaint.attachment_name && (
                            <p className="text-xs text-gray-500 mt-2">📎 {complaint.attachment_name}</p>
                          )}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Submitted: {formatDate(complaint.created_at)}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          User: {complaint.user_id.slice(0, 12)}
                        </div>
                      </div>

                      {/* Admin Response */}
                      {complaint.admin_response && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-blue-700" />
                            <p className="text-sm font-bold text-blue-700">Admin Response:</p>
                          </div>
                          <p className="text-sm text-blue-900 leading-relaxed">
                            {complaint.admin_response}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Manage Complaint</DialogTitle>
            <DialogDescription>
              Update the status and provide a response for this complaint
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-6 py-4">
              {/* Complaint Details */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                <h4 className="font-bold text-lg mb-4 text-purple-900">Complaint Details</h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-600">ID</Label>
                    <p className="font-mono text-sm">#{selectedComplaint.id}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Title</Label>
                    <p className="font-semibold text-lg">{selectedComplaint.title}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Description</Label>
                    <p className="text-gray-700">{selectedComplaint.description}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Badge className={statusConfig[selectedComplaint.status].color}>
                      {statusConfig[selectedComplaint.status].label}
                    </Badge>
                    <Badge className={priorityConfig[selectedComplaint.priority].color}>
                      {priorityConfig[selectedComplaint.priority].label}
                    </Badge>
                    <Badge variant="outline">
                      {categoryEmojis[selectedComplaint.category]} {selectedComplaint.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Update Status</Label>
                <Select value={newStatus} onValueChange={(value: any) => setNewStatus(value)}>
                  <SelectTrigger className="text-base h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Admin Response */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Admin Response</Label>
                <Textarea
                  placeholder="Provide a detailed response to the student..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  className="min-h-[150px] text-base"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={updating}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateComplaint}
              disabled={updating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6"
            >
              {updating ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Complaint Image</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Complaint attachment"
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
