import { Link } from "react-router-dom";
import { MessageCircle, FileText, LayoutDashboard, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/rgukt_logo.jpeg"
                alt="RGUKT Logo"
                className="w-12 h-12 rounded-xl object-cover shadow-sm"
              />
              <div>
                <h3 className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-lg">Medha AI</h3>
                <p className="text-xs text-muted-foreground">RGUKT RK Valley AI Assistant</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Your intelligent AI companion for navigating RGUKT RK Valley campus life.
              Get instant answers with voice support and report issues efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-smooth">
                  <MessageCircle className="w-4 h-4" />
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-smooth">
                  <FileText className="w-4 h-4" />
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-smooth">
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                RK Valley, Kadapa, AP
              </li>
              <li className="text-muted-foreground text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                support@rgukt.ac.in
              </li>
              <li className="text-muted-foreground text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91-XXX-XXX-XXXX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Medha AI • Powered by Gemini AI • Built for RGUKT RK Valley
          </p>
        </div>
      </div>
    </footer>
  );
}
