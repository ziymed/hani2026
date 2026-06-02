import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Layers, Calendar, ExternalLink, Github } from 'lucide-react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

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

interface ProjectsProps {
    projects: Project[];
    tags: string[];
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

export default function Projects({ projects, tags }: ProjectsProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    // Client-side filtering logic
    const filteredProjects = selectedTag
        ? projects.filter((project) => project.tech_stack.includes(selectedTag))
        : projects;

    return (
        <PortfolioLayout>
            <Head>
                <title>Case Studies - Selected UX/UI Work</title>
                <meta name="description" content="Explore my portfolio of professional UX/UI case studies, design systems, and spatial interfaces." />
            </Head>

            <div className="py-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold italic tracking-tight mb-4 text-foreground">
                        Selected Design Work
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        A deep dive into my structural user research, digital design system frameworks, and high-fidelity interaction curations.
                    </p>
                </div>

                {/* Tags Filter Navbar */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
                    <Button
                        variant={selectedTag === null ? 'default' : 'outline'}
                        onClick={() => setSelectedTag(null)}
                        className="rounded-full text-xs font-semibold px-4"
                        size="sm"
                    >
                        All Work ({projects.length})
                    </Button>
                    {tags.map((tag) => {
                        const count = projects.filter((p) => p.tech_stack.includes(tag)).length;
                        return (
                            <Button
                                key={tag}
                                variant={selectedTag === tag ? 'default' : 'outline'}
                                onClick={() => setSelectedTag(tag)}
                                className="rounded-full text-xs font-semibold px-4 gap-1.5"
                                size="sm"
                            >
                                {tag}
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                    selectedTag === tag ? 'bg-primary-foreground text-primary font-bold' : 'bg-muted text-muted-foreground'
                                }`}>
                                    {count}
                                </span>
                            </Button>
                        );
                    })}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {filteredProjects.map((project) => (
                            <Card
                                key={project.id}
                                className="group overflow-hidden rounded-[2rem] border border-border/40 bg-card/25 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col h-full"
                            >
                                <div
                                    className="aspect-[16/10] w-full bg-muted/40 relative overflow-hidden flex items-center justify-center border-b border-border/30 cursor-pointer"
                                    onClick={() => setActiveProject(project)}
                                >
                                    {project.image_path ? (
                                        <img
                                            src={`/storage/${project.image_path}`}
                                            alt={project.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-tr from-primary/5 to-amber-500/5 select-none">
                                            <div className="p-3 rounded-2xl bg-background border border-border/30 text-primary shadow-sm">
                                                <Layers className="h-6 w-6 text-primary animate-pulse" />
                                            </div>
                                            <span className="text-[9px] font-semibold tracking-wider uppercase text-muted-foreground">UX Case Study</span>
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="p-6 pb-2">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(project.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                        </span>
                                        {project.is_featured && (
                                            <Badge className="text-[9px] bg-primary/10 text-primary border-none font-semibold px-2.5 py-0.5 rounded-full">
                                                Featured Work
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle
                                        className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors cursor-pointer leading-snug"
                                        onClick={() => setActiveProject(project)}
                                    >
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3 text-muted-foreground text-sm mt-2 leading-relaxed">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 pt-2 pb-4 flex-grow">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech_stack.map((tech) => (
                                            <Badge key={tech} variant="outline" className="rounded-full text-[10px] font-medium border-border/60 text-muted-foreground px-2.5 py-0.5">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 border-t border-border/30 mt-auto flex items-center justify-between">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-lg text-xs font-semibold pl-0 hover:bg-transparent hover:text-primary text-muted-foreground"
                                        onClick={() => setActiveProject(project)}
                                    >
                                        Read Case Study
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                                                <Github className="h-4 w-4" />
                                            </a>
                                        )}
                                        {project.project_url && (
                                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-border rounded-[2rem] max-w-xl mx-auto bg-card/10">
                        <Layers className="h-10 w-10 mx-auto text-muted-foreground mb-3 animate-pulse" />
                        <h3 className="text-lg font-bold">No Projects Found</h3>
                        <p className="text-sm text-muted-foreground mt-1">There are no projects matching the filter tag: "{selectedTag}"</p>
                        <Button variant="link" onClick={() => setSelectedTag(null)} className="mt-4 text-xs font-semibold text-primary">
                            Reset filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Case Study Lightbox Overlay Dialog */}
            <Dialog open={activeProject !== null} onOpenChange={(open) => !open && setActiveProject(null)}>
                <DialogContent className="max-w-3xl overflow-y-auto max-h-[85vh] rounded-[2.5rem] bg-background border border-border p-6 md:p-10 shadow-2xl">
                    {activeProject && (
                        <>
                            <DialogHeader className="text-left border-b border-border/40 pb-6">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                        UX/UI Case Study
                                    </span>
                                    {activeProject.is_featured && (
                                        <Badge className="bg-primary/10 border border-primary/20 text-primary rounded-full font-bold text-[9px] px-2.5 py-0.5">
                                            Selected
                                        </Badge>
                                    )}
                                </div>
                                <DialogTitle className="font-serif text-2xl md:text-3xl font-black tracking-tight mt-1 text-foreground leading-tight">
                                    {activeProject.title}
                                </DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                    {activeProject.description}
                                </DialogDescription>
                            </DialogHeader>

                            {/* Project visual banner */}
                            <div className="w-full aspect-[21/9] bg-muted/40 rounded-3xl relative overflow-hidden flex items-center justify-center my-6 border border-border/30">
                                {activeProject.image_path ? (
                                    <img
                                        src={`/storage/${activeProject.image_path}`}
                                        alt={activeProject.title}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-6 bg-gradient-to-tr from-primary/5 to-amber-500/5 select-none">
                                        <div className="p-3 rounded-2xl bg-background border border-border/30 text-primary shadow-sm">
                                            <Layers className="h-6 w-6 text-primary animate-pulse" />
                                        </div>
                                        <span className="text-[9px] font-semibold tracking-wider uppercase text-muted-foreground">Case Study Rich Media Preview</span>
                                    </div>
                                )}
                            </div>

                            {/* Tech stack tags */}
                            <div className="mb-6 p-4 rounded-2xl bg-card/25 border border-border/30">
                                <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-2">Skills & Domains Involved</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeProject.tech_stack.map((tech) => (
                                        <Badge key={tech} className="bg-background text-foreground border border-border/50 rounded-full font-medium text-xs px-3 py-1 shadow-sm">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Markdown Rich Content */}
                            <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed mb-6 pt-2">
                                <div
                                    dangerouslySetInnerHTML={{ __html: renderMarkdown(activeProject.content) }}
                                    className="space-y-4 text-muted-foreground leading-relaxed"
                                />
                            </div>

                            {/* Links / Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/40">
                                {activeProject.project_url && (
                                    <a
                                        href={activeProject.project_url}
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
                                {activeProject.github_url && (
                                    <a
                                        href={activeProject.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={activeProject.project_url ? 'flex-1' : 'w-full'}
                                    >
                                        <Button variant="outline" className="w-full rounded-xl py-5 gap-2 border-border hover:bg-muted font-semibold">
                                            <Github className="h-4 w-4" />
                                            View Design Spec Repo
                                        </Button>
                                    </a>
                                )}
                                <Button
                                    variant="secondary"
                                    onClick={() => setActiveProject(null)}
                                    className="rounded-xl font-medium"
                                >
                                    Close Case Study
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </PortfolioLayout>
    );
}
