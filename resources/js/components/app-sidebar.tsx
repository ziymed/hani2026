import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Users, Settings2 } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const dashboardUrl = '/dashboard';

    const mainNavItems: NavItem[] = page.props.auth?.user?.is_admin
        ? [
              {
                  title: 'Dashboard',
                  href: '/admin',
                  icon: LayoutGrid,
              },
              {
                  title: 'Users',
                  href: '/admin/users',
                  icon: Users,
              },
              {
                  title: 'Projects',
                  href: '/admin/projects',
                  icon: FolderGit2,
              },
              {
                  title: 'Messages',
                  href: '/admin/messages',
                  icon: usePage().props.unreadMessagesCount ? () => (
                      <span className="relative flex h-5 w-5 items-center justify-center">
                          <BookOpen className="h-4 w-4" />
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                      </span>
                  ) : BookOpen,
              },
              {
                  title: 'System Settings',
                  href: '/admin/settings',
                  icon: Settings2,
              },
          ]
        : [
              {
                  title: 'Dashboard',
                  href: dashboardUrl,
                  icon: LayoutGrid,
              },
          ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
