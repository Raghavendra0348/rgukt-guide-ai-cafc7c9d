import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Mail, Lock, User, GraduationCap, BookOpen, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
});

export default function StudentAuth() {
  const navigate = useNavigate();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse(formData);
      } else {
        signupSchema.parse(formData);
      }
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
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid credentials", {
              description: "Please check your email and password.",
            });
          } else {
            toast.error("Sign in failed", { description: error.message });
          }
        } else {
          toast.success("Welcome back!", { description: "You've been signed in successfully." });
          navigate("/");
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Account exists", { description: "This email is already registered. Try signing in." });
          } else {
            toast.error("Sign up failed", { description: error.message });
          }
        } else {
          toast.success("Account created!", { description: "You've been signed in automatically." });
          navigate("/");
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex">
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
          <p className="text-white/80 text-lg">Student Portal</p>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-bold text-primary-foreground leading-tight">
            Your Intelligent<br />University Assistant
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">AI-Powered Assistance</h3>
                <p className="text-primary-foreground/70 text-sm">Get instant answers to your university queries</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Submit Complaints</h3>
                <p className="text-primary-foreground/70 text-sm">Report issues and track their resolution</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-primary-foreground/60 text-sm">© 2024 RGUKT RK Valley. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Card className="shadow-elevated border-0 bg-gradient-card">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {isLogin ? "Student Login" : "Student Registration"}
              </CardTitle>
              <CardDescription>
                {isLogin
                  ? "Access your Medha AI student account"
                  : "Create your student account to get started"}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Student Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@rgukt.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  Are you an administrator?{" "}
                  <Link to="/admin-auth" className="text-secondary font-medium hover:underline">
                    Admin Login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
