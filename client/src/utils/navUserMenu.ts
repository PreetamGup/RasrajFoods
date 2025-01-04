import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    Users, 
    BarChart2, 
    Bell, 
    Settings, 
    User,
    History
} from 'lucide-react';


export interface MenuItem {
    label: string;
    href: string;
    icon: any; // JSX.Element ensures correct type for React components
}


export const adminMenu: MenuItem[] = [
    {
        label: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard // Pass the reference, not <Dashboard />
    },
    {
        label: 'Manage Products',
        href: '/admin/manageproducts',
        icon: Package
    },
    {
        label: 'Orders',
        href: '/admin/orders',
        icon: ShoppingCart
    },
    {
        label: 'User Management',
        href: '/admin/usermanagement',
        icon: Users
    },
    {
        label: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart2
    },
    {
        label: 'Notifications',
        href: '/admin/notifications',
        icon: Bell
    },
    {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings
    },
    
];





export const userMenu = [
    {
        label: 'Profile',
        href: '/user',
        icon: User, // Icon for Profile
    },
    {
        label: 'Order History',
        href: '/user/order-history',
        icon: History, // Icon for Order History
    },
    {
        label: 'My Cart',
        href: '/user/cart',
        icon: ShoppingCart, // Icon for My Cart
    },
 
   
];