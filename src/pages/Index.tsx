import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  MessageCircle, 
  FileText, 
  Shield, 
  Zap, 
  BookOpen, 
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "AI-Powered Assistant",
    description: "Get instant answers to your questions about academics, exams, fees, and more using our Gemini-powered chatbot.",
  },
  {
    icon: FileText,
    title: "Issue Reporting",
    description: "Submit and track complaints easily. Our admin team reviews and resolves issues promptly.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security. Only authorized personnel can access sensitive information.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Stay informed with instant notifications about your queries and complaint status.",
  },
];

const stats = [
  { value: "10K+", label: "Students Served" },
  { value: "95%", label: "Query Resolution" },
  { value: "24/7", label: "AI Availability" },
  { value: "< 1hr", label: "Avg Response Time" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-up">
            <Sparkles className="w-4 h-4" />
            Powered by Gemini AI
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up animation-delay-100">
            Your Intelligent
            <span className="block text-gradient">Campus Assistant</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-200">
            VALL-E-ASSIST helps RGUKT RK Valley students navigate university resources, 
            get instant answers, and resolve issues efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-300">
            <Link to="/chat">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                Start Chatting
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/complaints">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                <FileText className="w-5 h-5" />
                Report an Issue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From instant AI-powered answers to streamlined complaint resolution, 
              we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-elevated transition-smooth animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-gradient-primary p-8 md:p-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join thousands of RGUKT students who are already using VALL-E-ASSIST 
                to make their campus life easier.
              </p>
              <Link to="/auth">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Create Your Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
