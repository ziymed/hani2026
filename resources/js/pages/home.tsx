import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Briefcase, GraduationCap, Sparkles, MapPin, Globe, Layers, ChevronRight, Calendar, ExternalLink } from 'lucide-react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    tech_stack: string[];
    project_url: string | null;
    github_url: string | null;
    image_path: string | null;
    is_featured: boolean;
}

interface HomeProps {
    featuredProjects: Project[];
}

const skills = [
    { name: 'Figma Systems', desc: 'Component architecture & auto-layouts', category: 'core' },
    { name: 'User Research', desc: 'Qualitative testing & surveys in Singapore', category: 'core' },
    { name: 'Spatial UI Design', desc: 'Immersive AR/VR spatial environments', category: 'spatial' },
    { name: 'Design Systems', desc: 'Scalable multi-platform component tokens', category: 'core' },
    { name: 'Interaction Design', desc: 'Micro-animations & seamless task flows', category: 'core' },
    { name: 'Info Architecture', desc: 'Card sorting & low-fidelity sitemaps', category: 'core' },
];

const workExperience = [
    {
        role: 'Senior Product/UX Designer',
        company: 'DBS Bank Singapore',
        period: '2024 - Present',
        description: 'Leading structural redesigns for digital wealth platforms. Championed the universal design tokens system across web and native platforms, improving developer handoff efficiency by 40%.',
    },
    {
        role: 'UX/UI Designer',
        company: 'Shopee Singapore',
        period: '2022 - 2024',
        description: 'Optimized local checkout flows for Southeast Asian markets. Led core A/B research initiatives on micro-interactions, successfully increasing mobile conversion rates by 8.4%.',
    },
    {
        role: 'Product Designer',
        company: 'Grab Singapore',
        period: '2020 - 2022',
        description: 'Designed spatial maps and connecting booking interfaces. Ran iterative usability labs with Grab drivers and riders to refine transit accessibility features.',
    },
];

export default function Home({ featuredProjects }: HomeProps) {
    return (
        <PortfolioLayout>
            <Head>
                <title>Hanita - Premium UX/UI Designer & Spatial Experience Specialist</title>
                <meta name="description" content="Portfolio of Hanita, a premium UX/UI and Spatial Experience Designer based in Singapore. Designing human-centered and high-fidelity digital products." />
            </Head>

            {/* Hero Section */}
            <section className="relative py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
                {/* Background decorative blush blur elements */}
                <div className="absolute top-0 -left-10 w-96 h-96 bg-primary/8 dark:bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]" />
                <div className="absolute bottom-10 -right-10 w-96 h-96 bg-amber-500/8 dark:bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse duration-[10000ms]" />

                {/* Left Column: Portrait & Available Indicator */}
                <div className="w-full md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left gap-6">
                    <div className="relative group">
                        {/* Elegant outer rose-gold drop-shadow frame */}
                        <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-amber-500/40 rounded-[2.5rem] blur-sm opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        <div className="relative aspect-[4/5] w-72 sm:w-80 md:w-full overflow-hidden rounded-[2.2rem] border-2 border-border/40 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
                            <img
                                src="/images/hanita_headshot.png"
                                alt="Hanita"
                                className="object-cover w-full h-full transform scale-[1.02] group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2 items-center md:items-start">
                        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Based in Singapore</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            Available for local & remote creative roles
                        </div>
                    </div>
                </div>

                {/* Right Column: Hero Content & Availability */}
                <div className="w-full md:w-7/12 flex flex-col gap-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 self-center md:self-start rounded-full text-xs font-semibold bg-primary/8 border border-primary/20 text-primary-foreground/90 backdrop-blur-sm">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        Crafting Human-Centered Digital Realities
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight leading-[1.05] text-foreground">
                        Hi, I'm <span className="font-serif italic font-black text-primary">Hanita</span>. <br />
                        I design experiences that feel <span className="underline decoration-primary decoration-wavy underline-offset-4">organic</span> & thoughtful.
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                        I am a digital product designer specialized in bridging high-fidelity user research with premium interaction systems. From banking architecture to spatial AR applications, I strive for design excellence that honors human experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full max-w-xs sm:max-w-none mt-4">
                        <Link href="/projects">
                            <Button className="w-full sm:w-auto rounded-full px-6 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                                View Case Studies
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full sm:w-auto rounded-full px-6 py-6 border-border hover:bg-muted font-semibold transition-all">
                                Let's Collaborate
                            </Button>
                        </Link>
                    </div>

                    {/* Active Local Client Capacity Panel */}
                    <div className="mt-6 p-5 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm flex flex-col gap-2 max-w-xl text-left">
                        <h4 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary animate-pulse" />
                            Singapore Client & Corporate Alignment
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Aligned with Singapore local corporate structures and available for on-site workshops, hybrid contracting, or long-term design consulting. Experienced with local regulations and regional financial compliance requirements.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Domain Competencies */}
            <section className="py-16 border-t border-border/40">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-foreground">Core Competencies</h2>
                    <p className="text-sm text-muted-foreground mt-1.5">My primary areas of execution and structural systems focus</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="flex flex-col p-6 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-md cursor-default group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
                                <Badge variant="outline" className="rounded-full text-[10px] font-medium border-border/60 text-muted-foreground py-0.5">
                                    {skill.category}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{skill.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Work Section */}
            <section className="py-16 border-t border-border/40">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h2 className="font-serif text-4xl font-bold italic tracking-tight text-foreground">Selected Work</h2>
                        <p className="text-sm text-muted-foreground mt-1.5">UX/UI and Spatial Experience Case Studies</p>
                    </div>
                    <Link href="/projects">
                        <Button variant="ghost" className="rounded-full gap-1.5 text-muted-foreground hover:text-foreground">
                            All Case Studies
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {featuredProjects.map((project) => (
                        <Card key={project.id} className="group overflow-hidden rounded-[2rem] border border-border/40 bg-card/25 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 flex flex-col h-full">
                            <div className="aspect-[16/10] w-full bg-muted/40 relative overflow-hidden flex items-center justify-center border-b border-border/30">
                                {project.image_path ? (
                                    <img
                                        src={`/storage/${project.image_path}`}
                                        alt={project.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center bg-gradient-to-tr from-primary/5 to-amber-500/5 select-none">
                                        <div className="p-3.5 rounded-2xl bg-background border border-border/30 text-primary shadow-sm">
                                            <Layers className="h-8 w-8 text-primary animate-pulse" />
                                        </div>
                                        <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">UX Case Study Showcase</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-primary hover:bg-primary text-primary-foreground border-none font-semibold rounded-full px-3 py-1 shadow-sm text-xs">
                                        Selected
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader className="p-6 pb-2">
                                <CardTitle className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 text-muted-foreground text-sm mt-2 leading-relaxed">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-2 pb-4 flex-grow">
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {project.tech_stack.map((tech) => (
                                        <Badge key={tech} variant="outline" className="rounded-full text-xs font-medium border-border/60 text-muted-foreground px-2.5 py-0.5">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-end">
                                <Link href={`/projects/${project.slug}`} className="w-full">
                                    <Button className="w-full rounded-xl py-5 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground font-semibold gap-1.5 transition-all">
                                        Read Case Study
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Interactive Timeline Resume Section */}
            <section className="py-16 border-t border-border/40 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-foreground">Interactive Biography</h2>
                    <p className="text-sm text-muted-foreground mt-1.5">My structural career trajectory and academic anchors in Singapore</p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {/* Left Column: Education & Details */}
                    <div className="md:col-span-1 flex flex-col gap-8">
                        <div className="flex flex-col gap-4 p-6 rounded-3xl border border-border/40 bg-card/20">
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                Academic Anchor
                            </h3>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-foreground">B.Sc. Human-Computer Interaction (HCI)</p>
                                <p className="text-xs text-muted-foreground">Nanyang Technological University (NTU), Singapore</p>
                                <p className="text-xs text-primary font-semibold mt-1">Honors Graduate</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-6 rounded-3xl border border-border/40 bg-card/20">
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary" />
                                Singapore Connections
                            </h3>
                            <div className="flex flex-col gap-3 text-xs text-muted-foreground leading-relaxed">
                                <p>• Active Member of **UXPA Singapore** (User Experience Professionals Association).</p>
                                <p>• Guest speaker at **General Assembly Singapore** product design panels.</p>
                                <p>• Mentor for Southeast Asian junior designers through online cohorts.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Work Timeline */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div className="relative pl-6 border-l-2 border-border/40 flex flex-col gap-8">
                            {workExperience.map((job) => (
                                <div key={job.company} className="relative group">
                                    {/* Timeline bullet */}
                                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:scale-125 transition-transform" />
                                    
                                    <div className="flex flex-col gap-2 p-5 rounded-3xl border border-border/30 bg-card/10 group-hover:border-primary/20 group-hover:bg-card/20 transition-all duration-300">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <div>
                                                <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{job.role}</h4>
                                                <p className="text-sm font-semibold text-muted-foreground">{job.company}</p>
                                            </div>
                                            <Badge variant="secondary" className="w-fit rounded-full text-xs font-semibold px-3 py-0.5 text-primary-foreground bg-primary/10 border-none flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {job.period}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PortfolioLayout>
    );
}
