'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;

interface Issue {
  _id: string;
  url: string;
  pageType: string;
  issueType: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  lastDetectedAt: string;
  status: 'open' | 'fixed' | 'ignored';
}

interface Summary {
  bySeverity: { _id: string; count: number }[];
  byPageType: { _id: string; count: number }[];
  fixedCount: number;
  total: number;
}

const FILTERS = ['All', 'Tool', 'Blog', 'Article', 'Learn', 'Community'];
const SEVERITY_COLORS = {
  critical: 'bg-red-100 text-red-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
};

export default function SeoDashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('open');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  const fetchData = async (pageType = 'All', status = 'open') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status });
      if (pageType !== 'All') params.set('pageType', pageType);

      const [summaryRes, issuesRes] = await Promise.all([
        fetch(`${API}/api/admin/seo/summary`, { credentials: 'include' }),
        fetch(`${API}/api/admin/seo/issues?${params}`, { credentials: 'include' }),
      ]);

      if (summaryRes.status === 401 || summaryRes.status === 403) {
        setAuthError(true);
        return;
      }

      setSummary(await summaryRes.json());
      const data = await issuesRes.json();
      setIssues(data.issues || []);
    } catch (e) {
      console.error('SEO Dashboard fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(filter, statusFilter); }, [filter, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(`${API}/api/admin/seo/issues/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData(filter, statusFilter);
  };

  const handleRecheck = async (id: string) => {
    await fetch(`${API}/api/admin/seo/issues/${id}/recheck`, {
      method: 'POST',
      credentials: 'include',
    });
    alert('Recheck started! Results will appear in next audit cycle.');
  };

  if (authError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-4">Admin access only. Please login with an admin account.</p>
          <button onClick={() => router.push('/login')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Go to Login</button>
        </div>
      </div>
    );
  }

  const critical = summary?.bySeverity.find(b => b._id === 'critical')?.count ?? 0;
  const warning = summary?.bySeverity.find(b => b._id === 'warning')?.count ?? 0;
  const info = summary?.bySeverity.find(b => b._id === 'info')?.count ?? 0;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Health Dashboard</h1>
          <p className="text-gray-500 mt-1">Live audit data from {summary?.total ?? '—'} open issues.</p>
        </div>
        <button
          onClick={() => fetchData(filter, statusFilter)}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Critical', count: critical, color: 'border-red-200 text-red-600' },
          { label: 'Warnings', count: warning, color: 'border-amber-200 text-amber-600' },
          { label: 'Info', count: info, color: 'border-blue-200 text-blue-600' },
          { label: 'Fixed', count: summary?.fixedCount ?? 0, color: 'border-emerald-200 text-emerald-600' },
        ].map(card => (
          <div key={card.label} className={`bg-white p-5 rounded-xl shadow-sm border ${card.color} flex flex-col`}>
            <span className={`text-sm font-medium ${card.color.split(' ')[1]}`}>{card.label}</span>
            <span className="text-4xl font-bold text-gray-900 mt-1">{loading ? '…' : card.count}</span>
          </div>
        ))}
      </div>

      {/* Page-type Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {['open', 'fixed', 'ignored'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${statusFilter === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading audit data…</div>
        ) : issues.length === 0 ? (
          <div className="p-12 text-center text-gray-400">✅ No issues found for this filter.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-800 font-semibold text-xs uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3">URL</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Issue</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Last Detected</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {issues.map(issue => (
                <tr key={issue._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 max-w-xs truncate font-medium text-indigo-600">
                    <a href={issue.url} target="_blank" rel="noreferrer">{issue.url.replace('https://quicktool.space', '')}</a>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">{issue.pageType}</td>
                  <td className="px-5 py-3">
                    <div className="font-medium text-gray-900 text-xs">{issue.issueType.replace(/_/g, ' ')}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{issue.message.slice(0, 60)}…</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${SEVERITY_COLORS[issue.severity]}`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">
                    {new Date(issue.lastDetectedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleRecheck(issue._id)} className="text-indigo-500 hover:text-indigo-800 text-xs font-medium">Recheck</button>
                      {issue.status !== 'fixed' && (
                        <button onClick={() => handleStatusChange(issue._id, 'fixed')} className="text-emerald-500 hover:text-emerald-800 text-xs font-medium">Fix</button>
                      )}
                      {issue.status !== 'ignored' && (
                        <button onClick={() => handleStatusChange(issue._id, 'ignored')} className="text-gray-400 hover:text-gray-600 text-xs font-medium">Ignore</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
