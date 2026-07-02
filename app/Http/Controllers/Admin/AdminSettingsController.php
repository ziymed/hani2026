<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminSettingsController extends Controller
{
    public function index()
    {
        return inertia('admin/settings');
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'site_name' => 'nullable|string|max:100',
            'site_title' => 'nullable|string|max:200',
            'theme_color_primary' => 'nullable|string|max:25',
            'theme_color_secondary' => 'nullable|string|max:25',
            'theme_color_primary_dark' => 'nullable|string|max:25',
            'theme_color_secondary_dark' => 'nullable|string|max:25',
            'theme_font_family' => 'nullable|string|max:100',
            'hero_title' => 'nullable|string|max:500',
            'hero_subtitle' => 'nullable|string|max:1000',
            'hero_portrait' => 'nullable|image|max:5120', // Max 5MB
            'map_latitude' => 'nullable|string|max:50',
            'map_longitude' => 'nullable|string|max:50',
            'contact_email' => 'nullable|email|max:100',
            'contact_phone' => 'nullable|string|max:50',
            'contact_address' => 'nullable|string|max:200',
            'availability_status' => 'nullable|string|max:200',
            'social_github' => 'nullable|url|max:200',
            'social_linkedin' => 'nullable|url|max:200',
            'social_instagram' => 'nullable|url|max:200',
        ]);

        foreach ($data as $key => $value) {
            if ($key === 'hero_portrait') {
                if ($request->hasFile('hero_portrait')) {
                    $path = $request->file('hero_portrait')->store('images', 'public');
                    Setting::setValue($key, Storage::url($path));
                }
            } else {
                Setting::setValue($key, $value);
            }
        }

        return redirect()->back()->with('success', 'System settings updated successfully!');
    }
}
