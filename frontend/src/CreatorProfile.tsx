import React, { useState } from 'react';
import {
  Home, PlaySquare, PlusSquare, BarChart2, Star, Users, User, Settings, LogOut,
  Bell, ChevronDown, ChevronRight, Video, Eye, MousePointerClick, Heart,
  MapPin, Link as LinkIcon, Mail, Calendar, Edit2, Play, Camera,
  CheckCircle2, Circle, Lightbulb, Youtube, Linkedin, Twitter, Github, Check
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
    { name: 'Learner Engagement', icon: Users, view: 'creator_learners' },
    { name: 'My Profile', icon: User, active: true, view: 'creator_profile' },
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
            View Profile <ChevronRight size={12} />
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
        <h2 className="text-[22px] font-bold text-[#10154A] leading-tight mb-1">My Profile</h2>
        <p className="text-xs font-medium text-gray-500">Manage your creator profile, settings and track your performance.</p>
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
    </header>
  );
}

// --- Profile Header Card ---
function ProfileHeader({ userName }: { userName: string }) {
  const initials = userName.substring(0, 2).toUpperCase();
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#5B16F5] to-[#6D28F2] text-white flex items-center justify-center font-bold text-4xl shadow-md">
            {initials}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center text-[#5B16F5] hover:bg-gray-50 transition-colors">
            <Camera size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#10154A]">{userName}</h1>
            <span className="px-2.5 py-1 bg-purple-50 text-[#5B16F5] text-[10px] font-bold rounded-md">Creator</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <User size={14} className="text-gray-400" />
            Educational Content Creator
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-1.5"><MapPin size={12} className="text-gray-400" /> Bangalore, India</div>
            <div className="flex items-center gap-1.5 text-[#5B16F5] hover:underline cursor-pointer"><LinkIcon size={12} /> youtube.com/@arjunraj</div>
            <div className="flex items-center gap-1.5"><Mail size={12} className="text-gray-400" /> arjunraj@example.com</div>
            <div className="flex items-center gap-1.5"><Calendar size={12} className="text-gray-400" /> Joined CareerForge on Jan 15, 2024</div>
          </div>
        </div>
      </div>
      
      <button className="text-xs font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-5 py-2 flex items-center gap-2 hover:bg-[#F5F3FA] transition-colors shrink-0">
        Edit Profile <Edit2 size={12} />
      </button>
    </div>
  );
}

// --- Tabs ---
function ProfileTabs() {
  const tabs = ['Overview', 'Channel & Links', 'Expertise', 'Achievements', 'Settings', 'Payment Info'];
  return (
    <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar px-2">
      {tabs.map((t, i) => (
        <button
          key={t}
          className={`pb-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${i === 0 ? 'border-[#5B16F5] text-[#5B16F5]' : 'border-transparent text-gray-500 hover:text-[#10154A]'}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// --- KPI Card ---
function StatCard({ icon: Icon, title, metric, subtitle, subColor = 'text-gray-400' }: { icon: any, title: string, metric: string, subtitle: string, subColor?: string }) {
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5 flex-1 min-w-[150px] flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#F5F3FA] flex items-center justify-center mb-3">
        <Icon size={20} className="text-[#5B16F5]" />
      </div>
      <div className="text-[11px] font-bold text-[#10154A] mb-1">{title}</div>
      <div className="text-2xl font-bold text-[#10154A] leading-none mb-2">{metric}</div>
      <div className={`text-[10px] font-bold ${subColor}`}>{subtitle}</div>
    </div>
  );
}

// --- About & Skills ---
function AboutAndSkills() {
  const skills = [
    { name: 'Python', icon: '🐍' },
    { name: 'Data Structures', icon: '🗂️' },
    { name: 'Algorithms', icon: '🔄' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'Machine Learning', icon: '🤖' },
    { name: 'Web Development', icon: '🌐' },
    { name: 'Problem Solving', icon: '🧩' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      {/* About Me */}
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-6 flex-1">
        <h3 className="text-sm font-bold text-[#10154A] mb-3">About Me</h3>
        <p className="text-[11px] font-medium text-gray-500 leading-relaxed mb-6">
          Passionate about making complex programming concepts simple and easy to understand. I create video tutorials on Python, Data Structures, Algorithms, and Software Development to help learners build strong fundamentals and achieve their career goals.
        </p>
        <button className="text-xs font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-4 py-1.5 hover:bg-[#F5F3FA] transition-colors">
          Edit About Me
        </button>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-bold text-[#10154A]">Top Skills & Expertise</h3>
          <button className="text-[11px] font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-3 py-1 hover:bg-[#F5F3FA] transition-colors">
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F3FA] rounded-md text-[11px] font-bold text-[#5B16F5]">
              <span>{s.icon}</span> {s.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Recent Videos Table ---
function RecentVideos() {
  const vids = [
    { title: 'Python for Beginners', career: 'Software Developer', skill: 'Python', dur: '12:45', added: 'May 21, 2025' },
    { title: 'Data Structures Explained', career: 'Software Developer', skill: 'Data Structures', dur: '14:30', added: 'May 18, 2025' },
    { title: 'SQL Fundamentals', career: 'Data Analyst', skill: 'SQL', dur: '10:28', added: 'May 15, 2025' },
    { title: 'Machine Learning Basics', career: 'AI/ML Engineer', skill: 'Machine Learning', dur: '16:52', added: 'May 12, 2025' },
  ];

  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-6 mb-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-base font-bold text-[#10154A] mb-1">Recent Videos</h3>
          <p className="text-[11px] font-medium text-gray-500">Your most recently added and approved videos.</p>
        </div>
        <button className="text-xs font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-4 py-1.5 flex items-center gap-1.5 hover:bg-[#F5F3FA] transition-colors mb-1">
          View All Videos <ChevronRight size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 pr-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Video</th>
              <th className="pb-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Career</th>
              <th className="pb-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Skill</th>
              <th className="pb-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</th>
              <th className="pb-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="pb-3 pl-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Added On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/80">
            {vids.map((v, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 pr-4 flex items-center gap-3">
                  <div className="w-10 h-6 bg-[#5B16F5] rounded flex items-center justify-center shrink-0 relative overflow-hidden shadow-sm">
                    <Play size={10} className="text-white fill-white relative z-10" />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-0 right-0.5 text-[6px] text-white font-bold bg-black/50 px-0.5 rounded-sm">{v.dur}</div>
                  </div>
                  <div className="text-xs font-bold text-[#10154A] whitespace-nowrap">{v.title}</div>
                </td>
                <td className="py-3 px-4 text-[11px] font-medium text-gray-600 whitespace-nowrap">{v.career}</td>
                <td className="py-3 px-4 text-[11px] font-medium text-gray-600 whitespace-nowrap">{v.skill}</td>
                <td className="py-3 px-4 text-[11px] font-medium text-gray-600 whitespace-nowrap">{v.dur}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-600">
                    Approved
                  </span>
                </td>
                <td className="py-3 pl-4 text-[11px] font-medium text-gray-500 whitespace-nowrap">{v.added}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Social Links ---
function SocialLinks() {
  const links = [
    { name: 'YouTube', url: 'youtube.com/@arjunraj', icon: Youtube },
    { name: 'LinkedIn', url: 'linkedin.com/in/arjunraj', icon: Linkedin },
    { name: 'X', url: 'x.com/arjunraj', icon: Twitter },
    { name: 'GitHub', url: 'github.com/arjunraj', icon: Github },
  ];

  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-6 mb-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-base font-bold text-[#10154A] mb-1">Social Links</h3>
          <p className="text-[11px] font-medium text-gray-500">Connect your social media and other platforms.</p>
        </div>
        <button className="text-[11px] font-semibold text-[#5B16F5] border border-[#5B16F5] rounded-full px-4 py-1.5 hover:bg-[#F5F3FA] transition-colors mb-1">
          Edit Links
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {links.map((l, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors cursor-pointer bg-gray-50/50">
            <l.icon size={16} className="text-[#10154A]" />
            <div>
              <div className="text-[9px] font-bold text-gray-400 leading-tight">{l.name}</div>
              <div className="text-[11px] font-bold text-[#10154A]">{l.url}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Right Sidebar ---
function ProfileCompletion() {
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5">
      <h3 className="text-sm font-bold text-[#10154A] mb-1">Profile Completion</h3>
      <p className="text-[10px] font-medium text-gray-500 leading-tight mb-6">Complete your profile to increase trust and reach more learners.</p>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#5B16F5]"
              strokeWidth="4"
              strokeDasharray="85, 100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-xl font-bold text-[#10154A]">85%</div>
            <div className="text-[8px] font-bold text-gray-500 uppercase">Complete</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { text: 'Profile Information', done: true },
          { text: 'About You', done: true },
          { text: 'Expertise Added', done: true },
          { text: 'Social Links Added', done: true },
          { text: 'Profile Picture', done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {item.done ? (
              <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Check size={10} className="text-green-500" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full border-[1.5px] border-[#5B16F5]/40 flex items-center justify-center shrink-0" />
            )}
            <span className={`text-[11px] font-bold ${item.done ? 'text-gray-600' : 'text-[#10154A]'}`}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreatorTips() {
  const tips = [
    { text: 'Add more skills to help learners discover your content.', icon: Lightbulb },
    { text: 'Keep your channel links updated to build trust.', icon: LinkIcon },
    { text: 'Upload high-quality videos consistently.', icon: Video },
    { text: 'Engage with learners through comments and discussions.', icon: MessageSquare },
  ];

  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5">
      <h3 className="text-sm font-bold text-[#10154A] mb-4">Creator Tips</h3>
      <div className="space-y-4">
        {tips.map((t, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-7 h-7 rounded bg-[#F5F3FA] flex items-center justify-center shrink-0 mt-0.5">
              <t.icon size={12} className="text-[#5B16F5]" />
            </div>
            <p className="text-[10px] font-bold text-gray-600 leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const qs = [
    'How is my profile visible to learners?',
    'How do profile updates help me?',
    'What information should I add?',
    'How does profile completion work?',
    'Can I change my display name?'
  ];
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] p-5">
      <h3 className="text-sm font-bold text-[#10154A] mb-4">Profile FAQ</h3>
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
                Detailed information regarding {q.toLowerCase()} goes here. Profile data is visible across CareerForge.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Export ---
export default function CreatorProfile({ onLogout, onNavigate, userName = 'Arjun Raj' }: { onLogout?: () => void, onNavigate: (v: string) => void, userName?: string }) {
  return (
    <div className="min-h-screen bg-[#FCFBFF] flex font-sans text-gray-900 overflow-hidden">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} userName={userName} />

      <main className="flex-1 h-screen overflow-y-auto pb-12">
        <Header userName={userName} />

        <div className="px-8 max-w-[1400px] mx-auto pb-12 mt-6">
          
          <div className="flex flex-col xl:flex-row gap-8">
            {/* MAIN COLUMN */}
            <div className="flex-1 min-w-0">
              <ProfileHeader userName={userName} />
              <ProfileTabs />

              <div className="mb-8">
                <h3 className="text-base font-bold text-[#10154A] mb-1">Profile Overview</h3>
                <p className="text-[11px] font-medium text-gray-500 mb-4">Your creator profile and key statistics.</p>
                <div className="flex flex-wrap gap-4">
                  <StatCard icon={Video} title="Total Videos" metric="24" subtitle="Approved: 20" subColor="text-green-500" />
                  <StatCard icon={Eye} title="Total Views" metric="128.4K" subtitle="All time" />
                  <StatCard icon={MousePointerClick} title="Total Clicks" metric="12.3K" subtitle="All time" />
                  <StatCard icon={Heart} title="Total Engagement" metric="8.6K" subtitle="All time" />
                </div>
              </div>

              <AboutAndSkills />
              <RecentVideos />
              <SocialLinks />
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-full xl:w-[280px] shrink-0 space-y-6">
              <ProfileCompletion />
              <CreatorTips />
              <ProfileFAQ />
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
