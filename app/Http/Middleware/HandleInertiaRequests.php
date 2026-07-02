<?php

namespace App\Http\Middleware;

use App\Models\ContactMessage;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'unreadMessagesCount' => fn () => $user && $user->is_admin ? ContactMessage::where('is_read', false)->count() : 0,
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'settings' => [
                'site_name' => Setting::getValue('site_name', 'Hanita'),
                'site_title' => Setting::getValue('site_title', 'Premium UX/UI Designer & Spatial Experience Specialist'),
                'theme_color_primary' => Setting::getValue('theme_color_primary', '#3b82f6'),
                'theme_color_secondary' => Setting::getValue('theme_color_secondary', '#10b981'),
                'theme_font_family' => Setting::getValue('theme_font_family', 'Instrument Sans'),
                'hero_title' => Setting::getValue('hero_title', "Hi, I'm Hanita. I design experiences that feel organic & thoughtful."),
                'hero_subtitle' => Setting::getValue('hero_subtitle', 'I am a digital product designer specialized in bridging high-fidelity user research with premium interaction systems. From banking architecture to spatial AR applications, I strive for design excellence that honors human experience.'),
                'hero_portrait' => Setting::getValue('hero_portrait', '/images/hanita_headshot.jpg'),
                'map_latitude' => Setting::getValue('map_latitude', '1.3521'),
                'map_longitude' => Setting::getValue('map_longitude', '103.8198'),
                'contact_email' => Setting::getValue('contact_email', 'hello@hanita.design'),
                'contact_phone' => Setting::getValue('contact_phone', '+65 6789 0123'),
                'contact_address' => Setting::getValue('contact_address', 'Downtown Core, Singapore'),
                'availability_status' => Setting::getValue('availability_status', 'Available for local & remote creative roles'),
                'social_github' => Setting::getValue('social_github', 'https://github.com/hanita'),
                'social_linkedin' => Setting::getValue('social_linkedin', 'https://linkedin.com/in/hanita'),
                'social_instagram' => Setting::getValue('social_instagram', 'https://instagram.com/hanita'),
            ],
        ];
    }
}
