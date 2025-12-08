import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  Eye,
  MessageSquare
} from "lucide-react";

// Mock data for demonstration
const mockTickets = [
  {
    id: "TKT-001",
    title: "Hostel room allocation issue",
    category: "Hostel",
    status: "new",
    priority: "high",
    createdAt: "2024-01-15",
    student: "Rahul K.",
  },
  {
    id: "TKT-002",
    title: "Fee payment receipt not received",
    category: "Fees",
    status: "in_review",
    priority: "medium",
    createdAt: "2024-01-14",
    student: "Priya S.",
  },
  {
    id: "TKT-003",
    title: "Library book return issue",
    category: "Library",
    status: "resolved",
    priority: "low",
    createdAt: "2024-01-13",
    student: "Amit R.",
  },
  {
    id: "TKT-004",
    title: "Exam hall ticket correction",
    category: "Examination",
    status: "new",
    priority: "high",
    createdAt: "2024-01-15",
    student: "Sneha M.",
  },
];

const statusConfig = {
  new: { label: "New", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  in_review: { label: "In Review", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  resolved: { label: "Resolved", color: "bg-green-500/10 text-green-600 border-green-500/20" },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", color: "bg-orange-500/10 text-orange-600" },
  high: { label: "High", color: "bg-red-500/10 text-red-600" },
};

const stats = [
  { label: "Total Tickets", value: 156, icon: FileText, color: "text-primary" },
  { label: "New", value: 23, icon: AlertCircle, color: "text-blue-500" },
  { label: "In Review", value: 18, icon: Clock, color: "text-yellow-500" },
  { label: "Resolved", value: 115, icon: CheckCircle, color: "text-green-500" },
];

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and resolve student complaints and issues.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tickets Table */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Recent Tickets</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "new", "in_review", "resolved"].map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                      className="capitalize"
                    >
                      {status === "all" ? "All" : status.replace("_", " ")}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-border/50 hover:bg-muted/50 transition-smooth">
                        <td className="py-4 px-4 text-sm font-mono text-foreground">{ticket.id}</td>
                        <td className="py-4 px-4 text-sm text-foreground max-w-xs truncate">{ticket.title}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{ticket.category}</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={statusConfig[ticket.status as keyof typeof statusConfig].color}>
                            {statusConfig[ticket.status as keyof typeof statusConfig].label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="secondary" className={priorityConfig[ticket.priority as keyof typeof priorityConfig].color}>
                            {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{ticket.student}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredTickets.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No tickets found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
