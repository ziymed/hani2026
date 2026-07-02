import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Sun, Moon, Laptop, Code2, ShieldAlert } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PortfolioLayoutProps {
    children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
    const { props } = usePage<any>();
    const { appearance, updateAppearance, resolvedAppearance } = useAppearance();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Watch for flash success/error messages from the session and display them as toasts
    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    const currentRoute = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
            {/* Header / Nav */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1.5 tracking-tight hover:opacity-85 transition-opacity">
                        <span className="font-serif text-2xl font-black italic tracking-wide text-primary">{props.settings?.site_name || 'Hanita'}<span className="text-zinc-400 font-sans not-italic font-normal">.</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-zinc-950 dark:hover:text-zinc-50 ${
                                    currentRoute === item.href
                                        ? 'text-zinc-950 dark:text-zinc-50 font-semibold'
                                        : 'text-zinc-500 dark:text-zinc-400'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Admin Link if Logged in & Admin */}
                        {props.auth?.user?.is_admin && (
                            <Link
                                href="/admin"
                                className="flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
                            >
                                <ShieldAlert className="h-4 w-4" />
                                Admin Dashboard
                            </Link>
                        )}

                        {/* Standard Dashboard Link if Logged in as standard user */}
                        {props.auth?.user && !props.auth.user.is_admin && (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                            >
                                User Dashboard
                            </Link>
                        )}
                    </nav>

                    {/* Actions: Theme toggle & CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
                                    {resolvedAppearance === 'dark' ? (
                                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                                    ) : (
                                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                                    )}
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-zinc-900 dark:border-zinc-800">
                                <DropdownMenuItem onClick={() => updateAppearance('light')} className="gap-2 cursor-pointer">
                                    <Sun className="h-4 w-4" /> Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAppearance('dark')} className="gap-2 cursor-pointer">
                                    <Moon className="h-4 w-4" /> Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAppearance('system')} className="gap-2 cursor-pointer">
                                    <Laptop className="h-4 w-4" /> System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {!props.auth?.user ? (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" className="rounded-full text-sm font-medium">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="rounded-full bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 transition-all font-medium text-sm">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/contact">
                                <Button className="rounded-full bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 transition-all font-medium text-sm">
                                    Let's Talk
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu trigger */}
                    <div className="flex items-center gap-3 md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
                                    {resolvedAppearance === 'dark' ? (
                                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                                    ) : (
                                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-zinc-900 dark:border-zinc-800">
                                <DropdownMenuItem onClick={() => updateAppearance('light')} className="gap-2 cursor-pointer">
                                    <Sun className="h-4 w-4" /> Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAppearance('dark')} className="gap-2 cursor-pointer">
                                    <Moon className="h-4 w-4" /> Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAppearance('system')} className="gap-2 cursor-pointer">
                                    <Laptop className="h-4 w-4" /> System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full w-9 h-9 text-zinc-600 dark:text-zinc-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-background border-b border-border/50 shadow-lg px-4 py-6 transition-all animate-in fade-in slide-in-from-top duration-200">
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-base font-medium py-1 transition-colors ${
                                    currentRoute === item.href
                                        ? 'text-zinc-950 dark:text-zinc-50 font-bold border-l-2 border-zinc-900 dark:border-zinc-50 pl-3'
                                        : 'text-zinc-500 dark:text-zinc-400 pl-3'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {props.auth?.user?.is_admin && (
                            <Link
                                href="/admin"
                                className="flex items-center gap-2 text-base font-semibold text-amber-600 dark:text-amber-400 py-1 pl-3"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <ShieldAlert className="h-5 w-5" />
                                Admin Dashboard
                            </Link>
                        )}
                        {props.auth?.user && !props.auth.user.is_admin && (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-base font-semibold text-zinc-700 dark:text-zinc-300 py-1 pl-3"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                User Dashboard
                            </Link>
                        )}
                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
                            {!props.auth?.user ? (
                                <>
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full rounded-xl">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full rounded-xl bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950">
                                        Let's Talk
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}

            {/* Content Area */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-13rem)] flex flex-col justify-center">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-border/40 bg-background/50 backdrop-blur-md py-10 mt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div className="flex flex-col gap-1.5">
                        <p className="font-serif text-xl font-bold italic text-primary">{props.settings?.site_name || 'Hanita'}.</p>
                        <p className="text-xs text-muted-foreground">
                            &copy; {new Date().getFullYear()} {props.settings?.site_name || 'Hanita'}. All rights reserved. Crafted with love in Singapore.
                        </p>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground font-medium">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
                        <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
