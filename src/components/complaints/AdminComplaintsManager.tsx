import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
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
  Save
} from "lucide-react";
import { getAllComplaints, updateComplaintStatus, type Complaint } from "@/lib/complaints-api";
import { format } from "date-fns";
import { toast } from "sonner";

const statusConfig = {
  open: {
    label: "Open",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    icon: AlertCircle
  },
  in_progress: {
    label: "In Progress",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    icon: Clock
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    icon: CheckCircle
  },
  closed: {
    label: "Closed",
    color: "bg-gray-500/10 text-gray-600 border-gray-500/20",
    icon: CheckCircle
  },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-gray-100 text-gray-700" },
  medium: { label: "Medium", color: "bg-orange-100 text-orange-700" },
  high: { label: "High", color: "bg-red-100 text-red-700" },
  urgent: { label: "Urgent", color: "bg-red-500 text-white" },
};

export function AdminComplaintsManager() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Complaint['status']>("open");
  const [adminResponse, setAdminResponse] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    console.log('🔄 AdminComplaintsManager: Loading complaints...');
    setLoading(true);
    const data = await getAllComplaints();
    console.log('📊 AdminComplaintsManager: Received data:', data);
    console.log('📊 AdminComplaintsManager: Data length:', data.length);
    setComplaints(data);
    setLoading(false);
    console.log('✅ AdminComplaintsManager: State updated, loading complete');
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

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  console.log('🔍 AdminComplaintsManager Render:', {
    totalComplaints: complaints.length,
    filteredComplaints: filteredComplaints.length,
    loading,
    searchQuery,
    statusFilter
  });

  // Stats
  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'open').length,
    in_progress: complaints.filter(c => c.status === 'in_progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open</p>
                <p className="text-3xl font-bold text-blue-600">{stats.open}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.in_progress}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>All Complaints</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No complaints found</p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => {
              const statusInfo = statusConfig[complaint.status];
              const priorityInfo = priorityConfig[complaint.priority];
              const StatusIcon = statusInfo.icon;

              return (
                <Card
                  key={complaint.id}
                  className="hover:shadow-lg transition-all border-l-4"
                  style={{
                    borderLeftColor:
                      complaint.status === 'open' ? '#3b82f6' :
                        complaint.status === 'in_progress' ? '#eab308' :
                          complaint.status === 'resolved' ? '#22c55e' :
                            '#6b7280'
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">
                            {complaint.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            #{complaint.id.slice(0, 8)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className={statusInfo.color}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          <Badge className={priorityInfo.color}>
                            {priorityInfo.label}
                          </Badge>
                          <Badge variant="secondary">
                            {complaint.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => openUpdateDialog(complaint)}
                      >
                        Manage
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {complaint.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(complaint.created_at), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        User ID: {complaint.user_id.slice(0, 8)}
                      </div>
                    </div>

                    {complaint.admin_response && (
                      <div className="mt-3 pt-3 border-t bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-foreground mb-1">
                          Previous Response:
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {complaint.admin_response}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Complaint</DialogTitle>
            <DialogDescription>
              Update the status and provide a response for this complaint
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Complaint Details</h4>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="font-medium">{selectedComplaint.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedComplaint.description}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Badge>{selectedComplaint.category}</Badge>
                    <Badge className={priorityConfig[selectedComplaint.priority].color}>
                      {priorityConfig[selectedComplaint.priority].label}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={newStatus} onValueChange={(value: any) => setNewStatus(value)}>
                  <SelectTrigger>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Response</label>
                <Textarea
                  placeholder="Provide a response to the student..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateComplaint}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Complaint
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
