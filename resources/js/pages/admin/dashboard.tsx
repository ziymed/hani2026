import { Head, Link } from '@inertiajs/react';
import { FolderGit2, Mail, PlusCircle, Inbox, ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

interface Stat {
    totalProjects: number;
    unreadMessages: number;
    totalMessages: number;
}

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface DashboardProps {
    stats: Stat;
    recentMessages: Message[];
}

export default function Dashboard({ stats, recentMessages }: DashboardProps) {
    return (
        <>
            <Head title="Admin Dashboard Overview" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Total Projects */}
                    <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold tracking-tight">Total Projects</CardTitle>
                            <FolderGit2 className="h-4 w-4 text-zinc-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">{stats.totalProjects}</div>
                            <p className="text-xs text-zinc-500 mt-1">Showcased in your public catalog</p>
                        </CardContent>
                    </Card>

                    {/* Unread Inbox Messages */}
                    <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold tracking-tight">Unread Messages</CardTitle>
                            <Mail className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black flex items-center gap-2">
                                {stats.unreadMessages}
                                {stats.unreadMessages > 0 && (
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">Pending response submissions</p>
                        </CardContent>
                    </Card>

                    {/* Total Inbox Messages */}
                    <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold tracking-tight">Total Submissions</CardTitle>
                            <Inbox className="h-4 w-4 text-zinc-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">{stats.totalMessages}</div>
                            <p className="text-xs text-zinc-500 mt-1">Total client inquiries received</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions Panel */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold tracking-tight">Quick Access & Controls</CardTitle>
                            <CardDescription>Shortcut triggers to frequently used features</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/admin/projects/create" className="flex-1">
                                    <Button className="w-full rounded-xl bg-zinc-900 dark:bg-zinc-550 hover:bg-zinc-850 text-zinc-50 dark:text-zinc-50 font-semibold gap-1.5 py-5">
                                        <PlusCircle className="h-4 w-4" />
                                        Add Portfolio Project
                                    </Button>
                                </Link>
                                <Link href="/admin/messages" className="flex-1">
                                    <Button variant="outline" className="w-full rounded-xl font-semibold gap-1.5 py-5">
                                        <Inbox className="h-4 w-4" />
                                        Open Messages Inbox
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Public Links Card */}
                    <Card className="dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold tracking-tight">Public Portals</CardTitle>
                            <CardDescription>Open public sections of your site to verify changes</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row gap-3">
                            <a href="/" target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="secondary" className="w-full rounded-xl font-semibold gap-1.5 py-5">
                                    <ExternalLink className="h-4 w-4" />
                                    Launch Public Home
                                </Button>
                            </a>
                            <a href="/projects" target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="secondary" className="w-full rounded-xl font-semibold gap-1.5 py-5">
                                    <FolderGit2 className="h-4 w-4" />
                                    Launch Public Catalog
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Inbox Messages */}
                <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                        <div>
                            <CardTitle className="text-lg font-bold tracking-tight">Recent Client Inquiries</CardTitle>
                            <CardDescription>The latest submissions received from the public contact form</CardDescription>
                        </div>
                        <Link href="/admin/messages">
                            <Button variant="ghost" size="sm" className="rounded-xl text-xs gap-1">
                                View Inbox
                                <ArrowRight className="h-3 w-3" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {recentMessages.length > 0 ? (
                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {recentMessages.map((msg) => (
                                    <div key={msg.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-850/30 transition-colors">
                                        <div className="min-w-0 flex-1 pr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50">{msg.name}</span>
                                                <span className="text-xs text-zinc-500 truncate max-w-[150px] sm:max-w-none">{`<${msg.email}>`}</span>
                                                {!msg.is_read && (
                                                    <Badge className="bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 font-bold text-[9px] px-1.5 py-0 rounded-full">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                            <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-350 truncate">{msg.subject}</h4>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-450 line-clamp-1 mt-1">{msg.message}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 block mb-1">
                                                {new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                            <Link href="/admin/messages">
                                                <Button size="sm" variant="ghost" className="rounded-lg text-[10px] h-7 font-bold">
                                                    Read
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <Mail className="h-8 w-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                                <h4 className="text-sm font-bold text-zinc-650">No Messages</h4>
                                <p className="text-xs text-zinc-400 mt-0.5">Your contact form submissions will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

// Map the breadcrumbs for the admin template layout
Dashboard.layout = (page: any) => ({
    breadcrumbs: [
        {
            title: 'Admin Overview',
            href: '/admin',
        },
    ],
});
