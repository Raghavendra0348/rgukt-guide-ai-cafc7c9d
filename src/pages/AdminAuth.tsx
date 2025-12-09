import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Mail, Lock, Shield, LayoutDashboard, Users, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminAuth() {
  const navigate = useNavigate();
  const { user, role, signIn, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && !authLoading) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        toast.error("Access Denied", {
          description: "This portal is for administrators only.",
        });
        navigate("/");
      }
    }
  }, [user, role, authLoading, navigate]);

  const validateForm = () => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid credentials", {
            description: "Please check your email and password.",
          });
        } else {
          toast.error("Sign in failed", { description: error.message });
        }
      }
      // Role check happens in useEffect after login
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Left Panel - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-40 right-10 w-60 h-60 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 border-2 border-white rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/rgukt_logo.jpeg"
              alt="RGUKT Logo"
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30"
            />
            <span className="text-2xl font-bold text-white">Medha AI</span>
          </div>
          <p className="text-white/80 text-lg">Admin Portal</p>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-bold text-white leading-tight">
            Secure Admin<br />Dashboard Access
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Manage System</h3>
                <p className="text-white/70 text-sm">Complete control over the platform</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">User Management</h3>
                <p className="text-white/70 text-sm">Oversee students and complaints</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Analytics</h3>
                <p className="text-white/70 text-sm">Track platform performance and insights</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/60 text-sm">© 2024 RGUKT RK Valley. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Card className="shadow-xl border border-purple-100 bg-white">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Admin Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Secure access for Medha AI administrators
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@rgukt.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Access Dashboard
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-center text-gray-600">
                  Are you a student?{" "}
                  <Link to="/student-auth" className="text-purple-600 font-medium hover:underline">
                    Student Portal
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 rounded-lg border border-purple-100 bg-purple-50/50">
            <p className="text-xs text-center text-gray-600 flex items-center justify-center">
              <Shield className="w-3 h-3 inline mr-1" />
              Secure portal - Unauthorized access attempts are monitored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
