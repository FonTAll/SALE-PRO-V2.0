import { 
  LayoutDashboard, 
  Users,
  Briefcase,
  Megaphone,
  BarChart2,
  Settings,
  History,
  Boxes,
  Target,
  Receipt,
  Database,
  Calendar
} from 'lucide-react';

export interface MenuItem {
  id: string;
  path: string;
  name: string;
  icon: any;
  isConfidential: boolean;
  subItems?: { id: string; name: string; path: string; isConfidential?: boolean }[];
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', path: '/', name: 'Sales Dashboard', icon: LayoutDashboard, isConfidential: false },
  { id: 'calendar', path: '/calendar', name: 'CALENDAR', icon: Calendar, isConfidential: false },
  { 
    id: 'operations', 
    path: '/operations', 
    name: 'OPERATIONS', 
    icon: Boxes, 
    isConfidential: false,
    subItems: [
      { id: 'sales_order', name: 'Sales Order (SO)', path: '/operations/so' }
    ]
  },
  { 
    id: 'crm', 
    path: '/crm', 
    name: 'CRM & Leads', 
    icon: Users, 
    isConfidential: false,
    subItems: [
      { id: 'accounts_contacts', name: 'Accounts & Contacts', path: '/crm/accounts' },
      { id: 'sale_crm', name: 'Sale CRM', path: '/crm/sale-crm' },
      { id: 'customer_complaint', name: 'Customer Complaint', path: '/crm/complaints' },
      { id: 'customer_satisfaction', name: 'Customer Satisfaction', path: '/crm/satisfaction' }
    ]
  },
  { 
    id: 'marketing', 
    path: '/marketing', 
    name: 'Marketing Hub', 
    icon: Megaphone, 
    isConfidential: false
  },
  { 
    id: 'analytics', 
    path: '/analytics', 
    name: 'ANALYTICS', 
    icon: BarChart2, 
    isConfidential: false,
    subItems: [
      { id: 'sale_analysis', name: 'Sale Analysis', path: '/analytics/sale' },
      { id: 'profit_analysis', name: 'Profit Analysis', path: '/analytics/profit' },
      { id: 'global_sales', name: 'Global Sales', path: '/analytics/global' }
    ]
  },
  { 
    id: 'performance', 
    path: '/performance', 
    name: 'PERFORMANCE', 
    icon: Target, 
    isConfidential: false,
    subItems: [
      { id: 'sales_rep_performance', name: 'Sales Rep Performance', path: '/performance/reps' },
      { id: 'kpi_dashboard', name: 'KPI Dashboard', path: '/performance/kpi' }
    ]
  },
  { 
    id: 'financials', 
    path: '/financials', 
    name: 'FINANCIALS', 
    icon: Receipt, 
    isConfidential: true,
    subItems: [
      { id: 'ar', name: 'Accounts Receivable (AR)', path: '/financials/ar' },
      { id: 'vat', name: 'VAT Management', path: '/financials/vat' }
    ]
  },
  { 
    id: 'master_data', 
    path: '/master-data', 
    name: 'MASTER DATA', 
    icon: Database, 
    isConfidential: true,
    subItems: [
      { id: 'products', name: 'Products List', path: '/master-data/products' },
      { id: 'prices', name: 'Price Books', path: '/master-data/prices' }
    ]
  },
  { 
    id: 'settings', 
    path: '/settings', 
    name: 'SETTINGS', 
    icon: Settings, 
    isConfidential: true,
    subItems: [
      { id: 'user_permission', name: 'User Permission', path: '/permissions' },
      { id: 'system_config', name: 'System Config', path: '/settings/config' }
    ]
  }
];
