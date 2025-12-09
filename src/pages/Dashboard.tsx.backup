import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  Activity
} from "lucide-react";

const stats = [
  {
    title: "Total Chats",
    value: "1,247",
    change: "+12%",
    icon: MessageCircle,
    gradient: "from-purple-500 to-blue-500"
  },
  {
    title: "Active Issues",
    value: "23",
    change: "-8%",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "Resolved Today",
    value: "15",
    change: "+22%",
    icon: CheckCircle,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Active Users",
    value: "342",
    change: "+5%",
    icon: Users,
    gradient: "from-violet-500 to-purple-500"
  },
];

const recentActivities = [
  {
    id: "ACT-001",
    title: "New AI Chat Session Started",
    category: "Activity",
    status: "Active",
    priority: "Low",
    date: "Dec 8, 2024",
    time: "2:30 PM",
    description: "User initiated a new conversation with Medha AI assistant.",
    user: "Student A"
  },
  {
    id: "ACT-002",
    title: "Blog Article Viewed",
    category: "Content",
    status: "Completed",
    priority: "Low",
    date: "Dec 8, 2024",
    time: "1:15 PM",
    description: "Campus Facilities Guide article was accessed.",
    user: "Student B"
  },
  {
    id: "ACT-003",
    title: "Dashboard Accessed",
    category: "System",
    status: "Completed",
    priority: "Low",
    date: "Dec 7, 2024",
    time: "11:45 AM",
    description: "User logged in and viewed dashboard statistics.",
    user: "Student C"
  },
  {
    id: "ACT-004",
    title: "Voice Query Processed",
    category: "AI",
    status: "Completed",
    priority: "Medium",
    date: "Dec 7, 2024",
    time: "9:00 AM",
    description: "Voice input query was successfully processed and answered.",
    user: "Student D"
  },
  {
    id: "ACT-005",
    title: "Knowledge Base Searched",
    category: "Search",
    status: "Completed",
    priority: "Low",
    date: "Dec 6, 2024",
    time: "4:20 PM",
    description: "User searched for information about campus facilities.",
    user: "Student E"
  },
  {
    id: "ACT-006",
    title: "Multilingual Chat Used",
    category: "AI",
    status: "Completed",
    priority: "Medium",
    date: "Dec 5, 2024",
    time: "3:10 PM",
    description: "User successfully used Hindi language support in chat.",
    user: "Student F"
  },
];

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <LayoutDashboard className="w-4 h-4" />
              Admin Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Monitor complaints, track statistics, and manage campus issues
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
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
                      <Badge className={`${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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

          {/* Recent Activity Section */}
          <Card className="border-purple-100 shadow-lg animate-slide-up animation-delay-400">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-purple-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Monitor platform usage and user interactions
                  </CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Updates
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const StatusIcon = getStatusIcon(activity.status);
                  return (
                    <div
                      key={activity.id}
                      className="p-6 border-2 border-purple-100 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm animate-slide-up"
                      style={{ animationDelay: `${(index + 5) * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-purple-100 text-purple-700 font-mono">
                              {activity.id}
                            </Badge>
                            <Badge className={getStatusColor(activity.status) + " border"}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {activity.status}
                            </Badge>
                            <Badge className={getPriorityColor(activity.priority)}>
                              {activity.priority}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {activity.user}
                            </span>
                            <span>•</span>
                            <span className="font-medium">{activity.category}</span>
                            <span>•</span>
                            <span>{activity.date} at {activity.time}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-sm border-2 border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-purple-100">
                <p className="text-sm text-gray-600">
                  Showing 6 recent activities
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border-2 border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                    Next
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
