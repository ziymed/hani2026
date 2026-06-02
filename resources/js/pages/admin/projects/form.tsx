import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FolderGit2, ArrowLeft, Save, Code, Eye, FileText, Image as ImageIcon, Star, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { toast } from 'sonner';

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
}

interface ProjectFormProps {
    project: Project | null;
}

// Simple Markdown to HTML preview converter
function renderMarkdown(markdown: string): string {
    if (!markdown) return '<em>Nothing to preview</em>';

    let html = markdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    html = html.replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-2 mb-1">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-4 mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">$1</h2>');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900 dark:text-zinc-100">$1</strong>');
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc pl-0.5 text-zinc-650 dark:text-zinc-450">$1</li>');
    html = html.replace(/\n$/gim, '<br />');

    return html;
}

export default function ProjectForm({ project }: ProjectFormProps) {
    const isEditMode = project !== null;
    const [previewTab, setPreviewTab] = useState<'write' | 'preview'>('write');
    const [imagePreview, setImagePreview] = useState<string | null>(
        project?.image_path ? `/storage/${project.image_path}` : null
    );

    const [tagsInput, setTagsInput] = useState(
        project ? project.tech_stack.join(', ') : ''
    );

    // Inertia useForm handles form state, multipart uploads, validation, and errors
    const { data, setData, post, processing, errors } = useForm<any>({
        title: project?.title || '',
        description: project?.description || '',
        content: project?.content || '',
        tech_stack: project?.tech_stack || [],
        project_url: project?.project_url || '',
        github_url: project?.github_url || '',
        image: null as File | null,
        is_featured: project?.is_featured || false,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTagsInput(val);
        // Split by commas, trim spacing, filter empty strings
        const parsedTags = val
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
        setData('tech_stack', parsedTags);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Perform validation
        if (data.tech_stack.length === 0) {
            toast.error('Please specify at least one tech stack tag');
            return;
        }

        const url = isEditMode
            ? `/admin/projects/${project.id}`
            : '/admin/projects';

        post(url, {
            onSuccess: () => toast.success(isEditMode ? 'Project updated successfully!' : 'Project created successfully!'),
            onError: () => toast.error('Check form errors and try again.'),
        });
    };

    return (
        <>
            <Head title={isEditMode ? `Edit Project: ${project.title}` : 'Add New Portfolio Project'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
                {/* Back Link */}
                <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors mb-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to projects repository
                </Link>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        {isEditMode ? `Modify Showcase: ${project.title}` : 'Add Portfolio Showcase'}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isEditMode ? 'Make adjustments to this case study parameters and media.' : 'Create an outstanding case study, tech tags list, and links for public view.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
                    {/* Left Column: Form Inputs */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base font-bold">Showcase Parameters</CardTitle>
                                <CardDescription>Key metadata details about the project</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-semibold">Project Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="e.g. Real-Time Analytics Dashboard"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                {/* Description (Short Intro) */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-semibold">Short Summary / Catchphrase</Label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        placeholder="A sentence or two highlighting the core purpose of the project (shown on grids)."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full min-h-[80px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300"
                                        required
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Tech Stack Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="tech_stack" className="text-sm font-semibold">Tech Stack Tags (Comma Separated)</Label>
                                    <Input
                                        id="tech_stack"
                                        type="text"
                                        placeholder="e.g. Laravel, React, Tailwind CSS, TypeScript"
                                        value={tagsInput}
                                        onChange={handleTagsInputChange}
                                        className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                        required
                                    />
                                    <p className="text-[10px] text-zinc-450 font-medium">Split tags with a comma. Detected tags: {data.tech_stack.length > 0 ? data.tech_stack.map((t: string) => `"${t}"`).join(', ') : 'None'}</p>
                                    <InputError message={errors.tech_stack} />
                                </div>

                                {/* URLs */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="project_url" className="text-sm font-semibold">Live URL (Optional)</Label>
                                        <Input
                                            id="project_url"
                                            type="url"
                                            placeholder="https://example.com"
                                            value={data.project_url}
                                            onChange={(e) => setData('project_url', e.target.value)}
                                            className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                        />
                                        <InputError message={errors.project_url} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="github_url" className="text-sm font-semibold">Github URL (Optional)</Label>
                                        <Input
                                            id="github_url"
                                            type="url"
                                            placeholder="https://github.com/user/repo"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                        />
                                        <InputError message={errors.github_url} />
                                    </div>
                                </div>

                                {/* Featured Checkbox */}
                                <div className="flex items-center space-x-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                    <Checkbox
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', !!checked)}
                                        className="rounded-md"
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <Label htmlFor="is_featured" className="text-sm font-semibold flex items-center gap-1.5 cursor-pointer">
                                            <Star className={`h-4 w-4 ${data.is_featured ? 'text-amber-500 fill-current' : 'text-zinc-400'}`} />
                                            Pin as Featured Project
                                        </Label>
                                        <p className="text-[10px] text-zinc-500">Featured projects are highlighted at the top of your homepage</p>
                                    </div>
                                    <InputError message={errors.is_featured} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Long Case Study Content with Markdown live preview */}
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 space-y-0">
                                <div>
                                    <CardTitle className="text-base font-bold">Case Study Detailed Review</CardTitle>
                                    <CardDescription>Rich markdown description describing challenges and solutions</CardDescription>
                                </div>
                                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={previewTab === 'write' ? 'secondary' : 'ghost'}
                                        onClick={() => setPreviewTab('write')}
                                        className="rounded-md text-[10px] h-7 font-bold gap-1 px-2.5"
                                    >
                                        <FileText className="h-3 w-3" />
                                        Write
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={previewTab === 'preview' ? 'secondary' : 'ghost'}
                                        onClick={() => setPreviewTab('preview')}
                                        className="rounded-md text-[10px] h-7 font-bold gap-1 px-2.5"
                                    >
                                        <Eye className="h-3 w-3" />
                                        Preview
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                {previewTab === 'write' ? (
                                    <div className="space-y-2">
                                        <textarea
                                            id="content"
                                            rows={12}
                                            placeholder="Use markdown to review architecture, databases, code snippets, or workflows. For example:&#10;# Project Overview&#10;Some general overview text.&#10;&#10;## Key Architecture Details&#10;- Bullet points here"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="w-full min-h-[300px] font-mono text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300"
                                            required
                                        />
                                        <InputError message={errors.content} />
                                    </div>
                                ) : (
                                    <div className="min-h-[300px] border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-4 prose prose-zinc dark:prose-invert max-w-none text-xs leading-relaxed overflow-y-auto max-h-[400px]">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: renderMarkdown(data.content) }}
                                            className="space-y-3"
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Image Media Upload & Actions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Media Card */}
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base font-bold">Visual Media</CardTitle>
                                <CardDescription>Showcase image displayed on public grids</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Image Upload & Preview Box */}
                                <div className="aspect-video w-full rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden group select-none">
                                    {imagePreview ? (
                                        <>
                                            <img
                                                src={imagePreview}
                                                alt="Upload preview"
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                                                <span className="text-[10px] font-bold text-white bg-black/60 rounded-full px-2.5 py-1 flex items-center gap-1">
                                                    <ImageIcon className="h-3 w-3" />
                                                    Change Image
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1.5 text-zinc-400 dark:text-zinc-650 p-6 text-center">
                                            <ImageIcon className="h-8 w-8 text-zinc-300 dark:text-zinc-750" />
                                            <span className="text-[10px] font-semibold uppercase tracking-wider">No Image Uploaded</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-xs font-semibold block">Select Showcase Image (Max 2MB)</Label>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="text-xs w-full cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-150 file:text-zinc-700 dark:file:bg-zinc-800 dark:file:text-zinc-350 hover:file:opacity-90 transition-opacity"
                                    />
                                    <InputError message={errors.image} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Save Actions Card */}
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base font-bold">Publishing</CardTitle>
                                <CardDescription>Verify constraints and commit database records</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-col gap-3 pt-0">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl py-5 bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 font-bold gap-1.5 shadow-md"
                                >
                                    <Save className="h-4 w-4" />
                                    {processing ? 'Saving Changes...' : 'Commit Showcase'}
                                </Button>
                                <Link href="/admin/projects" className="w-full">
                                    <Button variant="outline" className="w-full rounded-xl" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
        </>
    );
}

ProjectForm.layout = (page: any) => {
    const isEdit = page.props.project !== null;
    return {
        breadcrumbs: [
            {
                title: 'Admin Overview',
                href: '/admin',
            },
            {
                title: 'Manage Projects',
                href: '/admin/projects',
            },
            {
                title: isEdit ? 'Edit Project' : 'New Project',
                href: isEdit ? `/admin/projects/${page.props.project.id}/edit` : '/admin/projects/create',
            },
        ],
    };
};
