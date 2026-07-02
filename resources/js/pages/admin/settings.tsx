import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { 
    Paintbrush, 
    Image, 
    MapPin, 
    Share2, 
    Save, 
    Sparkles, 
    Loader2, 
    User,
    Globe,
    Mail,
    Phone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export default function Settings() {
    const { settings } = usePage().props as any;
    const [activeTab, setActiveTab] = useState<'branding' | 'aesthetics' | 'hero' | 'contact' | 'social'>('branding');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(settings?.hero_portrait || null);

    const { data, setData, post, processing, errors } = useForm({
        site_name: settings?.site_name || '',
        site_title: settings?.site_title || '',
        theme_color_primary: settings?.theme_color_primary || '#3b82f6',
        theme_color_secondary: settings?.theme_color_secondary || '#10b981',
        theme_color_primary_dark: settings?.theme_color_primary_dark || '#818cf8',
        theme_color_secondary_dark: settings?.theme_color_secondary_dark || '#34d399',
        theme_font_family: settings?.theme_font_family || 'Outfit',
        hero_title: settings?.hero_title || '',
        hero_subtitle: settings?.hero_subtitle || '',
        hero_portrait: null as File | null,
        map_latitude: settings?.map_latitude || '',
        map_longitude: settings?.map_longitude || '',
        contact_email: settings?.contact_email || '',
        contact_phone: settings?.contact_phone || '',
        contact_address: settings?.contact_address || '',
        availability_status: settings?.availability_status || '',
        social_github: settings?.social_github || '',
        social_linkedin: settings?.social_linkedin || '',
        social_instagram: settings?.social_instagram || '',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('hero_portrait', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('System settings updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update settings. Please check the fields.');
            }
        });
    };

    const tabs = [
        { id: 'branding', label: 'Branding & Identity', icon: User },
        { id: 'aesthetics', label: 'Aesthetics & Theme', icon: Paintbrush },
        { id: 'hero', label: 'Hero Content', icon: Sparkles },
        { id: 'contact', label: 'Contact & Map', icon: MapPin },
        { id: 'social', label: 'Social Networks', icon: Share2 },
    ] as const;

    const googleFonts = [
        'Outfit',
        'Playfair Display',
        'Instrument Sans',
        'Inter',
        'Roboto',
        'Plus Jakarta Sans',
        'Lora',
        'Georgia',
        'Figtree',
        'Montserrat'
    ];

    return (
        <>
            <Head title="System Settings" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black tracking-tight text-foreground">System Settings</h1>
                    <p className="text-sm text-muted-foreground">Manage public interface branding, styling parameters, map details, and texts</p>
                </div>

                {/* Settings Tab Headers */}
                <div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                                        : 'text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-foreground'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Form Wrapper */}
                <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                    
                    {/* Branding Tab */}
                    {activeTab === 'branding' && (
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800 animate-in fade-in duration-300">
                            <CardHeader>
                                <CardTitle>Public Brand Identity</CardTitle>
                                <CardDescription>Configure names, titles, and principal site portrait images</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="site_name">Brand Name (e.g. Logo)</Label>
                                        <Input 
                                            id="site_name" 
                                            value={data.site_name} 
                                            onChange={(e) => setData('site_name', e.target.value)} 
                                            placeholder="Hanita"
                                        />
                                        <InputError message={errors.site_name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="site_title">Brand Subtitle / SEO Title</Label>
                                        <Input 
                                            id="site_title" 
                                            value={data.site_title} 
                                            onChange={(e) => setData('site_title', e.target.value)} 
                                            placeholder="Premium UX/UI Designer & Spatial Specialist"
                                        />
                                        <InputError message={errors.site_title} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label>Primary Hero Portrait Photo</Label>
                                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border border-dashed border-border/80 bg-zinc-50/50 dark:bg-zinc-950/20">
                                        <div className="relative aspect-[4/5] w-36 overflow-hidden rounded-2xl border bg-zinc-100 dark:bg-zinc-900 shadow-sm flex-shrink-0">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">No Photo</div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col gap-2">
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                This portrait will display prominently in your public page hero section. Clear portrait shots with neutral backdrops work best. JPG or PNG files up to 5MB are supported.
                                            </p>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="file" 
                                                    ref={fileInputRef} 
                                                    onChange={handleFileChange} 
                                                    accept="image/*" 
                                                    className="hidden" 
                                                />
                                                <Button 
                                                    type="button" 
                                                    variant="secondary" 
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="rounded-lg text-xs"
                                                >
                                                    Select File
                                                </Button>
                                                {imagePreview && imagePreview !== '/images/hanita_headshot.jpg' && (
                                                    <Button 
                                                        type="button" 
                                                        variant="ghost" 
                                                        onClick={() => {
                                                            setData('hero_portrait', null);
                                                            setImagePreview('/images/hanita_headshot.jpg');
                                                        }}
                                                        className="rounded-lg text-xs text-red-500 hover:text-red-600"
                                                    >
                                                        Reset
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <InputError message={errors.hero_portrait} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Aesthetics Tab */}
                    {activeTab === 'aesthetics' && (
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800 animate-in fade-in duration-300">
                            <CardHeader>
                                <CardTitle>Aesthetics & CSS Style Overrides</CardTitle>
                                <CardDescription>Customize global primary palette colors and Typography configurations</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {/* Light Mode Colors */}
                                    <div className="p-4 rounded-2xl border bg-zinc-50/50 dark:bg-zinc-950/20 space-y-4">
                                        <h3 className="text-sm font-bold text-foreground">Light Theme Colors</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between gap-4">
                                                <Label htmlFor="theme_color_primary" className="text-xs">Primary Theme Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-muted-foreground">{data.theme_color_primary}</span>
                                                    <input 
                                                        type="color" 
                                                        id="theme_color_primary" 
                                                        value={data.theme_color_primary}
                                                        onChange={(e) => setData('theme_color_primary', e.target.value)}
                                                        className="w-8 h-8 rounded-lg cursor-pointer border border-border/80"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <Label htmlFor="theme_color_secondary" className="text-xs">Secondary Theme Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-muted-foreground">{data.theme_color_secondary}</span>
                                                    <input 
                                                        type="color" 
                                                        id="theme_color_secondary" 
                                                        value={data.theme_color_secondary}
                                                        onChange={(e) => setData('theme_color_secondary', e.target.value)}
                                                        className="w-8 h-8 rounded-lg cursor-pointer border border-border/80"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dark Mode Colors */}
                                    <div className="p-4 rounded-2xl border bg-zinc-50/50 dark:bg-zinc-950/20 space-y-4">
                                        <h3 className="text-sm font-bold text-foreground">Dark Theme Colors</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between gap-4">
                                                <Label htmlFor="theme_color_primary_dark" className="text-xs">Primary Theme Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-muted-foreground">{data.theme_color_primary_dark}</span>
                                                    <input 
                                                        type="color" 
                                                        id="theme_color_primary_dark" 
                                                        value={data.theme_color_primary_dark}
                                                        onChange={(e) => setData('theme_color_primary_dark', e.target.value)}
                                                        className="w-8 h-8 rounded-lg cursor-pointer border border-border/80"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <Label htmlFor="theme_color_secondary_dark" className="text-xs">Secondary Theme Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-muted-foreground">{data.theme_color_secondary_dark}</span>
                                                    <input 
                                                        type="color" 
                                                        id="theme_color_secondary_dark" 
                                                        value={data.theme_color_secondary_dark}
                                                        onChange={(e) => setData('theme_color_secondary_dark', e.target.value)}
                                                        className="w-8 h-8 rounded-lg cursor-pointer border border-border/80"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="theme_font_family">Primary Typography Font (Google Fonts)</Label>
                                    <select 
                                        id="theme_font_family"
                                        value={data.theme_font_family}
                                        onChange={(e) => setData('theme_font_family', e.target.value)}
                                        className="w-full h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        {googleFonts.map((font) => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                    <p className="text-[11px] text-muted-foreground">
                                        The application will dynamically import the selected font family and update CSS typography rules.
                                    </p>
                                    <InputError message={errors.theme_font_family} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Hero Content Tab */}
                    {activeTab === 'hero' && (
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800 animate-in fade-in duration-300">
                            <CardHeader>
                                <CardTitle>Hero Copywriter</CardTitle>
                                <CardDescription>Write descriptive headers and introductory paragraphs for your portfolio introduction</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hero_title">Hero H1 Landing Header</Label>
                                    <textarea 
                                        id="hero_title" 
                                        rows={3}
                                        value={data.hero_title} 
                                        onChange={(e) => setData('hero_title', e.target.value)} 
                                        placeholder="Hi, I'm Hanita. I design experiences that feel organic & thoughtful."
                                        className="w-full min-h-[80px] rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <InputError message={errors.hero_title} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hero_subtitle">Hero Paragraph Description</Label>
                                    <textarea 
                                        id="hero_subtitle" 
                                        rows={5}
                                        value={data.hero_subtitle} 
                                        onChange={(e) => setData('hero_subtitle', e.target.value)} 
                                        placeholder="Detailed explanation of your specialty, values, and design systems execution approach."
                                        className="w-full min-h-[120px] rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <InputError message={errors.hero_subtitle} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Contact & Map Tab */}
                    {activeTab === 'contact' && (
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800 animate-in fade-in duration-300">
                            <CardHeader>
                                <CardTitle>Reach & Location Metrics</CardTitle>
                                <CardDescription>Provide coordinates, availability badges, and contact details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_email">Public Contact Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input 
                                                id="contact_email" 
                                                type="email"
                                                value={data.contact_email} 
                                                onChange={(e) => setData('contact_email', e.target.value)} 
                                                className="pl-9"
                                                placeholder="hello@hanita.design"
                                            />
                                        </div>
                                        <InputError message={errors.contact_email} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_phone">Contact Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input 
                                                id="contact_phone" 
                                                value={data.contact_phone} 
                                                onChange={(e) => setData('contact_phone', e.target.value)} 
                                                className="pl-9"
                                                placeholder="+65 6789 0123"
                                            />
                                        </div>
                                        <InputError message={errors.contact_phone} />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_address">Physical Address / Base Location</Label>
                                        <Input 
                                            id="contact_address" 
                                            value={data.contact_address} 
                                            onChange={(e) => setData('contact_address', e.target.value)} 
                                            placeholder="Downtown Core, Singapore"
                                        />
                                        <InputError message={errors.contact_address} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="availability_status">Availability Status Banner</Label>
                                        <Input 
                                            id="availability_status" 
                                            value={data.availability_status} 
                                            onChange={(e) => setData('availability_status', e.target.value)} 
                                            placeholder="Available for local & remote creative roles"
                                        />
                                        <InputError message={errors.availability_status} />
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl border bg-zinc-50/50 dark:bg-zinc-950/20 space-y-4">
                                    <h3 className="text-sm font-bold text-foreground">Map Coordinates</h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="map_latitude" className="text-xs">Latitude Coordinate</Label>
                                            <Input 
                                                id="map_latitude" 
                                                value={data.map_latitude} 
                                                onChange={(e) => setData('map_latitude', e.target.value)} 
                                                placeholder="1.3521"
                                            />
                                            <InputError message={errors.map_latitude} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="map_longitude" className="text-xs">Longitude Coordinate</Label>
                                            <Input 
                                                id="map_longitude" 
                                                value={data.map_longitude} 
                                                onChange={(e) => setData('map_longitude', e.target.value)} 
                                                placeholder="103.8198"
                                            />
                                            <InputError message={errors.map_longitude} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Social Networks Tab */}
                    {activeTab === 'social' && (
                        <Card className="dark:bg-zinc-900 dark:border-zinc-800 animate-in fade-in duration-300">
                            <CardHeader>
                                <CardTitle>Social Integrations</CardTitle>
                                <CardDescription>Link developer accounts, portfolios, and professional design directories</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="social_github">GitHub Profile URL</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            id="social_github" 
                                            value={data.social_github} 
                                            onChange={(e) => setData('social_github', e.target.value)} 
                                            className="pl-9"
                                            placeholder="https://github.com/username"
                                        />
                                    </div>
                                    <InputError message={errors.social_github} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="social_linkedin">LinkedIn Profile URL</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            id="social_linkedin" 
                                            value={data.social_linkedin} 
                                            onChange={(e) => setData('social_linkedin', e.target.value)} 
                                            className="pl-9"
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                    </div>
                                    <InputError message={errors.social_linkedin} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="social_instagram">Instagram Profile URL</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            id="social_instagram" 
                                            value={data.social_instagram} 
                                            onChange={(e) => setData('social_instagram', e.target.value)} 
                                            className="pl-9"
                                            placeholder="https://instagram.com/username"
                                        />
                                    </div>
                                    <InputError message={errors.social_instagram} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Action Bar */}
                    <div className="flex justify-end gap-3">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="rounded-xl px-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-semibold gap-2 py-6 shadow-md"
                        >
                            {processing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            Save All Settings
                        </Button>
                    </div>

                </form>
            </div>
        </>
    );
}

// Map the breadcrumbs for the admin template layout
Settings.layout = (page: any) => ({
    breadcrumbs: [
        {
            title: 'Admin Overview',
            href: '/admin',
        },
        {
            title: 'System Settings',
            href: '/admin/settings',
        },
    ],
});
