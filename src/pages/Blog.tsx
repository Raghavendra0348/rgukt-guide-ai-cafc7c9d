import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

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

const categories = ["All", "Tutorial", "Feature", "Update", "Guide", "Insight"];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#e3e3e3]">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#8439c5]/10 text-[#8439c5] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2b2929] mb-4">
              Medha AI <span className="bg-gradient-to-r from-[#8439c5] to-purple-700 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Latest updates, tutorials, and insights about your AI campus assistant
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in animation-delay-200">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm ${category === "All"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  : "border-purple-200 text-purple-700 hover:bg-purple-50"
                  }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden border-2 border-purple-100 shadow-xl animate-slide-up animation-delay-300">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                    ⭐ Featured
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className={`w-fit mb-4 bg-gradient-to-r ${blogPosts[0].gradient} text-white`}>
                  {blogPosts[0].category}
                </Badge>
                <CardTitle className="text-3xl mb-4 text-gray-900">
                  {blogPosts[0].title}
                </CardTitle>
                <CardDescription className="text-base mb-6 text-gray-600">
                  {blogPosts[0].excerpt}
                </CardDescription>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Link to={`/blog/article/${blogPosts[0].id}`}>
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8439c5] to-purple-700 text-white px-6 py-3 rounded-xl hover:from-[#8439c5]/90 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl">
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </CardContent>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <Link key={post.id} to={`/blog/article/${post.id}`}>
                <Card
                  className="group overflow-hidden border-2 border-[#8439c5]/20 hover:border-[#8439c5] hover:shadow-2xl transition-all duration-300 cursor-pointer h-full bg-white"
                >
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
                    <CardTitle className="text-xl mb-3 text-[#2b2929] group-hover:text-[#8439c5] transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm mb-4 text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="text-[#8439c5] group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 border-2 border-purple-200 text-purple-700 px-8 py-3 rounded-xl hover:bg-purple-50 transition-all">
              <TrendingUp className="w-4 h-4" />
              Load More Articles
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
