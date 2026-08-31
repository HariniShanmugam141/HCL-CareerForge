import React from 'react';
import {
  Home, Users, DollarSign, PlaySquare, Rocket, Star,
  CreditCard, FileText, Settings, Receipt, LogOut,
  Search, Bell, ChevronDown, Eye, MousePointer2,
  Crown, UserPlus, FilePlus, Megaphone
} from 'lucide-react';

export default function AdminDashboard({ onLogout }: { onLogout?: () => void }) {
  return (
    <div className="min-h-screen bg-[#FAFAFC] flex font-sans text-[#111827] overflow-hidden">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col">
        <Header />
        <div className="px-8 md:px-10 py-8 max-w-[1600px] mx-auto w-full flex-1">
          <SummaryMetrics />
          <CreatorRevenueModel />
          <QuickActions />
        </div>
        <Footer />
      </main>
    </div>
  );
}

function Sidebar({ onLogout }: { onLogout?: () => void }) {
  return (
    <aside className="w-[260px] bg-white border-r border-[#EAEAEA] hidden lg:flex flex-col h-screen sticky top-0 shrink-0 z-20">
      <div className="p-6 pb-2">
        <h1 className="text-[22px] font-bold text-[#111827] tracking-tight leading-tight">
          CareerForge
        </h1>
        <div className="text-[12px] font-medium text-gray-500 mt-0.5">
          Admin Dashboard
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar mt-2">
        <NavItem icon={Home} label="Dashboard" active />
        <NavItem icon={Users} label="Creators" />
        <NavItem icon={DollarSign} label="Earnings" />
        <NavItem icon={PlaySquare} label="Videos" />

        <div className="pt-6 pb-2 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Management
        </div>
        <NavItem icon={Rocket} label="Ad Campaigns" />
        <NavItem icon={Star} label="Featured Videos" />
        <NavItem icon={CreditCard} label="Subscriptions" />
        <NavItem icon={FileText} label="Reports" />

        <div className="pt-6 pb-2 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Settings
        </div>
        <NavItem icon={Settings} label="Platform Settings" />
        <NavItem icon={Receipt} label="Billing" />
      </nav>

      <div className="p-5 mt-auto">
        <div className="bg-[#F8F5FF] rounded-[14px] p-5 border border-[#F4EEFF] flex flex-col mb-4 relative overflow-hidden">
          <h4 className="text-[13px] font-bold text-[#5B20E8] mb-1 relative z-10">Grow with CareerForge</h4>
          <p className="text-[11px] text-gray-600 leading-relaxed relative z-10 max-w-[140px]">
            Empowering creators building the future.
          </p>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors text-[13px]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      onClick={(e) => e.preventDefault()}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] font-medium transition-colors text-[14px]
        ${active 
          ? 'bg-gradient-to-r from-[#6D28D9] to-[#5B20E8] text-white shadow-[0_2px_10px_rgba(91,32,232,0.2)]' 
          : 'text-gray-600 hover:bg-gray-50'}`}
    >
      <Icon size={18} className={active ? 'text-white' : 'text-gray-400'} strokeWidth={active ? 2.5 : 2} />
      {label}
    </a>
  );
}

function Header() {
  return (
    <header className="flex justify-between items-center px-8 md:px-10 py-5 sticky top-0 bg-[#FAFAFC]/95 backdrop-blur-sm z-40 border-b border-transparent">
      <div className="flex-1">
        <PageTitle />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search anything" 
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#EAEAEA] rounded-full text-[13px] outline-none focus:border-[#5B20E8] transition-colors shadow-sm"
          />
        </div>

        <button className="relative text-gray-600 hover:text-[#111827] transition-colors p-1">
          <Bell size={20} />
          <span className="absolute top-0 right-1 w-4 h-4 bg-[#6D28D9] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#FAFAFC]">3</span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-[#F4EEFF] text-[#5B20E8] flex items-center justify-center font-bold text-[13px] shrink-0 group-hover:bg-[#EAE2FF] transition-colors">
            AU
          </div>
          <div className="text-left hidden sm:block">
            <div className="font-bold text-[13px] text-[#111827] leading-tight group-hover:text-[#5B20E8] transition-colors">Admin User</div>
            <div className="text-[11px] text-gray-500">Super Admin</div>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

function PageTitle() {
  return (
    <div>
      <h2 className="text-[24px] font-bold text-[#111827] mb-1.5 flex items-center gap-2">
        Welcome back, <span className="text-[#5B20E8]">Admin!</span> 👋
      </h2>
      <p className="text-[14px] text-gray-500">
        Here's what's happening on CareerForge today.
      </p>
    </div>
  );
}

function SummaryMetrics() {
  const metrics = [
    {
      title: "Total Creators",
      value: "12,450",
      change: "+18% from last month",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      isPositive: true
    },
    {
      title: "Total Earnings",
      value: "₹8,950",
      change: "+22% from last month",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      isPositive: true
    },
    {
      title: "Total Views",
      value: "1.24M",
      change: "+16% from last month",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      isPositive: true
    },
    {
      title: "Total Clicks",
      value: "85,320",
      change: "+20% from last month",
      icon: MousePointer2,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      isPositive: true
    },
    {
      title: "Total Videos",
      value: "2,850",
      change: "+12% from last month",
      icon: PlaySquare,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      isPositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
      {metrics.map((metric, i) => (
        <div key={i} className="bg-white rounded-[16px] p-5 border border-[#EAEAEA] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow">
          <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 ${metric.bgColor} ${metric.color}`}>
            <metric.icon size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[12px] font-medium text-gray-500 mb-0.5">{metric.title}</div>
            <div className="text-[20px] font-bold text-[#111827] leading-tight mb-1">{metric.value}</div>
            <div className={`text-[10px] font-semibold ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreatorRevenueModel() {
  return (
    <div className="mb-10">
      <h3 className="text-[18px] font-bold text-[#111827] mb-1">Creator Revenue Model</h3>
      <p className="text-[13px] text-gray-500 mb-5">Multiple ways creators can grow and earn with CareerForge.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pay-Per-Click */}
        <div className="bg-[#F8FFF9] rounded-[16px] p-8 border border-[#E6F5EB] flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.01)] h-full">
          <div className="w-14 h-14 rounded-2xl bg-[#E0F2E9] flex items-center justify-center text-[#22C55E] mb-5 shadow-sm">
            <MousePointer2 size={26} strokeWidth={2.5} className="fill-[#22C55E]/20" />
          </div>
          <h4 className="text-[16px] font-bold text-[#111827] mb-3">Pay-Per-Click</h4>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
            Creators pay CareerForge for eligible traffic generated through the platform.
          </p>
          <div className="w-full bg-white border border-[#E6F5EB] rounded-[12px] p-4 mt-auto">
            <div className="text-[11px] font-bold text-[#22C55E] mb-2 uppercase tracking-wide">Example Calculation</div>
            <div className="text-[13px] text-gray-700 font-medium mb-1">2,000 eligible clicks × ₹2 =</div>
            <div className="text-[22px] font-bold text-[#111827]">₹4,000</div>
          </div>
        </div>

        {/* Featured Video */}
        <div className="bg-[#F9F7FF] rounded-[16px] p-8 border border-[#F4EEFF] flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.01)] h-full">
          <div className="w-14 h-14 rounded-2xl bg-[#EBE4FF] flex items-center justify-center text-[#6D28D9] mb-5 shadow-sm">
            <Star size={26} strokeWidth={2.5} className="fill-[#6D28D9]/20" />
          </div>
          <h4 className="text-[16px] font-bold text-[#111827] mb-3">Featured Video</h4>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-8">
            Creators can pay a fixed amount to feature their educational videos in relevant sections.
          </p>
          <button className="w-full mt-auto bg-[#6D28D9] text-white rounded-[10px] py-3 font-bold text-[13px] hover:bg-[#5B20E8] transition-colors shadow-sm">
            Feature Now
          </button>
        </div>

        {/* Creator Subscription */}
        <div className="bg-[#FFF9F5] rounded-[16px] p-8 border border-[#FFEFE5] flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.01)] h-full">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE4D6] flex items-center justify-center text-[#F97316] mb-5 shadow-sm">
            <Crown size={26} strokeWidth={2.5} className="fill-[#F97316]/20" />
          </div>
          <h4 className="text-[16px] font-bold text-[#111827] mb-3">Creator Subscription</h4>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-8">
            Creators can subscribe to a premium plan for additional promotion and advanced analytics features.
          </p>
          <button className="w-full mt-auto bg-[#F97316] text-white rounded-[10px] py-3 font-bold text-[13px] hover:bg-[#EA580C] transition-colors shadow-sm">
            View Plans
          </button>
        </div>

      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: "Add Creator", icon: UserPlus, color: "text-[#6D28D9]", bg: "bg-[#F4EEFF]" },
    { label: "Add Featured Video", icon: Star, color: "text-[#22C55E]", bg: "bg-[#E0F2E9]" },
    { label: "Create Ad Campaign", icon: Megaphone, color: "text-[#3B82F6]", bg: "bg-[#E0E7FF]" },
    { label: "Manage Subscriptions", icon: Crown, color: "text-[#F97316]", bg: "bg-[#FFE4D6]" },
    { label: "View Reports", icon: FilePlus, color: "text-[#E11D48]", bg: "bg-[#FFE4E6]" },
    { label: "Platform Settings", icon: Settings, color: "text-[#4B5563]", bg: "bg-[#F3F4F6]" },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-[16px] font-bold text-[#111827] mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, i) => (
          <button 
            key={i} 
            className="flex items-center gap-3 bg-white border border-[#EAEAEA] rounded-[12px] pr-5 pl-2.5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.bg} ${action.color}`}>
              <action.icon size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[13px] font-semibold text-[#374151]">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-8 md:px-10 py-6 border-t border-[#EAEAEA] flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] font-medium text-gray-500 mt-auto bg-white/50">
      <div>© 2025 CareerForge. All rights reserved.</div>
      <div className="flex items-center gap-1">Made with <span className="text-red-500">♥</span> for creators</div>
    </footer>
  );
}

function BarChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="14" width="4" height="6" rx="1" fill="#6D28D9" fillOpacity="0.2" />
      <rect x="10" y="10" width="4" height="10" rx="1" fill="#6D28D9" fillOpacity="0.5" />
      <rect x="17" y="4" width="4" height="16" rx="1" fill="#6D28D9" />
    </svg>
  );
}
