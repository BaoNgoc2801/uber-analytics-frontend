import { LayoutDashboard, Car, MapPin, Users, Settings, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../common';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Car, label: 'Rides', href: '#' },
  { icon: MapPin, label: 'Locations', href: '#' },
  { icon: Users, label: 'Drivers', href: '/drivers' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border lg:hidden">
          <span className="text-xl font-bold text-white tracking-tight">
            <span className="text-primary mr-1">Uber</span> Analytics
          </span>
          <button onClick={onClose} className="p-2 text-textSecondary hover:text-white rounded-lg hover:bg-surfaceHighlight">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-textMuted uppercase tracking-wider mb-4 mt-4">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={onClose}
                end={item.href === '/'}
                className={({ isActive }) => cn(
                  "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary"
                )}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn(
                      "w-5 h-5 mr-3",
                      isActive ? "text-primary" : "text-textMuted group-hover:text-textPrimary"
                    )} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
};
