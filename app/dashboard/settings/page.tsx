'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { getEndpoint } from '../../../lib/api';
import { 
  User, Shield, Trash2, Camera,
  CheckCircle, AlertTriangle
} from 'lucide-react';

type Tab = 'account' | 'delete-account';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('account');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [photoStatus, setPhotoStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [photoError, setPhotoError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle'|'saving'|'saved'>('idle');
  const [confirmText, setConfirmText] = useState('');
  const [deactivateStatus, setDeactivateStatus] = useState<'idle'|'loading'|'error'>('idle');
  const [deactivateError, setDeactivateError] = useState('');

  // Sync form fields when user data loads
  React.useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setBio(user.bio || '');
      setAvatarPreview(null);
    }
  }, [user]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Invalid image'));
        img.onload = () => {
          const maxSize = 400;
          let { width, height } = img;
          if (width > maxSize || height > maxSize) {
            const ratio = Math.min(maxSize / width, maxSize / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file');
      setPhotoStatus('error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Image must be under 5MB');
      setPhotoStatus('error');
      return;
    }

    setPhotoStatus('uploading');
    setPhotoError('');
    try {
      const dataUrl = await compressImage(file);
      setAvatarPreview(dataUrl);

      const res = await fetch(getEndpoint('/api/auth/profile'), {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: dataUrl }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setPhotoError(data.message || 'Failed to upload photo');
        setPhotoStatus('error');
        setAvatarPreview(null);
        return;
      }
      updateUser({
        ...(user as any),
        ...data.user,
        id: data.user.id || (user as any)?.id,
        avatar: data.user.avatar,
      });
      setAvatarPreview(null);
      setPhotoStatus('idle');
    } catch {
      setPhotoError('Failed to upload photo. Try a smaller image.');
      setPhotoStatus('error');
      setAvatarPreview(null);
    }
  };

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    try {
      const res = await fetch(getEndpoint('/api/auth/profile'), {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName.trim(), bio: bio.slice(0, 100) }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSaveStatus('idle');
        return;
      }
      // Keep auth state in sync so name/bio persist in UI
      updateUser({
        ...(user as any),
        ...data.user,
        id: data.user.id || (user as any)?.id,
        bio: data.user.bio ?? '',
      });
      setFullName(data.user.name || fullName);
      setBio(data.user.bio || '');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      setSaveStatus('idle');
    }
  };

  const handleDeactivateAccount = async () => {
    if (confirmText !== 'DEACTIVATE') {
      setDeactivateError('Please type DEACTIVATE to confirm');
      setDeactivateStatus('error');
      return;
    }
    setDeactivateStatus('loading');
    setDeactivateError('');
    try {
      const res = await fetch(getEndpoint('/api/auth/deactivate-account'), {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: confirmText }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setDeactivateError(data.message || 'Failed to deactivate account');
        setDeactivateStatus('error');
        return;
      }
      updateUser(null);
      window.location.href = '/login?deactivated=1';
    } catch (e) {
      setDeactivateError('Something went wrong. Please try again.');
      setDeactivateStatus('error');
    }
  };

  const tabs = [
    { id: 'account' as Tab, label: 'Account Details', icon: User },
    // { id: 'notifications' as Tab, label: 'Notification Settings', icon: Bell }, // hidden for now
    { id: 'privacy' as const, label: 'Privacy', icon: Shield, href: '/privacy' },
    // { id: 'api-keys' as const, label: 'API Keys', icon: Key, href: '/privacy' }, // hidden for now
    { id: 'delete-account' as Tab, label: 'Delete Account', icon: Trash2, danger: true },
  ];

  const tabLabels: Record<Tab, string> = {
    'account': 'Account Details',
    'delete-account': 'Delete Account',
  };

  const handleTabClick = (tab: typeof tabs[number]) => {
    if ('href' in tab && tab.href) {
      router.push(tab.href);
      return;
    }
    setActiveTab(tab.id as Tab);
  };

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
          {activeTab === 'delete-account' && 'Deactivate your account (15-day recovery window)'}
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#6D5EF8] to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg overflow-hidden">
                    {(avatarPreview || user?.avatar)
                      ? <img src={avatarPreview || user?.avatar} alt="User" className="w-full h-full object-cover" />
                      : (user?.name?.charAt(0)?.toUpperCase() || 'U')
                    }
                  </div>
                  <button
                    type="button"
                    disabled={photoStatus === 'uploading'}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-[#6D5EF8] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#5B4DF5] transition-colors disabled:opacity-60"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={photoStatus === 'uploading'}
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-semibold text-[#6D5EF8] hover:underline disabled:opacity-60"
                  >
                    {photoStatus === 'uploading' ? 'Uploading...' : 'Change Photo'}
                  </button>
                  {photoError && <p className="text-xs text-red-500 mt-1">{photoError}</p>}
                  <p className="text-xs text-[#9CA3AF] mt-1">JPG, PNG or WebP. Max 5MB.</p>
                </div>
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
                  <textarea rows={3} value={bio} onChange={e => setBio(e.target.value.slice(0, 100))} maxLength={100} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all resize-none" />
                  <p className="text-xs text-[#9CA3AF] mt-1 text-right">{bio.length}/100</p>
                </div>
              </div>

              <button onClick={handleSaveProfile} className={`mt-6 font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-md ${saveStatus === 'saved' ? 'bg-[#10B981] text-white shadow-green-500/20' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white shadow-[#6D5EF8]/20'}`}>
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          )}

          {/* ── NOTIFICATION SETTINGS (hidden from menu; kept for later) ── */}
          {/*
          {activeTab === 'notifications' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8 space-y-8">
              ... notification UI ...
            </div>
          )}
          */}

          {/* ── DELETE / DEACTIVATE ACCOUNT ── */}
          {activeTab === 'delete-account' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8">
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800">Deactivate Account</p>
                  <p className="text-sm text-amber-700 mt-0.5">
                    Your account will be deactivated for <strong>15 days</strong>. If you log in again within 15 days, it will be reactivated. After 15 days with no login, your account and data will be permanently deleted.
                  </p>
                </div>
              </div>

              <h2 className="text-base font-bold text-[#111827] mb-4">What happens:</h2>
              <div className="space-y-2 mb-8">
                {[
                  'Your account is deactivated immediately and you will be logged out',
                  'Log in within 15 days to reactivate your account',
                  'After 15 days without login, all data is permanently deleted',
                  'Profile, tools history, and billing data will be removed after permanent deletion',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#4B5563]">
                    <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                    To confirm, type <code className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-xs font-bold">DEACTIVATE</code> below.
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => {
                      setConfirmText(e.target.value);
                      setDeactivateError('');
                      setDeactivateStatus('idle');
                    }}
                    placeholder="Type DEACTIVATE to confirm"
                    className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                  />
                </div>
                {deactivateError && (
                  <p className="text-sm text-red-600 font-medium">{deactivateError}</p>
                )}
              </div>

              <button
                onClick={handleDeactivateAccount}
                disabled={deactivateStatus === 'loading' || confirmText !== 'DEACTIVATE'}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-red-600/20"
              >
                {deactivateStatus === 'loading' ? 'Deactivating...' : 'Deactivate Account'}
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
                onClick={() => handleTabClick(tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id && !tab.href
                    ? tab.danger ? 'bg-red-50 text-red-600' : 'bg-[#EEF2FF] text-[#6D5EF8]'
                    : tab.danger ? 'text-red-500 hover:bg-red-50' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id && !tab.href ? (tab.danger ? 'text-red-600' : 'text-[#6D5EF8]') : (tab.danger ? 'text-red-400' : 'text-[#6B7280]')}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

      </div>
    </DashboardLayout>
  );
}
