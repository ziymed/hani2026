import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Mail, Trash2, MailOpen, Calendar, Clock, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface MessagesIndexProps {
    messages: Message[];
}

export default function MessagesIndex({ messages }: MessagesIndexProps) {
    const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);

    // Synchronize selectedMsg when messages update (e.g. read status toggled)
    useEffect(() => {
        if (selectedMsg) {
            const updated = messages.find((m) => m.id === selectedMsg.id);
            if (updated) {
                setSelectedMsg(updated);
            } else {
                setSelectedMsg(null);
            }
        }
    }, [messages]);

    const handleToggleRead = (msg: Message) => {
        router.patch(`/admin/messages/${msg.id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(msg.is_read ? 'Message marked as unread' : 'Message marked as read');
            },
        });
    };

    const handleDelete = (msg: Message) => {
        if (confirm(`Are you sure you want to delete the message from "${msg.name}"? This action is permanent.`)) {
            router.delete(`/admin/messages/${msg.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Message deleted successfully');
                    if (selectedMsg?.id === msg.id) {
                        setSelectedMsg(null);
                    }
                },
            });
        }
    };

    const unreadCount = messages.filter((m) => !m.is_read).length;

    return (
        <>
            <Head title="Client Inquiries Inbox" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 overflow-hidden max-h-[85vh]">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">Client Inquiries Inbox</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Review, organize, and reply to client inquiries coming from the public contact form</p>
                    </div>
                    {unreadCount > 0 && (
                        <Badge className="bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 font-bold px-3 py-1 text-xs gap-1.5 rounded-full">
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            {unreadCount} New Messages
                        </Badge>
                    )}
                </div>

                {/* Inbox Split Pane */}
                <div className="grid lg:grid-cols-5 gap-6 flex-1 min-h-0 h-[60vh]">
                    {/* Left Pane: Messages list */}
                    <Card className="lg:col-span-2 flex flex-col min-h-0 dark:bg-zinc-900 dark:border-zinc-800">
                        <CardHeader className="pb-3 border-b border-zinc-150/40 dark:border-zinc-800">
                            <CardTitle className="text-sm font-bold">Mailbox</CardTitle>
                            <CardDescription>Total: {messages.length} submissions</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 overflow-y-auto flex-1 divide-y divide-zinc-100 dark:divide-zinc-800">
                            {messages.length > 0 ? (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        onClick={() => {
                                            setSelectedMsg(msg);
                                            // Automatically mark as read if it is unread when clicked
                                            if (!msg.is_read) {
                                                handleToggleRead(msg);
                                            }
                                        }}
                                        className={`p-4 text-left cursor-pointer transition-all border-l-4 ${
                                            selectedMsg?.id === msg.id
                                                ? 'bg-zinc-100/50 dark:bg-zinc-850/30 border-zinc-900 dark:border-zinc-100'
                                                : msg.is_read
                                                ? 'border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-850/10'
                                                : 'border-red-500 bg-red-500/[0.01] hover:bg-red-500/[0.03]'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className={`text-xs truncate ${!msg.is_read ? 'font-extrabold text-zinc-900 dark:text-zinc-50' : 'font-medium text-zinc-650'}`}>
                                                {msg.name}
                                            </span>
                                            <span className="text-[10px] text-zinc-400 font-mono flex-shrink-0">
                                                {new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <h4 className={`text-xs truncate ${!msg.is_read ? 'font-bold text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                            {msg.subject}
                                        </h4>
                                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 line-clamp-1 mt-1">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <Mail className="h-8 w-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                                    <h4 className="text-sm font-bold text-zinc-650">No Submissions</h4>
                                    <p className="text-xs text-zinc-450">Inbox is empty. When clients contact you, they will appear here.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Right Pane: Message Viewer */}
                    <Card className="lg:col-span-3 flex flex-col min-h-0 dark:bg-zinc-900 dark:border-zinc-800">
                        {selectedMsg ? (
                            <div className="flex flex-col h-full min-h-0">
                                {/* Viewer Header */}
                                <div className="p-5 border-b border-zinc-150/40 dark:border-zinc-800 flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="font-extrabold text-base text-zinc-900 dark:text-zinc-50 leading-none">
                                                {selectedMsg.name}
                                            </span>
                                            <span className="text-xs text-zinc-400 truncate">
                                                {`<${selectedMsg.email}>`}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-2">
                                            Subject: {selectedMsg.subject}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-lg"
                                            title={selectedMsg.is_read ? 'Mark as unread' : 'Mark as read'}
                                            onClick={() => handleToggleRead(selectedMsg)}
                                        >
                                            {selectedMsg.is_read ? (
                                                <Mail className="h-4 w-4 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50" />
                                            ) : (
                                                <MailOpen className="h-4 w-4 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50" />
                                            )}
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-lg"
                                            title="Delete message"
                                            onClick={() => handleDelete(selectedMsg)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Date Metadata Banner */}
                                <div className="px-5 py-2 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-4 text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(selectedMsg.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(selectedMsg.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                {/* Message Body Contents */}
                                <div className="p-5 flex-1 overflow-y-auto text-sm leading-relaxed text-zinc-650 dark:text-zinc-350 select-text whitespace-pre-wrap">
                                    {selectedMsg.message}
                                </div>

                                {/* Reply Quick Actions */}
                                <div className="p-5 border-t border-zinc-150/40 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 flex justify-end">
                                    <a href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}>
                                        <Button className="rounded-xl gap-1.5 bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 font-semibold shadow-sm">
                                            <Send className="h-3.5 w-3.5" />
                                            Compose Mail Reply
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none text-zinc-400">
                                <AlertCircle className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-3 animate-pulse" />
                                <h3 className="font-bold text-sm">No Message Selected</h3>
                                <p className="text-xs text-zinc-450 mt-1 max-w-[200px]">Select a message from the mailbox pane to read its detailed contents.</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
}

MessagesIndex.layout = (page: any) => ({
    breadcrumbs: [
        {
            title: 'Admin Overview',
            href: '/admin',
        },
        {
            title: 'Messages Inbox',
            href: '/admin/messages',
        },
    ],
});
