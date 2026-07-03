<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Display the portfolio home page with featured projects.
     */
    public function home(): Response
    {
        $featuredProjects = Project::where('is_featured', true)
            ->latest()
            ->get();

        return Inertia::render('home', [
            'featuredProjects' => $featuredProjects,
        ]);
    }

    /**
     * Display the full portfolio projects catalog.
     */
    public function projects(): Response
    {
        $projects = Project::latest()->get();

        // Dynamically extract all unique tech stack tags from seeded/created projects
        $tags = Project::all()
            ->pluck('tech_stack')
            ->flatten()
            ->filter()
            ->unique()
            ->values()
            ->all();

        return Inertia::render('projects', [
            'projects' => $projects,
            'tags' => $tags,
        ]);
    }

    /**
     * Display a specific project details page / case study.
     */
    public function project(Project $project): Response
    {
        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }

    /**
     * Store a contact form submission asynchronously.
     */
    public function contactStore(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactMessage::create($validatedData);

        return back()->with('success', 'Thank you! Your message has been sent successfully.');
    }

    /**
     * Display the interactive SchoolHub student portal work sample.
     */
    public function schoolhub(): Response
    {
        return Inertia::render('work-samples/schoolhub');
    }
}
