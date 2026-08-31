import React, { useState } from 'react';
import { 
  Check, ChevronRight, Video, GraduationCap, Briefcase, Sparkles, 
  Code, Bot, Database, Shield, Smartphone, Cloud, PenTool, TrendingUp, MoreHorizontal,
  Info, Users, User, Map, BarChart, Trophy, DollarSign, UploadCloud, Play, Target
} from 'lucide-react';
import Confetti from 'react-confetti';
import { auth, db } from './firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

type CreatorOnboardingState = {
  step: number;
  fullName: string;
  email: string;
  creatorType: string;
  expertise: string[];
  youtubeUrl: string;
  goals: string[];
};

const EXPERTISE_OPTIONS = [
  { id: 'software', label: 'Software Development', icon: Code },
  { id: 'ai', label: 'AI / Machine Learning', icon: Bot },
  { id: 'data', label: 'Data Science', icon: Database },
  { id: 'cyber', label: 'Cybersecurity', icon: Shield },
  { id: 'product', label: 'Product Management', icon: Smartphone },
  { id: 'cloud', label: 'Cloud Computing', icon: Cloud },
  { id: 'uiux', label: 'UI/UX Design', icon: PenTool },
  { id: 'marketing', label: 'Digital Marketing', icon: TrendingUp },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const CREATOR_TYPES = [
  { id: 'youtuber', label: 'YouTuber', desc: 'Educational video creator', icon: Video },
  { id: 'educator', label: 'Educator', desc: 'Teacher or academic educator', icon: GraduationCap },
  { id: 'industry', label: 'Industry Professional', desc: 'Professional sharing industry knowledge', icon: Briefcase },
  { id: 'content', label: 'Content Creator', desc: 'Creator focused on educational content', icon: Sparkles },
];

const GOALS = [
  { id: 'reach', label: 'Reach More Learners', desc: 'Help more students discover your content', icon: Users },
  { id: 'connect', label: 'Connect Content to Careers', desc: 'Map your videos to relevant careers and skills', icon: Target },
  { id: 'track', label: 'Track Engagement', desc: 'Understand how learners interact with your content', icon: BarChart },
  { id: 'grow', label: 'Grow Your Educational Brand', desc: 'Build your presence among career-focused learners', icon: Trophy },
  { id: 'promo', label: 'Creator Promotions', desc: 'Participate in eligible promotional opportunities', icon: DollarSign },
];

export default function CreatorOnboarding({ onComplete, initialName = '' }: { onComplete: () => void, initialName?: string }) {
  const [state, setState] = useState<CreatorOnboardingState>({
    step: 1,
    fullName: initialName,
    email: '',
    creatorType: '',
    expertise: [],
    youtubeUrl: '',
    goals: []
  });

  const updateState = (updates: Partial<CreatorOnboardingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < 5) updateState({ step: state.step + 1 });
  };

  const prevStep = () => {
    if (state.step > 1) updateState({ step: state.step - 1 });
  };

  const isStepValid = () => {
    if (state.step === 1) return state.fullName.trim() !== '' && state.email.trim() !== '' && state.creatorType !== '';
    if (state.step === 2) return state.expertise.length > 0;
    if (state.step === 3) return state.youtubeUrl.trim() !== '';
    if (state.step === 4) return state.goals.length > 0;
    return true;
  };

  const handleComplete = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          name: state.fullName || user.displayName || '',
          email: state.email || user.email || '',
          creatorType: state.creatorType,
          expertise: state.expertise,
          youtubeUrl: state.youtubeUrl,
          goals: state.goals,
          onboardingCompleted: true,
          onboardingCompletedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Failed to save creator onboarding to Firestore:', err);
    } finally {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans text-gray-900 selection:bg-[#6225E6]/20">
      
      {state.step === 5 && <Confetti recycle={false} numberOfPieces={500} colors={['#6225E6', '#e7defa', '#f4effd', '#34A853']} />}

      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between sticky top-0 bg-[#F8F9FB]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="bg-[#6225E6] p-1.5 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Career<span className="text-[#6225E6]">Forge</span></h1>
        </div>
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Creator Setup
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-8">
        <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative transition-all duration-500">
          
          {/* Progress Indicator */}
          <div className="px-12 pt-12 pb-8 border-b border-gray-50 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-16 right-16 h-0.5 bg-gray-100 -translate-y-1/2 -z-0 mt-2"></div>
            
            {[
              { num: 1, label: 'Profile' },
              { num: 2, label: 'Expertise' },
              { num: 3, label: 'YouTube' },
              { num: 4, label: 'Goals' },
              { num: 5, label: 'Ready' }
            ].map((step, idx) => {
              const isCompleted = state.step > step.num;
              const isActive = state.step === step.num;
              
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                    ${isCompleted ? 'bg-[#6225E6] text-white shadow-md shadow-[#6225E6]/20' : 
                      isActive ? 'bg-[#6225E6] text-white ring-4 ring-[#f4effd]' : 
                      'bg-gray-100 text-gray-400'}`}
                  >
                    {isCompleted ? <Check size={18} strokeWidth={3} /> : step.num}
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? 'text-[#6225E6]' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-8 md:p-16 min-h-[500px] flex flex-col">
            <div className="flex-1 animate-in slide-in-from-right-4 fade-in duration-300">
              
              {/* STEP 1 */}
              {state.step === 1 && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to CareerForge 👋</h2>
                    <p className="text-xl text-[#6225E6] font-semibold mb-2">Let's set up your creator profile.</p>
                    <p className="text-gray-500">Tell us a little about yourself so we can connect your content with the right learners.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          value={state.fullName}
                          onChange={e => updateState({ fullName: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6225E6]/50 focus:border-[#6225E6] focus:bg-white transition-all text-sm font-medium"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={state.email}
                          onChange={e => updateState({ email: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6225E6]/50 focus:border-[#6225E6] focus:bg-white transition-all text-sm font-medium"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture <span className="font-normal text-gray-400">(Optional)</span></label>
                        <button className="w-full px-4 py-4 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-4 hover:border-[#6225E6]/50 hover:bg-[#f4effd]/50 transition-colors group">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white">
                            <UploadCloud size={20} className="text-gray-400 group-hover:text-[#6225E6]" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-sm text-gray-700 group-hover:text-[#6225E6]">Add a profile picture</div>
                            <div className="text-xs text-gray-400">PNG or JPG • Optional</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Creator Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {CREATOR_TYPES.map(type => {
                          const isActive = state.creatorType === type.id;
                          return (
                            <button
                              key={type.id}
                              onClick={() => updateState({ creatorType: type.id })}
                              className={`p-4 rounded-xl border text-left transition-all relative
                                ${isActive ? 'bg-[#f4effd] border-[#6225E6] shadow-sm ring-1 ring-[#6225E6]' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                            >
                              {isActive && <div className="absolute top-3 right-3 text-[#6225E6]"><Check size={16} strokeWidth={3} /></div>}
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${isActive ? 'bg-[#6225E6] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <type.icon size={20} />
                              </div>
                              <div className={`font-bold text-sm mb-1 ${isActive ? 'text-[#6225E6]' : 'text-gray-900'}`}>{type.label}</div>
                              <div className="text-[10px] text-gray-500 leading-tight">{type.desc}</div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {state.step === 2 && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">What do you teach? 🎓</h2>
                    <p className="text-xl text-[#6225E6] font-semibold mb-2">Choose your areas of expertise.</p>
                    <p className="text-gray-500">Select the career domains your educational content focuses on.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {EXPERTISE_OPTIONS.map(opt => {
                      const isActive = state.expertise.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            const newExp = isActive 
                              ? state.expertise.filter(e => e !== opt.id)
                              : [...state.expertise, opt.id];
                            updateState({ expertise: newExp });
                          }}
                          className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 text-center transition-all relative
                            ${isActive ? 'bg-[#f4effd] border-[#6225E6] shadow-sm ring-1 ring-[#6225E6]' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                        >
                          {isActive && <div className="absolute top-2 right-2 bg-[#6225E6] text-white rounded-full p-0.5"><Check size={12} strokeWidth={3} /></div>}
                          <div className={isActive ? 'text-[#6225E6]' : 'text-gray-400'}><opt.icon size={32} strokeWidth={1.5} /></div>
                          <div className={`font-semibold text-sm ${isActive ? 'text-[#6225E6]' : 'text-gray-700'}`}>{opt.label}</div>
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-1.5"><Info size={16} /> You can change these later.</p>
                </div>
              )}

              {/* STEP 3 */}
              {state.step === 3 && (
                <div className="max-w-xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Connect your YouTube channel 🎥</h2>
                    <p className="text-xl text-[#6225E6] font-semibold mb-2">Bring your educational content to CareerForge.</p>
                    <p className="text-gray-500">Add your YouTube channel so learners can discover the content you create.</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <div className="flex justify-center mb-8">
                      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                        <Play size={40} className="text-red-500 fill-current" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">YouTube Channel URL</label>
                      <input 
                        type="url" 
                        value={state.youtubeUrl}
                        onChange={e => updateState({ youtubeUrl: e.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6225E6]/50 focus:border-[#6225E6] focus:bg-white transition-all text-sm font-medium"
                        placeholder="https://youtube.com/@YourChannel"
                      />
                      <div className="text-xs text-gray-400 mt-2">Example: youtube.com/@YourChannel</div>
                    </div>

                    <div className="bg-[#f4effd]/50 border border-[#e7defa] rounded-xl p-4 flex gap-3 text-sm text-gray-700">
                      <Info className="text-[#6225E6] shrink-0 mt-0.5" size={18} />
                      <p>CareerForge uses your channel information to help organize and recommend your educational content.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {state.step === 4 && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">What do you want to achieve? 🚀</h2>
                    <p className="text-xl text-[#6225E6] font-semibold mb-2">Tell us what matters most to you.</p>
                    <p className="text-gray-500">Choose the goals that best match what you want to accomplish on CareerForge.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {GOALS.map(goal => {
                      const isActive = state.goals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          onClick={() => {
                            const newGoals = isActive 
                              ? state.goals.filter(e => e !== goal.id)
                              : [...state.goals, goal.id];
                            updateState({ goals: newGoals });
                          }}
                          className={`p-6 rounded-2xl border flex flex-col items-center text-center transition-all relative
                            ${isActive ? 'bg-[#f4effd] border-[#6225E6] shadow-sm ring-1 ring-[#6225E6] -translate-y-1' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                        >
                          {isActive && <div className="absolute top-3 right-3 bg-[#6225E6] text-white rounded-full p-0.5"><Check size={14} strokeWidth={3} /></div>}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isActive ? 'bg-white text-[#6225E6] shadow-sm' : 'bg-gray-50 text-gray-400'}`}>
                            <goal.icon size={24} />
                          </div>
                          <div className={`font-bold text-sm mb-2 leading-tight ${isActive ? 'text-[#6225E6]' : 'text-gray-900'}`}>{goal.label}</div>
                          <div className="text-[11px] text-gray-500 leading-relaxed">{goal.desc}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {state.step === 5 && (
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="w-32 h-32 mx-auto md:mx-0 bg-[#f4effd] rounded-full flex items-center justify-center mb-8 relative">
                      <div className="absolute inset-0 bg-[#6225E6]/20 rounded-full animate-ping opacity-75"></div>
                      <div className="w-24 h-24 bg-[#6225E6] rounded-full flex items-center justify-center shadow-xl shadow-[#6225E6]/40 relative z-10">
                        <Check size={48} className="text-white" strokeWidth={3} />
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">You're ready to start! 🚀</h2>
                    <p className="text-lg text-gray-600 font-medium mb-8">Your creator profile is complete.</p>

                    <div className="space-y-4 max-w-sm mx-auto md:mx-0">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3 font-semibold text-sm text-gray-700">
                          <User size={16} className="text-gray-400" /> Creator Profile
                        </div>
                        <div className="text-xs font-medium text-green-600 flex items-center gap-1"><Check size={14}/> Profile completed</div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3 font-semibold text-sm text-gray-700">
                          <Map size={16} className="text-gray-400" /> Expertise
                        </div>
                        <div className="text-xs font-medium text-green-600 flex items-center gap-1"><Check size={14}/> {state.expertise.length} domains</div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3 font-semibold text-sm text-gray-700">
                          <Play size={16} className="text-gray-400" /> YouTube
                        </div>
                        <div className="text-xs font-medium text-green-600 flex items-center gap-1"><Check size={14}/> Channel connected</div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3 font-semibold text-sm text-gray-700">
                          <Target size={16} className="text-gray-400" /> Goals
                        </div>
                        <div className="text-xs font-medium text-green-600 flex items-center gap-1"><Check size={14}/> {state.goals.length} goals selected</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm w-full">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">What you can do next</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="w-12 h-12 rounded-xl bg-[#f4effd] text-[#6225E6] flex items-center justify-center shrink-0">
                          <Play size={24} className="fill-current" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">Add Educational Videos</div>
                          <div className="text-xs text-gray-500">Submit YouTube videos and connect them to careers and skills.</div>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-xl border border-green-100 bg-green-50/30">
                        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                          <Target size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">Get Discovered</div>
                          <div className="text-xs text-gray-500">Your approved content can appear inside relevant learning roadmaps.</div>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/30">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <BarChart size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">Track Analytics</div>
                          <div className="text-xs text-gray-500">See clicks, engagement, and learner interactions with your content.</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f4effd]/50 border border-[#e7defa] rounded-xl p-3 flex gap-2 text-xs text-gray-600 mb-6 items-start">
                      <Info className="text-[#6225E6] shrink-0 mt-0.5" size={14} />
                      <p>Your submitted videos will be reviewed before they are published on CareerForge.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => updateState({ step: 1 })}
                        className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm text-center flex-1"
                      >
                        Review Profile
                      </button>
                      <button 
                        onClick={handleComplete}
                        className="px-6 py-3 bg-[#6225E6] text-white rounded-xl font-semibold hover:bg-[#501ac4] transition-colors shadow-sm flex items-center justify-center gap-2 text-sm flex-[2]"
                      >
                        Go to Creator Dashboard <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Navigation */}
            {state.step < 5 && (
              <div className="mt-12 flex items-center justify-between pt-6 border-t border-gray-100">
                <button 
                  onClick={prevStep}
                  className={`flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all
                    ${state.step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200 bg-white shadow-sm'}`}
                >
                  ← Back
                </button>

                <button 
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`flex items-center gap-2 font-semibold text-sm px-8 py-3 rounded-xl transition-all shadow-sm
                    ${isStepValid() 
                      ? 'bg-[#6225E6] text-white hover:bg-[#501ac4]' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
