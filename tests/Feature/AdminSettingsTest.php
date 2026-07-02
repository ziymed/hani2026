<?php

use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('guests cannot access admin settings', function () {
    $response = $this->get(route('admin.settings.index'));

    $response->assertRedirect(route('login'));
});

test('non-admin users cannot access admin settings', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $response = $this->actingAs($user)->get(route('admin.settings.index'));

    $response->assertStatus(403);
});

test('admin users can access admin settings', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $response = $this->actingAs($admin)->get(route('admin.settings.index'));

    $response->assertStatus(200);
});

test('admin users can update settings text values', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $response = $this->actingAs($admin)->post(route('admin.settings.update'), [
        'site_name' => 'My New Site Name',
        'theme_color_primary' => '#ff0000',
        'theme_font_family' => 'Inter',
        'hero_title' => 'Custom Hero Title',
        'contact_email' => 'contact@test.com',
    ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();

    expect(Setting::getValue('site_name'))->toBe('My New Site Name');
    expect(Setting::getValue('theme_color_primary'))->toBe('#ff0000');
    expect(Setting::getValue('theme_font_family'))->toBe('Inter');
    expect(Setting::getValue('hero_title'))->toBe('Custom Hero Title');
    expect(Setting::getValue('contact_email'))->toBe('contact@test.com');
});

test('admin users can upload hero portrait image', function () {
    Storage::fake('public');
    $admin = User::factory()->create(['is_admin' => true]);

    $file = UploadedFile::fake()->image('avatar.jpg');

    $response = $this->actingAs($admin)->post(route('admin.settings.update'), [
        'hero_portrait' => $file,
    ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();

    $storedUrl = Setting::getValue('hero_portrait');
    expect($storedUrl)->not->toBeNull();
    expect($storedUrl)->toContain('/storage/images/');

    $path = str_replace('/storage/', '', $storedUrl);
    Storage::disk('public')->assertExists($path);
});
