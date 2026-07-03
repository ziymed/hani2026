<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Setting;
use App\Models\User;
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

        // 2. Seed site settings for Hanita
        $settings = [
            'site_name' => 'Hanita',
            'site_title' => 'UI/UX & Data-Oriented IT Professional',
            'hero_title' => "Hi, I'm Hanita. I design user-centric solutions & automate complex workflows.",
            'hero_subtitle' => 'With 18+ years of experience bridging IT operations, systems support, and digital learning, coupled with recent certifications as a Certified Usability Analyst (HFI) and Data Strategist. I specialize in user research, data visualization, and process automation to solve real business needs remotely.',
            'contact_email' => 'hanita.sg@gmail.com',
            'contact_phone' => '+65 9184 1401',
            'contact_address' => 'Singapore',
            'availability_status' => 'Available for remote & WFH IT operations, UI/UX, or data roles',
            'social_github' => 'https://github.com/hanita',
            'social_linkedin' => 'https://linkedin.com/in/hanita',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // 3. Seed premium UX/UI and IT portfolio projects for Hanita
        $projects = [
            [
                'title' => 'Verdant Student Portal (SchoolHub)',
                'description' => 'A prestige-grade unified student portal designed to consolidate course schedules, academic announcements, and student support tickets (ServiceNow) into a cohesive digital experience.',
                'content' => "## Project Overview\n\nThis project replicates the \"Verdant\" student portal dashboard. It was designed to replace three legacy academic applications with a modern, high-fidelity responsive user interface.\n\n### The Challenge\n\nStudents previously had to navigate separate portals for class schedules, grading metrics, and IT support requests. This led to user frustration, high drop-off rates on support tickets, and significant support email overhead for the registrar's office.\n\n### Design Solutions & Approach\n\n- **Unified Dashboard Workspace:** A centralized home screen that highlights current-day schedule cards, crucial course announcements, and real-time attendance/GPA metrics.\n- **Self-Service Support Integration (ServiceNow Sim):** A seamless portal form mapped directly to ServiceNow ticket schemas. Allowing students to file and track tickets directly in their dashboard without switching systems.\n- **Usability Focus (HFI Standards):** Leveraged cognitive load reduction techniques, standardized component patterns, and clear status visualizers.\n\n### Key Features\n\n- Responsive multi-device layout (Tailwind CSS v4 + React)\n- Dynamic course progress tracks with animated skeletons\n- Live IT ticket creation & status logger\n\n### Tech Stack & Skills\n\n- UI/UX Wireframing & Prototyping (Figma)\n- React.js, TypeScript & Tailwind CSS v4\n- Usability Testing & Information Architecture\n- Systems Analysis & API Data Mapping",
                'tech_stack' => ['React', 'Tailwind CSS v4', 'UI/UX Design', 'Systems Analysis', 'TypeScript'],
                'project_url' => '/work-samples/schoolhub',
                'github_url' => 'https://github.com/hanita/schoolhub-student-portal',
                'is_featured' => true,
            ],
            [
                'title' => 'ServiceNow Operations & Workflow Automation',
                'description' => 'An enterprise IT operations case study detailing ServiceNow support ticket analysis, SLA optimization, and workflow automation to reduce support cycle times.',
                'content' => "## Project Overview\n\nIn this case study, we analyzed ServiceNow ticketing data and designed an automated process flow to triage and resolve recurring administrative and technical support requests.\n\n### The Challenge\n\nSupport teams were overwhelmed by manual ticket sorting, leading to delayed response times and violated SLAs. Many incoming tickets were recurring, simple requests (e.g., password resets, classroom booking issues) that did not require manual engineer intervention.\n\n### Operational Solutions\n\n- **Ticket Trend Analysis:** Conducted quantitative analysis on 10,000+ support records using Power BI and Microsoft Excel to isolate key drivers of high ticket volume.\n- **Automated Workflow Triage:** Configured Power Automate triggers and ServiceNow routing guidelines to automatically dispatch common requests to self-service knowledge bases.\n- **Internal Database Solutions:** Designed a departmental call center tracking system to log real-time operational issues and generate weekly volume reports.\n\n### Key Highlights\n\n- **35% Reduction** in manual support ticket routing overhead.\n- **SLA Compliance Increase** from 82% to 96% within three months of deployment.\n- **Detailed User Documentation** created for non-technical staff to reduce recurring support enquiries.\n\n### Tech Stack & Skills\n\n- ServiceNow Ticket Analysis\n- Power BI & Excel Dashboarding\n- Workflow Automation (Power Automate)\n- Database Management & Schema Design\n- ITIL Operations Standards",
                'tech_stack' => ['ServiceNow', 'Power BI', 'Workflow Automation', 'Excel', 'ITIL'],
                'project_url' => null,
                'github_url' => null,
                'is_featured' => true,
            ],
            [
                'title' => 'Interactive Robotics & Coding Learning Framework',
                'description' => 'A creative, user-friendly digital learning curriculum designed to teach computational thinking, game development, and hardware robotics using visual programming models.',
                'content' => "## Project Overview\n\nDesigned and delivered lesson plans and interactive coding materials for young learners and educators, utilizing constructive visual models and game engines.\n\n### The Challenge\n\nTraditional programming syntax is often intimidating for beginners, leading to low retention and lack of interest in computer science disciplines.\n\n### Instructional & UI Solutions\n\n- **Visual Learning Flows:** Designed interactive coding worksheets and step-by-step game design blueprints using Construct 3 and Scratch.\n- **Hardware Prototyping Interface:** Created hardware wiring guides and virtual models for Micro:bit and Tinkercad, allowing students to see instant physical results of their logic.\n- **Usability-First Curriculum:** Applied visual hierarchy and interaction design concepts to lesson slides and worksheets to maximize self-directed learning.\n- **Coaching & Mentoring:** Coached students for robotics competitions, supporting technical troubleshooting, digital tool optimization, and presentation delivery.\n\n### Key Achievements\n\n- Taught and mentored over 500+ students in coding and robotics.\n- Coached robotics teams to competition readiness, resulting in successful team entries.\n- Built a modular educational framework adopted by school instructors for creative technology labs.\n\n### Tech Stack & Skills\n\n- Construct 3 & Scratch\n- Python Programming\n- Hardware Prototyping (Micro:bit, Tinkercad)\n- Instructional Design & Curriculum Development\n- Visual Interface Design",
                'tech_stack' => ['Python', 'Scratch', 'Instructional Design', 'Prototyping', 'Construct 3'],
                'project_url' => null,
                'github_url' => null,
                'is_featured' => false,
            ],
        ];

        foreach ($projects as $projectData) {
            Project::updateOrCreate(
                ['slug' => Str::slug($projectData['title'])],
                $projectData
            );
        }
    }
}
