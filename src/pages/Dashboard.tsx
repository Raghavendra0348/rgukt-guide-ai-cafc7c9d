import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  Calendar,
  Image as ImageIcon
} from "lucide-react";
import { getAllComplaintsPublic, type Complaint } from "@/lib/complaints-api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Static stats that don't change based on complaints
const staticStats = {
  totalChats: { value: "1,247", change: "+12%" },
  activeUsers: { value: "342", change: "+5%" },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "In Progress":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Resolved":
      return "bg-green-100 text-green-700 border-green-200";
    case "Closed":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-orange-100 text-orange-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Open":
      return AlertCircle;
    case "In Progress":
      return Clock;
    case "Resolved":
      return CheckCircle;
    case "Closed":
      return XCircle;
    default:
      return FileText;
  }
};

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  useEffect(() => {
    if (user) {
      console.log('🔍 Dashboard: User detected, loading complaints...');
      loadComplaintsData();
    } else {
      console.log('⚠️ Dashboard: No user detected, skipping complaints load');
      setLoading(false);
    }
  }, [user]);

  const loadComplaintsData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Dashboard: Loading complaints...');
      console.log('👤 Current user:', user);
      
      // Load all complaints for everyone to see (transparency)
      const complaintsData = await getAllComplaintsPublic();
      
      console.log('✅ Dashboard: Received complaints:', complaintsData.length);
      console.log('📋 Complaints data:', complaintsData);
      
      setComplaints(complaintsData);
      setLoading(false);
    } catch (error) {
      console.error('❌ Dashboard: Error loading complaints:', error);
      setLoading(false);
    }
  };

  // Calculate real-time stats from complaints
  const getStats = () => {
    const totalComplaints = complaints.length;
    const activeIssues = complaints.filter(c => c.status === 'open' || c.status === 'in_progress').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;
    
    // Calculate resolved today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const resolvedToday = complaints.filter(c => {
      if (c.resolved_at) {
        const resolvedDate = new Date(c.resolved_at);
        resolvedDate.setHours(0, 0, 0, 0);
        return resolvedDate.getTime() === today.getTime();
      }
      return false;
    }).length;

    return [
      {
        title: "Total Complaints",
        value: totalComplaints.toString(),
        change: totalComplaints > 0 ? `${totalComplaints} total` : "No data",
        icon: FileText,
        gradient: "from-purple-500 to-blue-500"
      },
      {
        title: "Active Issues",
        value: activeIssues.toString(),
        change: activeIssues > 0 ? "In Progress" : "All Clear",
        icon: AlertCircle,
        gradient: "from-blue-500 to-indigo-500"
      },
      {
        title: "Resolved",
        value: resolvedComplaints.toString(),
        change: resolvedToday > 0 ? `${resolvedToday} today` : "None today",
        icon: CheckCircle,
        gradient: "from-indigo-500 to-purple-500"
      },
      {
        title: "Active Users",
        value: staticStats.activeUsers.value,
        change: staticStats.activeUsers.change,
        icon: Users,
        gradient: "from-violet-500 to-purple-500"
      },
    ];
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Filter complaints based on selected filters
  const getFilteredComplaints = () => {
    return complaints.filter(complaint => {
      const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
      const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
      
      return matchesStatus && matchesCategory && matchesPriority;
    });
  };

  const filteredComplaints = getFilteredComplaints();

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full bg-white border-purple-100 shadow-lg">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Authentication Required
              </h2>
              <p className="text-gray-600 mb-6">
                Please sign in to access the dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <LayoutDashboard className="w-4 h-4" />
              {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              {isAdmin 
                ? 'Monitor all complaints, track statistics, and manage campus issues' 
                : 'View all campus complaints, track statistics, and see what issues are being reported'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {getStats().map((stat, index) => {
              const Icon = stat.icon;
              const isPositive = stat.change.includes('+') || stat.change.includes('total') || stat.change.includes('today');
              const isNeutral = stat.change.includes('No data') || stat.change.includes('None') || stat.change.includes('All Clear');
              
              return (
                <Card
                  key={stat.title}
                  className="border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={`${isPositive ? 'bg-green-100 text-green-700' : isNeutral ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'}`}>
                        {stat.change}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Complaints Section - Hidden for Admin */}
          {!isAdmin && (
            <Card className="border-purple-100 shadow-lg animate-slide-up animation-delay-400">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-purple-600" />
                      All Campus Complaints
                    </CardTitle>
                    <CardDescription className="mt-2">
                      View all complaints submitted by students across the campus
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
                    <FileText className="w-4 h-4 mr-2" />
                    {filteredComplaints.length} of {complaints.length}
                  </Badge>
                </div>

                {/* Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-purple-100">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-white border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">🔴 Open</SelectItem>
                        <SelectItem value="in_progress">🟡 In Progress</SelectItem>
                        <SelectItem value="resolved">🟢 Resolved</SelectItem>
                        <SelectItem value="closed">⚫ Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="bg-white border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Categories</SelectItem>
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
                    <Label className="text-sm font-medium text-gray-700">Priority</Label>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="bg-white border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="low">🟢 Low</SelectItem>
                        <SelectItem value="medium">🟡 Medium</SelectItem>
                        <SelectItem value="high">🔴 High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading complaints...</p>
                  </div>
                ) : filteredComplaints.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {complaints.length === 0 ? 'No complaints submitted yet' : 'No complaints match your filters'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {complaints.length === 0 ? 'Submit a complaint to get started' : 'Try adjusting the filters above'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredComplaints.map((complaint, index) => {
                      const StatusIcon = getStatusIcon(complaint.status === 'open' ? 'Open' : complaint.status === 'in_progress' ? 'In Progress' : complaint.status === 'resolved' ? 'Resolved' : 'Closed');
                      const statusLabel = complaint.status === 'open' ? 'Open' : complaint.status === 'in_progress' ? 'In Progress' : complaint.status === 'resolved' ? 'Resolved' : 'Closed';
                      const priorityLabel = complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1);
                      
                      return (
                        <div
                          key={complaint.id}
                          className="p-6 border-2 border-purple-100 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm animate-slide-up"
                          style={{ animationDelay: `${(index + 5) * 100}ms` }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className="bg-purple-100 text-purple-700 font-mono">
                                  {complaint.id}
                                </Badge>
                                <Badge className={getStatusColor(statusLabel) + " border"}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusLabel}
                                </Badge>
                                <Badge className={getPriorityColor(priorityLabel)}>
                                  {priorityLabel}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {complaint.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3">
                                {complaint.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Submitted: {formatDate(complaint.created_at)}
                                </span>
                                <span>•</span>
                                <span className="font-medium capitalize">{complaint.category}</span>
                              </div>

                              {/* Display complaint image if available */}
                              {complaint.attachment_data && (
                                <div className="mt-3">
                                  <p className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                                    <ImageIcon className="w-3 h-3" /> Attached Image:
                                  </p>
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

                              {complaint.admin_response && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <p className="text-xs font-semibold text-blue-700 mb-1">✅ Admin Response:</p>
                                  <p className="text-sm text-blue-900">{complaint.admin_response}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
