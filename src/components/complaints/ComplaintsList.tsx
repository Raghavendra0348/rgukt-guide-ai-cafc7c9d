import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  FileText,
  Calendar
} from "lucide-react";
import { getUserComplaints, type Complaint } from "@/lib/complaints-api";
import { format } from "date-fns";

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

export function ComplaintsList() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    setLoading(true);
    const data = await getUserComplaints();
    setComplaints(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Complaints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (complaints.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No complaints submitted yet</p>
            <p className="text-sm text-muted-foreground">
              Submit a complaint using the form above to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Complaints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {complaints.map((complaint) => {
            const statusInfo = statusConfig[complaint.status];
            const priorityInfo = priorityConfig[complaint.priority];
            const StatusIcon = statusInfo.icon;

            return (
              <Card
                key={complaint.id}
                className="cursor-pointer hover:shadow-lg transition-all border-l-4"
                style={{
                  borderLeftColor:
                    complaint.status === 'open' ? '#3b82f6' :
                      complaint.status === 'in_progress' ? '#eab308' :
                        complaint.status === 'resolved' ? '#22c55e' :
                          '#6b7280'
                }}
                onClick={() => setSelectedComplaint(
                  selectedComplaint?.id === complaint.id ? null : complaint
                )}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {complaint.title}
                        </h3>
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
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComplaint(
                          selectedComplaint?.id === complaint.id ? null : complaint
                        );
                      }}
                    >
                      <Eye className="w-4 h-4" />
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
                    {complaint.resolved_at && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Resolved {format(new Date(complaint.resolved_at), 'MMM dd, yyyy')}
                      </div>
                    )}
                  </div>

                  {/* Expanded view */}
                  {selectedComplaint?.id === complaint.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          Full Description
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {complaint.description}
                        </p>
                      </div>

                      {complaint.admin_response && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Admin Response
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {complaint.admin_response}
                          </p>
                        </div>
                      )}

                      {complaint.attachment_url && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">
                            Attachment
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(complaint.attachment_url, '_blank')}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Attachment
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function MessageSquare({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
