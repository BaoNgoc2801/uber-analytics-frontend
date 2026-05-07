import { Menu, Search, Bell, User, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useHealthCheck } from '../../hooks';

interface HeaderProps {
  onMenuClick: () => void;
}

const PAGE_LABELS: Record<string, string> = {
  '/':          'Overview',
  '/rides':     'Ride Analytics',
  '/locations': 'Locations',
  '/drivers':   'Drivers',
  '/settings':  'Settings',
};

const STATUS_CONFIG = {
  checking: {
    icon: <Loader2 className="w-3 h-3 animate-spin text-yellow-400" />,
    dot: 'bg-yellow-400 animate-pulse',
    label: 'Checking...',
    labelClass: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
  },
  online: {
    icon: <Wifi className="w-3 h-3 text-green-400" />,
    dot: 'bg-green-400',
    label: 'API Online',
    labelClass: 'text-green-400',
    bg: 'bg-green-400/10 border-green-400/20',
  },
  offline: {
    icon: <WifiOff className="w-3 h-3 text-red-400" />,
    dot: 'bg-red-400 animate-pulse',
    label: 'API Offline',
    labelClass: 'text-red-400',
    bg: 'bg-red-400/10 border-red-400/20',
  },
};

export const Header = ({ onMenuClick }: HeaderProps) => {
  const health = useHealthCheck();
  const location = useLocation();
  const cfg = STATUS_CONFIG[health];
  const pageLabel = PAGE_LABELS[location.pathname] ?? 'Analytics';

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-md border-border">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-textSecondary hover:bg-surfaceHighlight lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop: brand */}
        <div className="hidden lg:flex items-center text-xl font-bold tracking-tight text-white">
          <span className="text-primary mr-1">Uber</span> Analytics
        </div>

        {/* Separator + Active page name */}
        <div className="hidden lg:flex items-center gap-2 text-textMuted">
          <span className="text-border select-none">/</span>
          <span className="text-sm font-medium text-textSecondary">{pageLabel}</span>
        </div>

        {/* Mobile: show page name instead of logo */}
        <span className="lg:hidden text-sm font-semibold text-textPrimary">{pageLabel}</span>
      </div>

      <div className="flex items-center space-x-3">
        {/* Health Badge */}
        <div
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all duration-500 ${cfg.bg}`}
          title={`Backend status: ${health}`}
        >
          {cfg.icon}
          <span className={`hidden md:inline ${cfg.labelClass}`}>{cfg.label}</span>
          <span className={`w-1.5 h-1.5 rounded-full md:hidden ${cfg.dot}`} />
        </div>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-56 pl-9 pr-4 py-1.5 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-textPrimary placeholder:text-textMuted"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 relative rounded-lg text-textSecondary hover:bg-surfaceHighlight">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-violet-600/60 border border-primary/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
};
