import React, { useState } from 'react';
import {
  Home, PlaySquare, PlusSquare, BarChart2, Star, Users, User, Settings, LogOut,
  Bell, ChevronDown, Video, MousePointerClick, 
  ChevronRight, Play, Info, ArrowUpRight, 
  Target, GraduationCap, ChevronUp, Megaphone, Check, PieChart, MousePointer2,
  X
} from 'lucide-react';

export default function PromotionsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex font-sans text-[#10174A] overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
        <Header />
        <div className="px-8 max-w-[1536px] mx-auto pb-12">
          <HeroSection />
          
          <div className="mt-8 flex flex-col xl:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-8">
              <PromotionOptions onNotify={() => showToast("You will be notified when this feature is available!")} />
              <WhyPromote />
              <BottomCTA onNotify={() => showToast("Thanks for subscribing to updates!")} />
            </div>
            
            <div className="w-full xl:w-[380px] flex flex-col gap-6 shrink-0">
              <HowPromotionsWork />
              <PerformanceTracking />
              <FAQ />
            </div>
          </div>
          
          <Footer />
        </div>
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
            <Check size={16} className="text-green-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="w-[210px] bg-white border-r border-[#F4EEFF] hidden lg:flex flex-col h-screen sticky top-0 shrink-0 z-20">
      <div className="p-6 pb-4">
        <h1 className="text-[22px] font-extrabold tracking-tight flex flex-col leading-tight">
          <span className="text-[#10174A]">Career</span>
          <span className="text-[#6C2CF5]">Forge</span>
        </h1>
        <div className="text-[11px] font-semibold text-gray-500 mt-1">
          Creator Dashboard
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar mt-2">
        {[
          { name: 'Dashboard', icon: Home },
          { name: 'My Videos', icon: PlaySquare },
          { name: 'Add Video', icon: PlusSquare },
          { name: 'Analytics', icon: BarChart2 },
          { name: 'Promotions', icon: Star, active: true },
          { name: 'Learner Engagement', icon: Users },
          { name: 'My Profile', icon: User },
          { name: 'Settings', icon: Settings },
        ].map(item => (
          <a 
            key={item.name} 
            href="#" 
            onClick={(e) => e.preventDefault()}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm
              ${item.active 
                ? 'bg-[#6C2CF5] text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <item.icon size={18} className={item.active ? 'text-white fill-white/20' : 'text-gray-400'} />
            {item.name}
          </a>
        ))}
        
        <div className="my-4 border-t border-[#F4EEFF]"></div>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-colors text-sm">
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <div className="p-4 mt-auto border-t border-[#F4EEFF]">
        <div className="bg-white rounded-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F4EEFF] flex flex-col items-center text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#6C2CF5] text-white flex items-center justify-center font-bold text-lg mb-2">
            AR
          </div>
          <div className="font-bold text-[#10174A] text-sm">Arjun Rai</div>
          <div className="text-xs text-gray-500 mb-3">Creator</div>
          <button className="text-xs font-semibold text-[#6C2CF5] border border-[#6C2CF5] px-3 py-1.5 rounded-full hover:bg-[#F4EEFF] transition-colors flex items-center gap-1 w-full justify-center">
            View Profile <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1 w-full justify-center">
            <span className="text-lg">🔥</span>
            <div className="flex flex-col items-start">
              <span className="text-[13px] font-bold text-[#10174A]">12 Day Streak</span>
              <div className="text-[10px] text-gray-500">Keep it up! 🔥</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center w-full mt-3 px-1">
            {['M','T','W','T','F','S','S'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold
                  ${i < 4 ? 'bg-[#6C2CF5] text-white' : 'bg-[#F4EEFF] text-transparent'}`}>
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

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex justify-between items-center px-8 py-5 sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-[#F4EEFF]">
      <div>
        <h2 className="text-[22px] font-bold text-[#10174A] mb-1">
          Promote Your Content
        </h2>
        <p className="text-sm text-gray-500 font-medium hidden sm:block">Increase the visibility of your educational videos and reach more learners through CareerForge.</p>
      </div>
      
      <div className="flex items-center gap-6 relative">
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative text-gray-600 hover:text-[#10174A] transition-colors flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#6C2CF5] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">2</span>
          </button>
          
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100 font-bold text-sm text-[#10174A] flex justify-between items-center">
                Notifications
                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-semibold text-[#10174A]">New feature coming soon!</div>
                  <div className="text-xs text-gray-500 mt-1">Promotions will be available next month.</div>
                </div>
                <div className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-semibold text-[#10174A]">Weekly Report</div>
                  <div className="text-xs text-gray-500 mt-1">Your videos got 1.2k views this week.</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-[#F4EEFF]"></div>
        
        <div className="relative">
          <div 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-3 cursor-pointer p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#F4EEFF] text-[#6C2CF5] flex items-center justify-center font-bold text-sm shrink-0">
              AR
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-bold text-sm text-[#10174A] leading-tight">Arjun Rai</div>
              <div className="text-xs text-gray-500">Creator</div>
            </div>
            <ChevronDown size={16} className="text-gray-400 ml-1 hidden sm:block" />
          </div>
          
          {showProfile && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Account Settings</a>
                <div className="border-t border-gray-100 my-1"></div>
                <a href="#" className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50">Sign Out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <div className="w-full rounded-[16px] bg-gradient-to-br from-[#4B12D9] via-[#5B16F5] to-[#6C2CF5] p-8 sm:p-12 relative overflow-hidden mt-6 shadow-sm flex items-center justify-start">
      {/* Subtle abstract background glowing shapes */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-[20%] w-[250px] h-[250px] bg-[#8C5CFF] opacity-20 rounded-full blur-[60px] transform translate-y-1/3 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-[28px] sm:text-[32px] font-bold text-white mb-4 leading-tight tracking-tight">
          Get Your Content Discovered
        </h1>
        <p className="text-white/90 text-[15px] mb-8 leading-relaxed max-w-[500px]">
          Feature your educational videos in relevant learning sections and help more learners discover your content.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-[#6C2CF5] px-6 py-3 rounded-lg font-bold text-[14px] hover:bg-gray-50 transition-all hover:shadow-md active:scale-95 text-center">
            Explore Promotion Options
          </button>
          <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-bold text-[14px] hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            Learn How It Works <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PromotionOptions({ onNotify }: { onNotify: () => void }) {
  return (
    <section>
      <h3 className="text-[20px] font-bold text-[#10174A] mb-1">Promotion Options</h3>
      <p className="text-[14px] text-gray-500 mb-5">Choose how you want to increase the visibility of your educational content.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pay-Per-Click Card */}
        <div className="bg-white rounded-[16px] border border-gray-200 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col relative h-full hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EEFF] flex items-center justify-center text-[#6C2CF5]">
              <MousePointer2 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-[#10174A] text-[15px]">Pay-Per-Click</h4>
                <span className="text-[10px] font-bold bg-[#F4EEFF] text-[#6C2CF5] px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
            </div>
          </div>
          
          <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">
            Only pay based on valid learner clicks generated through CareerForge.
          </p>
          
          <div className="border border-dashed border-gray-200 rounded-xl p-5 mb-6 text-center relative overflow-hidden">
            <div className="text-[11px] font-semibold text-gray-500 mb-1">Example:</div>
            <div className="text-[14px] font-bold text-[#10174A]">1,000 Valid Clicks</div>
            <div className="text-[13px] text-gray-600 mb-4">× $0.10 per click</div>
            <div className="text-[14px] font-bold text-[#6C2CF5] pt-4 border-t border-gray-200 border-dashed mx-6">
              Estimated Cost: $100
            </div>
          </div>
          
          <div className="flex items-start gap-2 mb-6 mt-auto">
            <Info size={14} className="text-[#6C2CF5] shrink-0 mt-0.5" />
            <p className="text-[12px] text-gray-500 leading-relaxed">
              CareerForge tracks valid clicks sent to your YouTube content. YouTube views remain a separate metric.
            </p>
          </div>
          
          <button 
            onClick={onNotify}
            className="w-full border border-gray-200 text-[#6C2CF5] rounded-lg py-2.5 font-bold text-[13px] hover:bg-[#F4EEFF] hover:border-[#6C2CF5] transition-all flex justify-center items-center gap-2"
          >
            <Bell size={14} /> Notify Me When Available
          </button>
        </div>
        
        {/* Featured Content Card */}
        <div className="bg-white rounded-[16px] border border-gray-200 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col relative h-full hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EEFF] flex items-center justify-center text-[#6C2CF5]">
              <Star size={18} className="fill-[#6C2CF5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-[#10174A] text-[15px]">Featured Content</h4>
                <span className="text-[10px] font-bold bg-[#F4EEFF] text-[#6C2CF5] px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
            </div>
          </div>
          
          <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">
            Feature your educational videos in relevant CareerForge learning sections for a selected period.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-6">
            <ul className="space-y-3 flex-1">
              {[
                'Increased content visibility',
                'Reach relevant learners',
                'Appear in featured learning sections',
                'Promote selected educational videos'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] font-medium text-gray-600">
                  <div className="w-4 h-4 rounded-full bg-[#F4EEFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-[#6C2CF5]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="w-[150px] shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm self-start group">
              <div className="bg-gray-100 h-[84px] relative flex items-center justify-center bg-gradient-to-br from-indigo-900 to-[#10174A] overflow-hidden">
                <div className="absolute top-1 right-1 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded">12:45</div>
                <div className="absolute top-1 left-1 bg-yellow-400 text-yellow-900 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Star size={8} className="fill-yellow-900" /> Featured Video
                </div>
                <div className="absolute inset-0 bg-[#6C2CF5]/10 group-hover:bg-[#6C2CF5]/30 transition-colors"></div>
                <PlayCircle />
                {/* Python Logo placeholder */}
                <svg className="absolute right-2 bottom-2 w-8 h-8 opacity-20" viewBox="0 0 100 100" fill="#fff">
                  <path d="M50 10 C 20 10 20 30 20 30 L 20 40 L 40 40 L 40 30 C 40 25 60 25 60 35 L 60 40 L 80 40 L 80 30 C 80 10 50 10 50 10 Z"></path>
                </svg>
              </div>
              <div className="p-2.5 pb-3">
                <div className="text-[11px] font-bold text-[#10174A] leading-tight mb-1 truncate">Python for Beginners</div>
                <div className="text-[9px] text-gray-500 mb-2 truncate">Software Development • Python</div>
                <div className="text-[10px] font-bold text-[#6C2CF5] flex items-center gap-1 group-hover:underline">
                  <Play size={10} className="fill-[#6C2CF5]" /> Watch on YouTube
                </div>
              </div>
            </div>
          </div>
          
          <button className="mt-auto w-full bg-[#6C2CF5] text-white rounded-lg py-2.5 font-bold text-[13px] hover:bg-[#5B16F5] transition-colors shadow-sm active:scale-[0.98]">
            Explore Featured Content
          </button>
        </div>
      </div>
    </section>
  );
}

function WhyPromote() {
  const reasons = [
    {
      icon: Target,
      title: "Relevant Audience",
      desc: "Your content is shown to learners interested in relevant career tracks and topics."
    },
    {
      icon: BarChart2,
      title: "More Visibility",
      desc: "Increase opportunities for learners to discover your educational videos."
    },
    {
      icon: PieChart,
      title: "Transparent Performance",
      desc: "Track CareerForge clicks and promotion performance with clear insights."
    },
    {
      icon: GraduationCap,
      title: "Educational Focus",
      desc: "Reach learners actively exploring career and learning content."
    }
  ];

  return (
    <section>
      <h3 className="text-[16px] font-bold text-[#10174A] mb-4">Why Promote on CareerForge?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reasons.map((reason, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-[12px] p-4 flex flex-col gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#F4EEFF] text-[#6C2CF5] flex items-center justify-center shrink-0">
              <reason.icon size={18} />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-[#10174A] mb-1.5">{reason.title}</h4>
              <p className="text-[12px] text-gray-500 leading-relaxed">{reason.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomCTA({ onNotify }: { onNotify: () => void }) {
  return (
    <div className="bg-gradient-to-r from-[#6C2CF5] to-[#8C5CFF] rounded-[16px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden shadow-sm">
      <div className="flex items-center gap-5 relative z-10 w-full sm:w-auto">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
          <Megaphone className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-[18px] font-bold text-white mb-1 tracking-tight">Ready to Reach More Learners?</h3>
          <p className="text-[13px] text-white/90">Promotion tools will help creators increase the visibility of high-quality educational content.</p>
        </div>
      </div>
      
      <button 
        onClick={onNotify}
        className="mt-6 sm:mt-0 w-full sm:w-auto bg-white text-[#6C2CF5] px-6 py-2.5 rounded-lg font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap z-10 flex items-center justify-center gap-2 shrink-0 active:scale-95"
      >
        Get Promotion Updates <ArrowUpRight size={16} />
      </button>
      
      {/* Background decoration */}
      <svg className="absolute right-0 bottom-0 text-white/10 w-48 h-48 transform translate-x-1/4 translate-y-1/4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    </div>
  );
}

function HowPromotionsWork() {
  const steps = [
    { num: 1, icon: PlaySquare, title: "Select Your Video", desc: "Choose one of your published CareerForge videos." },
    { num: 2, icon: Megaphone, title: "Choose a Promotion", desc: "Select Pay-Per-Click or Featured Content." },
    { num: 3, icon: Users, title: "Reach More Learners", desc: "Your content gets additional visibility to relevant learners." },
    { num: 4, icon: BarChart2, title: "Track Results", desc: "Monitor promotion performance and learner engagement." }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <h3 className="text-[16px] font-bold text-[#10174A] mb-6">How Promotions Work</h3>
      <div className="relative pl-1">
        {/* Connector Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gray-200 border-l border-dashed border-gray-300 z-0"></div>
        
        <div className="space-y-6 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#6C2CF5] text-white flex items-center justify-center font-bold text-[13px] shrink-0 shadow-[0_0_0_4px_white] z-10 mt-1">
                {step.num}
              </div>
              <div className="bg-white flex items-start gap-4 pb-1 w-full group">
                <div className="w-10 h-10 rounded-xl bg-[#F4EEFF] text-[#6C2CF5] flex items-center justify-center shrink-0 group-hover:bg-[#6C2CF5] group-hover:text-white transition-colors">
                  <step.icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[#10174A] text-[14px] mb-1">{step.title}</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed pr-2">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformanceTracking() {
  return (
    <div className="bg-[#F8F5FF] border border-[#F4EEFF] rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE2FF] flex items-center justify-center text-[#6C2CF5] shadow-sm">
          <BarChart2 size={18} />
        </div>
        <h3 className="text-[15px] font-bold text-[#10174A]">Promotion Performance Tracking</h3>
      </div>
      
      <p className="text-[13px] text-gray-600 mb-5 leading-relaxed">
        When promotion features become available, creators will be able to monitor metrics such as:
      </p>
      
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[12px] font-medium text-gray-700">
        {[
          'Promotion impressions', 'Promotion duration',
          'CareerForge clicks', 'Performance by career track',
          'Unique learners reached', 'Performance by learning topic',
          'Click-through rate'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6C2CF5]"></div>
            {item}
          </div>
        ))}
      </div>
      
      <div className="mt-5 flex items-start gap-2 border-t border-[#EAE2FF] pt-4">
        <Info size={16} className="text-[#6C2CF5] shrink-0 mt-0.5" />
        <p className="text-[12px] text-[#6C2CF5] font-medium leading-relaxed">
          This is only an informational preview of future functionality.
        </p>
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    { q: "What is a CareerForge click?", a: "A CareerForge click is counted when a learner successfully navigates from a CareerForge promotion to your educational content." },
    { q: "Are YouTube views included in promotion metrics?", a: "No, CareerForge tracks clicks sent to your content. Actual views are tracked independently on the destination platform." },
    { q: "How does Pay-Per-Click work?", a: "You set a budget and only pay when a learner clicks on your promoted content link." },
    { q: "What is Featured Content?", a: "Featured Content allows you to place your video prominently in relevant learning paths for a fixed duration." },
    { q: "When will promotions become available?", a: "Promotions are currently in beta and will roll out to all creators later this year." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-6">
      <h3 className="text-[16px] font-bold text-[#10174A] mb-4">Promotion FAQ</h3>
      <div className="space-y-2">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div 
              key={i} 
              className={`border rounded-xl transition-all ${isOpen ? 'border-[#6C2CF5] bg-[#F8F5FF]' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-4 flex justify-between items-center text-left"
              >
                <span className={`text-[13px] font-semibold ${isOpen ? 'text-[#6C2CF5]' : 'text-[#10174A]'}`}>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp size={16} className="text-[#6C2CF5] shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-[13px] text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] font-medium text-gray-400 mb-4">
      <div>© 2025 CareerForge. Empowering creators. Elevating learning.</div>
      <div className="flex items-center gap-1">Connecting creators with learners. <span className="text-yellow-400">✨</span></div>
    </footer>
  );
}

// Helpers
function PlayCircle() {
  return (
    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center absolute z-10 border border-white/40 shadow-sm">
      <Play size={12} className="fill-white text-white ml-0.5" />
    </div>
  )
}
