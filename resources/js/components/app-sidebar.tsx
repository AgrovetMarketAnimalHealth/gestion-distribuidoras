import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Shapes, 
    Music, 
    MapPin, 
    Truck, 
    Package, 
    Building2 
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
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
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Categorías',
        href: '/panel/categoria',
        icon: Shapes,
    },
    {
        title: 'Pops',
        href: '/panel/pops',
        icon: Music,
    },
    {
        title: 'Zonas',
        href: '/panel/zona',
        icon: MapPin,
    },
    {
        title: 'Distribuidoras',
        href: '/panel/distribuidora',
        icon: Truck,
    },
    {
        title: 'Productos',
        href: '/panel/productos',
        icon: Package,
    },
    {
        title: 'Veterinarias',
        href: '/panel/veterinaria',
        icon: Building2,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}