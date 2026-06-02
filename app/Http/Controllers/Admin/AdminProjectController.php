<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminProjectController extends Controller
{
    /**
     * Display a listing of the portfolio projects.
     */
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create(): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => null,
        ]);
    }

    /**
     * Store a newly created project in database.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'content' => 'required|string',
            'tech_stack' => 'required|array',
            'tech_stack.*' => 'string|max:50',
            'project_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'image' => 'nullable|image|max:2048', // 2MB max
            'is_featured' => 'required|boolean',
        ]);

        $project = new Project();
        $project->title = $validated['title'];
        $project->slug = Str::slug($validated['title']);
        $project->description = $validated['description'];
        $project->content = $validated['content'];
        $project->tech_stack = $validated['tech_stack'];
        $project->project_url = $validated['project_url'] ?? null;
        $project->github_url = $validated['github_url'] ?? null;
        $project->is_featured = $validated['is_featured'];

        // Handle unique slug collision
        $slug = $project->slug;
        $count = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = $project->slug . '-' . $count++;
        }
        $project->slug = $slug;

        // Handle file upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $project->image_path = $path;
        }

        $project->save();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified project in database.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'content' => 'required|string',
            'tech_stack' => 'required|array',
            'tech_stack.*' => 'string|max:50',
            'project_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'image' => 'nullable|image|max:2048', // 2MB max
            'is_featured' => 'required|boolean',
        ]);

        $project->title = $validated['title'];
        // Update slug if title changes
        $newSlug = Str::slug($validated['title']);
        if ($project->slug !== $newSlug) {
            $slug = $newSlug;
            $count = 1;
            while (Project::where('slug', $slug)->where('id', '!=', $project->id)->exists()) {
                $slug = $newSlug . '-' . $count++;
            }
            $project->slug = $slug;
        }

        $project->description = $validated['description'];
        $project->content = $validated['content'];
        $project->tech_stack = $validated['tech_stack'];
        $project->project_url = $validated['project_url'] ?? null;
        $project->github_url = $validated['github_url'] ?? null;
        $project->is_featured = $validated['is_featured'];

        // Handle file upload replacement
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }
            $path = $request->file('image')->store('projects', 'public');
            $project->image_path = $path;
        }

        $project->save();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified project from database.
     */
    public function destroy(Project $project): RedirectResponse
    {
        if ($project->image_path) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}
