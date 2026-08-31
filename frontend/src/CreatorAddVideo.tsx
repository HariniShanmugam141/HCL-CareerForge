import React, { useState } from 'react';
import {
  Home, PlaySquare, PlusSquare, BarChart2, Star, Users, User, Settings, LogOut,
  Bell, ChevronDown, ChevronRight, Link2, Clock, Upload, Eye, Send, Lightbulb,
  FileText, Search, CheckCircle2, Globe, GraduationCap, Building2, Briefcase
} from 'lucide-react';

export default function CreatorAddVideo({ onLogout, onNavigate, userName = 'Arjun Raj' }: { onLogout?: () => void, onNavigate: (view: string) => void, userName?: string }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans text-gray-900 overflow-hidden">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} userName={userName} />
      
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative pb-12">
        <Header userName={userName} />

        <div className="px-4 sm:px-8 max-w-[1400px] mx-auto pb-12 flex flex-col xl:flex-row gap-6">
          
          {/* Main Content Area - Left/Center */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 sm:p-8">
              
              {/* Header Title & Banner */}
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Add New Video</h2>
                  <p className="text-sm text-gray-500 font-medium">Submit your YouTube video details for review and approval.</p>
                </div>
                <div className="bg-[#f4effd] border border-[#e7defa] rounded-xl p-4 flex gap-3 max-w-md w-full xl:w-auto shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#6225E6] text-white flex items-center justify-center shrink-0 font-bold text-xs">i</div>
                  <div>
                    <p className="text-sm font-semibold text-[#6225E6]">You don't need to upload the video file.</p>
                    <p className="text-xs text-[#6225E6]/80 mt-0.5">Just add your YouTube video URL and details.</p>
                  </div>
                </div>
              </div>

              {/* Two Column Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">YouTube Video URL <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Link2 size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="https://www.youtube.com/watch?v=xxxxxxx" 
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6225E6]/20 focus:border-[#6225E6] transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Paste the full YouTube video URL.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Video Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter an engaging title for your video" 
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6225E6]/20 focus:border-[#6225E6] transition-all"
                    />
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Make it clear and descriptive for learners.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Career <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-[#6225E6]/20 focus:border-[#6225E6] transition-all">
                        <option value="">Select Career</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Choose the career this video belongs to.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Skill <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-[#6225E6]/20 focus:border-[#6225E6] transition-all">
                        <option value="">Select Skill</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Choose the primary skill covered in this video.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Difficulty Level <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <button className="flex-1 py-2.5 px-2 border border-[#6225E6] bg-[#f4effd] text-[#6225E6] text-sm font-semibold rounded-xl transition-colors">Beginner</button>
                      <button className="flex-1 py-2.5 px-2 border border-gray-200 bg-white text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">Intermediate</button>
                      <button className="flex-1 py-2.5 px-2 border border-gray-200 bg-white text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">Advanced</button>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Select the difficulty level of your video content.</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Target Learner Level <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors gap-2">
                        <GraduationCap size={24} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-600 text-center">School Students</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 border border-[#6225E6] bg-[#f4effd] rounded-xl transition-colors gap-2">
                        <Building2 size={24} className="text-[#6225E6]" />
                        <span className="text-xs font-semibold text-[#6225E6] text-center">College Students</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors gap-2">
                        <Briefcase size={24} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-600 text-center">Working Professionals</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Who is this video designed for?</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Video Duration <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Clock size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="e.g., 32 minutes" 
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6225E6]/20 focus:border-[#6225E6] transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Enter the total duration of the video.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Video Thumbnail <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-[#f4effd] flex items-center justify-center text-[#6225E6] mb-3">
                        <Upload size={20} />
                      </div>
                      <div className="text-sm font-bold text-gray-900 mb-1">Upload Thumbnail</div>
                      <div className="text-xs text-gray-500 font-medium">PNG, JPG up to 5MB</div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Add a custom thumbnail to make your video stand out.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Tags <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      placeholder="Add relevant tags (e.g., Python, ML, Tutorial)" 
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6225E6]/20 focus:border-[#6225E6] transition-all"
                    />
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5">Add tags to help learners discover your video.</p>
                  </div>
                </div>

              </div>
              
              <div className="my-10 border-t border-gray-100"></div>

              {/* Action Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-[#f4effd]/50 border border-[#e7defa] rounded-2xl p-6 flex flex-col items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#e7defa] text-[#6225E6] flex items-center justify-center mb-4">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-base font-bold text-[#6225E6] mb-1.5">Preview Before Submit</h3>
                  <p className="text-xs font-medium text-gray-500 mb-6">Preview how your video will appear to learners.</p>
                  <button className="px-5 py-2.5 rounded-xl border border-[#6225E6] text-[#6225E6] text-sm font-semibold hover:bg-[#e7defa] transition-colors flex items-center gap-2 mt-auto">
                    Preview Video Card <ChevronRight size={16} />
                  </button>
                </div>

                <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6 flex flex-col items-start">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                    <Send size={20} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">Submit for Approval</h3>
                  <p className="text-xs font-medium text-gray-500 mb-6">After submission, our team will review your video.</p>
                  <button className="px-6 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm mt-auto">
                    Submit for Review
                  </button>
                </div>

              </div>

            </div>
            
            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center px-2 text-xs font-medium text-gray-500">
              <div>© 2026 CareerForge. All rights reserved.</div>
              <div className="mt-2 sm:mt-0 text-gray-400">Empowering creators and learners worldwide</div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="w-full xl:w-80 space-y-6 shrink-0">
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb size={20} className="text-[#6225E6]" />
                <h3 className="text-base font-bold text-gray-900">Submission Tips</h3>
              </div>
              
              <div className="space-y-5 relative">
                <div className="absolute left-[11px] top-0 bottom-4 w-[2px] bg-gray-100 z-0"></div>
                
                {[
                  { id: 1, title: 'Add a clear and descriptive title', desc: 'Make sure your title explains what learners will gain.' },
                  { id: 2, title: 'Choose the right career and skill', desc: 'Selecting the correct career and skill helps in better reach.' },
                  { id: 3, title: 'Accurate duration', desc: 'Mention the exact duration for better learner experience.' },
                  { id: 4, title: 'Quality content', desc: 'Ensure your YouTube video is high-quality and relevant.' },
                ].map((tip) => (
                  <div key={tip.id} className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center text-xs font-bold shrink-0 shadow-sm border border-white">
                      {tip.id}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{tip.title}</h4>
                      <p className="text-[11px] font-medium text-gray-500 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6">
              <h3 className="text-base font-bold text-gray-900 mb-6">What Happens Next?</h3>
              
              <div className="space-y-6 relative">
                <div className="absolute left-[19px] top-2 bottom-4 w-[2px] bg-gray-100 z-0"></div>
                
                {[
                  { icon: FileText, title: 'You submit your video', desc: 'We receive your video details.', color: 'text-purple-600', bg: 'bg-purple-100' },
                  { icon: Search, title: 'Admin review', desc: 'Our team reviews the content.', color: 'text-orange-500', bg: 'bg-orange-100' },
                  { icon: CheckCircle2, title: 'Approval / Rejection', desc: 'You\'ll be notified of the status.', color: 'text-blue-500', bg: 'bg-blue-100' },
                  { icon: Globe, title: 'Go Live', desc: 'Your video goes live for learners!', color: 'text-green-600', bg: 'bg-green-100' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 relative z-10">
                    <div className={`w-10 h-10 rounded-full ${step.bg} ${step.color} flex items-center justify-center shrink-0 border-[3px] border-white shadow-sm`}>
                      <step.icon size={18} />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-sm font-bold text-gray-900 mb-0.5">{step.title}</h4>
                      <p className="text-[11px] font-medium text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
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
          { name: 'My Videos', icon: PlaySquare, view: 'creator_my_videos' },
          { name: 'Add Video', icon: PlusSquare, active: true, view: 'creator_add_video' },

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
      {/* Empty Left Side (No Title here) */}
      <div className="mb-4 sm:mb-0"></div>
      
      <div className="flex items-center gap-6 ml-auto">
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
