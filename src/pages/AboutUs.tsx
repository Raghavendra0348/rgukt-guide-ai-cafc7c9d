import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Sparkles,
  Shield,
  Heart,
  Zap,
  Globe,
  Award,
  GraduationCap,
  MessageCircle,
  Brain,
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Use Medha AI for Academic Success",
    excerpt: "Discover powerful tips and tricks to get the most out of your AI assistant for studies, exams, and campus life.",
    author: "RGUKT Team",
    date: "December 5, 2024",
    readTime: "5 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    gradient: "from-purple-500 to-blue-500"
  },
  {
    id: 2,
    title: "New Voice Features: Speak to Medha AI",
    excerpt: "Learn how to use voice input and output features to interact with Medha AI hands-free and get instant responses.",
    author: "Tech Team",
    date: "December 3, 2024",
    readTime: "4 min read",
    category: "Feature",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Campus Updates: Library Hours Extended",
    excerpt: "Great news! The library will now be open until 10 PM on weekdays. Plan your study sessions accordingly.",
    author: "Admin",
    date: "December 1, 2024",
    readTime: "2 min read",
    category: "Update",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 4,
    title: "Exam Preparation Guide with AI Assistance",
    excerpt: "Maximize your exam preparation using Medha AI's smart study tips, practice questions, and time management strategies.",
    author: "Academic Team",
    date: "November 28, 2024",
    readTime: "7 min read",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    id: 5,
    title: "Issue Reporting Made Easy",
    excerpt: "Step-by-step guide on how to report and track campus issues using the new complaint management system.",
    author: "Support Team",
    date: "November 25, 2024",
    readTime: "3 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 6,
    title: "Meet the AI Behind Medha",
    excerpt: "Powered by Google's Gemini AI, learn about the technology that makes Medha intelligent, helpful, and reliable.",
    author: "Tech Team",
    date: "November 22, 2024",
    readTime: "6 min read",
    category: "Insight",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    gradient: "from-purple-600 to-pink-500"
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8439c5]/10 to-purple-100 text-[#8439c5] px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border-2 border-[#8439c5]/20">
              <Sparkles className="w-4 h-4" />
              About Medha AI
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#2b2929] mb-6">
              Empowering{" "}
              <span className="bg-gradient-to-r from-[#8439c5] to-purple-700 bg-clip-text text-transparent">
                RGUKT Students
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Medha AI is an intelligent campus assistant designed exclusively for RGUKT RK Valley students, 
              providing instant, accurate answers to all your campus-related queries through advanced AI technology.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="border-2 border-[#8439c5]/20 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8439c5] to-purple-700 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#2b2929] mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To revolutionize campus life by providing students with instant, AI-powered assistance 
                  that helps them navigate academic, administrative, and daily campus challenges efficiently 
                  and effectively in their preferred language.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#2b2929] mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the most trusted and comprehensive digital companion for every RGUKT student, 
                  making campus information accessible, understandable, and actionable through cutting-edge 
                  AI technology and multilingual support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Article Section - How Medha AI Helps in Academics */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur-2xl opacity-30"></div>
                <img
                  src="/robot_image.jpg"
                  alt="Medha AI Academic Assistant"
                  className="relative rounded-3xl shadow-2xl border-4 border-white w-full h-auto object-cover"
                />
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#8439c5] to-purple-700 text-white px-6 py-3 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    <span className="font-bold">AI-Powered Learning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-[#8439c5] px-4 py-2 rounded-full text-sm font-semibold">
                <BookOpen className="w-4 h-4" />
                Academic Excellence
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#2b2929] leading-tight">
                How Medha AI Revolutionizes Your Academic Journey
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Medha AI is specifically designed to support RGUKT RK Valley students in their academic pursuits. 
                Our intelligent assistant provides instant, accurate answers to help you excel in your studies.
              </p>

              {/* Key Academic Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-2 border-purple-100 hover:shadow-md transition-all hover:border-[#8439c5]/30">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[#8439c5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2b2929] mb-1">Exam Preparation Support</h4>
                    <p className="text-sm text-gray-600">Get instant information about exam schedules, syllabus coverage, important topics, and preparation strategies tailored to RGUKT curriculum.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-2 border-blue-100 hover:shadow-md transition-all hover:border-blue-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2b2929] mb-1">Course & Syllabus Guidance</h4>
                    <p className="text-sm text-gray-600">Access detailed information about course structures, semester plans, credit systems, and academic calendars for all B.Tech branches.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-2 border-indigo-100 hover:shadow-md transition-all hover:border-indigo-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2b2929] mb-1">24/7 Learning Assistance</h4>
                    <p className="text-sm text-gray-600">Get help anytime with doubts, clarifications, and explanations. Medha AI is always available to support your learning journey.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-2 border-pink-100 hover:shadow-md transition-all hover:border-pink-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2b2929] mb-1">Grade & CGPA Tracking</h4>
                    <p className="text-sm text-gray-600">Understand the CGPA calculation system, track your academic progress, and get tips to improve your grades throughout the semester.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a href="/chat">
                  <button className="inline-flex items-center gap-3 bg-gradient-to-r from-[#8439c5] to-purple-700 hover:from-[#8439c5]/90 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <MessageCircle className="w-5 h-5" />
                    Start Learning with Medha AI
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b2929] mb-4">
              What Makes Us Special
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI technology to serve you better
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Intelligence",
                description: "Leveraging Google's Gemini AI for accurate, contextual responses to your queries",
                color: "from-[#8439c5] to-purple-700",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop"
              },
              {
                icon: Globe,
                title: "Multilingual Support",
                description: "Ask questions in English, Hindi, or Telugu and get responses in your preferred language",
                color: "from-purple-600 to-indigo-600",
                image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop"
              },
              {
                icon: MessageCircle,
                title: "Voice Interaction",
                description: "Speak your questions and listen to responses with our voice input/output feature",
                color: "from-indigo-600 to-blue-600",
                image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=250&fit=crop"
              },
              {
                icon: BookOpen,
                title: "Visual Learning",
                description: "Get flowcharts, diagrams, and visual representations for complex processes",
                color: "from-blue-600 to-cyan-600",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Enterprise-grade security ensures your data and conversations stay protected",
                color: "from-cyan-600 to-sky-600",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop"
              },
              {
                icon: Zap,
                title: "24/7 Availability",
                description: "Access instant help anytime, anywhere - no waiting, no office hours",
                color: "from-sky-600 to-blue-600",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
              },
            ].map((feature, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-[#8439c5]/30 hover:shadow-xl transition-all group overflow-hidden">
                {/* Feature Image */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-60`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/40">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2b2929] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Cover Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#8439c5]/5 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b2929] mb-4">
              Areas We Cover
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive assistance across all aspects of campus life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Academic Information",
                items: ["Course details & syllabus", "Exam schedules & hall tickets", "Grade information & results", "Academic calendar & deadlines"],
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop"
              },
              {
                icon: Users,
                title: "Administrative Services",
                items: ["Fee payment & structure", "Certificate requests", "Bonafide letters", "ID card & documentation"],
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop"
              },
              {
                icon: BookOpen,
                title: "Campus Facilities",
                items: ["Library timings & resources", "Hostel rules & procedures", "Mess timings & menu", "Sports & recreation"],
                image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=200&fit=crop"
              },
              {
                icon: Heart,
                title: "Student Welfare",
                items: ["Complaint management", "Counseling services", "Health facilities", "Student support services"],
                image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=200&fit=crop"
              },
            ].map((section, index) => (
              <Card key={index} className="border-2 border-[#8439c5]/20 hover:shadow-xl transition-shadow overflow-hidden group">
                {/* Section Image */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8439c5] to-purple-700 opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/50">
                      <section.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-[#2b2929] mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-2 h-2 bg-[#8439c5] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Resources Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8439c5]/10 to-purple-100 text-[#8439c5] px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border-2 border-[#8439c5]/20">
              <BookOpen className="w-4 h-4" />
              Latest Updates & Resources
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b2929] mb-4">
              Knowledge Hub
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest tutorials, features, and campus news
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden border-2 border-gray-100 hover:border-[#8439c5]/50 hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-gradient-to-r ${post.gradient} text-white shadow-lg`}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3 text-[#2b2929] group-hover:text-[#8439c5] transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm mb-4 text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="text-[#8439c5] group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#8439c5]/5 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b2929] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              Principles that guide our mission to serve students better
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Excellence", description: "Striving for the highest quality in every interaction" },
              { icon: Heart, title: "Care", description: "Putting student needs at the heart of everything we do" },
              { icon: Shield, title: "Trust", description: "Building confidence through security and reliability" },
              { icon: Zap, title: "Innovation", description: "Continuously improving with cutting-edge technology" },
            ].map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8439c5] to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2929] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#8439c5] to-purple-700">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "24/7", label: "Available Support" },
              { number: "3", label: "Languages Supported" },
              { number: "100%", label: "Secure & Private" },
              { number: "∞", label: "Questions Answered" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                <div className="text-lg text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-[#8439c5]/20 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#8439c5] to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2b2929] mb-4">
                Have Questions About Medha AI?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Our AI is ready to help you 24/7. Start chatting now and experience 
                the future of campus assistance.
              </p>
              <a href="/chat">
                <button className="bg-gradient-to-r from-[#8439c5] to-purple-700 hover:from-[#8439c5]/90 hover:to-purple-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Chatting Now
                </button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
