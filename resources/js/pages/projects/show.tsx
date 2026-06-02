import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, ExternalLink, Github, Layers } from 'lucide-react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    tech_stack: string[];
    project_url: string | null;
    github_url: string | null;
    image_path: string | null;
    is_featured: boolean;
    created_at: string;
}

interface ShowProps {
    project: Project;
}

// A secure, elegant, regex-based Markdown to HTML renderer for UX/UI case study contents
function renderMarkdown(markdown: string): string {
    if (!markdown) return '';

    let html = markdown
        // Escape basic HTML to prevent XSS
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h4 class="font-sans text-base font-bold text-foreground mt-5 mb-2 tracking-tight">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="font-serif text-xl font-bold italic text-primary mt-6 mb-3 border-b border-border/40 pb-1.5">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="font-serif text-2xl font-black italic text-foreground mt-8 mb-4">$1</h2>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc pl-1 text-muted-foreground leading-relaxed text-sm my-1">$1</li>');

    // Line breaks
    html = html.replace(/\n$/gim, '<br />');

    return html;
}

export default function Show({ project }: ShowProps) {
    return (
        <PortfolioLayout>
            <Head>
                <title>{`${project.title} - UX/UI Case Study`}</title>
                <meta name="description" content={project.description} />
            </Head>

            <div className="max-w-3xl mx-auto py-4">
                {/* Back Button */}
                <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to all work
                </Link>

                {/* Header */}
                <header className="border-b border-border/40 pb-6 mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(project.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                        </span>
                        {project.is_featured && (
                            <Badge className="bg-primary/10 border border-primary/20 text-primary rounded-full font-bold text-[9px] px-2.5 py-0.5">
                                Selected Work
                            </Badge>
                        )}
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-black italic tracking-tight text-foreground leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground mt-3 leading-relaxed">
                        {project.description}
                    </p>
                </header>

                {/* Visual Banner */}
                <div className="w-full aspect-[16/9] bg-muted/40 rounded-3xl relative overflow-hidden flex items-center justify-center mb-8 border border-border/30">
                    {project.image_path ? (
                        <img
                            src={`/storage/${project.image_path}`}
                            alt={project.title}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center bg-gradient-to-tr from-primary/5 to-amber-500/5 select-none">
                            <div className="p-3.5 rounded-2xl bg-background border border-border/30 text-primary shadow-sm">
                                <Layers className="h-8 w-8 text-primary animate-pulse" />
                            </div>
                            <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Case Study Presentation Visuals</span>
                        </div>
                    )}
                </div>

                {/* Skills & Domains */}
                <div className="mb-6 p-4 rounded-2xl bg-card/25 border border-border/30">
                    <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-2">Skills & Domains Involved</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech_stack.map((tech) => (
                            <Badge key={tech} className="bg-background text-foreground border border-border/50 rounded-full font-medium text-xs px-3 py-1 shadow-sm">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Markdown Contents */}
                <div className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed mb-8 pt-6 border-t border-border/40">
                    <div
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(project.content) }}
                        className="space-y-4 text-muted-foreground leading-relaxed"
                    />
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/40">
                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <Button className="w-full rounded-xl py-5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold shadow-md gap-1.5">
                                <ExternalLink className="h-4 w-4" />
                                Visit Live Experience
                            </Button>
                        </a>
                    )}
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={project.project_url ? 'flex-1' : 'w-full'}
                        >
                            <Button variant="outline" className="w-full rounded-xl py-5 gap-2 border-border hover:bg-muted font-semibold">
                                <Github className="h-4 w-4" />
                                View Design Spec Repo
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </PortfolioLayout>
    );
}
