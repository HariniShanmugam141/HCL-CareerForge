import React from 'react';
import {
  Rocket, Home, Map, Code, BarChart, Trophy, Users, Gift, Bell, User, Settings,
  Search, ChevronDown, ChevronRight, PlayCircle, BookOpen, Clock, Activity,
  LogOut, Shield, Flame
} from 'lucide-react';

export default function PracticePage({ 
  onLogout, 
  onNavigate,
  userName = 'Bhavya Shree D'
}: { 
  onLogout?: () => void,
  onNavigate?: (view: string) => void,
  userName?: string
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans text-gray-900 overflow-hidden">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-[#6225E6] p-1.5 rounded-lg text-white">
            <Rocket size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Career<span className="text-[#6225E6]">Forge</span></h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-6 custom-scrollbar">
          {[
            { name: 'Dashboard', icon: Home, view: 'dashboard' },
            { name: 'Roadmap', icon: Map, view: 'roadmap' },
            { name: 'Practice', icon: Code, active: true, view: 'practice' },
            { name: 'Progress', icon: BarChart, view: 'progress' },
            { name: 'Achievements', icon: Trophy, view: 'achievements' },
            { name: 'Leaderboard', icon: Users, view: 'leaderboard' },
            { name: 'Rewards', icon: Gift, view: 'rewards' },
            { name: 'Reminders', icon: Bell, view: 'reminders' },
            { name: 'Profile', icon: User, view: 'profile' },
            { name: 'Settings', icon: Settings, view: 'settings' },
          ].map(item => (
            <a 
              key={item.name} 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate && item.view) onNavigate(item.view);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
                ${item.active 
                  ? 'border-2 border-black font-bold bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <item.icon size={20} className={item.active ? 'text-gray-900' : 'text-gray-400'} />
              {item.name}
            </a>
          ))}
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors mt-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col">
        
        {/* TOP HEADER */}
        <header className="flex justify-between items-center px-8 py-5 sticky top-0 bg-[#F8F9FB]/95 backdrop-blur-sm z-40 border-b border-transparent">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <span>Learning Milestones</span>
            <ChevronRight size={16} />
            <span className="text-[#6225E6]">Practise</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search anything" 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm outline-none focus:border-[#6225E6] transition-colors shadow-sm"
              />
            </div>

            <button className="relative text-gray-600 hover:text-gray-900 transition-colors p-1">
              <Bell size={20} />
              <span className="absolute top-0 right-1 w-4 h-4 bg-[#6225E6] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#F8F9FB]">3</span>
            </button>
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-[#e7defa] transition-colors">
                {userName.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-sm text-gray-900 leading-tight group-hover:text-[#6225E6] transition-colors">{userName}</div>
                <div className="text-xs text-gray-500">Level 12 Learner</div>
              </div>
              <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        <div className="px-8 max-w-[1600px] mx-auto w-full flex-1 pb-12 flex flex-col xl:flex-row gap-8">
          
          <div className="flex-1 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Practise</h2>
              <p className="text-gray-500 font-medium">Practice problems and strengthen your skills with industry-leading platforms.</p>
            </div>

            {/* Banner */}
            <div className="bg-[#f4effd] border border-[#e7defa] rounded-xl px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#6225E6]">
                <div className="w-6 h-6 rounded-full bg-[#6225E6] text-white flex items-center justify-center">
                  <PlayCircle size={14} className="fill-white" />
                </div>
                Solve problems, track your progress and improve your coding skills.
              </div>
              <button className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Choose a Platform</h3>
              <p className="text-sm text-gray-500 mb-5">Select a platform to start practising problems.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* LeetCode */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="w-12 h-12 object-contain" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">LeetCode</h4>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-1">
                    Practice coding problems and prepare for interviews.
                  </p>
                  <button className="w-full bg-[#6225E6] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#501ac4] transition-colors shadow-sm flex items-center justify-center gap-2">
                    Start Practising <ChevronRight size={16} />
                  </button>
                </div>

                {/* GeeksforGeeks */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 text-[#2f8d46]">
                    {/* Fake GfG logo using an icon placeholder */}
                    <div className="w-12 h-12 flex items-center justify-center text-3xl font-extrabold tracking-tighter">
                      GFG
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">GeeksforGeeks</h4>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-1">
                    Enhance your programming skills with practice problems.
                  </p>
                  <button className="w-full bg-[#6225E6] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#501ac4] transition-colors shadow-sm flex items-center justify-center gap-2">
                    Start Practising <ChevronRight size={16} />
                  </button>
                </div>

                {/* HackerRank */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 text-[#00EA64]">
                    <div className="w-12 h-12 border-4 border-[#00EA64] flex items-center justify-center text-2xl font-bold bg-[#00EA64] text-white rounded">
                      H
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">HackerRank</h4>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-1">
                    Solve challenges and improve your coding skills.
                  </p>
                  <button className="w-full bg-[#6225E6] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#501ac4] transition-colors shadow-sm flex items-center justify-center gap-2">
                    Start Practising <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">How it Works</h3>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 relative">
                  {/* Connectors */}
                  <div className="hidden sm:block absolute left-[15%] right-[15%] top-8 h-0.5 bg-gray-100 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-gray-200 transform rotate-45"></div>
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-r-2 border-gray-200 transform rotate-45"></div>
                  </div>
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center z-10 flex-1">
                    <div className="w-16 h-16 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                      <PlayCircle size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1.5">1. Watch</h4>
                    <p className="text-xs text-gray-500 max-w-[150px]">Watch the recommended learning video.</p>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center z-10 flex-1">
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                      <Code size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1.5">2. Practise</h4>
                    <p className="text-xs text-gray-500 max-w-[150px]">Practice related problems on your preferred platform.</p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center z-10 flex-1">
                    <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                      <BarChart size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1.5">3. Track Progress</h4>
                    <p className="text-xs text-gray-500 max-w-[150px]">Track your progress and achieve your goals.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-[#6225E6]" size={20} />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Your Practice Summary</h3>
                  <p className="text-xs text-gray-500">Overview of your practice activity across platforms.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-1">Total Problems Solved</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">248</div>
                  <div className="text-[10px] font-bold text-green-500">+18 this week</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-1">Total Time Spent</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">32h 45m</div>
                  <div className="text-[10px] font-bold text-green-500">+4h 30m this week</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-1">Current Streak</div>
                  <div className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-1">12 days</div>
                  <div className="text-[10px] font-bold text-orange-500">Keep it up! 🔥</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">78%</div>
                  <div className="text-[10px] font-bold text-green-500">+5% this week</div>
                </div>
              </div>
            </div>

          </div>
          
          {/* RIGHT SIDEBAR */}
          <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
            
            {/* Milestone Progress */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Milestone Progress</h3>
              <div className="text-sm font-semibold text-gray-700 mb-1">Data Structures & Algorithms</div>
              <div className="text-xs text-gray-500 mb-3">Milestone 3 of 8</div>
              
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                <div className="bg-[#6225E6] h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="text-xs font-bold text-gray-900 text-right">60%</div>
            </div>

            {/* Milestone Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Milestone Actions</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center shrink-0">
                    <PlayCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900 mb-1">Watch</h4>
                    <p className="text-xs text-gray-500">Watch the recommended learning video.</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 font-bold flex items-center justify-center shrink-0 border border-green-100">
                    GFG
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900 mb-1">Practise</h4>
                    <p className="text-xs text-gray-500">Practice related problems on platforms like LeetCode, GeeksforGeeks, HackerRank.</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#6225E6] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    2
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900 mb-1">Review</h4>
                    <p className="text-xs text-gray-500">Review your progress and take notes.</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 font-bold text-[10px] flex items-center justify-center shrink-0">
                    3
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Practice Activity */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Recent Practice Activity</h3>
              
              <div className="space-y-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LC" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-900">LeetCode</div>
                    <div className="text-xs text-gray-500">Solved 2 problems</div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">2h ago</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 text-[#2f8d46] font-bold text-lg flex items-center justify-center shrink-0">
                    GFG
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-900">GeeksforGeeks</div>
                    <div className="text-xs text-gray-500">Solved 3 problems</div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">1 day ago</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#00EA64] bg-[#00EA64] text-white font-bold flex items-center justify-center shrink-0 rounded-sm">
                    H
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-900">HackerRank</div>
                    <div className="text-xs text-gray-500">Solved 1 problem</div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">2 days ago</div>
                </div>
              </div>
              
              <button className="text-sm font-bold text-[#6225E6] hover:underline">View all activity</button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
