'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, Calendar, Activity, ShieldCheck, ChevronLeft, Download, Crown, Search } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/contexts/ToastContext';
import { getEndpoint } from '@/lib/api';

interface AdminStats {
  totalUsers: number;
  newUsers: number;
  usersToday: number;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  plan: string;
  credits: number;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminUsersPage() {
  const { user, isLoading } = useAuth();
  const { error } = useToast();
  const router = useRouter();
  
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingData, setLoadingData] = useState(true);

  // Security Check
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/');
      } else if (user.email !== 'skjainoddin39854@gmail.com') {
        error('Unauthorized access');
        router.replace('/dashboard');
      }
    }
  }, [user, isLoading, router]);

  // Fetch Data
  useEffect(() => {
    if (user?.email === 'skjainoddin39854@gmail.com') {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const res = await fetch(getEndpoint('/api/admin/users'), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStats(data.stats);
        setUsers(data.users);
      } else {
        error('Failed to load admin data');
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      error('Server error');
    } finally {
      setLoadingData(false);
    }
  };

  const handleExportCSV = () => {
    if (users.length === 0) {
      error('No users to export');
      return;
    }

    const headers = ['Name', 'Email', 'Plan', 'Credits', 'Joined Date'];
    const rows = users.map(u => [
      `"${u.name.replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.plan}"`,
      u.credits,
      `"${new Date(u.createdAt).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `quicktools_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#6D5EF8] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!user || user.email !== 'skjainoddin39854@gmail.com') {
    return null; // Don't render anything while redirecting
  }

  // Filter users based on search
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/dashboard" className="p-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors">
                <ChevronLeft className="w-5 h-5 text-[#4B5563]" />
              </Link>
              <div className="flex items-center gap-2 px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
              </div>
            </div>
            <h1 className="text-3xl font-black text-[#111827]">User Management</h1>
            <p className="text-[#6B7280] text-sm mt-1">Overview of all registered users on QuickTools.ai</p>
          </div>
          
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#4B5563] hover:bg-[#F9FAFB] shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-1">Total Users</p>
                <h3 className="text-4xl font-black text-[#111827]">{stats?.totalUsers || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-1">New Users (7 Days)</p>
                <h3 className="text-4xl font-black text-[#111827]">{stats?.newUsers || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-fuchsia-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-1">Joined Today</p>
                <h3 className="text-4xl font-black text-[#111827]">{stats?.usersToday || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-fuchsia-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] shadow-sm overflow-hidden">
          
          {/* Table Header/Toolbar */}
          <div className="p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F9FAFB]">
            <h2 className="text-lg font-bold text-[#111827]">All Registered Users</h2>
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#9CA3AF]" />
              </div>
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#E5E7EB]">
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-center">Plan</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-right">Credits Balance</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-right">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F9FAFB] transition-colors">
                    
                    {/* User Profile */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D5EF8] to-fuchsia-500 flex items-center justify-center text-white font-bold shrink-0">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#111827]">{u.name}</p>
                          <p className="text-xs text-[#6B7280]">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1.5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          u.plan === 'pro' ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]' :
                          u.plan === 'business' ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]' :
                          u.plan === 'starter' ? 'bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]' :
                          'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]'
                        }`}>
                          {u.plan === 'pro' || u.plan === 'business' ? <Crown className="w-3.5 h-3.5" /> : null}
                          {u.plan}
                        </div>
                        {u.plan !== 'free' && u.updatedAt && (
                          <div className="text-[10px] text-[#9CA3AF] font-semibold uppercase tracking-wide">
                            Since {new Date(u.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-black text-[#111827]">{u.credits.toLocaleString()}</span>
                      <span className="text-xs text-[#9CA3AF] ml-1">cr</span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-sm font-medium text-[#4B5563]">
                        <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                        {new Date(u.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                        {new Date(u.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </td>

                  </tr>
                ))}
                
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-[#6B7280]">
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB] text-xs text-center text-[#9CA3AF] font-medium">
            Showing {filteredUsers.length} of {stats?.totalUsers || 0} users
          </div>
        </div>

      </div>
    </div>
  );
}
