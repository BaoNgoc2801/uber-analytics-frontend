import { Menu, Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-md border-border">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-textSecondary hover:bg-surfaceHighlight lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:flex items-center text-xl font-bold tracking-tight text-white">
          <span className="text-primary mr-1">Uber</span> Analytics
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-9 pr-4 py-1.5 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-textPrimary placeholder:text-textMuted"
          />
        </div>
        
        <button className="p-2 relative rounded-lg text-textSecondary hover:bg-surfaceHighlight">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="w-8 h-8 rounded-full bg-surfaceHighlight border border-border flex items-center justify-center text-textSecondary cursor-pointer hover:border-primary transition-colors">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};
