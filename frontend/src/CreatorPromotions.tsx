import React, { useState } from 'react';
import {
  Home, PlaySquare, PlusSquare, BarChart2, Star, Users, User, Settings, LogOut,
  Bell, ChevronDown, ChevronRight, ChevronUp, MousePointerClick, Target, TrendingUp,
  GraduationCap, Megaphone, Info, Play, BarChart, PieChart, Video, CheckCircle,
  ArrowRight, ArrowUpRight
} from 'lucide-react';

// --- FAQ Accordion ---
const FAQ_ITEMS = [
  { q: 'What is a CareerForge click?', a: 'A CareerForge click is a valid interaction where a learner clicks on your video link within the CareerForge platform, directing them to your YouTube content.' },
  { q: 'Are YouTube views included in promotion metrics?', a: 'No. CareerForge only tracks clicks and interactions within the CareerForge platform. YouTube views are a separate metric managed by YouTube.' },
  { q: 'How does Pay-Per-Click work?', a: 'With Pay-Per-Click, you only pay for valid learner clicks generated through CareerForge. Each click represents a learner who was directed to your YouTube content.' },
  { q: 'What is Featured Content?', a: 'Featured Content allows your educational videos to appear in relevant CareerForge learning sections, giving your content additional visibility to interested learners.' },
  { q: 'When will promotions become available?', a: 'Promotion features are currently in development. You can sign up for notifications to be alerted as soon as these features launch.' },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center px-4 py-3.5 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <span>{item.q}</span>
            {open === i ? <ChevronUp size={16} className="text-[#6225E6] shrink-0 ml-2" /> : <ChevronDown size={16} className="text-gray-400 shrink-0 ml-2" />}
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-xs font-medium text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Sidebar ---
function Sidebar({ onLogout, onNavigate, userName }: { onLogout?: () => void, onNavigate: (v: string) => void, userName: string }) {
  const initials = userName.substring(0, 2).toUpperCase();
  const NAV = [
    { name: 'Dashboard', icon: Home, view: 'dashboard' },
    { name: 'My Videos', icon: PlaySquare, view: 'creator_my_videos' },
    { name: 'Add Video', icon: PlusSquare, view: 'creator_add_video' },

    { name: 'Promotions', icon: Star, active: true, view: 'creator_promotions' },
    { name: 'Learner Engagement', icon: Users, view: 'creator_learners' },
    { name: 'My Profile', icon: User, view: 'creator_profile' },
    { name: 'Settings', icon: Settings, view: 'creator_settings' },
  ];

  return (
    <aside className="w-[210px] bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
      <div className="p-5 pb-2">
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">
          Career<span className="text-[#6225E6]">Forge</span>
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
              ${item.active ? 'bg-[#6225E6] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
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
      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center text-center mb-3">
          <div className="w-12 h-12 rounded-full bg-[#6225E6] text-white flex items-center justify-center font-bold text-lg mb-2 shadow">{initials}</div>
          <div className="font-bold text-gray-900 text-sm">{userName}</div>
          <div className="text-[11px] text-gray-500 mb-3">Creator</div>
          <button className="text-[11px] font-semibold text-[#6225E6] bg-[#f4effd] px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#e7defa] transition-colors">
            View Profile <ChevronRight size={12} />
          </button>
        </div>

        <div className="bg-orange-50/60 p-3 rounded-2xl border border-orange-100/50">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-base">🔥</span>
            <span className="text-xs font-bold text-gray-900">12 Day Streak</span>
          </div>
          <div className="text-[9px] text-gray-500 mb-2.5 ml-5">Keep it up! 🔥</div>
          <div className="flex justify-between items-center">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${i < 4 ? 'bg-[#6225E6] text-white' : 'bg-gray-100 text-gray-400'}`}>
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
    <header className="flex justify-between items-center px-6 py-5 sticky top-0 bg-[#F8F9FB]/95 backdrop-blur-sm z-40">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">Promote Your Content</h2>
        <p className="text-xs font-medium text-gray-500 mt-0.5">Increase the visibility of your educational videos and reach more learners through CareerForge.</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6225E6] text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-[#F8F9FB]">2</span>
        </button>
        <div className="flex items-center gap-2.5 cursor-pointer hover:bg-white px-2.5 py-1.5 rounded-full transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
          <div className="w-9 h-9 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center font-bold text-sm">{initials}</div>
          <div className="hidden md:block text-left">
            <div className="font-bold text-sm text-gray-900 leading-tight">{userName}</div>
            <div className="text-[11px] text-gray-500">Creator</div>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden md:block" />
        </div>
      </div>
    </header>
  );
}

// --- Hero Banner ---
function HeroBanner() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#5B16F5] via-[#6C2CF5] to-[#7B3CF5] p-8 flex justify-between items-center overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-[38%] w-40 h-40 rounded-full bg-white/5 -translate-y-1/2" />
      <div className="absolute bottom-0 left-[30%] w-24 h-24 rounded-full bg-white/5 translate-y-1/2" />

      <div className="relative z-10 max-w-md">
        <h2 className="text-3xl font-bold text-white mb-3 leading-tight">Get Your Content Discovered</h2>
        <p className="text-sm text-white/80 font-medium mb-6 leading-relaxed">
          Feature your educational videos in relevant learning<br />
          sections and help more learners discover your content.
        </p>
        <div className="flex items-center gap-3">
          <button className="bg-white text-[#6225E6] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
            Explore Promotion Options
          </button>
          <button className="bg-transparent border border-white/60 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors flex items-center gap-1.5">
            Learn How It Works <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Illustration */}
      <div className="relative z-10 hidden xl:flex items-center justify-center w-80 h-44">
        <div className="absolute right-0 bottom-0 w-56 h-36 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center">
          {/* Simulated bar chart */}
          <div className="flex items-end gap-2 h-20 px-4">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="w-4 rounded-t-sm bg-white/40" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        {/* Arrow up */}
        <div className="absolute top-2 right-10 bg-white/20 rounded-full p-2 border border-white/30">
          <ArrowUpRight size={18} className="text-white" />
        </div>
        {/* Play button */}
        <div className="absolute top-6 right-32 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
          <Play size={16} className="text-[#6225E6] fill-[#6225E6] ml-0.5" />
        </div>
        {/* Target */}
        <div className="absolute bottom-4 right-2 bg-white/20 rounded-full p-2 border border-white/30">
          <Target size={18} className="text-white" />
        </div>
        {/* Stars */}
        <span className="absolute top-1 left-10 text-yellow-300 text-xl">★</span>
        <span className="absolute top-10 left-2 text-white/50 text-sm">✦</span>
        <span className="absolute bottom-6 left-16 text-white/50 text-xs">✦</span>
        {/* Avatar circles */}
        <div className="absolute top-2 left-20 w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white text-xs font-bold">A</div>
        <div className="absolute bottom-8 left-4 w-7 h-7 rounded-full bg-yellow-400/80 border border-white/40 flex items-center justify-center text-white text-xs font-bold">L</div>
      </div>
    </div>
  );
}

// --- Why Promote Cards ---
function WhyPromoteCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] flex flex-col gap-3 hover:-translate-y-0.5 transition-transform">
      <div className="w-10 h-10 rounded-full bg-[#f4effd] flex items-center justify-center">
        <Icon size={20} className="text-[#6225E6]" />
      </div>
      <div>
        <div className="font-bold text-gray-900 text-sm mb-1">{title}</div>
        <div className="text-[11px] text-gray-500 font-medium leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// --- Bottom CTA ---
function BottomCTA() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#5B16F5] to-[#7B3CF5] p-6 flex items-center justify-between overflow-hidden relative">
      <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10">
        <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="none">
          <polyline points="0,100 40,70 80,80 120,40 160,50 200,20" fill="none" stroke="white" strokeWidth="3" />
          <polyline points="0,110 40,85 80,90 120,60 160,65 200,40" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
          <Megaphone size={22} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-0.5">Ready to Reach More Learners?</h3>
          <p className="text-xs text-white/80 font-medium">
            Promotion tools will help creators increase the visibility of<br />high-quality educational content.
          </p>
        </div>
      </div>
      <button className="relative z-10 bg-white text-[#6225E6] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 shrink-0 ml-6">
        Get Promotion Updates <ArrowRight size={14} />
      </button>
    </div>
  );
}

// --- How Promotions Work ---
function PromotionSteps() {
  const steps = [
    { n: '1', icon: Video, title: 'Select Your Video', desc: 'Choose one of your published CareerForge videos.' },
    { n: '2', icon: Megaphone, title: 'Choose a Promotion', desc: 'Select Pay-Per-Click or Featured Content.' },
    { n: '3', icon: Users, title: 'Reach More Learners', desc: 'Your content gets additional visibility to relevant learners.' },
    { n: '4', icon: BarChart, title: 'Track Results', desc: 'Monitor promotion performance and learner engagement.' },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] p-5">
      <h3 className="font-bold text-gray-900 text-base mb-5">How Promotions Work</h3>
      <div className="space-y-5 relative">
        <div className="absolute left-[19px] top-4 bottom-8 w-[2px] border-l-2 border-dashed border-[#6225E6]/20 z-0" />
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#6225E6] text-white flex items-center justify-center font-bold text-sm shrink-0 border-4 border-white shadow-sm">
              {s.n}
            </div>
            <div className="flex gap-3 items-start pt-1">
              <div className="w-8 h-8 rounded-lg bg-[#f4effd] flex items-center justify-center shrink-0">
                <s.icon size={16} className="text-[#6225E6]" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm leading-tight">{s.title}</div>
                <div className="text-[11px] text-gray-500 font-medium mt-0.5 leading-snug">{s.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Performance Tracking ---
function PerformanceTracking() {
  const metrics = [
    'Promotion impressions', 'Promotion duration',
    'CareerForge clicks', 'Performance by career track',
    'Unique learners reached', 'Performance by learning topic',
    'Click-through rate',
  ];
  const left = metrics.filter((_, i) => i % 2 === 0);
  const right = metrics.filter((_, i) => i % 2 !== 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#f4effd] flex items-center justify-center">
          <BarChart size={16} className="text-[#6225E6]" />
        </div>
        <h3 className="font-bold text-gray-900 text-sm">Promotion Performance Tracking</h3>
      </div>
      <p className="text-[11px] text-gray-500 font-medium mb-4 leading-relaxed">
        When promotion features become available, creators will be able to monitor metrics such as:
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <div className="space-y-2">
          {left.map((m, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6225E6]" />
              {m}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {right.map((m, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6225E6]" />
              {m}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#f4effd]/60 border border-[#e7defa] rounded-xl p-3 flex items-center gap-2">
        <Info size={14} className="text-[#6225E6] shrink-0" />
        <p className="text-[10px] font-semibold text-[#6225E6]">This is only an informational preview of future functionality.</p>
      </div>
    </div>
  );
}

// --- Main Export ---
export default function CreatorPromotions({ onLogout, onNavigate, userName = 'Arjun Raj' }: { onLogout?: () => void, onNavigate: (v: string) => void, userName?: string }) {
  const [notified, setNotified] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans text-gray-900 overflow-hidden">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} userName={userName} />

      <main className="flex-1 h-screen overflow-y-auto pb-12">
        <Header userName={userName} />

        <div className="px-6 max-w-[1400px] mx-auto pb-12 flex flex-col xl:flex-row gap-6">

          {/* LEFT / MAIN COLUMN */}
          <div className="flex-1 space-y-6">
            <HeroBanner />

            {/* Promotion Options */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Promotion Options</h3>
              <p className="text-xs text-gray-500 font-medium mb-4">Choose how you want to increase the visibility of your educational content.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Card 1 – Pay Per Click */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] p-5 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#f4effd] flex items-center justify-center">
                      <MousePointerClick size={20} className="text-[#6225E6]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">Pay-Per-Click</span>
                        <span className="text-[9px] font-bold bg-[#f4effd] text-[#6225E6] px-2 py-0.5 rounded-full border border-[#e7defa]">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mb-4 leading-relaxed">
                    Only pay based on valid learner clicks generated through CareerForge.
                  </p>

                  {/* Example box */}
                  <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 mb-4">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">Example:</div>
                    <div className="space-y-1.5 text-center">
                      <div className="text-sm font-bold text-gray-900">1,000 Valid Clicks</div>
                      <div className="text-xs text-gray-500 font-medium">× $0.10 per click</div>
                      <div className="border-t border-gray-200 my-2" />
                      <div className="text-sm font-bold text-gray-900">Estimated Cost: $100</div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex gap-2 mb-4">
                    <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium text-gray-500 leading-relaxed">
                      CareerForge tracks valid clicks sent to your YouTube content. YouTube views remain a separate metric.
                    </p>
                  </div>

                  <button
                    onClick={() => { setNotified(true); setTimeout(() => setNotified(false), 3000); }}
                    className="mt-auto w-full py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Bell size={14} /> {notified ? '✓ You\'ll be notified!' : 'Notify Me When Available'}
                  </button>
                </div>

                {/* Card 2 – Featured Content */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] p-5 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#f4effd] flex items-center justify-center">
                      <Star size={20} className="text-[#6225E6]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">Featured Content</span>
                        <span className="text-[9px] font-bold bg-[#f4effd] text-[#6225E6] px-2 py-0.5 rounded-full border border-[#e7defa]">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mb-4 leading-relaxed">
                    Feature your educational videos in relevant CareerForge learning sections for a selected period.
                  </p>

                  <div className="flex gap-4 flex-1">
                    <div className="space-y-2 flex-1">
                      {[
                        'Increased content visibility',
                        'Reach relevant learners',
                        'Appear in featured learning sections',
                        'Promote selected educational videos',
                      ].map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] font-semibold text-gray-700">
                          <CheckCircle size={13} className="text-[#6225E6] mt-0.5 shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>

                    {/* Featured video preview card */}
                    <div className="w-[130px] shrink-0">
                      <div className="text-[9px] font-bold text-[#6225E6] mb-1.5 flex items-center gap-1">
                        <Star size={9} className="fill-yellow-400 text-yellow-400" /> Featured Video
                      </div>
                      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-[#1e1b4b]">
                        <div className="relative h-16 flex items-center justify-center bg-gradient-to-br from-[#4f46e5] to-[#6d28d9]">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
                              <Play size={12} className="text-white fill-white ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-bold px-1 rounded">12:45</div>
                        </div>
                        <div className="p-2">
                          <div className="text-[9px] font-bold text-gray-900 leading-tight mb-0.5">Python for Beginners</div>
                          <div className="text-[8px] text-gray-500 font-medium leading-tight mb-1.5">Software Development • Python</div>
                          <div className="flex items-center gap-1 text-[8px] text-[#6225E6] font-bold">
                            <Play size={7} className="fill-[#6225E6]" /> Watch on YouTube
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full py-2.5 bg-[#6225E6] hover:bg-[#521bca] text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
                    Explore Featured Content
                  </button>
                </div>
              </div>
            </div>

            {/* Why Promote */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Promote on CareerForge?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <WhyPromoteCard icon={Target} title="Relevant Audience" desc="Your content is shown to learners interested in relevant career tracks and topics." />
                <WhyPromoteCard icon={BarChart} title="More Visibility" desc="Increase opportunities for learners to discover your educational videos." />
                <WhyPromoteCard icon={PieChart} title="Transparent Performance" desc="Track CareerForge clicks and promotion performance with clear insights." />
                <WhyPromoteCard icon={GraduationCap} title="Educational Focus" desc="Reach learners actively exploring career and learning content." />
              </div>
            </div>

            <BottomCTA />

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-2 text-[11px] font-medium text-gray-400">
              <div>© 2025 CareerForge. Empowering creators. Elevating learning.</div>
              <div className="mt-1 sm:mt-0">Connecting creators with learners. ✨</div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full xl:w-[300px] space-y-5 shrink-0">
            <PromotionSteps />


            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] p-5">
              <h3 className="font-bold text-gray-900 text-base mb-4">Promotion FAQ</h3>
              <FAQAccordion />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
