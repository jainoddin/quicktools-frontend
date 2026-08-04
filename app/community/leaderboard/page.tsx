'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Trophy, Medal, Star, Shield, Zap, Flame, Loader2 } from 'lucide-react';
import { getEndpoint } from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';

export default function LeaderboardPage() {
  const { user: authUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getEndpoint('/api/community/leaderboard'), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setLeaderboard(res.data.leaderboard);
          setCurrentUser(res.data.currentUser);
        }
        setLoading(false);
      });
  }, []);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-300 to-yellow-500 text-yellow-900 border-yellow-200';
      case 2: return 'from-gray-300 to-gray-400 text-gray-800 border-gray-200';
      case 3: return 'from-amber-500 to-orange-700 text-amber-50 border-orange-300';
      default: return 'from-[#2A2B36] to-[#1E1F29] text-gray-300 border-gray-700';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-900" />;
      case 2: return <Medal className="w-5 h-5 text-gray-800" />;
      case 3: return <Trophy className="w-5 h-5 text-amber-50" />;
      default: return <span className="font-bold">{rank}</span>;
    }
  };

  const calculateProgress = (xp: number) => {
    // Current level requires Level * 1000 XP total?
    // Wait, level is Math.floor(xp/1000) or 1.
    const level = Math.max(1, Math.floor(xp / 1000));
    const nextLevelXp = (level + 1) * 1000;
    const prevLevelXp = level * 1000;
    const progress = Math.max(0, Math.min(100, ((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100));
    return progress;
  };

  const calculateNextLevelXp = (xp: number) => {
    const level = Math.max(1, Math.floor(xp / 1000));
    return (level + 1) * 1000;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#0B0F19] min-h-screen rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl ring-1 ring-white/10">
      {/* Decorative Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4F46E5]/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7C3AED]/20 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-4 ring-1 ring-white/10">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Top Contributors</h1>
          <p className="text-gray-400">Help the community, earn XP, and unlock exclusive badges.</p>
        </div>

        {/* Current User Card */}
        {currentUser && (
          <div className="bg-gradient-to-r from-[#1A1E2E] to-[#121520] rounded-2xl p-6 mb-8 ring-1 ring-[#4F46E5]/50 flex flex-col md:flex-row items-center gap-6 justify-between shadow-xl shadow-[#4F46E5]/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#4F46E5]">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#4F46E5] flex items-center justify-center text-xl font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-amber-600 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[#1A1E2E]">
                  Lvl {currentUser.level}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{currentUser.name}</h3>
                <div className="text-sm text-gray-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 
                  Rank #{currentUser.rank}
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-md w-full">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-300">XP Progress</span>
                <span className="text-[#4F46E5] font-bold">{(currentUser.xp || 0).toLocaleString()} / {calculateNextLevelXp(currentUser.xp || 0).toLocaleString()} XP</span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] rounded-full relative"
                  style={{ width: `${calculateProgress(currentUser.xp || 0)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-[#121520]/80 backdrop-blur-xl rounded-2xl ring-1 ring-white/10 overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_100px_100px] md:grid-cols-[80px_1fr_120px_120px] gap-4 p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/5">
            <div className="text-center">Rank</div>
            <div>User</div>
            <div className="text-center">Level</div>
            <div className="text-right pr-4">XP</div>
          </div>

          <div className="flex flex-col">
            {leaderboard.map((user, idx) => {
              const rank = idx + 1;
              const style = getRankStyle(rank);
              const isTop3 = rank <= 3;
              
              return (
                <div 
                  key={user._id}
                  className={`grid grid-cols-[60px_1fr_100px_100px] md:grid-cols-[80px_1fr_120px_120px] gap-4 p-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors ${
                    currentUser?._id === user._id ? 'bg-[#4F46E5]/10' : ''
                  }`}
                >
                  <div className="flex justify-center">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${style} border ring-2 ring-transparent shadow-lg`}>
                      {getRankIcon(rank)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10 hidden md:block">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#2A2B36] flex items-center justify-center text-sm font-bold text-gray-400">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-sm md:text-base text-gray-200 truncate flex items-center gap-2">
                        {user.name}
                        {user.role === 'admin' && <Shield className="w-3.5 h-3.5 text-[#4F46E5]" />}
                        {isTop3 && <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />}
                      </div>
                      {user.badges && user.badges.length > 0 && (
                        <div className="text-xs text-[#4F46E5] truncate mt-0.5 font-medium">
                          {user.badges[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-white/5 text-xs font-bold text-gray-300 ring-1 ring-white/10">
                      Lvl {user.level || 1}
                    </span>
                  </div>

                  <div className="text-right pr-4 font-mono font-bold text-sm text-[#0EA5E9]">
                    {(user.xp || 0).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
