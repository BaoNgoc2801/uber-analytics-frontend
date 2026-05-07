import { LayoutDashboard, Car, MapPin, Users, Settings, X, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../common';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Car,             label: 'Rides',     href: '/rides' },
  { icon: MapPin,          label: 'Locations', href: '/locations' },
  { icon: Users,           label: 'Drivers',   href: '/drivers' },
  { icon: Settings,        label: 'Settings',  href: '/settings' },
];

const Brand = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
      <BarChart3 className="w-4 h-4 text-white" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-sm font-bold text-white tracking-tight">
        <span className="text-primary">Uber</span> Analytics
      </span>
      <span className="text-[10px] text-textMuted mt-0.5 tracking-wider uppercase">Dashboard</span>
    </div>
  </div>
);

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
          'fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* ── Logo / Brand (desktop always, mobile has close btn) ── */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
          <Brand />
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-textSecondary hover:text-white rounded-lg hover:bg-surfaceHighlight"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Nav items ── */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="px-3 text-[10px] font-bold text-textMuted uppercase tracking-[0.15em] mb-3 mt-2">
            Menu
          </p>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all group',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={cn(
                          'p-1.5 rounded-lg mr-3 transition-colors shrink-0',
                          isActive
                            ? 'bg-primary/15 text-primary'
                            : 'text-textMuted group-hover:text-textPrimary'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ── Footer ── */}
        <div className="p-4 border-t border-border shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surfaceHighlight/50">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/60 to-violet-600/60 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-textPrimary truncate">Admin User</p>
              <p className="text-[10px] text-textMuted truncate">admin@uber-analytics.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
