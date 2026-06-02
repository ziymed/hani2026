<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed the default Admin User (Named Hanita, keeping the email and credentials)
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Hanita',
                'password' => bcrypt('password'),
                'is_admin' => true,
            ]
        );

        // 2. Seed some premium UX/UI portfolio projects for Hanita
        $projects = [
            [
                'title' => 'Changi Airport Transit Experience',
                'description' => 'A mobile-first transit experience app designed to help travelers discover terminals, book premium airport lounges, and navigate terminal connections effortlessly at Singapore Changi Airport.',
                'content' => "## Project Overview\n\nIn this UX case study, we redesigned the mobile airport experience for international transit passengers at Singapore Changi Airport (ranked one of the world's best transit hubs).\n\n### The Challenge\n\nWhile Changi has world-class physical amenities, travelers often struggle to balance their limited transit time (2-4 hours) between navigating terminal transfers (T1-T4), shopping duty-free, and relaxing at premium lounges.\n\n### Design Solutions & Approach\n\n- **Interactive Indoor Navigation:** A high-precision terminal map highlighting transit SkyTrains and walking time estimation to gates.\n- **Dynamic Transit Timeline:** Integrates boarding passes to construct a step-by-step transit itinerary, alerting users when it is time to walk to their connecting terminal.\n- **Pre-Order Lounge Bookings:** Streamlined booking of Jewel and terminal lounges to secure quiet workspaces and rest pods.\n\n### High-Fidelity Features\n\n- Mobile-First Spatial Awareness Map\n- Seamless JetQuay & Lounge QR Booking\n- Automated Shopping Pre-Orders\n\n### Tech Stack & Skills\n\n- UX Research, User Testing\n- High-Fidelity UI Prototyping (Figma)\n- Information Architecture\n- User Journey Mapping",
                'tech_stack' => ['UX Research', 'Figma', 'Interaction Design', 'User Journey Mapping', 'Mobile UI'],
                'project_url' => 'https://changi.example.com',
                'github_url' => 'https://github.com/hanita/changi-transit-ux',
                'is_featured' => true,
            ],
            [
                'title' => 'National Gallery Singapore AR Curator',
                'description' => 'An immersive, spatial augmented reality application designed to enrich gallery visitors\' learning experiences by revealing interactive curations, hidden art layers, and artist histories.',
                'content' => "## Project Overview\n\nAn innovative AR mobile museum guide designed for the National Gallery Singapore, focusing on making Southeast Asian modern art interactive, educational, and accessible for younger generations.\n\n### The Challenge\n\nMuseum visitors, especially younger demographics, often find static wall labels dry and struggle to connect deeply with Southeast Asian art history, resulting in brief gallery visits and low engagement.\n\n### Design Solutions & Approach\n\n- **AR Art Layer Reveal:** Scanning visual markers unlocks secondary animated overlays showing the artist's original sketches or structural layers.\n- **Spatial Audio Curator:** A reactive spatial-audio guide that tells historical background stories based on the user's distance and gaze angle toward the painting.\n- **Gamified Art Quests:** Interactive art scavenger hunts for kids and families that reward museum shop coupons.\n\n### Key UX Highlights\n\n- Highly Accessible High-Contrast Modes\n- Interactive Spatial UI Controls\n- Proximity-based Audio Triggers\n\n### Tech Stack & Skills\n\n- Spatial UI Design\n- AR Prototyping\n- Design Systems\n- Interactive Prototyping\n- Usability Testing",
                'tech_stack' => ['Spatial UI', 'Mobile Design', 'Design Systems', 'Interactive Prototyping', 'User Testing'],
                'project_url' => 'https://nationalgallery.example.com',
                'github_url' => 'https://github.com/hanita/gallery-ar-curator',
                'is_featured' => true,
            ],
            [
                'title' => 'Marina Bay Sands Luxury Concierge Portal',
                'description' => 'A unified luxury hotel concierge portal enabling premium MBS Singapore guests to seamlessly schedule Michelin-starred dining, book Infinity Pool slots, and access bespoke VIP services.',
                'content' => "## Project Overview\n\nA high-fidelity digital luxury concierge platform designed to streamline premium hotel services for VIP guests staying at Marina Bay Sands (MBS) Singapore.\n\n### The Challenge\n\nMBS high-tier guests expect instantaneous access to luxury amenities. However, booking the iconic Infinity Pool, securing premium restaurant tables (e.g. Waku Ghin, Spago), or scheduling private shopping was fractured across different telephone hotlines and in-person concierge desks.\n\n### Design Solutions & Approach\n\n- **Michelin-Star Instant Bookings:** Direct API reservation portal for top-tier dining with real-time table layouts.\n- **Infinity Pool Slot Reservation:** Interactive pool occupancy indicator and smart slots allocation to avoid overcrowding.\n- **Bespoke VIP Chat:** Direct digital pipeline to private elite hostesses and room-service specialists.\n\n### Key UI/UX Highlights\n\n- Premium Dark Mode Interface with subtle rose-gold accents\n- Highly responsive checkout & booking flows\n- Intuitive scheduling calendar UX\n\n### Tech Stack & Skills\n\n- UX Design, Wireframing\n- High-Fidelity Figma Systems\n- Information Architecture\n- User Persona Development",
                'tech_stack' => ['UX Design', 'Design Systems', 'Information Architecture', 'Figma', 'Premium UI'],
                'project_url' => null,
                'github_url' => 'https://github.com/hanita/mbs-luxury-concierge',
                'is_featured' => false,
            ]
        ];

        foreach ($projects as $projectData) {
            Project::updateOrCreate(
                ['slug' => Str::slug($projectData['title'])],
                $projectData
            );
        }
    }
}

