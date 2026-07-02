import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, MessageSquare, Send, User, Sparkles, MapPin, Globe } from 'lucide-react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export default function Contact() {
    const { settings } = usePage().props as any;
    // Inertia form helper to handle validation and submit states
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PortfolioLayout>
            <Head>
                <title>Contact - Connect With Hanita</title>
                <meta name="description" content="Get in touch with Hanita for premium UX/UI consulting, spatial experiences, and design contract roles in Singapore." />
            </Head>

            <div className="max-w-4xl mx-auto py-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold italic tracking-tight mb-4 text-foreground">
                        Let's Create Together
                    </h1>
                    <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Have a contract opportunity, a design consulting query, or simply want to talk about spatial UI? Drop me a line and let's start a conversation.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-10">
                    {/* Information panel */}
                    <div className="md:col-span-2 flex flex-col justify-between p-6 md:p-8 bg-zinc-900 dark:bg-card/25 border border-zinc-800 dark:border-border/30 rounded-[2rem] text-zinc-100 dark:text-foreground relative overflow-hidden">
                        {/* Decorative background blur ring */}
                        <div className="absolute top-0 right-0 w-44 h-44 bg-primary/20 rounded-full blur-3xl -z-10" />

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 dark:bg-primary/10 dark:border-primary/20 text-zinc-300 dark:text-primary">
                                <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                                Interactive Hub
                            </div>

                            <h3 className="font-serif text-2xl font-bold italic text-white dark:text-foreground">Singapore & Remote</h3>
                            <p className="text-sm text-zinc-400 dark:text-muted-foreground leading-relaxed">
                                I check my dashboard inbox multiple times a day and will get back to you within 24 hours. Based out of Singapore (SGT timezone).
                            </p>
                        </div>

                        <div className="space-y-6 mt-10 md:mt-0">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 dark:bg-muted dark:border-border/30 rounded-2xl">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-zinc-400 dark:text-muted-foreground font-bold uppercase tracking-wider">Email Direct</p>
                                    <a href={`mailto:${settings?.contact_email || 'hello@hanita.design'}`} className="text-sm hover:underline font-bold text-zinc-100 dark:text-foreground">
                                        {settings?.contact_email || 'hello@hanita.design'}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 dark:bg-muted dark:border-border/30 rounded-2xl">
                                    <MapPin className="h-5 w-5 text-amber-400 dark:text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-zinc-400 dark:text-muted-foreground font-bold uppercase tracking-wider">Location</p>
                                    <p className="text-sm text-zinc-100 dark:text-foreground font-bold">{settings?.contact_address || 'Downtown Core, Singapore'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 dark:bg-muted dark:border-border/30 rounded-2xl">
                                    <Globe className="h-5 w-5 text-emerald-400 dark:text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-zinc-400 dark:text-muted-foreground font-bold uppercase tracking-wider">Availability</p>
                                    <p className="text-sm text-zinc-100 dark:text-foreground font-bold">{settings?.availability_status ? (settings.availability_status.includes('roles') ? 'Immediate Openings' : settings.availability_status) : 'Immediate Openings'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Panel */}
                    <div className="md:col-span-3 p-6 md:p-8 bg-card/25 border border-border/40 rounded-[2rem] shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-1.5 text-foreground">
                                    <User className="h-3.5 w-3.5 text-primary" />
                                    Your Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Jane Tan"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="rounded-xl border-border/50 bg-background text-foreground shadow-sm"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-1.5 text-foreground">
                                    <Mail className="h-3.5 w-3.5 text-primary" />
                                    Your Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="jane.tan@company.sg"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="rounded-xl border-border/50 bg-background text-foreground shadow-sm"
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Subject */}
                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-sm font-semibold flex items-center gap-1.5 text-foreground">
                                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                                    Inquiry Subject
                                </Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="UX Consulting / Contract Opportunity / Spatial Design"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="rounded-xl border-border/50 bg-background text-foreground shadow-sm"
                                    required
                                />
                                <InputError message={errors.subject} />
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-semibold text-foreground">
                                    Message & Project Details
                                </Label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Describe your design objectives, timelines, and compliance specifications..."
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full min-h-[120px] rounded-xl border border-border/50 bg-background text-foreground px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                                <InputError message={errors.message} />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl py-6 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold gap-2 shadow-md hover:shadow-lg transition-all"
                            >
                                <Send className="h-4 w-4" />
                                {processing ? 'Sending Inquiry...' : 'Send Inquiry'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
