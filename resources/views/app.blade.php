<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
        
        @if($font = \App\Models\Setting::getValue('theme_font_family'))
            <link href="https://fonts.googleapis.com/css2?family={{ urlencode($font) }}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        @endif

        <style>
            :root {
                @if($primary = \App\Models\Setting::getValue('theme_color_primary'))
                    --primary: {{ $primary }} !important;
                    --ring: {{ $primary }} !important;
                @endif
                @if($secondary = \App\Models\Setting::getValue('theme_color_secondary'))
                    --secondary: {{ $secondary }} !important;
                @endif
                @if($font = \App\Models\Setting::getValue('theme_font_family'))
                    --font-sans: '{{ $font }}', ui-sans-serif, system-ui, sans-serif !important;
                @endif
            }
            @if($primaryDark = \App\Models\Setting::getValue('theme_color_primary_dark'))
            .dark {
                --primary: {{ $primaryDark }} !important;
                --ring: {{ $primaryDark }} !important;
            }
            @endif
            @if($secondaryDark = \App\Models\Setting::getValue('theme_color_secondary_dark'))
            .dark {
                --secondary: {{ $secondaryDark }} !important;
            }
            @endif
        </style>

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
