<?php

use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\User;

test('public pages render successfully', function () {
    $this->get('/')
        ->assertStatus(200);

    $this->get('/projects')
        ->assertStatus(200);

    $this->get('/contact')
        ->assertStatus(200);
});

test('public can submit contact form successfully', function () {
    $data = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'subject' => 'Project Inquiry',
        'message' => 'I would like to hire you for a custom full-stack web project.',
    ];

    $this->post('/contact', $data)
        ->assertRedirect();

    $this->assertDatabaseHas('contact_messages', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'subject' => 'Project Inquiry',
    ]);
});

test('contact form validation works', function () {
    $this->post('/contact', [
        'name' => '',
        'email' => 'not-an-email',
        'subject' => '',
        'message' => '',
    ])->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
});

test('unauthenticated users are redirected from admin dashboard', function () {
    $this->get('/admin')
        ->assertRedirect('/login');
});

test('authenticated non-admin users cannot access admin dashboard', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get('/admin')
        ->assertStatus(403);
});

test('authenticated admin users can access admin dashboard', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)
        ->get('/admin')
        ->assertStatus(200);
});

test('admin can manage projects via CRUD endpoints', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    // 1. Create a project
    $this->actingAs($admin)
        ->post('/admin/projects', [
            'title' => 'Test Project',
            'description' => 'A description of the test project.',
            'content' => '# Long markdown content',
            'tech_stack' => ['Laravel', 'React'],
            'project_url' => 'https://example.com',
            'github_url' => 'https://github.com/test',
            'is_featured' => true,
        ])
        ->assertRedirect(route('admin.projects.index'));

    $this->assertDatabaseHas('projects', [
        'title' => 'Test Project',
        'slug' => 'test-project',
        'is_featured' => true,
    ]);

    $project = Project::where('slug', 'test-project')->first();

    // 2. Edit route renders
    $this->actingAs($admin)
        ->get("/admin/projects/{$project->id}/edit")
        ->assertStatus(200);

    // 3. Update project details
    $this->actingAs($admin)
        ->post("/admin/projects/{$project->id}", [
            'title' => 'Updated Test Project',
            'description' => 'Updated description.',
            'content' => '# Updated content',
            'tech_stack' => ['Laravel', 'React', 'Tailwind'],
            'project_url' => 'https://example.com/updated',
            'github_url' => 'https://github.com/test/updated',
            'is_featured' => false,
        ])
        ->assertRedirect(route('admin.projects.index'));

    $this->assertDatabaseHas('projects', [
        'title' => 'Updated Test Project',
        'is_featured' => false,
    ]);

    // 4. Delete project
    $this->actingAs($admin)
        ->delete("/admin/projects/{$project->id}")
        ->assertRedirect(route('admin.projects.index'));

    $this->assertDatabaseMissing('projects', [
        'id' => $project->id,
    ]);
});

test('admin can manage users via CRUD endpoints', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    // 1. Create a user
    $this->actingAs($admin)
        ->post('/admin/users', [
            'name' => 'New Staff member',
            'email' => 'staff@example.com',
            'password' => 'supersecretpass',
            'is_admin' => false,
        ])
        ->assertRedirect(route('admin.users.index'));

    $this->assertDatabaseHas('users', [
        'name' => 'New Staff member',
        'email' => 'staff@example.com',
        'is_admin' => false,
    ]);

    $user = User::where('email', 'staff@example.com')->first();

    // 2. Edit route renders
    $this->actingAs($admin)
        ->get("/admin/users/{$user->id}/edit")
        ->assertStatus(200);

    // 3. Update user details
    $this->actingAs($admin)
        ->put("/admin/users/{$user->id}", [
            'name' => 'Updated Staff Member',
            'email' => 'staff-updated@example.com',
            'password' => '', // Empty password doesn't update it
            'is_admin' => true, // Promoting to admin
        ])
        ->assertRedirect(route('admin.users.index'));

    $this->assertDatabaseHas('users', [
        'email' => 'staff-updated@example.com',
        'is_admin' => true,
    ]);

    // 4. Self-deletion block check
    $this->actingAs($admin)
        ->delete("/admin/users/{$admin->id}")
        ->assertRedirect(route('admin.users.index'))
        ->assertSessionHas('error');

    $this->assertDatabaseHas('users', [
        'id' => $admin->id,
    ]);

    // 5. Delete another user account
    $this->actingAs($admin)
        ->delete("/admin/users/{$user->id}")
        ->assertRedirect(route('admin.users.index'));

    $this->assertDatabaseMissing('users', [
        'id' => $user->id,
    ]);
});

test('homepage displays seeded premium ux ui projects', function () {
    // Refresh and Seed
    $this->artisan('db:seed');

    $response = $this->get('/');
    
    $response->assertStatus(200)
        ->assertSee('Changi Airport Transit Experience')
        ->assertSee('National Gallery Singapore AR Curator')
        ->assertSee('hanita');
});
