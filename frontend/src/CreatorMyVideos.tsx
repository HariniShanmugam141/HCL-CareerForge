import React, { useState } from 'react';
import {
  Home, PlaySquare, PlusSquare, BarChart2, Star, Users, User, Settings, LogOut,
  Bell, ChevronDown, ChevronRight, Search, Plus, MoreVertical, ChevronLeft
} from 'lucide-react';
import { PlayCircle, Code2, BrainCircuit, Database } from 'lucide-react';

const VIDEOS = [
  { 
    id: 1, 
    title: 'Python Basics', 
    date: '12 May 2025', 
    career: 'AI/ML', 
    skill: 'Python', 
    level: 'Beginner',
    duration: '32 min', 
    status: 'Published', 
    clicks: '1,240', 
    color: 'bg-[#0f172a]', 
    icon: Code2 
  },
  { 
    id: 2, 
    title: 'ML Introduction', 
    date: '10 May 2025', 
    career: 'AI/ML', 
    skill: 'ML', 
    level: 'Beginner',
    duration: '28 min', 
    status: 'Pending', 
    clicks: '—', 
    color: 'bg-[#4f46e5]', 
    icon: BrainCircuit 
  },
  { 
    id: 3, 
    title: 'SQL Tutorial', 
    date: '05 May 2025', 
    career: 'Data Science', 
    skill: 'SQL', 
    level: 'Intermediate',
    duration: '45 min', 
    status: 'Published', 
    clicks: '760', 
    color: 'bg-[#064e3b]', 
    icon: Database 
  }
];

export default function CreatorMyVideos({ onLogout, onNavigate, userName = 'Arjun Raj' }: { onLogout?: () => void, onNavigate: (view: string) => void, userName?: string }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans text-gray-900 overflow-hidden">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} userName={userName} />
      
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative pb-12">
        <Header userName={userName} />

        <div className="px-4 sm:px-8 max-w-[1400px] mx-auto space-y-6 pb-12">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            
            {/* Top Section */}
            <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
                <div className="relative w-full sm:w-72">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search videos..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6225E6]/20 focus:border-[#6225E6] transition-all"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button className="px-4 py-2 bg-[#f4effd] text-[#6225E6] text-sm font-semibold rounded-xl border border-[#e7defa] transition-colors">All</button>
                  <button className="px-4 py-2 bg-white text-gray-600 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">Published</button>
                  <button className="px-4 py-2 bg-white text-gray-600 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">Pending</button>
                  <button className="px-4 py-2 bg-white text-gray-600 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">Rejected</button>
                  <button className="px-4 py-2 bg-white text-gray-600 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">Featured</button>
                </div>
              </div>

              <button className="bg-[#6225E6] hover:bg-[#521bca] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors shadow-sm shrink-0">
                <Plus size={18} /> Add Video
              </button>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[35%]">Video</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Career</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Skill</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Level</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Duration</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Clicks</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {VIDEOS.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5 flex items-center gap-4">
                        <div className={`w-32 h-20 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm relative overflow-hidden ${video.color}`}>
                           <div className="absolute inset-0 bg-black/20"></div>
                           <div className="relative z-10 flex flex-col items-center">
                              <video.icon size={24} className="text-white/90 mb-1" />
                              <div className="flex items-center gap-1 mt-1 text-white bg-black/50 px-2 py-0.5 rounded text-[10px] font-semibold absolute bottom-2 right-2">
                                {video.duration}
                              </div>
                           </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[15px] mb-1 group-hover:text-[#6225E6] transition-colors">{video.title}</div>
                          <div className="text-xs text-gray-500 font-medium">Uploaded on {video.date}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 font-medium">{video.career}</td>
                      <td className="px-6 py-5 text-sm text-gray-600 font-medium">{video.skill}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold
                          ${video.level === 'Beginner' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                          {video.level}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 font-medium text-center">{video.duration}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border
                          ${video.status === 'Published' 
                            ? 'bg-green-50 text-green-600 border-green-100' 
                            : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${video.status === 'Published' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                          {video.status}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1.5">{video.date}</div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-900 text-center">{video.clicks}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="px-4 py-1.5 text-sm font-semibold text-[#6225E6] border border-[#e7defa] rounded-lg hover:bg-[#f4effd] transition-colors">
                            View
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <div className="text-gray-500 font-medium">
                Showing 1 to 3 of 3 videos
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f4effd] text-[#6225E6] font-bold border border-[#e7defa]">
                  1
                </button>
                <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

function Sidebar({ onLogout, onNavigate, userName }: { onLogout?: () => void, onNavigate: (view: string) => void, userName: string }) {
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
      <div className="p-6 pb-2">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          Career<span className="text-[#6225E6]">Forge</span>
        </h1>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
          Creator Dashboard
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {[
          { name: 'Dashboard', icon: Home, view: 'dashboard' },
          { name: 'My Videos', icon: PlaySquare, active: true, view: 'creator_my_videos' },
          { name: 'Add Video', icon: PlusSquare, view: 'creator_add_video' },
          { name: 'Analytics', icon: BarChart2, view: 'creator_analytics' },
          { name: 'Promotions', icon: Star, view: 'creator_promotions' },
          { name: 'Learner Engagement', icon: Users, view: 'creator_learners' },
          { name: 'My Profile', icon: User, view: 'creator_profile' },
          { name: 'Settings', icon: Settings, view: 'creator_settings' },
        ].map(item => (
          <a 
            key={item.name} 
            href="#" 
            onClick={(e) => { e.preventDefault(); if (item.view) onNavigate(item.view); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
              ${item.active 
                ? 'bg-[#6225E6] text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <item.icon size={20} className={item.active ? 'text-white' : 'text-gray-400'} />
            {item.name}
          </a>
        ))}
        
        <div className="my-4 border-t border-gray-100"></div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>

      {/* Profile Bottom Card */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 mt-auto">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center relative mb-4">
          <div className="w-14 h-14 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center font-bold text-xl mb-3 shadow-inner">
            {initials}
          </div>
          <div className="font-bold text-gray-900">{userName}</div>
          <div className="text-xs text-gray-500 mb-4">Creator</div>
          <button className="text-xs font-semibold text-[#6225E6] bg-[#f4effd] px-4 py-1.5 rounded-full hover:bg-[#e7defa] transition-colors flex items-center gap-1">
            View Profile <ChevronRight size={14} />
          </button>
        </div>

        <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-bold text-gray-900">12 Day Streak</span>
          </div>
          <div className="text-[10px] text-gray-500 mb-3 ml-7">Keep it up! 🔥</div>
          <div className="flex justify-between items-center w-full">
            {['M','T','W','T','F','S','S'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors
                  ${i < 4 ? 'bg-[#6225E6] text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
                  {i < 4 ? '✓' : ''}
                </div>
                <span className="text-[9px] text-gray-400 font-medium">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Header({ userName }: { userName: string }) {
  const initials = userName.substring(0, 2).toUpperCase();
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 py-6 sticky top-0 bg-[#F8F9FB]/95 backdrop-blur-sm z-40 border-b border-transparent">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          My Videos
        </h2>
        <p className="text-sm text-gray-500 font-medium">Manage your submitted videos and track their performance and approval status.</p>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6225E6] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#F8F9FB]">2</span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer hover:bg-white p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center font-bold text-sm">
            {initials}
          </div>
          <div className="hidden md:block text-left">
            <div className="font-bold text-sm text-gray-900 leading-tight">{userName}</div>
            <div className="text-xs text-gray-500">Creator</div>
          </div>
          <ChevronDown size={16} className="text-gray-400 hidden md:block ml-1" />
        </div>
      </div>
    </header>
  );
}
