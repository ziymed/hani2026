<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard statistics and overview.
     */
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalProjects' => Project::count(),
                'unreadMessages' => ContactMessage::where('is_read', false)->count(),
                'totalMessages' => ContactMessage::count(),
            ],
            'recentMessages' => ContactMessage::latest()
                ->take(5)
                ->get(),
        ]);
    }
}
