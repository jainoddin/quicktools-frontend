'use client';
import React, { useState, useContext } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { getEndpoint } from '../../../lib/api';
import { 
  User, Bell, Shield, Key, Trash2, Camera, Eye, EyeOff,
  Plus, Copy, Trash, CheckCircle, AlertTriangle
} from 'lucide-react';

type Tab = 'account' | 'notifications' | 'privacy' | 'api-keys' | 'delete-account';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-[#6D5EF8]' : 'bg-[#D1D5DB]'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle'|'saving'|'saved'>('idle');

  // Sync form fields when user data loads
  React.useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setBio((user as any).bio || '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    try {
      await fetch(getEndpoint('/api/auth/profile'), {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, bio }),
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      setSaveStatus('idle');
    }
  };

  // Notification toggles
  const [notifs, setNotifs] = useState({
    productUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
    toolUsage: true,
    creditsUpdates: true,
    newFeatures: false,
  });

  // Privacy toggles
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    searchEngine: false,
  });

  const tabs = [
    { id: 'account' as Tab, label: 'Account Details', icon: User },
    { id: 'notifications' as Tab, label: 'Notification Settings', icon: Bell },
    { id: 'privacy' as Tab, label: 'Privacy', icon: Shield },
    { id: 'api-keys' as Tab, label: 'API Keys', icon: Key },
    { id: 'delete-account' as Tab, label: 'Delete Account', icon: Trash2, danger: true },
  ];

  const tabLabels: Record<Tab, string> = {
    'account': 'Account Details',
    'notifications': 'Notification Settings',
    'privacy': 'Privacy',
    'api-keys': 'API Keys',
    'delete-account': 'Delete Account',
  };

  const apiKeys = [
    { name: 'Development Key', key: '••••••••••••••••••ts3', created: 'May 12, 2024', lastUsed: '2 days ago' },
    { name: 'Production Key', key: '••••••••••••••••••d11', created: 'May 12, 2024', lastUsed: '5 days ago' },
    { name: 'Test Key', key: '••••••••••••••••••3b8', created: 'Apr 28, 2024', lastUsed: 'Never' },
  ];

  return (
    <DashboardLayout>
      {/* Settings Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-[#6B7280]">
          <span className="text-[#111827] font-bold">Settings</span>
          <span className="text-[#D1D5DB]">/</span>
          <span className="text-[#6B7280]">{tabLabels[activeTab]}</span>
        </div>
        <p className="text-sm text-[#6B7280] mt-0.5">
          {activeTab === 'account' && 'Manage your personal information'}
          {activeTab === 'notifications' && 'Manage your notification preferences'}
          {activeTab === 'privacy' && 'Manage your privacy and data settings'}
          {activeTab === 'api-keys' && 'Manage your API keys to access QuickTools API'}
          {activeTab === 'delete-account' && 'Permanently delete your account and all data'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left: Main Content */}
        <div className="flex-1 min-w-0">

          {/* ── ACCOUNT DETAILS ── */}
          {activeTab === 'account' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#111827] mb-6">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#6D5EF8] to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg overflow-hidden">
                    {user?.avatar 
                      ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                      : (user?.name?.charAt(0)?.toUpperCase() || 'U')
                    }
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#6D5EF8] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#5B4DF5] transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button className="text-sm font-semibold text-[#6D5EF8] hover:underline">Change Photo</button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Username</label>
                  <input type="text" defaultValue={user?.email?.split('@')[0] || ''} className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all" />
                  <p className="text-xs text-[#9CA3AF] mt-1">This is your public username.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email Address</label>
                  <div className="relative">
                    <input type="email" value={user?.email || ''} readOnly className="w-full h-11 px-4 pr-24 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none cursor-default" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Bio</label>
                  <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all resize-none" />
                  <p className="text-xs text-[#9CA3AF] mt-1 text-right">{bio.length}/100</p>
                </div>
              </div>

              <button onClick={handleSaveProfile} className={`mt-6 font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-md ${saveStatus === 'saved' ? 'bg-[#10B981] text-white shadow-green-500/20' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white shadow-[#6D5EF8]/20'}`}>
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          )}

          {/* ── NOTIFICATION SETTINGS ── */}
          {activeTab === 'notifications' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8 space-y-8">
              <div>
                <h2 className="text-base font-bold text-[#111827] mb-1">Email Notifications</h2>
                <p className="text-sm text-[#6B7280] mb-5">Choose what type of emails you want to receive.</p>
                <div className="space-y-4">
                  {[
                    { key: 'productUpdates', label: 'Product Updates', desc: 'Receive details about new features and updates' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive emails about tips, offers and more' },
                    { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications about your account' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle enabled={(notifs as any)[item.key]} onChange={() => setNotifs(p => ({ ...p, [item.key]: !(p as any)[item.key] }))} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#111827] mb-1">In-App Notifications</h2>
                <p className="text-sm text-[#6B7280] mb-5">Control your in-app notification preferences.</p>
                <div className="space-y-4">
                  {[
                    { key: 'toolUsage', label: 'Tool Usage Completed', desc: 'Notify me when my tools are ready' },
                    { key: 'creditsUpdates', label: 'Credits and Billing Updates', desc: 'Notify me about credits and billing' },
                    { key: 'newFeatures', label: 'New Features', desc: 'Notify me about new tools and features' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle enabled={(notifs as any)[item.key]} onChange={() => setNotifs(p => ({ ...p, [item.key]: !(p as any)[item.key] }))} />
                    </div>
                  ))}
                </div>
              </div>

              <button className="bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                Save Preferences
              </button>
            </div>
          )}

          {/* ── PRIVACY ── */}
          {activeTab === 'privacy' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8 space-y-8">
              <div>
                <h2 className="text-base font-bold text-[#111827] mb-5">Privacy Settings</h2>
                <div className="space-y-4">
                  {[
                    { key: 'publicProfile', label: 'Public Profile', desc: 'Allow others to see your profile and tools' },
                    { key: 'searchEngine', label: 'Search Engine Visibility', desc: 'Allow search engines to index your profile' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle enabled={(privacy as any)[item.key]} onChange={() => setPrivacy(p => ({ ...p, [item.key]: !(p as any)[item.key] }))} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#111827] mb-5">Data &amp; Security</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-[#F3F4F6]">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">Export My Data</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">Download a copy of all your data</p>
                    </div>
                    <button className="text-sm font-semibold text-[#6D5EF8] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-4 py-2 rounded-xl transition-colors">
                      Export Data
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">Two-Factor Authentication</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">Add an extra layer of security</p>
                    </div>
                    <button className="text-sm font-semibold text-[#6D5EF8] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-4 py-2 rounded-xl transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <button className="bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                Save Privacy Settings
              </button>
            </div>
          )}

          {/* ── API KEYS ── */}
          {activeTab === 'api-keys' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-[#111827]">Your API Keys</h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">Create and manage your API keys. Keep your keys secure.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                  <Plus className="w-4 h-4" /> Create New API Key
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="pb-3 px-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Key Name</th>
                      <th className="pb-3 px-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider">API Key</th>
                      <th className="pb-3 px-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Created At</th>
                      <th className="pb-3 px-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Last Used</th>
                      <th className="pb-3 px-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    {apiKeys.map((k, i) => (
                      <tr key={i} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-4 px-2 text-sm font-semibold text-[#111827]">{k.name}</td>
                        <td className="py-4 px-2">
                          <code className="text-xs bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-1 rounded-lg text-[#4B5563] font-mono">{k.key}</code>
                        </td>
                        <td className="py-4 px-2 text-sm text-[#6B7280]">{k.created}</td>
                        <td className="py-4 px-2 text-sm text-[#6B7280]">{k.lastUsed}</td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-[#9CA3AF] hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                            <button className="p-1.5 text-[#9CA3AF] hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors"><Copy className="w-4 h-4" /></button>
                            <button className="p-1.5 text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0">
                  <Key className="w-4 h-4 text-[#6D5EF8]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Keep your API keys secure</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Do not share your API keys with anyone. QuickTools will never ask for your API key.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── DELETE ACCOUNT ── */}
          {activeTab === 'delete-account' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8">
              {/* Warning Banner */}
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-700">Delete Account</p>
                  <p className="text-sm text-red-600 mt-0.5">This action cannot be undone. All your data will be permanently deleted.</p>
                </div>
              </div>

              <h2 className="text-base font-bold text-[#111827] mb-4">What will be deleted:</h2>
              <div className="space-y-2 mb-8">
                {[
                  'Your profile and account information',
                  'All your tools and generated results',
                  'History and usage data',
                  'API keys and integrations',
                  'Billing and payment information',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#4B5563]">
                    <CheckCircle className="w-4 h-4 text-red-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                    To confirm, please type <code className="bg-[#FEF2F2] text-red-600 px-1.5 py-0.5 rounded text-xs font-bold">DELETE</code> in the box below and enter your password.
                  </label>
                  <input type="text" placeholder="Type DELETE to confirm" className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all" />
                </div>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="w-full h-11 px-4 pr-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-red-600/20">
                Delete Account Permanently
              </button>
            </div>
          )}

        </div>

        {/* Right: Sub-Nav */}
        <aside className="w-full lg:w-[220px] shrink-0 order-first lg:order-last">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-3 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id 
                    ? tab.danger ? 'bg-red-50 text-red-600' : 'bg-[#EEF2FF] text-[#6D5EF8]'
                    : tab.danger ? 'text-red-500 hover:bg-red-50' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? (tab.danger ? 'text-red-600' : 'text-[#6D5EF8]') : (tab.danger ? 'text-red-400' : 'text-[#6B7280]')}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

      </div>
    </DashboardLayout>
  );
}
