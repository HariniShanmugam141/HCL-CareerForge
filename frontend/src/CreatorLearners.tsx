import React, { useState } from 'react';
import {
  Home, PlaySquare, PlusSquare, BarChart2, Star, Users, User, Settings, LogOut,
  Bell, ChevronDown, ChevronRight, UserPlus, PlayCircle, CheckCircle, Clock,
  MessageSquare, ArrowUp, ArrowRight, Play, CheckCircle2, Code2, 
  Lightbulb, TrendingUp, TrendingDown, Target
} from 'lucide-react';

// --- Sidebar ---
function Sidebar({ onLogout, onNavigate, userName }: { onLogout?: () => void, onNavigate: (v: string) => void, userName: string }) {
  const initials = userName.substring(0, 2).toUpperCase();
  const NAV = [
    { name: 'Dashboard', icon: Home, view: 'dashboard' },
    { name: 'My Videos', icon: PlaySquare, view: 'creator_my_videos' },
    { name: 'Add Video', icon: PlusSquare, view: 'creator_add_video' },
    { name: 'Analytics', icon: BarChart2, view: 'creator_analytics' },
    { name: 'Promotions', icon: Star, view: 'creator_promotions' },
    { name: 'Learner Engagement', icon: Users, active: true, view: 'creator_learners' },
    { name: 'My Profile', icon: User, view: 'creator_profile' },
    { name: 'Settings', icon: Settings, view: 'creator_settings' },
  ];

  return (
    <aside className="w-[210px] bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
      <div className="p-5 pb-2">
        <h1 className="text-lg font-bold text-[#10154A] tracking-tight">
          Career<span className="text-[#5B16F5]">Forge</span>
        </h1>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Creator Dashboard</div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <a
            key={item.name}
            href="#"
            onClick={e => { e.preventDefault(); onNavigate(item.view); }}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
              ${item.active ? 'bg-gradient-to-r from-[#5B16F5] to-[#6D28F2] text-white shadow-sm' : 'text-[#10154A] hover:bg-[#F5F3FA]'}`}
          >
            <item.icon size={18} className={item.active ? 'text-white' : 'text-gray-400'} />
            {item.name}
          </a>
        ))}

        <div className="my-3 border-t border-gray-100" />
        <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      {/* Profile Card */}
      <div className="p-3 border-t border-gray-100 bg-[#F5F3FA]/50">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center text-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B16F5] to-[#6D28F2] text-white flex items-center justify-center font-bold text-lg mb-2 shadow">{initials}</div>
          <div className="font-bold text-[#10154A] text-sm">{userName}</div>
          <div className="text-[11px] text-gray-500 mb-3">Creator</div>
          <button className="text-[11px] font-semibold text-[#5B16F5] border border-[#5B16F5] bg-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#F5F3FA] transition-colors">
            View Profile <ArrowRight size={12} />
          </button>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-base">🔥</span>
            <span className="text-xs font-bold text-[#10154A]">12 Day Streak</span>
          </div>
          <div className="text-[9px] text-gray-500 mb-2.5 ml-5">Keep it up! 🔥</div>
          <div className="flex justify-between items-center">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${i < 4 ? 'bg-[#5B16F5] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {i < 4 ? '✓' : ''}
                </div>
                <span className="text-[8px] text-gray-400 font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// --- Header ---
function Header({ userName }: { userName: string }) {
  const initials = userName.substring(0, 2).toUpperCase();
  return (
    <header className="flex justify-between items-center px-8 py-6 sticky top-0 bg-[#FCFBFF]/95 backdrop-blur-sm z-40 border-b border-transparent">
      <div>
        <h2 className="text-[22px] font-bold text-[#10154A] leading-tight mb-1">Learner Engagement</h2>
        <p className="text-xs font-medium text-gray-500">Understand how learners interact with your content and track their learning journey.</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer shadow-sm">
          <span className="text-xs font-semibold text-[#10154A]">Last 30 Days</span>
          <ChevronDown size={14} className="text-gray-500" />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-gray-500 hover:text-[#10154A] transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#5B16F5] text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-[#FCFBFF]">2</span>
          </button>
          
          <div className="w-px h-6 bg-gray-200" />
          
          <div className="flex items-center gap-2.5 cursor-pointer hover:bg-white px-2 py-1 rounded-full transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5B16F5] to-[#6D28F2] text-white flex items-center justify-center font-bold text-sm">{initials}</div>
            <div className="hidden md:block text-left pr-1">
              <div className="font-bold text-sm text-[#10154A] leading-tight">{userName}</div>
              <div className="text-[11px] text-gray-500">Creator</div>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
}

// --- KPI Card ---
function KPICard({ icon: Icon, title, metric, change, subtitle }: { icon: any, title: string, metric: string, change: string, subtitle: string }) {
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5 flex items-start gap-4 flex-1 min-w-[200px]">
      <div className="w-11 h-11 rounded-full bg-[#F5F3FA] flex items-center justify-center shrink-0">
        <Icon size={20} className="text-[#5B16F5]" />
      </div>
      <div>
        <div className="text-[11px] font-bold text-[#10154A] mb-1">{title}</div>
        <div className="text-2xl font-bold text-[#10154A] leading-none mb-2">{metric}</div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-green-600 flex items-center">
            <ArrowUp size={10} className="mr-0.5" /> {change}
          </span>
        </div>
        <div className="text-[9px] font-medium text-gray-400 mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}

// --- Engagement Overview ---
function EngagementOverview() {
  const comments = [
    { initials: 'AS', name: 'Aarav Sharma', text: 'Great explanation! Can you make a video on list comprehensions?', time: '10 min ago' },
    { initials: 'PS', name: 'Priya Singh', text: 'I’m getting an error in the code at 08:45. Can you help?', time: '25 min ago' },
    { initials: 'RK', name: 'Rahul Kumar', text: 'Very helpful video! Please share more on this topic.', time: '1 hr ago' },
    { initials: 'SN', name: 'Sneha Nair', text: 'Can you explain the time complexity part again?', time: '2 hrs ago' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-base font-bold text-[#10154A] mb-1">Engagement Overview</h3>
      <p className="text-[11px] font-medium text-gray-500 mb-4">Key highlights of how learners are engaging with your content.</p>
      
      <div className="flex flex-col md:flex-row gap-5">
        {/* Unread Comments Card */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-6 md:w-1/3 flex flex-col justify-center items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#F5F3FA] flex items-center justify-center mb-4 relative">
            <MessageSquare size={24} className="text-[#5B16F5]" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-[#5B16F5] border-2 border-white rounded-full"></span>
          </div>
          <div className="text-sm font-bold text-[#10154A] mb-1">Unread Comments</div>
          <div className="text-4xl font-bold text-[#10154A] mb-2">156</div>
          <div className="text-[11px] font-medium text-gray-500 mb-6">New comments from learners</div>
          <button className="text-xs font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-5 py-2 flex items-center gap-1.5 hover:bg-[#F5F3FA] transition-colors">
            View Comments <ArrowRight size={14} />
          </button>
        </div>

        {/* Recent Unread Comments List */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-6 md:w-2/3 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-bold text-[#10154A]">Recent Unread Comments</h3>
            <button className="text-[11px] font-bold text-[#5B16F5] flex items-center gap-1 hover:underline">
              View All <ArrowRight size={12} />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {comments.map((c, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5B16F5] to-[#6D28F2] text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm mt-0.5">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[11px] font-bold text-[#10154A] truncate">{c.name}</span>
                    <span className="text-[9px] font-semibold text-gray-400 shrink-0 ml-2">{c.time}</span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-600 line-clamp-1 pr-6 relative">
                    "{c.text}"
                    <span className="absolute right-0 top-1.5 w-1.5 h-1.5 bg-[#5B16F5] rounded-full" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Videos Repeated ---
function VideosRepeated() {
  const vids = [
    { title: 'Python for Beginners', count: '2,842', time: '12:45' },
    { title: 'Data Structures Explained', count: '2,156', time: '14:30' },
    { title: 'SQL Fundamentals', count: '1,953', time: '10:28' },
    { title: 'Machine Learning Basics', count: '1,684', time: '11:52' },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-base font-bold text-[#10154A] mb-1">Videos Repeated by Learners</h3>
          <p className="text-[11px] font-medium text-gray-500">These videos are being watched multiple times by learners.</p>
        </div>
        <button className="text-xs font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-4 py-1.5 flex items-center gap-1.5 hover:bg-[#F5F3FA] transition-colors mb-1">
          View All Videos <ArrowRight size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vids.map((v, i) => (
          <div key={i} className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-4 flex flex-col h-full">
            <div className="w-full h-24 bg-gradient-to-br from-[#5B16F5] to-[#6D28F2] rounded-lg mb-4 relative flex items-center justify-center shadow-sm">
              <Play size={24} className="text-white fill-white relative z-10" />
              <div className="absolute inset-0 bg-black/10 rounded-lg" />
              <div className="absolute bottom-1.5 right-1.5 text-[8px] text-white font-bold bg-black/50 px-1 py-0.5 rounded-sm">{v.time}</div>
            </div>
            
            <h4 className="text-[11px] font-bold text-[#10154A] mb-3 line-clamp-1">{v.title}</h4>
            
            <div className="text-xl font-bold text-[#10154A] leading-none mb-1.5">{v.count}</div>
            <div className="text-[9px] font-medium text-gray-500 leading-snug mb-4">Learners repeatedly<br/>viewed this video</div>
            
            <div className="mt-auto">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-[#5B16F5] text-[9px] font-bold rounded-md w-max">
                <TrendingUp size={10} /> High Interest
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Recent Activity Table ---
function RecentActivity() {
  const acts = [
    { inits: 'AS', name: 'Aarav Sharma', actIcon: CheckCircle, actText: 'Completed Milestone', val: 'Variables in Python', time: '2 min ago', stat: 'Completed' },
    { inits: 'PS', name: 'Priya Singh', actIcon: PlayCircle, actText: 'Watched Video', val: 'Data Types in Python', time: '15 min ago', stat: 'In Progress' },
    { inits: 'RK', name: 'Rahul Kumar', actIcon: Code2, actText: 'Solved Problem', val: 'Python Basics - Question 7', time: '32 min ago', stat: 'In Progress' },
    { inits: 'SN', name: 'Sneha Nair', actIcon: CheckCircle, actText: 'Completed Milestone', val: 'Control Flow Basics', time: '1 hr ago', stat: 'Completed' },
    { inits: 'MT', name: 'Mohit Tiwari', actIcon: PlayCircle, actText: 'Watched Video', val: 'Functions in Python', time: '2 hrs ago', stat: 'In Progress' },
  ];

  return (
    <div className="mb-2">
      <h3 className="text-base font-bold text-[#10154A] mb-1">Recent Learner Activity</h3>
      <p className="text-[11px] font-medium text-gray-500 mb-4">Latest interactions from learners in your content.</p>
      
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pt-5 pb-3 pl-6 pr-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Learner</th>
              <th className="pt-5 pb-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Activity</th>
              <th className="pt-5 pb-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Milestone / Video</th>
              <th className="pt-5 pb-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Time</th>
              <th className="pt-5 pb-3 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {acts.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                <td className="py-3.5 pl-6 pr-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5B16F5] to-[#6D28F2] text-white flex items-center justify-center text-[8px] font-bold shrink-0">
                    {a.inits}
                  </div>
                  <span className="text-[11px] font-bold text-[#10154A]">{a.name}</span>
                </td>
                <td className="py-3.5 px-4 text-[11px] font-medium text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <a.actIcon size={14} className={a.actText.includes('Completed') ? 'text-green-500' : 'text-[#5B16F5]'} />
                    {a.actText}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[11px] font-bold text-[#10154A]">{a.val}</td>
                <td className="py-3.5 px-4 text-[10px] font-medium text-gray-500">{a.time}</td>
                <td className="py-3.5 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                    a.stat === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-[#5B16F5]'
                  }`}>
                    {a.stat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 flex justify-center border-t border-gray-50">
          <button className="text-[11px] font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-5 py-1.5 flex items-center gap-1.5 hover:bg-[#F5F3FA] transition-colors">
            View All Learner Activity <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Right Sidebar Sections ---
function EngagementFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const qs = [
    'How is learner engagement calculated?',
    'What is an active learner?',
    'How is completion rate measured?',
    'How often is engagement data updated?',
    'How can I increase learner engagement?'
  ];
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5">
      <h3 className="text-sm font-bold text-[#10154A] mb-4">Engagement FAQ</h3>
      <div className="space-y-1">
        {qs.map((q, i) => (
          <div key={i} className="border-b border-gray-50 last:border-0">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center py-2.5 text-left text-[11px] font-bold text-gray-600 hover:text-[#10154A] transition-colors"
            >
              <span className="pr-2">{q}</span>
              <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="pb-3 text-[10px] font-medium text-gray-400 leading-relaxed">
                Detailed information regarding {q.toLowerCase()} goes here. Data is tracked securely via CareerForge analytics engine.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Export ---
export default function CreatorLearners({ onLogout, onNavigate, userName = 'Arjun Raj' }: { onLogout?: () => void, onNavigate: (v: string) => void, userName?: string }) {
  return (
    <div className="min-h-screen bg-[#FCFBFF] flex font-sans text-gray-900 overflow-hidden">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} userName={userName} />

      <main className="flex-1 h-screen overflow-y-auto pb-12">
        <Header userName={userName} />

        <div className="px-8 max-w-[1400px] mx-auto pb-12">
          
          {/* KPI Row */}
          <div className="flex flex-wrap gap-4 mb-8">
            <KPICard icon={UserPlus} title="Total Learners" metric="18,624" change="16.3%" subtitle="vs previous 30 days" />
            <KPICard icon={PlayCircle} title="Active Learners" metric="7,842" change="14.7%" subtitle="vs previous 30 days" />
            <KPICard icon={Target} title="Completion Rate" metric="68.4%" change="8.6%" subtitle="vs previous 30 days" />
            <KPICard icon={Clock} title="Avg. Learning Time" metric="52 mins" change="12.1%" subtitle="vs previous 30 days" />
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* MAIN COLUMN */}
            <div className="flex-1 min-w-0">
              <EngagementOverview />
              <VideosRepeated />
              <RecentActivity />
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-full xl:w-[280px] shrink-0 space-y-6">
              
              {/* Engagement Summary */}
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5">
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F3FA] flex items-center justify-center shrink-0">
                    <BarChart2 size={16} className="text-[#5B16F5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#10154A] mb-0.5">Engagement Summary</h3>
                    <p className="text-[10px] font-medium text-gray-500 leading-tight">Overview of how learners are engaging with your content.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2 text-[#10154A]"><UserPlus size={14} className="text-[#5B16F5]" /> New Learners</div>
                    <div className="text-green-600 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 16.3%</div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2 text-[#10154A]"><UserPlus size={14} className="text-[#5B16F5]" /> Active Learners</div>
                    <div className="text-green-600 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 14.7%</div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2 text-[#10154A]"><Target size={14} className="text-[#5B16F5]" /> Completion Rate</div>
                    <div className="text-green-600 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 8.6%</div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2 text-[#10154A]"><MessageSquare size={14} className="text-[#5B16F5]" /> Feedback Received</div>
                    <div className="text-green-600 flex items-center"><ArrowUp size={10} className="mr-0.5" /> 19.4%</div>
                  </div>
                </div>
              </div>

              {/* Engagement Tips */}
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F3FA] flex items-center justify-center">
                    <Lightbulb size={16} className="text-[#5B16F5]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#10154A]">Engagement Tips</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded bg-[#F5F3FA] flex items-center justify-center shrink-0 mt-0.5">
                      <Target size={12} className="text-[#5B16F5]" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-600 leading-relaxed">Create more interactive content to improve completion rates.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded bg-[#F5F3FA] flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare size={12} className="text-[#5B16F5]" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-600 leading-relaxed">Encourage discussions in the comments to boost engagement.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded bg-[#F5F3FA] flex items-center justify-center shrink-0 mt-0.5">
                      <Lightbulb size={12} className="text-[#5B16F5]" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-600 leading-relaxed">Break down complex topics into shorter, focused videos.</p>
                  </div>
                </div>
              </div>

              <EngagementFAQ />

            </div>
          </div>
          
          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] font-medium text-gray-400 mt-8 border-t border-gray-100">
            <div>© 2025 CareerForge. Empowering creators. Elevating learning.</div>
            <div className="mt-1 sm:mt-0">Connecting creators with learners. ✨</div>
          </div>

        </div>
      </main>
    </div>
  );
}
