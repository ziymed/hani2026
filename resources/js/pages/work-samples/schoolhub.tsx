import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    GraduationCap, BookOpen, Calendar, HelpCircle, LogIn, LogOut, 
    CheckCircle2, Info, ChevronRight, User, Award, Check, Send, 
    Clock, ShieldAlert, Sparkles, Layers, Terminal
} from 'lucide-react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock Announcements
const announcements = [
    { id: 1, title: 'Term 3 Capstone Submissions Open', date: 'July 10, 2026', category: 'Academic', content: 'Submit your final high-fidelity Figma design prototypes and Python analytical codebase before midnight.' },
    { id: 2, title: 'Guest Lecture: Usability in Critical Operations', date: 'July 15, 2026', category: 'Seminar', content: 'A special seminar led by HFI Certified Usability Analysts on designing software for clinical systems.' },
    { id: 3, title: 'Network Maintenance - Library & Robotics Lab', date: 'July 18, 2026', category: 'System Info', content: 'Routine IT operations upgrade between 02:00 and 06:00 SGT. Offline system access only.' }
];

// Mock Courses
const initialCourses = [
    { id: 1, name: 'UI/UX Design & Usability Testing', code: 'UX-401', progress: 88, grade: 'A', instructor: 'HFI Usability Specialist', tasks: ['Submit Usability Report', 'Figma Clickable Prototype'] },
    { id: 2, name: 'Systems Analysis & Operations Design', code: 'SA-302', progress: 75, grade: 'A-', instructor: 'Lithan Academy lead', tasks: ['ServiceNow Schema Mapping', 'Database Normalization Project'] },
    { id: 3, name: 'Computational Modelling in Python', code: 'CP-205', progress: 95, grade: 'A+', instructor: 'Futurum Academy Lead', tasks: ['Simulate Call Center Volume', 'Robotics Hardware Micro:bit script'] },
    { id: 4, name: 'Web Interface Engineering (HTML5/CSS3/JS)', code: 'WE-102', progress: 100, grade: 'A', instructor: 'NTUC Learning Hub', tasks: ['Interactive Student Portal UI', 'Responsive Flexbox Portfolio'] }
];

// Mock Schedule
const schedule = [
    { time: '09:00 AM - 11:30 AM', subject: 'UI/UX Design Lab', room: 'Robotics Studio 2', type: 'Lab Session' },
    { time: '01:00 PM - 03:00 PM', subject: 'Systems Analysis Lecture', room: 'Auditorium C', type: 'Lecture' },
    { time: '03:30 PM - 05:00 PM', subject: 'ServiceNow ticket review meeting', room: 'Online (MS Teams)', type: 'Project' }
];

// Mock ServiceNow Tickets
const initialTickets = [
    { id: 'INC-2026-0701', subject: 'Cannot access student email after password reset', category: 'IT Support', priority: 'High', status: 'In Progress', date: 'July 01, 2026' },
    { id: 'INC-2026-0702', subject: 'Requesting license key for Figma Professional Education', category: 'Software Licenses', priority: 'Medium', status: 'Resolved', date: 'July 02, 2026' }
];

export default function SchoolHub() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [email, setEmail] = useState('student@verdant.edu');
    const [password, setPassword] = useState('password');
    const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'helpdesk'>('dashboard');
    const [tickets, setTickets] = useState(initialTickets);
    const [newTicketSubject, setNewTicketSubject] = useState('');
    const [newTicketDesc, setNewTicketDesc] = useState('');
    const [newTicketCategory, setNewTicketCategory] = useState('IT Support');
    const [newTicketPriority, setNewTicketPriority] = useState('Medium');
    const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
    const [showSpecPanel, setShowSpecPanel] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoggingIn(false);
        }, 800);
    };

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTicketSubject.trim()) return;

        setIsSubmittingTicket(true);
        setTimeout(() => {
            const ticketIdNum = Math.floor(Math.random() * 9000) + 1000;
            const newTicket = {
                id: `INC-2026-${ticketIdNum}`,
                subject: newTicketSubject,
                category: newTicketCategory,
                priority: newTicketPriority,
                status: 'New',
                date: 'Just now'
            };
            setTickets([newTicket, ...tickets]);
            setNewTicketSubject('');
            setNewTicketDesc('');
            setIsSubmittingTicket(false);
        }, 600);
    };

    const simulateResolveTicket = (ticketId: string) => {
        setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Resolved' } : t));
    };

    return (
        <PortfolioLayout>
            <Head>
                <title>Verdant Student Portal - Interactive Work Sample</title>
                <meta name="description" content="An interactive showcase of the Verdant student portal and helpdesk application designed by Hanita." />
            </Head>

            <div className="py-2 flex flex-col items-center">
                {/* Intro Title */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-3">
                        <Sparkles className="h-3 w-3" />
                        Live Interactive Work Sample
                    </span>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        SchoolHub / Verdant Student Portal
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Click around this live simulated web application to test my UI/UX, interaction engineering, and workflow logic. Use the floating panel to see my design notes.
                    </p>
                </div>

                {/* Login View */}
                {!isLoggedIn ? (
                    <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm shadow-2xl">
                        {/* Decorative Left Side */}
                        <div className="relative p-12 bg-emerald-950 text-white flex flex-col justify-between overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"></div>
                            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
                            
                            <div className="relative flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="font-serif text-xl font-bold italic tracking-wide text-white">Verdant</div>
                                    <div className="text-[9px] uppercase tracking-[0.25em] text-emerald-400/80">Student Portal</div>
                                </div>
                            </div>

                            <div className="relative space-y-6 max-w-md my-12">
                                <h2 className="font-serif text-4xl leading-[1.1] font-bold">
                                    Your academic workspace, <br />
                                    <span className="text-emerald-400 font-serif italic font-semibold">in one place.</span>
                                </h2>
                                <p className="text-emerald-200/70 text-sm leading-relaxed">
                                    Consolidate schedules, course tracking, and helpdesk operations into a high-fidelity workspace. Mapped to HFI cognitive design patterns.
                                </p>
                            </div>

                            <div className="relative text-[10px] uppercase tracking-[0.2em] text-emerald-500/60">
                                Simulated Integration — ServiceNow
                            </div>
                        </div>

                        {/* Login Form Side */}
                        <div className="flex items-center justify-center p-8 md:p-12 bg-background/90">
                            <div className="w-full max-w-sm flex flex-col gap-6">
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">Sign in to your portal</h3>
                                    <p className="text-xs text-muted-foreground mt-1">Pre-filled credentials. Click Sign In to test the dashboard.</p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">Student Email</Label>
                                        <Input 
                                            id="email" 
                                            type="email" 
                                            className="rounded-xl border-border/60 bg-transparent/20"
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="password" className="text-xs font-semibold text-muted-foreground">Password</Label>
                                        </div>
                                        <Input 
                                            id="password" 
                                            type="password" 
                                            className="rounded-xl border-border/60 bg-transparent/20"
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={isLoggingIn}
                                        className="w-full rounded-xl py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-md"
                                    >
                                        {isLoggingIn ? (
                                            <>
                                                <Clock className="h-4 w-4 animate-spin" />
                                                Verifying student record...
                                            </>
                                        ) : (
                                            <>
                                                <LogIn className="h-4 w-4" />
                                                Sign In
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="border-t border-border/40 pt-4 text-center">
                                    <p className="text-[10px] text-muted-foreground leading-normal">
                                        Demo mode: Real-time React local session. Credentials are pre-configured.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Dashboard View */
                    <div className="w-full max-w-5xl rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                        
                        {/* Dashboard Left Sidebar */}
                        <div className="w-full md:w-64 bg-card/50 border-b md:border-b-0 md:border-r border-border/40 p-6 flex flex-col justify-between">
                            <div className="flex flex-col gap-6">
                                {/* Dashboard Logo */}
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                                        <GraduationCap className="h-4.5 w-4.5" />
                                    </div>
                                    <div>
                                        <div className="font-serif text-sm font-bold italic tracking-wide">Verdant</div>
                                        <div className="text-[8px] uppercase tracking-widest text-muted-foreground">Student Workspace</div>
                                    </div>
                                </div>

                                {/* Student Badge Info */}
                                <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-emerald-600/20 text-emerald-600 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                                        H
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold leading-tight">Hanita Hamid</span>
                                        <span className="text-[9px] text-muted-foreground">ID: V-9184-2026</span>
                                    </div>
                                </div>

                                {/* Sidebar Tabs */}
                                <nav className="flex flex-col gap-1.5 mt-2">
                                    <button 
                                        onClick={() => setActiveTab('dashboard')}
                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                            activeTab === 'dashboard'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <Layers className="h-4 w-4" />
                                        Dashboard Home
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('courses')}
                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                            activeTab === 'courses'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <BookOpen className="h-4 w-4" />
                                        My Courses
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('helpdesk')}
                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                            activeTab === 'helpdesk'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <HelpCircle className="h-4 w-4" />
                                        ServiceNow Support
                                        {tickets.filter(t => t.status === 'New' || t.status === 'In Progress').length > 0 && (
                                            <Badge className="ml-auto bg-emerald-500/20 border-none text-emerald-400 rounded-full text-[9px] h-4.5 min-w-4.5 px-1 flex items-center justify-center font-bold">
                                                {tickets.filter(t => t.status === 'New' || t.status === 'In Progress').length}
                                            </Badge>
                                        )}
                                    </button>
                                </nav>
                            </div>

                            {/* Sign Out Button */}
                            <Button 
                                variant="ghost" 
                                onClick={() => setIsLoggedIn(false)}
                                className="w-full rounded-xl justify-start gap-2.5 text-xs text-muted-foreground hover:text-red-500 hover:bg-red-500/5 font-semibold mt-6"
                            >
                                <LogOut className="h-4 w-4" />
                                Log Out Session
                            </Button>
                        </div>

                        {/* Dashboard Workspace Main Area */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col bg-background/50">
                            
                            {/* Dashboard Home Tab */}
                            {activeTab === 'dashboard' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="flex justify-between items-center border-b border-border/40 pb-4">
                                        <div>
                                            <h3 className="text-xl font-bold tracking-tight">Academic Workspace</h3>
                                            <p className="text-xs text-muted-foreground mt-0.5">Real-time learning overview & analytics</p>
                                        </div>
                                        <Badge className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold rounded-full px-2.5 py-0.5 text-xs">
                                            Term 3 Active
                                        </Badge>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Cumulative GPA', value: '3.85 / 4.0', desc: 'Top 10% Bracket', icon: Award },
                                            { label: 'Overall Attendance', value: '98.2%', desc: '14/15 Classes logged', icon: CheckCircle2 },
                                            { label: 'Course Progress', value: '89.5%', desc: 'Assignments loaded', icon: BookOpen },
                                            { label: 'Helpdesk Tickets', value: `${tickets.filter(t => t.status !== 'Resolved').length} Active`, desc: 'ServiceNow triage', icon: HelpCircle }
                                        ].map((stat, idx) => (
                                            <Card key={idx} className="rounded-2xl border-border/40 bg-card/25">
                                                <CardContent className="p-4 flex flex-col gap-1.5">
                                                    <div className="flex items-center justify-between text-muted-foreground">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                                                        <stat.icon className="h-4 w-4 text-emerald-600" />
                                                    </div>
                                                    <span className="text-lg font-bold text-foreground">{stat.value}</span>
                                                    <span className="text-[9px] text-muted-foreground leading-none">{stat.desc}</span>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="grid lg:grid-cols-3 gap-6 mt-4">
                                        {/* Announcements List */}
                                        <div className="lg:col-span-2 space-y-4">
                                            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                <Info className="h-4 w-4 text-emerald-600" />
                                                Active Announcements
                                            </h4>
                                            
                                            <div className="space-y-3">
                                                {announcements.map((item) => (
                                                    <div key={item.id} className="p-4 rounded-2xl border border-border/30 bg-card/10 hover:bg-card/20 transition-all">
                                                        <div className="flex items-center justify-between gap-2 mb-1.5">
                                                            <span className="text-xs font-bold text-foreground">{item.title}</span>
                                                            <Badge variant="outline" className="rounded-full text-[9px] font-semibold border-border bg-background py-0">
                                                                {item.category}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                                                            {item.content}
                                                        </p>
                                                        <div className="text-[9px] text-primary/80 mt-2 text-right">
                                                            {item.date}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Today's Schedule */}
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-emerald-600" />
                                                Today's Schedule
                                            </h4>

                                            <div className="relative pl-3 border-l border-border/40 flex flex-col gap-4">
                                                {schedule.map((item, idx) => (
                                                    <div key={idx} className="relative flex flex-col p-3 rounded-2xl border border-border/30 bg-card/5">
                                                        {/* Bullet indicator */}
                                                        <div className="absolute -left-[16px] top-4 w-2 h-2 rounded-full bg-emerald-600" />
                                                        <span className="text-[9px] font-bold text-emerald-600 uppercase">{item.time}</span>
                                                        <span className="text-xs font-bold text-foreground leading-snug mt-0.5">{item.subject}</span>
                                                        <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1.5 leading-none">
                                                            <span>Room: {item.room}</span>
                                                            <span className="italic">{item.type}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* My Courses Tab */}
                            {activeTab === 'courses' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="flex justify-between items-center border-b border-border/40 pb-4">
                                        <div>
                                            <h3 className="text-xl font-bold tracking-tight">Enrolled Courses</h3>
                                            <p className="text-xs text-muted-foreground mt-0.5">Track your curriculum modules and learning progress</p>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {initialCourses.map((course) => (
                                            <Card key={course.id} className="rounded-2xl border-border/30 bg-card/25 hover:shadow-md transition-all flex flex-col justify-between">
                                                <CardHeader className="p-4 pb-2">
                                                    <div className="flex justify-between items-center">
                                                        <Badge variant="secondary" className="rounded-full text-[9px] font-bold bg-primary/10 border-none text-primary">
                                                            {course.code}
                                                        </Badge>
                                                        <span className="text-sm font-bold text-emerald-600">{course.grade}</span>
                                                    </div>
                                                    <CardTitle className="text-sm font-bold tracking-tight text-foreground mt-2 leading-tight">
                                                        {course.name}
                                                    </CardTitle>
                                                    <CardDescription className="text-[10px] text-muted-foreground">
                                                        Instructor: {course.instructor}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-2 flex-grow flex flex-col justify-end gap-3">
                                                    {/* Progress bar */}
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between items-center text-[9px] text-muted-foreground font-semibold">
                                                            <span>Module Complete</span>
                                                            <span>{course.progress}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                                                            <div 
                                                                className="h-full bg-emerald-600 transition-all duration-500" 
                                                                style={{ width: `${course.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Task items list */}
                                                    <div className="border-t border-border/30 pt-2 flex flex-col gap-1">
                                                        <span className="text-[9px] font-bold text-foreground uppercase tracking-wider">Course deliverables:</span>
                                                        {course.tasks.map((task, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                                                <Check className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                                                                <span>{task}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ServiceNow Helpdesk Tab */}
                            {activeTab === 'helpdesk' && (
                                <div className="space-y-6 animate-in fade-in duration-200 flex-grow flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-border/40 pb-4">
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight">ServiceNow Support Desk</h3>
                                                <p className="text-xs text-muted-foreground mt-0.5">Submit technical operations or facility requests directly in-portal</p>
                                            </div>
                                            <Badge variant="outline" className="rounded-full border-border bg-emerald-500/10 text-emerald-600 font-semibold px-2 py-0">
                                                ITIL Service Desk V3
                                            </Badge>
                                        </div>

                                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                                            {/* Submit ticket form */}
                                            <Card className="rounded-2xl border-border/30 bg-card/10">
                                                <CardHeader className="p-5 pb-2">
                                                    <CardTitle className="text-sm font-bold tracking-tight">File Support Ticket</CardTitle>
                                                    <CardDescription className="text-[10px]">Simulate dispatching a case to operations analysts.</CardDescription>
                                                </CardHeader>
                                                <form onSubmit={handleCreateTicket}>
                                                    <CardContent className="p-5 pt-2 space-y-3.5">
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="space-y-1">
                                                                <Label htmlFor="category" className="text-[10px] font-semibold text-muted-foreground">Category</Label>
                                                                <select 
                                                                    id="category"
                                                                    value={newTicketCategory}
                                                                    onChange={(e) => setNewTicketCategory(e.target.value)}
                                                                    className="flex h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                                                                >
                                                                    <option value="IT Support">IT Support</option>
                                                                    <option value="Software Licenses">Software Licenses</option>
                                                                    <option value="Hardware & Kits">Hardware & Kits</option>
                                                                    <option value="Classroom Booking">Classroom Booking</option>
                                                                </select>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label htmlFor="priority" className="text-[10px] font-semibold text-muted-foreground">Urgency</Label>
                                                                <select 
                                                                    id="priority"
                                                                    value={newTicketPriority}
                                                                    onChange={(e) => setNewTicketPriority(e.target.value)}
                                                                    className="flex h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                                                                >
                                                                    <option value="Low">Low</option>
                                                                    <option value="Medium">Medium</option>
                                                                    <option value="High">High</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <Label htmlFor="subject" className="text-[10px] font-semibold text-muted-foreground">Short Description</Label>
                                                            <Input 
                                                                id="subject"
                                                                placeholder="e.g. Cannot connect to Robotics Lab Wi-Fi network"
                                                                value={newTicketSubject}
                                                                onChange={(e) => setNewTicketSubject(e.target.value)}
                                                                className="rounded-xl border-border/60 bg-transparent text-xs"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="space-y-1">
                                                            <Label htmlFor="desc" className="text-[10px] font-semibold text-muted-foreground">Additional details</Label>
                                                            <textarea
                                                                id="desc"
                                                                placeholder="Provide specific device info or error messages..."
                                                                value={newTicketDesc}
                                                                onChange={(e) => setNewTicketDesc(e.target.value)}
                                                                rows={3}
                                                                className="flex min-h-[60px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                                                            />
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="p-5 pt-0">
                                                        <Button 
                                                            type="submit" 
                                                            disabled={isSubmittingTicket}
                                                            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                                                        >
                                                            {isSubmittingTicket ? (
                                                                <>
                                                                    <Clock className="h-3.5 w-3.5 animate-spin" />
                                                                    Filing Incident...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Send className="h-3.5 w-3.5" />
                                                                    File Incident Record
                                                                </>
                                                            )}
                                                        </Button>
                                                    </CardFooter>
                                                </form>
                                            </Card>

                                            {/* Tickets List */}
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                    <Terminal className="h-4 w-4 text-emerald-600" />
                                                    Service Desk Incident Logs
                                                </h4>

                                                <div className="space-y-3">
                                                    {tickets.map((t) => (
                                                        <div key={t.id} className="p-4 rounded-2xl border border-border/30 bg-card/25 flex flex-col gap-2 relative">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] font-mono font-bold text-emerald-600">{t.id}</span>
                                                                    <Badge variant="outline" className="rounded-full text-[8px] font-semibold border-border px-2 py-0 bg-background">
                                                                        {t.category}
                                                                    </Badge>
                                                                </div>
                                                                <Badge className={`rounded-full text-[8px] font-bold border-none px-2 py-0 ${
                                                                    t.status === 'Resolved' 
                                                                        ? 'bg-emerald-500/10 text-emerald-500' 
                                                                        : t.status === 'In Progress'
                                                                            ? 'bg-amber-500/10 text-amber-500'
                                                                            : 'bg-primary/10 text-primary animate-pulse'
                                                                }`}>
                                                                    {t.status}
                                                                </Badge>
                                                            </div>
                                                            <span className="text-xs font-semibold text-foreground leading-snug">{t.subject}</span>
                                                            
                                                            <div className="flex justify-between items-center text-[9px] text-muted-foreground mt-1 border-t border-border/20 pt-2 leading-none">
                                                                <span>Urgency: <strong className={t.priority === 'High' ? 'text-red-500 font-bold' : 'font-medium text-foreground'}>{t.priority}</strong></span>
                                                                <span>{t.date}</span>
                                                            </div>

                                                            {/* Simulate Resolution button for demo */}
                                                            {t.status !== 'Resolved' && (
                                                                <Button 
                                                                    size="sm"
                                                                    onClick={() => simulateResolveTicket(t.id)}
                                                                    className="absolute top-3 right-3 text-[9px] font-bold h-6 px-2.5 rounded-lg border-emerald-500/20 text-emerald-600 hover:bg-emerald-600/10 bg-emerald-500/5 border"
                                                                >
                                                                    Simulate Resolve
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ticketing stats footer */}
                                    <div className="border-t border-border/30 pt-4 p-4 rounded-2xl bg-card/10 text-[10px] text-muted-foreground leading-relaxed mt-6">
                                        <strong>Operations Integration Analytics:</strong> Ticketing fields adhere strictly to ITIL operational guidelines. Incident reports automatically dispatch alerts to departmental dashboards, replicating support models executed at the <i>Institute of Mental Health (IMH)</i>.
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>

            {/* Floating Specs button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button 
                    onClick={() => setShowSpecPanel(true)}
                    className="rounded-full h-12 px-5 bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl hover:shadow-2xl flex items-center gap-2 border border-emerald-600 transition-transform duration-300 hover:scale-105"
                >
                    <Layers className="h-4.5 w-4.5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Architecture Spec</span>
                </Button>
            </div>

            {/* Specification Slide-over Drawer Panel */}
            {showSpecPanel && (
                <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
                    <div className="w-full max-w-lg bg-background border-l border-border h-full shadow-2xl p-6 md:p-8 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300">
                        <div>
                            <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="h-5 w-5 text-emerald-600" />
                                    <h3 className="font-serif text-lg font-bold italic">UX/UI & System Architecture Spec</h3>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setShowSpecPanel(false)}
                                    className="text-xs font-semibold px-2 py-1 h-fit hover:bg-muted"
                                >
                                    ✕ Close Spec
                                </Button>
                            </div>

                            <div className="space-y-6 text-xs text-muted-foreground leading-relaxed">
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">1. Cognitive Design & Usability (HFI Model)</span>
                                    <p>
                                        This interactive student portal dashboard is engineered based on usability methodologies validated by Human Factors International (HFI). By using a pre-filled credential screen, it minimizes keystroke cognitive load. The internal dashboard clusters indicators (GPA, Attendance, Progress) into a single focal layout, preventing informational clutter.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">2. Incident Management & ServiceNow Simulation</span>
                                    <p>
                                        The Support Desk tab replicates the schema requirements of enterprise ticketing systems (ServiceNow). In my System Analyst role at IMH, analyzed support bottlenecks. Here, submitting a ticket dynamically populates the local incident log and simulates queue state transitions, proving my ability to bind React state management to complex backend operations workflows.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">3. Front-End Technical Stack</span>
                                    <p>
                                        Built on Vite, React, and Tailwind CSS v4. Standardizes interactive state models, supports fluid slide-over panels, and provides immediate visual feedback. Incorporates responsive utility classes for clean scaling from small mobile viewports to large high-resolution desktops.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">4. Accessibility & Error Prevention</span>
                                    <p>
                                        Includes active state tracking, clear confirmation alerts, and validation checks on ticket fields. Implements contrast ratios aligned with WCAG 2.1 Web Accessibility Guidelines, using high-visibility emerald accents to highlight progress states.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border/40 pt-6 mt-8 flex flex-col gap-3">
                            <Link href="/contact" className="w-full">
                                <Button 
                                    onClick={() => setShowSpecPanel(false)}
                                    className="w-full rounded-xl py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-1.5 shadow-sm"
                                >
                                    Contact Hanita to Learn More
                                </Button>
                            </Link>
                            <p className="text-[10px] text-center text-muted-foreground">
                                Ready to scale your IT ops or UI/UX workflows? Let's discuss remote or WFH opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </PortfolioLayout>
    );
}
