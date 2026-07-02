import { useState, useEffect } from 'react';
import { User, Shield, Palette, Upload, Monitor, Moon, Sun, Smartphone, Laptop, SmartphoneNfc, Key, LayoutTemplate, Type, BoxSelect, Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/api-client';

type Tab = 'profile' | 'account' | 'appearance';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/auth/me');
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.patch('/auth/me', data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
    },
  });

  const updateProfile = (data: any) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full animate-fade-in bg-muted/10">
      {/* Sidebar for Settings */}
      <div className="w-64 border-r bg-background flex flex-col p-4">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Settings</h2>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
              activeTab === 'profile' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <User size={18} />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
              activeTab === 'account' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Shield size={18} />
            Account Security
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
              activeTab === 'appearance' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Palette size={18} />
            Appearance
          </button>
        </nav>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 overflow-y-auto p-8 max-w-4xl">
        {activeTab === 'profile' && <ProfileSettings user={user} updateProfile={updateProfile} />}
        {activeTab === 'account' && <AccountSettings user={user} />}
        {activeTab === 'appearance' && <AppearanceSettings user={user} updateProfile={updateProfile} />}
      </div>
    </div>
  );
}

function ProfileSettings({ user, updateProfile }: { user: any, updateProfile: (data: any) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'), // Not updatable via profile route normally, but we include it
      phone: formData.get('phone'),
      bio: formData.get('bio'),
      birthday: formData.get('birthday') ? new Date(formData.get('birthday') as string).toISOString() : undefined,
      timezone: formData.get('timezone'),
      language: formData.get('language'),
      country: formData.get('country'),
      occupation: formData.get('occupation'),
      website: formData.get('website'),
      socialLinks: {
        twitter: formData.get('twitter'),
        linkedin: formData.get('linkedin'),
      },
    };
    updateProfile(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-foreground">Public Profile</h3>
        <p className="text-sm text-muted-foreground mt-1">This information will be displayed publicly.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-accent flex items-center justify-center text-4xl text-muted-foreground border-2 border-dashed border-border overflow-hidden">
            {user?.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : <User size={40} className="opacity-20" />}
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                const url = window.prompt("Enter image URL for your profile picture:");
                if (url) updateProfile({ avatarUrl: url });
              }}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              <Upload size={16} />
              Change Picture
            </button>
            <p className="text-xs text-muted-foreground mt-2">Provide a valid image URL.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input name="name" defaultValue={user?.name || ''} type="text" placeholder="John Doe" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <input name="username" defaultValue={user?.username || ''} type="text" placeholder="@johndoe" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input name="email" defaultValue={user?.email || ''} disabled type="email" placeholder="john@example.com" className="w-full rounded-md border bg-muted px-3 py-2 text-sm focus:outline-none text-muted-foreground cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input name="phone" defaultValue={user?.phone || ''} type="tel" placeholder="+1 (555) 000-0000" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea name="bio" defaultValue={user?.bio || ''} rows={4} placeholder="Write a few sentences about yourself..." className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Birthday</label>
            <input name="birthday" defaultValue={user?.birthday ? new Date(user.birthday).toISOString().split('T')[0] : ''} type="date" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Zone</label>
            <select name="timezone" defaultValue={user?.timezone || 'UTC'} className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="UTC">UTC</option>
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="IST">Indian Standard Time (IST)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <select name="language" defaultValue={user?.language || 'en'} className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <input name="country" defaultValue={user?.country || ''} type="text" placeholder="United States" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Occupation</label>
          <input name="occupation" defaultValue={user?.occupation || ''} type="text" placeholder="Software Engineer" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Website</label>
          <input name="website" defaultValue={user?.website || ''} type="url" placeholder="https://example.com" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Social Links</label>
          <div className="flex gap-2">
            <input name="twitter" defaultValue={user?.socialLinks?.twitter || ''} type="text" placeholder="Twitter Profile" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <input name="linkedin" defaultValue={user?.socialLinks?.linkedin || ''} type="text" placeholder="LinkedIn Profile" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div className="pt-4 border-t">
          <button type="submit" className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            Save Profile
          </button>
        </div>
      </div>
    </form>
  );
}

function AccountSettings() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-foreground">Account & Security</h3>
        <p className="text-sm text-muted-foreground mt-1">Manage your account credentials and security settings.</p>
      </div>

      {/* Security Credentials */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
          <div>
            <h4 className="text-sm font-medium">Email Address</h4>
            <p className="text-xs text-muted-foreground mt-1">john@example.com</p>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">Change Email</button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
          <div>
            <h4 className="text-sm font-medium">Password</h4>
            <p className="text-xs text-muted-foreground mt-1">Last changed 3 months ago</p>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">Change Password</button>
        </div>
      </div>

      {/* Advanced Security */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Advanced Security</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-primary/10 text-primary rounded-md"><Shield size={20} /></div>
              <div>
                <h4 className="text-sm font-medium">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-muted-foreground mt-1">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <button className="text-sm font-medium px-4 py-2 border rounded-md hover:bg-accent">Enable</button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-primary/10 text-primary rounded-md"><Key size={20} /></div>
              <div>
                <h4 className="text-sm font-medium">Passkeys</h4>
                <p className="text-xs text-muted-foreground mt-1">Sign in safely without a password using your device.</p>
              </div>
            </div>
            <button className="text-sm font-medium px-4 py-2 border rounded-md hover:bg-accent">Setup Passkey</button>
          </div>
        </div>
      </div>

      {/* Sessions & Devices */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Sessions & Devices</h4>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-background space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Laptop size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">MacBook Pro - Chrome</p>
                  <p className="text-xs text-green-500">Active now • New York, USA</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">iPhone 14 Pro - Safari</p>
                  <p className="text-xs text-muted-foreground">Last active 2 hours ago • New York, USA</p>
                </div>
              </div>
              <button className="text-xs text-destructive hover:underline">Revoke</button>
            </div>
            <button className="text-sm font-medium text-primary hover:underline mt-2">View all login sessions</button>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Connected Accounts</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center font-bold">G</div>
              <p className="text-sm font-medium">Google</p>
            </div>
            <button className="text-sm text-destructive hover:underline">Disconnect</button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center font-bold">GH</div>
              <p className="text-sm font-medium">GitHub</p>
            </div>
            <button className="text-sm text-primary hover:underline">Connect</button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center font-bold">A</div>
              <p className="text-sm font-medium">Apple</p>
            </div>
            <button className="text-sm text-primary hover:underline">Connect</button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center font-bold">M</div>
              <p className="text-sm font-medium">Microsoft</p>
            </div>
            <button className="text-sm text-primary hover:underline">Connect</button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-8 mt-8 border-t border-destructive/20">
        <h4 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <h4 className="text-sm font-medium text-foreground">Deactivate Account</h4>
              <p className="text-xs text-muted-foreground mt-1">Temporarily hide your profile and data.</p>
            </div>
            <button className="text-sm font-medium px-4 py-2 border border-destructive/30 text-destructive rounded-md hover:bg-destructive/10">Deactivate</button>
          </div>
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <h4 className="text-sm font-medium text-foreground">Delete Account</h4>
              <p className="text-xs text-muted-foreground mt-1">Permanently remove your account and all data.</p>
            </div>
            <button className="text-sm font-medium px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings({ user, updateProfile }: { user: any, updateProfile: (data: any) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const appearance = {
      theme: formData.get('theme') || 'system',
      fontStyle: formData.get('fontStyle') || 'Inter',
      fontSize: formData.get('fontSize') || '14',
      borderRadius: formData.get('borderRadius') || '8',
      uiDensity: formData.get('uiDensity') || 'comfortable',
      dashboardLayout: formData.get('dashboardLayout') || 'grid',
      sidebarPosition: formData.get('sidebarPosition') || 'left',
      sidebarCollapse: formData.get('sidebarCollapse') || 'manual',
      cardStyle: formData.get('cardStyle') || 'flat',
    };
    updateProfile({ appearance });
  };

  const currentApp = user?.appearance || {};

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-foreground">Appearance</h3>
        <p className="text-sm text-muted-foreground mt-1">Customize how the application looks and feels.</p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Theme</h4>
        <div className="grid grid-cols-3 gap-4">
          <label className="border-2 border-primary rounded-lg p-4 flex flex-col items-center gap-3 cursor-pointer bg-background relative">
            <input type="radio" name="theme" value="system" defaultChecked={currentApp.theme === 'system' || !currentApp.theme} className="absolute opacity-0" />
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center"><Monitor size={20} /></div>
            <span className="text-sm font-medium">System</span>
          </label>
          <label className="border-2 border-transparent hover:border-border rounded-lg p-4 flex flex-col items-center gap-3 cursor-pointer bg-background relative">
            <input type="radio" name="theme" value="light" defaultChecked={currentApp.theme === 'light'} className="absolute opacity-0" />
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center"><Sun size={20} /></div>
            <span className="text-sm font-medium">Light</span>
          </label>
          <label className="border-2 border-transparent hover:border-border rounded-lg p-4 flex flex-col items-center gap-3 cursor-pointer bg-[#09090b] text-white relative">
            <input type="radio" name="theme" value="dark" defaultChecked={currentApp.theme === 'dark'} className="absolute opacity-0" />
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center"><Moon size={20} /></div>
            <span className="text-sm font-medium">Dark</span>
          </label>
        </div>
      </div>

      {/* Colors & Typography */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Accent Color</h4>
          <div className="flex flex-wrap gap-3">
            {['#3b82f6', '#10b981', '#8b5cf6', '#f43f5e', '#f97316', '#eab308'].map((color, i) => (
              <button type="button" key={color} className={cn("h-8 w-8 rounded-full shadow-sm ring-offset-background transition-transform hover:scale-110", i === 0 && "ring-2 ring-primary ring-offset-2")} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Font Style</h4>
          <select name="fontStyle" defaultValue={currentApp.fontStyle || 'Inter'} className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
            <option value="Inter">Inter (Default)</option>
            <option value="Roboto">Roboto</option>
            <option value="Outfit">Outfit</option>
            <option value="System">System UI</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Font Size</h4>
          <div className="flex items-center gap-4">
            <Type size={14} className="text-muted-foreground" />
            <input name="fontSize" type="range" min="12" max="20" defaultValue={currentApp.fontSize || "14"} className="flex-1" />
            <Type size={20} className="text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Border Radius</h4>
          <div className="flex items-center gap-4">
            <BoxSelect size={14} className="text-muted-foreground" />
            <input name="borderRadius" type="range" min="0" max="20" defaultValue={currentApp.borderRadius || "8"} className="flex-1" />
            <BoxSelect size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* UI & Layout Options */}
      <div className="space-y-6 pt-6 border-t">
        <h4 className="text-lg font-semibold">Interface & Layout</h4>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">UI Density</p>
              <p className="text-xs text-muted-foreground">Spacing between elements</p>
            </div>
            <select name="uiDensity" defaultValue={currentApp.uiDensity || 'comfortable'} className="rounded-md border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none">
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable (Default)</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dashboard Layout</p>
              <p className="text-xs text-muted-foreground">Widget arrangement</p>
            </div>
            <select name="dashboardLayout" defaultValue={currentApp.dashboardLayout || 'grid'} className="rounded-md border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none">
              <option value="grid">Grid (Default)</option>
              <option value="masonry">Masonry</option>
              <option value="list">List</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Sidebar Position</p>
              <p className="text-xs text-muted-foreground">Left or right side of screen</p>
            </div>
            <select name="sidebarPosition" defaultValue={currentApp.sidebarPosition || 'left'} className="rounded-md border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none">
              <option value="left">Left (Default)</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Sidebar Collapse</p>
              <p className="text-xs text-muted-foreground">Auto-collapse behavior</p>
            </div>
            <select name="sidebarCollapse" defaultValue={currentApp.sidebarCollapse || 'manual'} className="rounded-md border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none">
              <option value="manual">Manual (Default)</option>
              <option value="auto">Auto (On small screens)</option>
              <option value="always">Always Collapsed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Effects */}
      <div className="space-y-6 pt-6 border-t">
        <h4 className="text-lg font-semibold">Visual Effects</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Animations</p>
              <p className="text-xs text-muted-foreground">Enable interface animations and transitions</p>
            </div>
            <label className="h-5 w-9 rounded-full bg-primary relative cursor-pointer block">
              <input type="checkbox" name="animations" defaultChecked={currentApp.animations !== false} className="sr-only peer" />
              <div className="h-4 w-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-all peer-checked:translate-x-4 shadow-sm" />
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Blur Effects</p>
              <p className="text-xs text-muted-foreground">Enable backdrop blurs on modals and navbars</p>
            </div>
            <label className="h-5 w-9 rounded-full bg-primary relative cursor-pointer block">
              <input type="checkbox" name="blurEffects" defaultChecked={currentApp.blurEffects !== false} className="sr-only peer" />
              <div className="h-4 w-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-all peer-checked:translate-x-4 shadow-sm" />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Glassmorphism UI</p>
              <p className="text-xs text-muted-foreground">Use translucent frosted-glass materials</p>
            </div>
            <label className="h-5 w-9 rounded-full bg-muted relative cursor-pointer block">
              <input type="checkbox" name="glassmorphism" defaultChecked={currentApp.glassmorphism === true} className="sr-only peer" />
              <div className="h-4 w-4 bg-white rounded-full absolute left-0.5 top-0.5 transition-all peer-checked:bg-primary peer-checked:translate-x-4 shadow-sm" />
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Card Style</p>
              <p className="text-xs text-muted-foreground">Visual style of cards and containers</p>
            </div>
            <select name="cardStyle" defaultValue={currentApp.cardStyle || 'flat'} className="rounded-md border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none">
              <option value="flat">Flat w/ Border</option>
              <option value="elevated">Elevated Shadow</option>
              <option value="neumorphic">Neumorphic</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t">
        <h4 className="text-sm font-medium">Background Image</h4>
        <div className="flex items-center gap-4">
          <div className="h-20 w-32 rounded-md bg-accent flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:bg-accent/80 transition-colors">
            <Upload size={20} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Upload Custom Background</p>
            <p className="text-xs text-muted-foreground mt-1">Recommended size: 1920x1080px</p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <button type="submit" className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          Save Appearance
        </button>
      </div>
    </form>
  );
}
