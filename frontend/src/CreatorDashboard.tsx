import React, { useState } from 'react';
import {
  Home, PlaySquare, PlusSquare, BarChart2, Star, Users, User, Settings, LogOut,
  Bell, ChevronDown, Video, MousePointerClick, Users as UsersIcon, Award,
  ChevronRight, ArrowUpRight, ArrowDownRight, MoreHorizontal, Play, CheckCircle2,
  Clock, Circle, Loader2, PlayCircle, Code2, BrainCircuit, Database, Network
} from 'lucide-react';

// --- MOCK DATA ---
const KPIS = [
  { id: 1, title: 'Videos Published', value: '8', subtitle: 'Total Videos', icon: Video, color: 'bg-purple-100 text-purple-600 fill-purple-600', trend: '+2' },
  { id: 2, title: 'Total Clicks', value: '5,240', subtitle: 'All Time', icon: MousePointerClick, color: 'bg-green-100 text-green-600 fill-green-600', trend: '+12.4%' },
  { id: 3, title: 'Unique Learners', value: '3,820', subtitle: 'All Time', icon: UsersIcon, color: 'bg-blue-100 text-blue-600 fill-blue-600', trend: '+8.1%' },
  { id: 4, title: 'Featured Videos', value: '3', subtitle: 'On Platform', icon: Star, color: 'bg-orange-100 text-orange-500 fill-orange-500', trend: '+1' },
];

const TOP_VIDEOS = [
  { id: 1, title: 'Python for Beginners', duration: '32:15', career: 'AI/ML', skill: 'Python', clicks: '1,240', status: 'Published', color: 'bg-[#6225E6]', icon: Code2 },
  { id: 2, title: 'Machine Learning Basics', duration: '28:40', career: 'AI/ML', skill: 'ML', clicks: '980', status: 'Published', color: 'bg-blue-600', icon: BrainCircuit },
  { id: 3, title: 'SQL Complete Guide', duration: '45:20', career: 'Data Science', skill: 'SQL', clicks: '760', status: 'Published', color: 'bg-indigo-600', icon: Database },
  { id: 4, title: 'DSA Interview Questions', duration: '35:10', career: 'Software Dev', skill: 'DSA', clicks: '640', status: 'Published', color: 'bg-slate-800', icon: Network },
];

const PERFORMANCE_METRICS = [
  { title: 'Total Clicks', value: '5,240', trend: '+12.4%', isPositive: true },
  { title: 'Learner Interactions', value: '3,120', trend: '+8.7%', isPositive: true },
  { title: 'Avg. Watch Time', value: '24m 36s', trend: '+5.3%', isPositive: true },
  { title: 'Featured Performance', value: '1,860', trend: '+15.6%', isPositive: true },
];

const CAREER_BREAKDOWN = [
  { name: 'AI/ML', value: 42, color: 'bg-[#6225E6]' },
  { name: 'Data Science', value: 28, color: 'bg-blue-500' },
  { name: 'Software Development', value: 20, color: 'bg-indigo-400' },
  { name: 'Cybersecurity', value: 10, color: 'bg-purple-300' },
];

const SKILL_BREAKDOWN = [
  { name: 'Python', value: 40 },
  { name: 'Machine Learning', value: 28 },
  { name: 'SQL', value: 18 },
  { name: 'DSA', value: 14 },
];

const POPULAR_SKILLS = [
  { name: 'Python', value: 65 },
  { name: 'Machine Learning', value: 50 },
  { name: 'SQL', value: 40 },
  { name: 'DSA', value: 30 },
];

const APPROVAL_WORKFLOW = [
  { id: 1, title: 'Submitted', status: 'Completed', state: 'completed' },
  { id: 2, title: 'Admin Review', status: 'In Progress', state: 'progress' },
  { id: 3, title: 'Approved / Rejected', status: 'Pending', state: 'pending' },
  { id: 4, title: 'Skill Mapping', status: 'Pending', state: 'pending' },
  { id: 5, title: 'Published', status: 'Pending', state: 'pending' },
];

// --- COMPONENTS ---

export default function CreatorDashboard({ onLogout, onNavigate, userName = 'Arjun Raj' }: { onLogout?: () => void, onNavigate?: (view: string) => void, userName?: string }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans text-gray-900 overflow-hidden">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} userName={userName} />
      
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative pb-12">
        <Header userName={userName} />

        <div className="px-4 sm:px-8 max-w-[1400px] mx-auto space-y-6 pb-12">
          {/* 1. KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {KPIS.map(kpi => <KpiCard key={kpi.id} kpi={kpi} />)}
          </div>

          {/* 2. TOP PERFORMING VIDEOS */}
          <TopPerformingVideos />

          {/* 3. CONTENT PERFORMANCE */}
          <ContentPerformance />

          {/* 4. LEARNER ENGAGEMENT + APPROVAL STATUS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <LearnerEngagement />
            </div>
            <div className="xl:col-span-1">
              <ApprovalStatus />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Sidebar({ onLogout, onNavigate, userName }: { onLogout?: () => void, onNavigate?: (view: string) => void, userName: string }) {
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
          { name: 'Dashboard', icon: Home, active: true, view: 'dashboard' },
          { name: 'My Videos', icon: PlaySquare, view: 'creator_my_videos' },
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
            onClick={(e) => { e.preventDefault(); if (item.view && onNavigate) onNavigate(item.view); }}
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
          Welcome back, <span className="text-[#6225E6]">Creator!</span> 👋
        </h2>
        <p className="text-sm text-gray-500 font-medium">Share your knowledge and help learners build the skills they need for their careers.</p>
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

function KpiCard({ kpi }: { kpi: any }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${kpi.color}`}>
        <kpi.icon size={28} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{kpi.title}</div>
        </div>
        <div className="text-2xl font-bold text-gray-900 leading-none mb-1">{kpi.value}</div>
        <div className="text-[11px] font-medium text-gray-400">{kpi.subtitle}</div>
      </div>
    </div>
  );
}

function TopPerformingVideos() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Top Performing Videos</h3>
        <button className="text-sm font-bold text-[#6225E6] flex items-center gap-1 hover:underline">
          View All Videos <ArrowUpRight size={16} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[40%]">Video</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Career</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Skill</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {TOP_VIDEOS.map((video) => (
              <tr key={video.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className={`w-24 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm relative overflow-hidden ${video.color}`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-[10px] font-bold text-white text-center leading-tight px-2 break-words max-w-full">
                        {video.title.length > 20 ? video.title.substring(0, 20) + '...' : video.title}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-white/90">
                        <PlayCircle size={10} className="fill-white" />
                        <span className="text-[9px] font-semibold">{video.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 text-sm group-hover:text-[#6225E6] transition-colors">{video.title}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{video.career}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{video.skill}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{video.clicks}</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                    {video.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentPerformance() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-bold text-gray-900">Content Performance</h3>
        
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 text-xs font-semibold">
          <button className="px-3 py-1.5 bg-white text-[#6225E6] rounded-md shadow-sm border border-gray-100">Last 7 Days</button>
          <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700">Last 30 Days</button>
          <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700">Last 3 Months</button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Metrics */}
        <div className="lg:col-span-1 flex flex-col justify-between space-y-4">
          {PERFORMANCE_METRICS.map((metric, i) => (
            <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50/30 flex justify-between items-center">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.title}</div>
                <div className="text-xl font-bold text-gray-900">{metric.value}</div>
              </div>
              <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md flex items-center gap-1 border border-green-100">
                <ArrowUpRight size={12} /> {metric.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Graph */}
        <div className="lg:col-span-2 flex flex-col justify-end">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-gray-900">Engagement Over Time</h4>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-gray-600"><span className="w-2 h-2 rounded-full bg-[#6225E6]"></span> Video Clicks</div>
              <div className="flex items-center gap-1.5 text-gray-600"><span className="w-2 h-2 rounded-full bg-green-500"></span> Learner Interactions</div>
            </div>
          </div>
          
          <div className="w-full h-[180px] relative flex items-end pt-4 pb-6 px-4 mt-2">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6 text-[10px] font-medium text-gray-400">
              {['750', '600', '450', '300', '150', '0'].map((label, i) => (
                <div key={i} className="flex items-center gap-3 w-full">
                  <span className="w-6 text-right shrink-0">{label}</span>
                  <div className="flex-1 border-b border-gray-100/80 border-dashed"></div>
                </div>
              ))}
            </div>
            
            {/* Mock Graph Lines */}
            <div className="absolute inset-0 ml-12 mb-6 mt-4 flex items-end">
               <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                 {/* Purple Line - Video Clicks */}
                 <polyline points="0,80 15,60 30,70 50,40 65,50 85,20 100,10" fill="none" stroke="#6225E6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                 {/* Green Line - Learner Interactions */}
                 <polyline points="0,90 15,75 30,80 50,65 65,70 85,50 100,45" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-12 right-0 flex justify-between text-[10px] font-semibold text-gray-400 px-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Top Career */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-6">Top Career</h4>
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-full border-[12px] border-gray-100 relative shrink-0">
               {/* Simplified mock donut chart representation */}
               <div className="absolute inset-0 rounded-full border-[12px] border-[#6225E6] border-t-transparent border-l-transparent transform rotate-45"></div>
               <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-r-transparent border-b-transparent transform -rotate-15"></div>
            </div>
            <div className="space-y-3 flex-1">
              {CAREER_BREAKDOWN.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 font-medium text-gray-600">
                    <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                    {item.name}
                  </div>
                  <span className="font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Top Skills */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-4">Top Skills</h4>
          <div className="space-y-4">
            {SKILL_BREAKDOWN.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-900">{skill.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#6225E6] h-full rounded-full" style={{ width: `${skill.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function LearnerEngagement() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-full">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Learner Engagement Overview</h3>
      </div>
      <div className="p-6">
        
        {/* Top Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <UsersIcon size={12} className="text-[#6225E6]" /> Total Learners
            </div>
            <div className="text-xl font-bold text-gray-900">5,240</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User size={12} className="text-green-500" /> Unique Learners
            </div>
            <div className="text-xl font-bold text-gray-900">3,820</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MousePointerClick size={12} className="text-blue-500" /> Video Clicks
            </div>
            <div className="text-xl font-bold text-gray-900">5,240</div>
          </div>
          <div className="col-span-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Most Viewed Video</div>
            <div className="text-sm font-bold text-gray-900 truncate flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                <Play size={12} className="fill-current" />
              </div>
              Python for Beginners
            </div>
          </div>
        </div>
        
        {/* Popular Skills bars */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-4">Popular Skills</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {POPULAR_SKILLS.map((skill, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-32 text-xs font-semibold text-gray-700 truncate shrink-0">{skill.name}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden flex">
                  <div className="bg-[#6225E6] h-full rounded-full" style={{ width: `${skill.value}%` }}></div>
                </div>
                <div className="w-8 text-right text-xs font-bold text-gray-900 shrink-0">{skill.value}%</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function ApprovalStatus() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Approval Status</h3>
        <button className="text-xs font-bold text-[#6225E6] flex items-center gap-1 hover:underline">
          View All <ArrowUpRight size={14} />
        </button>
      </div>
      <div className="p-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gray-100 z-0"></div>
          
          <div className="space-y-6 relative z-10">
            {APPROVAL_WORKFLOW.map((step, i) => {
              const isCompleted = step.state === 'completed';
              const isProgress = step.state === 'progress';
              
              return (
                <div key={step.id} className="flex gap-4">
                  <div className="shrink-0 bg-white py-1">
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                        <CheckCircle2 size={14} />
                      </div>
                    ) : isProgress ? (
                      <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-200 text-orange-500 flex items-center justify-center shadow-sm">
                        <Loader2 size={12} className="animate-spin" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-gray-400 flex items-center justify-center">
                        <Circle size={10} />
                      </div>
                    )}
                  </div>
                  <div className="pt-1.5 pb-2">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'text-gray-900' : isProgress ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap
                        ${isCompleted ? 'bg-green-50 text-green-600 border border-green-100' : 
                          isProgress ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                          'bg-gray-50 text-gray-500 border border-gray-100'}`}
                      >
                        {step.status} {isCompleted && '✓'}
                      </span>
                    </div>
                    {i === 0 && <p className="text-[11px] text-gray-500 font-medium">Your video has been submitted successfully.</p>}
                    {i === 1 && <p className="text-[11px] text-gray-500 font-medium">Your video is under review by admin.</p>}
                    {i === 2 && <p className="text-[11px] text-gray-400">Admin will approve or reject your video.</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
