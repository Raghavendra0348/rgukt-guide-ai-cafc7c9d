import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CuteRobot } from "@/components/CuteRobot";
import {
        Accordion,
        AccordionContent,
        AccordionItem,
        AccordionTrigger
} from "@/components/ui/accordion";
import {
        MessageCircle,
        FileText,
        Sparkles,
        BookOpen,
        GraduationCap,
        Building2,
        Calendar,
        Shield,
        Zap,
        CheckCircle,
        ArrowRight,
        Users,
        Brain,
        Globe,
        LayoutDashboard
} from "lucide-react";

const features = [
        {
                icon: MessageCircle,
                title: "AI-Powered Chat",
                description: "Get instant answers with voice input and output support",
                color: "bg-blue-50 text-blue-600 border-blue-100",
                gradient: "from-[#8439c5] to-purple-700",
                backDescription: "Experience seamless conversations powered by Google's Gemini AI. Ask questions in English, Hindi, or Telugu and get intelligent responses instantly. Voice input and output make it hands-free and accessible."
        },
        {
                icon: BookOpen,
                title: "Knowledge Base",
                description: "Access campus information and resources instantly",
                color: "bg-cyan-50 text-cyan-600 border-cyan-100",
                gradient: "from-purple-600 to-indigo-600",
                backDescription: "Explore comprehensive information about campus facilities, academic programs, hostel amenities, and more. Get quick answers to frequently asked questions and stay informed about campus life."
        },
        {
                icon: Sparkles,
                title: "Smart Responses",
                description: "Formatted answers with bold highlights and bullet points",
                color: "bg-sky-50 text-sky-600 border-sky-100",
                gradient: "from-indigo-600 to-blue-600",
                backDescription: "Receive beautifully formatted answers with markdown support, flowcharts, and diagrams. Complex processes are explained with visual aids including Mermaid charts for better comprehension and learning."
        },
        {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is protected with enterprise-grade security",
                color: "bg-blue-50 text-blue-600 border-blue-100",
                gradient: "from-blue-600 to-cyan-600",
                backDescription: "All your conversations and personal data are protected with industry-leading security measures. We employ end-to-end encryption and follow strict privacy policies to ensure your information stays safe."
        },
];

const services = [
        { icon: GraduationCap, label: "Academics", color: "text-blue-600" },
        { icon: Calendar, label: "Examinations", color: "text-cyan-600" },
        { icon: BookOpen, label: "Library", color: "text-sky-600" },
        { icon: Building2, label: "Hostel", color: "text-blue-600" },
];

export default function Index() {
        return (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                        <Navbar />

                        {/* Hero Section with Split Layout */}
                        <section className="pt-32 pb-20 px-4">
                                <div className="container mx-auto max-w-7xl">
                                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                                                {/* Left Side - Text Content */}
                                                <div className="space-y-8">
                                                        {/* Badge */}
                                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8439c5]/10 to-purple-100 text-[#8439c5] px-5 py-2.5 rounded-full text-sm font-semibold mb-6 animate-fade-in border-2 border-[#8439c5]/20">
                                                                <Sparkles className="w-4 h-4" />
                                                                Powered by Gemini AI
                                                        </div>

                                                        {/* Main Heading */}
                                                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2b2929] leading-tight animate-slide-up">
                                                                Welcome to
                                                                <span className="block bg-gradient-to-r from-[#8439c5] via-purple-600 to-purple-700 bg-clip-text text-transparent mt-2">
                                                                        Medha AI
                                                                </span>
                                                        </h1>

                                                        {/* Subheading */}
                                                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed animate-slide-up animation-delay-100">
                                                                Your intelligent AI assistant for <span className="font-semibold text-[#8439c5]">RGUKT RK Valley</span> Campus.
                                                                Get instant answers with voice support in English, Hindi & Telugu.
                                                        </p>

                                                        {/* Feature Highlights */}
                                                        <div className="space-y-3 animate-slide-up animation-delay-200">
                                                                <div className="flex items-center gap-3 text-gray-700">
                                                                        <CheckCircle className="w-6 h-6 text-[#8439c5] flex-shrink-0" />
                                                                        <span className="text-lg">24/7 AI-powered campus assistance</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-gray-700">
                                                                        <CheckCircle className="w-6 h-6 text-[#8439c5] flex-shrink-0" />
                                                                        <span className="text-lg">Multilingual support (English, Hindi, Telugu)</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-gray-700">
                                                                        <CheckCircle className="w-6 h-6 text-[#8439c5] flex-shrink-0" />
                                                                        <span className="text-lg">Visual responses with flowcharts & diagrams</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-gray-700">
                                                                        <CheckCircle className="w-6 h-6 text-[#8439c5] flex-shrink-0" />
                                                                        <span className="text-lg">Image analysis & voice input/output</span>
                                                                </div>
                                                        </div>

                                                        {/* CTA Buttons */}
                                                        <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up animation-delay-300">
                                                                <Link to="/chat">
                                                                        <Button
                                                                                size="lg"
                                                                                className="bg-gradient-to-r from-[#8439c5] to-purple-700 hover:from-[#8439c5]/90 hover:to-purple-800 text-white px-8 py-7 text-lg rounded-2xl shadow-2xl shadow-[#8439c5]/30 hover:shadow-[#8439c5]/50 transition-all duration-300 w-full sm:w-auto group"
                                                                        >
                                                                                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                                                                Start Chatting Now
                                                                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                                                        </Button>
                                                                </Link>
                                                                <Link to="/dashboard">
                                                                        <Button
                                                                                variant="outline"
                                                                                size="lg"
                                                                                className="border-3 border-[#8439c5] text-[#8439c5] hover:bg-[#8439c5]/10 px-8 py-7 text-lg rounded-2xl w-full sm:w-auto font-semibold"
                                                                        >
                                                                                <LayoutDashboard className="w-6 h-6" />
                                                                                View Dashboard
                                                                        </Button>
                                                                </Link>
                                                        </div>

                                                        {/* Services Quick Links */}
                                                        <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-600 animate-fade-in animation-delay-400">
                                                                <span className="font-semibold text-[#2b2929]">Quick Access:</span>
                                                                {services.map((service) => {
                                                                        const Icon = service.icon;
                                                                        return (
                                                                                <div key={service.label} className="flex items-center gap-2 hover:text-[#8439c5] transition-colors cursor-pointer">
                                                                                        <Icon className={`w-5 h-5 text-[#8439c5]`} />
                                                                                        <span className="font-medium">{service.label}</span>
                                                                                </div>
                                                                        );
                                                                })}
                                                        </div>
                                                </div>                                {/* Right Side - Robot Image */}
                                                <div className="hidden lg:flex justify-center items-center">
                                                        <div className="relative w-full max-w-lg">
                                                                {/* Decorative background glow */}
                                                                <div className="absolute inset-0 bg-gradient-to-br from-[#8439c5]/30 to-purple-300/50 rounded-[3rem] blur-3xl"></div>

                                                                {/* Main robot image container */}
                                                                <div className="relative z-10 bg-gradient-to-br from-white to-[#e3e3e3] p-8 rounded-[3rem] shadow-2xl border-4 border-[#8439c5]/20">
                                                                        {/* Inner glow effect */}
                                                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#8439c5]/10 to-transparent rounded-[3rem]"></div>

                                                                        {/* Robot image */}
                                                                        <img
                                                                                src="/robot_image.jpg"
                                                                                alt="Medha AI Robot Assistant"
                                                                                className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover"
                                                                        />

                                                                        {/* Accent corner decorations */}
                                                                        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#8439c5] rounded-tr-2xl"></div>
                                                                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#8439c5] rounded-bl-2xl"></div>
                                                                </div>

                                                                {/* Floating info badges */}
                                                                <div className="absolute top-10 -right-8 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-[#8439c5]/30">
                                                                        <div className="flex items-center gap-2">
                                                                                <Brain className="w-4 h-4 text-[#8439c5]" />
                                                                                <span className="text-sm font-semibold text-[#2b2929]">AI Powered</span>
                                                                        </div>
                                                                </div>

                                                                <div className="absolute bottom-16 -left-8 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-purple-300">
                                                                        <div className="flex items-center gap-2">
                                                                                <Globe className="w-4 h-4 text-purple-600" />
                                                                                <span className="text-sm font-semibold text-[#2b2929]">3 Languages</span>
                                                                        </div>
                                                                </div>

                                                                <div className="absolute top-1/2 -left-6 bg-white px-3 py-1.5 rounded-full shadow-lg border-2 border-cyan-300">
                                                                        <div className="flex items-center gap-1.5">
                                                                                <Zap className="w-3.5 h-3.5 text-cyan-600" />
                                                                                <span className="text-xs font-semibold text-[#2b2929]">24/7</span>
                                                                        </div>
                                                                </div>

                                                                {/* Floating particles */}
                                                                <div className="absolute top-10 right-16 w-3 h-3 bg-[#8439c5] rounded-full"></div>
                                                                <div className="absolute bottom-24 left-12 w-2 h-2 bg-purple-400 rounded-full"></div>
                                                                <div className="absolute top-1/3 right-8 w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Features Section with Marker Sliding Flip Cards */}
                        <section className="py-20 px-4 bg-gradient-to-b from-white/50 to-purple-50/30">
                                <div className="container mx-auto max-w-6xl">
                                        <div className="text-center mb-16">
                                                <h2 className="text-3xl md:text-4xl font-bold text-[#2b2929] mb-4">
                                                        Everything You Need
                                                </h2>
                                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                                        Powerful features to help you navigate campus life efficiently
                                                </p>
                                        </div>

                                        <div className="sliding-flip-cards-container">
                                                {features.map((feature, index) => {
                                                        const Icon = feature.icon;
                                                        return (
                                                                <div key={feature.title} className="sliding-flip-card">
                                                                        <div className="sliding-flip-card-inner">
                                                                                {/* Front of Card */}
                                                                                <div className="sliding-flip-card-front">
                                                                                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                                                                                                <Icon className="w-10 h-10 text-white" />
                                                                                        </div>
                                                                                        <h3 className="text-2xl font-bold text-[#2b2929] mb-4 text-center">
                                                                                                {feature.title}
                                                                                        </h3>
                                                                                        <p className="text-sm text-gray-600 text-center leading-relaxed mb-4">
                                                                                                {feature.description}
                                                                                        </p>
                                                                                        <p className="text-xs text-[#8439c5] font-semibold text-center mt-auto">
                                                                                                Hover to explore more →
                                                                                        </p>
                                                                                </div>

                                                                                {/* Back of Card */}
                                                                                <div className="sliding-flip-card-back">
                                                                                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border-2 border-white/30">
                                                                                                <Icon className="w-8 h-8 text-white" />
                                                                                        </div>
                                                                                        <h3 className="text-xl font-bold text-white mb-4 text-center">
                                                                                                {feature.title}
                                                                                        </h3>
                                                                                        <p className="text-sm text-white/95 text-center leading-relaxed">
                                                                                                {feature.backDescription}
                                                                                        </p>
                                                                                        <div className="mt-6 pt-4 border-t border-white/30">
                                                                                                <p className="text-xs text-white/80 text-center font-medium">
                                                                                                        ✨ Click to learn more
                                                                                                </p>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        );
                                                })}
                                        </div>
                                </div>
                        </section>



                        {/* How It Works */}
                        <section className="py-20 px-4 bg-white/50">
                                <div className="container mx-auto max-w-6xl">
                                        <div className="text-center mb-16">
                                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                                        How It Works
                                                </h2>
                                                <p className="text-lg text-gray-600">
                                                        Get started in three simple steps
                                                </p>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-8">
                                                {[
                                                        {
                                                                step: "1",
                                                                title: "Ask Your Question",
                                                                description: "Type or speak your question using voice input",
                                                                icon: MessageCircle
                                                        },
                                                        {
                                                                step: "2",
                                                                title: "AI Processes",
                                                                description: "Our AI analyzes and finds the best answer for you",
                                                                icon: Sparkles
                                                        },
                                                        {
                                                                step: "3",
                                                                title: "Get Response",
                                                                description: "Receive formatted answer with voice output option",
                                                                icon: CheckCircle
                                                        }
                                                ].map((item, index) => {
                                                        const Icon = item.icon;
                                                        return (
                                                                <div key={item.step} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                                                                        <div className="relative inline-flex items-center justify-center mb-6">
                                                                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                                                                        {item.step}
                                                                                </div>
                                                                                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                                                                        <Icon className="w-5 h-5 text-cyan-600" />
                                                                                </div>
                                                                        </div>
                                                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                                                {item.title}
                                                                        </h3>
                                                                        <p className="text-gray-600">
                                                                                {item.description}
                                                                        </p>
                                                                </div>
                                                        );
                                                })}
                                        </div>
                                </div>
                        </section>

                        {/* How to Use - Step by Step Guide */}
                        <section className="py-20 px-4 bg-gradient-to-br from-[#8439c5]/5 to-purple-50">
                                <div className="container mx-auto max-w-6xl">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-[#2b2929] mb-4">
                                                        5 Steps for Successful Usage
                                                </h2>
                                                <p className="text-lg text-gray-600">
                                                        Follow these simple steps to get the most out of Medha AI
                                                </p>
                                        </div>

                                        {/* Steps with circular flow */}
                                        <div className="relative">
                                                {/* Connecting circular path */}
                                                <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-dashed border-[#8439c5]/20 rounded-full"></div>

                                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                                                        {/* Step 1 */}
                                                        <div className="relative text-center animate-slide-up lg:col-start-1 lg:row-start-1">
                                                                <div className="bg-white border-4 border-[#8439c5]/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8439c5] to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                                                                                        01
                                                                                </div>
                                                                        </div>
                                                                        <Users className="w-12 h-12 text-[#8439c5] mx-auto mb-4 mt-8" />
                                                                        <h3 className="text-xl font-bold text-[#2b2929] mb-3">Create Account</h3>
                                                                        <p className="text-gray-600">Sign up or log in to access Medha AI features</p>
                                                                </div>
                                                        </div>

                                                        {/* Step 2 */}
                                                        <div className="relative text-center animate-slide-up animation-delay-100 lg:col-start-2 lg:row-start-1">
                                                                <div className="bg-white border-4 border-[#8439c5]/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8439c5] to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                                                                                        02
                                                                                </div>
                                                                        </div>
                                                                        <Brain className="w-12 h-12 text-[#8439c5] mx-auto mb-4 mt-8" />
                                                                        <h3 className="text-xl font-bold text-[#2b2929] mb-3">Ask Questions</h3>
                                                                        <p className="text-gray-600">Type or speak your questions in English, Hindi or Telugu</p>
                                                                </div>
                                                        </div>

                                                        {/* Step 3 */}
                                                        <div className="relative text-center animate-slide-up animation-delay-200 lg:col-start-3 lg:row-start-1">
                                                                <div className="bg-white border-4 border-[#8439c5]/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8439c5] to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                                                                                        03
                                                                                </div>
                                                                        </div>
                                                                        <Sparkles className="w-12 h-12 text-[#8439c5] mx-auto mb-4 mt-8" />
                                                                        <h3 className="text-xl font-bold text-[#2b2929] mb-3">Get AI Response</h3>
                                                                        <p className="text-gray-600">Receive instant answers with flowcharts and diagrams</p>
                                                                </div>
                                                        </div>

                                                        {/* Step 4 */}
                                                        <div className="relative text-center animate-slide-up animation-delay-300 lg:col-start-2 lg:row-start-2">
                                                                <div className="bg-white border-4 border-[#8439c5]/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8439c5] to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                                                                                        04
                                                                                </div>
                                                                        </div>
                                                                        <Globe className="w-12 h-12 text-[#8439c5] mx-auto mb-4 mt-8" />
                                                                        <h3 className="text-xl font-bold text-[#2b2929] mb-3">Explore Resources</h3>
                                                                        <p className="text-gray-600">Get RGUKT website links and relevant documents</p>
                                                                </div>
                                                        </div>

                                                        {/* Step 5 */}
                                                        <div className="relative text-center animate-slide-up animation-delay-400 lg:col-start-1 lg:row-start-2 lg:col-span-1">
                                                                <div className="bg-white border-4 border-[#8439c5]/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8439c5] to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                                                                                        05
                                                                                </div>
                                                                        </div>
                                                                        <FileText className="w-12 h-12 text-[#8439c5] mx-auto mb-4 mt-8" />
                                                                        <h3 className="text-xl font-bold text-[#2b2929] mb-3">Report Issues</h3>
                                                                        <p className="text-gray-600">Submit complaints and track their resolution status</p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* FAQ Section */}
                        <section className="py-20 px-4 bg-white">
                                <div className="container mx-auto max-w-4xl">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-[#2b2929] mb-4">
                                                        Frequently Asked Questions
                                                </h2>
                                                <p className="text-lg text-gray-600">
                                                        Everything you need to know about Medha AI
                                                </p>
                                        </div>

                                        <Accordion type="single" collapsible className="w-full space-y-4">
                                                <AccordionItem value="item-1" className="border-2 border-[#8439c5]/20 rounded-xl px-6 hover:border-[#8439c5]/50 transition-colors">
                                                        <AccordionTrigger className="text-lg font-semibold text-[#2b2929] hover:text-[#8439c5]">
                                                                What is Medha AI?
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                                                Medha AI is an intelligent campus assistant specifically designed for RGUKT RK Valley students. It provides instant answers to questions about academics, examinations, fees, hostel facilities, library resources, and administrative procedures using advanced AI technology.
                                                        </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="item-2" className="border-2 border-[#8439c5]/20 rounded-xl px-6 hover:border-[#8439c5]/50 transition-colors">
                                                        <AccordionTrigger className="text-lg font-semibold text-[#2b2929] hover:text-[#8439c5]">
                                                                Which languages does Medha AI support?
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                                                Medha AI supports three languages: English, Hindi (हिंदी), and Telugu (తెలుగు). You can ask questions in any of these languages and receive responses in the same language for better understanding.
                                                        </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="item-3" className="border-2 border-[#8439c5]/20 rounded-xl px-6 hover:border-[#8439c5]/50 transition-colors">
                                                        <AccordionTrigger className="text-lg font-semibold text-[#2b2929] hover:text-[#8439c5]">
                                                                Can I upload images for analysis?
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                                                Yes! Medha AI has image analysis capabilities. You can upload images of documents, diagrams, or any visual content, and the AI will analyze and provide relevant information about them.
                                                        </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="item-4" className="border-2 border-[#8439c5]/20 rounded-xl px-6 hover:border-[#8439c5]/50 transition-colors">
                                                        <AccordionTrigger className="text-lg font-semibold text-[#2b2929] hover:text-[#8439c5]">
                                                                How do I report a complaint?
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                                                Navigate to the "Complaints" section from the navigation bar or dashboard. Fill in the complaint form with details about your issue, select the appropriate category, and submit. You can track the status of your complaint anytime from your dashboard.
                                                        </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="item-5" className="border-2 border-[#8439c5]/20 rounded-xl px-6 hover:border-[#8439c5]/50 transition-colors">
                                                        <AccordionTrigger className="text-lg font-semibold text-[#2b2929] hover:text-[#8439c5]">
                                                                Does Medha AI provide flowcharts and diagrams?
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                                                Absolutely! When explaining processes or procedures, Medha AI automatically generates flowcharts, diagrams, and visual representations using Mermaid diagrams to make complex information easier to understand.
                                                        </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="item-6" className="border-2 border-[#8439c5]/20 rounded-xl px-6 hover:border-[#8439c5]/50 transition-colors">
                                                        <AccordionTrigger className="text-lg font-semibold text-[#2b2929] hover:text-[#8439c5]">
                                                                Is my data secure and private?
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                                                Yes, your data security and privacy are our top priorities. All conversations are encrypted, and we follow enterprise-grade security standards. Your personal information is never shared with third parties without your explicit consent.
                                                        </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="item-7" className="border-2 border-[#8439c5]/20 rounded-xl px-6 hover:border-[#8439c5]/50 transition-colors">
                                                        <AccordionTrigger className="text-lg font-semibold text-[#2b2929] hover:text-[#8439c5]">
                                                                Can I use voice input?
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                                                Yes! Medha AI supports both voice input and voice output. Click the microphone button in the chat interface to speak your question, and use the speaker button to hear AI responses read aloud.
                                                        </AccordionContent>
                                                </AccordionItem>
                                        </Accordion>
                                </div>
                        </section>

                        {/* CTA Section */}
                        <section className="py-20 px-4">
                                <div className="container mx-auto max-w-4xl">
                                        <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                                                {/* Background decoration */}
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                                                <div className="relative z-10">
                                                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                                                Ready to Get Started?
                                                        </h2>
                                                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                                                Join thousands of students using Ask Medha for instant campus assistance
                                                        </p>
                                                        <Link to="/chat">
                                                                <Button
                                                                        size="lg"
                                                                        className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                                                >
                                                                        <Zap className="w-5 h-5" />
                                                                        Start Now - It's Free
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
