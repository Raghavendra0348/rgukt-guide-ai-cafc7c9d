import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit",
    description: "Fill out the form with your issue details",
  },
  {
    icon: Clock,
    title: "Under Review",
    description: "Our team reviews your complaint",
  },
  {
    icon: MessageSquare,
    title: "Response",
    description: "You receive updates and resolution",
  },
  {
    icon: CheckCircle,
    title: "Resolved",
    description: "Issue is resolved and closed",
  },
];

export default function Complaints() {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Report an Issue
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Having trouble with something? Let us know and we'll help resolve it as quickly as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <ComplaintForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Process Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.title} className="flex gap-4">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            {index < steps.length - 1 && (
                              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">
                              {step.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-foreground mb-2">
                    Need urgent help?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    For emergencies, please contact the administrative office directly.
                  </p>
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Office Hours:</p>
                    <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 5:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
