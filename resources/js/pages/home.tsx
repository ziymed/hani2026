import { Head, Link, usePage } from '@inertiajs/react';
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
    { name: 'User Research & Usability', desc: 'Usability testing, task flows, and HFI standards', category: 'UI/UX' },
    { name: 'Figma Prototyping', desc: 'High-fidelity wireframing & design documentation', category: 'Design' },
    { name: 'Data Visualisation', desc: 'Interactive dashboards and Power BI reporting', category: 'Analytics' },
    { name: 'Workflow Automation', desc: 'Power Automate & Power Apps business logic', category: 'IT Ops' },
    { name: 'ServiceNow & Systems Support', desc: 'Service desk analytics and incident resolution', category: 'IT Ops' },
    { name: 'Technical Training', desc: 'Curriculum development and instructional design', category: 'Training' },
];

const workExperience = [
    {
        role: 'IT & Operations Executive',
        company: 'London School of Business & Finance (LSBF), Singapore',
        period: 'June 2025 - June 2026',
        description: 'Managed IT and operations processes, systems support, and digital learning platforms. Handled vendor coordination, stakeholder communications, and resolved complex administrative and technical service issues.',
    },
    {
        role: 'Coding Instructor',
        company: 'Futurum Academy, Singapore',
        period: 'September 2024 - May 2025',
        description: 'Delivered coding, robotics, and game development lessons using Python, Scratch, Construct 3, and Micro:bit. Designed user-friendly lesson materials and structured guided exercises to boost computational thinking.',
    },
    {
        role: 'System Analyst',
        company: 'Institute of Mental Health (IMH), Singapore',
        period: 'January 2022 - August 2022',
        description: 'Developed internal databases, multimedia websites, and tracking systems. Analysed ServiceNow ticket volumes to identify bottlenecks, reducing repeat support queries through improved documentation.',
    },
    {
        role: 'ICT Trainer',
        company: 'Expertise Technologies Pte Ltd, Singapore',
        period: 'January 2005 - August 2021',
        description: 'Designed and executed training programs in digital literacy, coding, and web design for students and staff. Managed school websites, network administration, and IT operations.',
    },
];

export default function Home({ featuredProjects }: HomeProps) {
    const { settings } = usePage().props as any;
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
                        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.2rem] border-2 border-border/40 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
                            <img
                                src={settings?.hero_portrait || "/images/hanita_headshot.jpg"}
                                alt={settings?.site_name || "Hanita"}
                                className="object-cover w-full h-full transform scale-[1.02] group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2 items-center md:items-start">
                        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Based in {settings?.contact_address || "Singapore"}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            {settings?.availability_status || "Available for local & remote creative roles"}
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
                        {settings?.hero_title ? (
                            settings.hero_title.includes('Hanita') ? (
                                <>
                                    Hi, I'm <span className="font-serif italic font-black text-primary">{settings.site_name || 'Hanita'}</span>. <br />
                                    {settings.hero_title.replace(`Hi, I'm Hanita.`, '').replace(`Hi, I'm ${settings.site_name || 'Hanita'}.`, '')}
                                </>
                            ) : (
                                settings.hero_title
                            )
                        ) : (
                            <>
                                Hi, I'm <span className="font-serif italic font-black text-primary">Hanita</span>. <br />
                                I design experiences that feel <span className="underline decoration-primary decoration-wavy underline-offset-4">organic</span> & thoughtful.
                            </>
                        )}
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                        {settings?.hero_subtitle || "I am a digital product designer specialized in bridging high-fidelity user research with premium interaction systems. From banking architecture to spatial AR applications, I strive for design excellence that honors human experience."}
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
                                Academic Background
                            </h3>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <p className="text-xs font-bold text-foreground">WSQ Professional Diploma in Infocomm Technology</p>
                                    <p className="text-[11px] text-muted-foreground">Lithan Academy, Singapore | 2024 - 2025</p>
                                </div>
                                <div className="border-t border-border/30 pt-2">
                                    <p className="text-xs font-bold text-foreground">B.Sc. in Computer Engineering</p>
                                    <p className="text-[11px] text-muted-foreground">Brunel University, UK | 1999</p>
                                </div>
                                <div className="border-t border-border/30 pt-2">
                                    <p className="text-xs font-bold text-foreground">Diploma in Electronics & Communications</p>
                                    <p className="text-[11px] text-muted-foreground">Singapore Polytechnic | 1997</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-6 rounded-3xl border border-border/40 bg-card/20">
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary" />
                                Singapore & Remote Profile
                            </h3>
                            <div className="flex flex-col gap-3 text-xs text-muted-foreground leading-relaxed">
                                <p>• 18+ years of expertise in Singapore's ICT, training, and systems support sectors.</p>
                                <p>• Specialist in bridging technical frameworks with human-centric interfaces.</p>
                                <p>• Fully equipped for highly productive Work-From-Home (WFH) operations.</p>
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

            {/* Certifications Section */}
            <section className="py-16 border-t border-border/40 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-foreground">Professional Credentials</h2>
                    <p className="text-sm text-muted-foreground mt-1.5">Specialized certifications validating UI/UX, Data Strategy, and Systems operations</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        { title: 'Certified Usability Analyst', issuer: 'Human Factors International (HFI) / NTUC', year: '2024', highlight: true },
                        { title: 'Certified Digital Persuasion Analyst', issuer: 'Human Factors International (HFI) / NTUC', year: '2024' },
                        { title: 'Associate UI/UX Designer', issuer: 'NTUC', year: '2024', highlight: true },
                        { title: 'Data Visualisation', issuer: 'WSQ', year: '2025' },
                        { title: 'Data Strategy', issuer: 'WSQ', year: '2025' },
                        { title: 'Computational Modelling', issuer: 'WSQ', year: '2025' },
                        { title: 'Business Needs Analysis', issuer: 'WSG', year: '2024' },
                        { title: 'Agile Project Management', issuer: 'WSG', year: '2024' },
                        { title: 'ITIL Foundation Certification', issuer: 'AXELOS', year: '2022' },
                        { title: 'HTML5, JavaScript & CSS3', issuer: 'NTUC', year: '2023' },
                        { title: 'Basic to Intermediate Illustrator', issuer: 'NTUC', year: '2024' },
                        { title: 'Basic to Intermediate Photoshop', issuer: 'NTUC', year: '2023' }
                    ].map((cert) => (
                        <div
                            key={cert.title}
                            className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                                cert.highlight 
                                    ? 'border-primary/40 bg-primary/5 shadow-sm' 
                                    : 'border-border/40 bg-card/20'
                            }`}
                        >
                            <div>
                                <span className={`text-xs font-bold leading-snug ${cert.highlight ? 'text-primary' : 'text-foreground'}`}>
                                    {cert.title}
                                </span>
                                <p className="text-[10px] text-muted-foreground mt-1 leading-normal">{cert.issuer}</p>
                            </div>
                            <span className="text-[10px] font-semibold text-primary mt-3 text-right">
                                {cert.year}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </PortfolioLayout>
    );
}
