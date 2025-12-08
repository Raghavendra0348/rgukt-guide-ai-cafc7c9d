import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ShieldAlert, LayoutDashboard } from "lucide-react";
import { mockGetSession } from "@/lib/mock-auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndRole();
  }, []);

  const checkAuthAndRole = async () => {
    const { session } = await mockGetSession();

    if (!session) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    // Check if user has admin role
    const isAdminUser = session.user.role === 'admin';
    setIsAdmin(isAdminUser);
  };

  // Show loading state
  if (isAuthenticated === null || (isAuthenticated && isAdmin === null)) {
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

  // Show authentication required
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2b2929] via-gray-900 to-[#2b2929] flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full shadow-xl bg-gray-800 border-gray-700">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Authentication Required
              </h2>
              <p className="text-gray-400 mb-6">
                Please sign in as an administrator to access this page
              </p>
              <Button
                onClick={() => navigate('/admin-auth')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Admin Sign In
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2b2929] via-gray-900 to-[#2b2929] flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full shadow-xl bg-gray-800 border-gray-700">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Access Denied
              </h2>
              <p className="text-gray-400 mb-6">
                You don't have administrator privileges to access this page
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Go to Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Go Home
                </Button>
              </div>
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
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-purple-500/20">
              <LayoutDashboard className="w-4 h-4" />
              Admin Dashboard
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              System Management
            </h1>
            <p className="text-gray-400">
              Manage and monitor the Medha AI platform effectively.
            </p>
          </div>

          {/* Admin Dashboard Content */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <LayoutDashboard className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Admin Dashboard
                </h3>
                <p className="text-gray-400 mb-6">
                  System management and monitoring features coming soon.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    View Dashboard
                  </Button>
                  <Button
                    onClick={() => navigate('/chat')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Go to Chat
                  </Button>
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
