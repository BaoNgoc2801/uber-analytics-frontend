import { Bell, Shield, Key, Globe, User } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common';
import { cn } from '../components/common';

export const Settings = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6 max-w-5xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Settings</h1>
          <p className="text-textSecondary">Manage your account preferences, notifications, and security configurations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Settings Sidebar Menu */}
          <Card className="col-span-1 p-4 border border-border bg-surface flex flex-col space-y-1 h-fit">
            <button className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-colors text-sm font-medium w-full text-left">
              <User className="w-5 h-5" />
              <span>Account Profile</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary transition-colors text-sm font-medium w-full text-left">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary transition-colors text-sm font-medium w-full text-left">
              <Shield className="w-5 h-5" />
              <span>Security</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary transition-colors text-sm font-medium w-full text-left">
              <Globe className="w-5 h-5" />
              <span>Preferences</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary transition-colors text-sm font-medium w-full text-left">
              <Key className="w-5 h-5" />
              <span>API Keys</span>
            </button>
          </Card>

          {/* Settings Content Area */}
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-6">
            <Card className="p-6 border border-border bg-surface">
              <h3 className="text-xl font-semibold text-white mb-6">Account Profile</h3>
              
              <div className="space-y-5">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-textSecondary">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Admin User"
                    className="w-full px-4 py-2.5 bg-surfaceHighlight border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-textSecondary">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="admin@uber-analytics.com"
                    className="w-full px-4 py-2.5 bg-surfaceHighlight border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-textSecondary">Role</label>
                  <input 
                    type="text" 
                    defaultValue="Super Administrator"
                    disabled
                    className="w-full px-4 py-2.5 bg-surfaceHighlight/50 border border-border rounded-lg text-textMuted cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </Card>

            <Card className="p-6 border border-border bg-surface">
              <h3 className="text-xl font-semibold text-white mb-2">Danger Zone</h3>
              <p className="text-sm text-textSecondary mb-6">Irreversible and destructive actions.</p>
              
              <div className="flex items-center justify-between p-4 border border-red-500/20 bg-red-500/5 rounded-lg">
                <div>
                  <h4 className="text-red-500 font-medium">Delete Account</h4>
                  <p className="text-xs text-textSecondary mt-0.5">Permanently delete your account and all data.</p>
                </div>
                <button className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-medium rounded-lg transition-colors border border-red-500/20">
                  Delete
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
