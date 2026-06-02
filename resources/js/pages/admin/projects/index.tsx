import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { FolderGit2, PlusCircle, Pencil, Trash2, Calendar, Star, ExternalLink, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    tech_stack: string[];
    project_url: string | null;
    github_url: string | null;
    image_path: string | null;
    is_featured: boolean;
    created_at: string;
}

interface ProjectsIndexProps {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const handleDelete = (project: Project) => {
        if (confirm(`Are you absolutely sure you want to delete the project "${project.title}"? This action cannot be undone.`)) {
            router.delete(`/admin/projects/${project.id}`, {
                onSuccess: () => toast.success('Project deleted successfully'),
                onError: () => toast.error('Failed to delete project'),
            });
        }
    };

    return (
        <>
            <Head title="Manage Portfolio Projects" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">Manage Portfolio Projects</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Create, review, update, or remove projects shown on your public portfolio catalog</p>
                    </div>
                    <Link href="/admin/projects/create">
                        <Button className="rounded-xl bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 font-semibold gap-1.5 shadow-md">
                            <PlusCircle className="h-4 w-4" />
                            Add New Project
                        </Button>
                    </Link>
                </div>

                {/* Projects Catalog Grid / List */}
                <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                    <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                        <CardTitle className="text-base font-bold">Showcase Repository</CardTitle>
                        <CardDescription>Your portfolio contains {projects.length} total projects</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {projects.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-900">
                                            <th className="p-4 pl-6">Preview & Title</th>
                                            <th className="p-4">Tech Stack Tags</th>
                                            <th className="p-4 text-center">Featured</th>
                                            <th className="p-4">Date Created</th>
                                            <th className="p-4 pr-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                                        {projects.map((project) => (
                                            <tr key={project.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-850/10 transition-colors">
                                                {/* Title & Preview */}
                                                <td className="p-4 pl-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center border border-zinc-200/50 dark:border-zinc-700/50">
                                                            {project.image_path ? (
                                                                <img
                                                                    src={`/storage/${project.image_path}`}
                                                                    alt={project.title}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            ) : (
                                                                <Code2 className="h-4 w-4 text-zinc-400 dark:text-zinc-650" />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 truncate max-w-[200px]">
                                                                {project.title}
                                                            </h4>
                                                            <p className="text-xs text-zinc-500 truncate max-w-[200px] mt-0.5">
                                                                {project.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Tech Stack */}
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-1 max-w-[250px]">
                                                        {project.tech_stack.map((tech) => (
                                                            <Badge key={tech} variant="outline" className="rounded-full text-[9px] border-zinc-200 dark:border-zinc-800 text-zinc-500 px-2 py-0">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </td>

                                                {/* Featured */}
                                                <td className="p-4 text-center">
                                                    {project.is_featured ? (
                                                        <Badge className="bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full font-bold text-[9px] gap-1 px-2 py-0">
                                                            <Star className="h-2.5 w-2.5 fill-current" />
                                                            Yes
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-xs text-zinc-400">No</span>
                                                    )}
                                                </td>

                                                {/* Date */}
                                                <td className="p-4">
                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(project.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="p-4 pr-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/admin/projects/${project.id}/edit`}>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" title="Edit project">
                                                                <Pencil className="h-4 w-4 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-8 w-8 rounded-lg"
                                                            title="Delete project"
                                                            onClick={() => handleDelete(project)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                                                        </Button>
                                                        {project.project_url && (
                                                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 rounded-lg">
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <FolderGit2 className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                                <h3 className="font-bold">Showcase is Empty</h3>
                                <p className="text-xs text-zinc-450 mt-1 max-w-xs mx-auto">You have not created any projects. Add a new project to showcase your skills on the home page.</p>
                                <Link href="/admin/projects/create" className="inline-block mt-4">
                                    <Button size="sm" className="rounded-xl">
                                        Create First Project
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProjectsIndex.layout = (page: any) => ({
    breadcrumbs: [
        {
            title: 'Admin Overview',
            href: '/admin',
        },
        {
            title: 'Manage Projects',
            href: '/admin/projects',
        },
    ],
});
