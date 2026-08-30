import React, { useState, useEffect } from 'react';
import { 
  Rocket, Home, Map, Code, BarChart, Trophy, Users, Gift, Bell, User, Settings,
  Flame, Star, Coins, Shield, Code2, Braces, Database, Server, Network,
  PlayCircle, CheckCircle, ChevronDown, ChevronRight, ChevronUp, Check, Lock,
  MoreHorizontal, LogOut
} from 'lucide-react';
import Confetti from 'react-confetti';

// --- TYPES & MOCK DATA ---
type Milestone = {
  id: number;
  title: string;
  videos: number;
  problems: number;
  completed: boolean;
};

type Phase = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  progress: number;
  completedMilestones: number;
  totalMilestones: number;
  xpEarned: number;
  statusText: string;
  icon: React.ElementType;
  milestones?: Milestone[];
};

const INITIAL_PHASES: Phase[] = [
  {
    id: 1,
    title: 'Phase 1',
    subtitle: 'Programming Fundamentals',
    description: 'Learn the basics of programming and build a strong foundation.',
    status: 'Completed',
    progress: 100,
    completedMilestones: 8,
    totalMilestones: 8,
    xpEarned: 800,
    statusText: 'Excellent!',
    icon: Code2,
  },
  {
    id: 2,
    title: 'Phase 2',
    subtitle: 'Data Structures & Algorithms',
    description: 'Master DSA to solve problems efficiently.',
    status: 'In Progress',
    progress: 60,
    completedMilestones: 3,
    totalMilestones: 5,
    xpEarned: 560,
    statusText: 'On Track',
    icon: Braces,
    milestones: [
      { id: 1, title: 'Arrays & Strings', videos: 1, problems: 5, completed: true },
      { id: 2, title: 'Linked Lists', videos: 1, problems: 5, completed: true },
      { id: 3, title: 'Stacks & Queues', videos: 1, problems: 4, completed: true },
      { id: 4, title: 'Trees', videos: 2, problems: 6, completed: false },
      { id: 5, title: 'Recursion', videos: 1, problems: 5, completed: false },
    ]
  },
  {
    id: 3,
    title: 'Phase 3',
    subtitle: 'Database',
    description: 'Understand databases and work with data effectively.',
    status: 'Locked',
    progress: 0,
    completedMilestones: 0,
    totalMilestones: 6,
    xpEarned: 0,
    statusText: 'Locked',
    icon: Database,
  },
  {
    id: 4,
    title: 'Phase 4',
    subtitle: 'Backend Development',
    description: 'Build robust server-side applications.',
    status: 'Locked',
    progress: 0,
    completedMilestones: 0,
    totalMilestones: 7,
    xpEarned: 0,
    statusText: 'Locked',
    icon: Server,
  },
  {
    id: 5,
    title: 'Phase 5',
    subtitle: 'System Design',
    description: 'Design scalable and high-performance systems.',
    status: 'Locked',
    progress: 0,
    completedMilestones: 0,
    totalMilestones: 5,
    xpEarned: 0,
    statusText: 'Locked',
    icon: Network,
  }
];

const ACHIEVEMENTS = [
  { id: 1, title: 'Streak Master', desc: 'Maintain 7-day streak', icon: Trophy, color: 'bg-purple-100 text-purple-600', progress: 7, total: 7, completed: true },
  { id: 2, title: 'Consistency King', desc: 'Complete 10 milestones', icon: Flame, color: 'bg-orange-100 text-orange-600', progress: 7, total: 10, completed: false },
  { id: 3, title: 'Problem Solver', desc: 'Solve 50 problems', icon: Code, color: 'bg-blue-100 text-blue-600', progress: 28, total: 50, completed: false },
  { id: 4, title: 'Quick Learner', desc: 'Watch 20 learning videos', icon: PlayCircle, color: 'bg-green-100 text-green-600', progress: 16, total: 20, completed: false },
  { id: 5, title: 'Rising Star', desc: 'Earn 2500 XP', icon: Star, color: 'bg-yellow-100 text-yellow-600', progress: 2450, total: 2500, completed: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'Rohit Sharma', xp: 4320, isUser: false, avatar: '👨' },
  { rank: 2, name: 'Priya Singh', xp: 3560, isUser: false, avatar: '👩' },
  { rank: 3, name: 'Arjun Raj (You)', xp: 2450, isUser: true, avatar: 'AR' },
  { rank: 4, name: 'Neha Verma', xp: 2150, isUser: false, avatar: '👧' },
  { rank: 5, name: 'Aditya Rao', xp: 1950, isUser: false, avatar: '👦' },
];

export default function Dashboard({ 
  onLogout, 
  userName = 'Arjun Raj', 
  isNewUser = false 
}: { 
  onLogout?: () => void, 
  userName?: string, 
  isNewUser?: boolean 
}) {
  // If new user, create a fresh roadmap state
  const initialPhases = isNewUser ? INITIAL_PHASES.map(p => {
    if (p.id === 1) {
      // Phase 1 is in progress
      return { ...p, status: 'In Progress' as const, progress: 0, completedMilestones: 0, xpEarned: 0, statusText: 'Just Started' };
    }
    if (p.id === 2) {
      // Phase 2 is locked
      return { ...p, status: 'Locked' as const, progress: 0, completedMilestones: 0, xpEarned: 0, statusText: 'Locked' };
    }
    return p;
  }) : INITIAL_PHASES;

  const [phases, setPhases] = useState(initialPhases);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(isNewUser ? 1 : 2);
  const [stats, setStats] = useState(isNewUser ? { xp: 0, coins: 0, badges: 0, streak: 1 } : { xp: 2450, coins: 180, badges: 4, streak: 12 });
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [addedXP, setAddedXP] = useState(0);

  const handleCompleteMilestone = (phaseId: number, milestoneId: number) => {
    setPhases(prevPhases => {
      return prevPhases.map(phase => {
        if (phase.id === phaseId && phase.milestones) {
          const updatedMilestones = phase.milestones.map(m => 
            m.id === milestoneId ? { ...m, completed: true } : m
          );
          
          const completedCount = updatedMilestones.filter(m => m.completed).length;
          const newProgress = Math.round((completedCount / phase.totalMilestones) * 100);
          
          // Trigger XP animation
          setAddedXP(25);
          setShowXPAnimation(true);
          setStats(s => ({ ...s, xp: s.xp + 25 }));
          
          setTimeout(() => setShowXPAnimation(false), 2000);

          return {
            ...phase,
            milestones: updatedMilestones,
            completedMilestones: completedCount,
            progress: newProgress,
            xpEarned: phase.xpEarned + 25
          };
        }
        return phase;
      });
    });
  };

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
            { name: 'Dashboard', icon: Home, active: true },
            { name: 'Roadmap', icon: Map },
            { name: 'Practice', icon: Code },
            { name: 'Progress', icon: BarChart },
            { name: 'Achievements', icon: Trophy },
            { name: 'Leaderboard', icon: Users },
            { name: 'Rewards', icon: Gift },
            { name: 'Reminders', icon: Bell },
            { name: 'Profile', icon: User },
            { name: 'Settings', icon: Settings },
          ].map(item => (
            <a 
              key={item.name} 
              href="#" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
                ${item.active 
                  ? 'bg-[#f4effd] text-[#6225E6]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <item.icon size={20} className={item.active ? 'text-[#6225E6]' : 'text-gray-400'} />
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

        {/* Profile Bottom Card */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 mt-auto">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#f4effd] text-[#6225E6] flex items-center justify-center font-bold">
                {userName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-sm truncate max-w-[120px]" title={userName}>{userName}</div>
                <div className="text-xs text-gray-500">{isNewUser ? 'Level 1 Learner' : 'Level 12 Learner'}</div>
              </div>
              <div className="ml-auto">
                <Shield size={20} className="text-[#6225E6] fill-[#f4effd]" />
              </div>
            </div>

            <div className="mb-1 flex justify-between text-xs font-semibold">
              <span className="text-gray-900">Level {isNewUser ? '1' : '12'}</span>
              <span className="text-gray-500">{stats.xp} / {isNewUser ? '500' : '3000'} XP</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
              <div className="bg-[#6225E6] h-1.5 rounded-full" style={{ width: `${isNewUser ? 0 : (stats.xp/3000)*100}%` }}></div>
            </div>

            <div className="flex items-start gap-3 bg-orange-50/50 p-3 rounded-xl border border-orange-100/50">
              <div className="text-orange-500 mt-0.5"><Flame size={18} className="fill-orange-500" /></div>
              <div className="flex-1">
                <div className="text-xs font-bold text-gray-900 mb-1">{stats.streak} Day Streak</div>
                <div className="text-[10px] text-gray-500 mb-2">Keep it up! 🔥</div>
                <div className="flex justify-between items-center w-full">
                  {['M','T','W','T','F','S','S'].map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold
                        ${i < 4 ? 'bg-[#6225E6] text-white' : i === 4 ? 'bg-[#f4effd] text-[#6225E6] border border-[#6225E6]' : 'bg-gray-100 text-gray-400'}`}>
                        {i < 4 ? '✓' : ''}
                      </div>
                      <span className="text-[9px] text-gray-400 font-medium">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative pb-12">
        {/* Floating XP Animation */}
        {showXPAnimation && (
          <div className="fixed top-24 right-1/4 z-50 animate-bounce-up pointer-events-none">
            <div className="bg-green-500 text-white font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1 border-2 border-white">
              +{addedXP} XP <Star size={16} className="fill-white" />
            </div>
          </div>
        )}

        {/* TOP HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-6 sticky top-0 bg-[#F8F9FB]/95 backdrop-blur-sm z-40 border-b border-transparent transition-all">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              Good Morning, <span className="text-[#6225E6]">{userName.split(' ')[0]}!</span> 👋
            </h2>
            <p className="text-sm text-gray-500 font-medium">Every step you take today, builds your dream career tomorrow. 🚀</p>
          </div>
          
          {/* Gamification Stats */}
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {[
              { icon: Flame, iconColor: 'text-orange-500 fill-orange-500', bg: 'bg-orange-50', value: stats.streak, label: 'Day Streak' },
              { icon: Star, iconColor: 'text-blue-500 fill-blue-500', bg: 'bg-blue-50', value: stats.xp.toLocaleString(), label: 'XP Points' },
              { icon: Coins, iconColor: 'text-yellow-500 fill-yellow-500', bg: 'bg-yellow-50', value: stats.coins, label: 'Coins' },
              { icon: Shield, iconColor: 'text-[#6225E6] fill-[#6225E6]', bg: 'bg-[#f4effd]', value: stats.badges, label: 'Badges' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100 shrink-0">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={20} className={stat.iconColor} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 leading-tight text-lg">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </header>

        <div className="px-8 max-w-7xl mx-auto space-y-8">
          
          {/* CAREER PROGRESS HERO */}
          <section className="bg-gradient-to-r from-[#e7defa] to-[#f4effd] rounded-3xl p-8 relative overflow-hidden border border-[#d6c3f8]/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="flex items-center gap-5 z-10 w-full md:w-auto">
              <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center text-[#6225E6] shadow-sm shrink-0">
                <Code size={32} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#6225E6] uppercase tracking-wider mb-1">Your Goal</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Software Developer</h3>
                <p className="text-sm text-gray-700">Master the skills, Build amazing things.</p>
              </div>
            </div>

            <div className="flex-1 w-full max-w-sm z-10">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                <span className="text-2xl font-bold text-gray-900">{isNewUser ? '0%' : '48%'}</span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-3 mb-2 shadow-inner overflow-hidden">
                <div className="bg-[#6225E6] h-full rounded-full transition-all duration-1000" style={{ width: isNewUser ? '0%' : '48%' }}></div>
              </div>
              <div className="text-xs font-medium text-gray-600 text-right">{isNewUser ? '0' : '23'} / 48 Milestones Completed</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl flex items-center gap-4 z-10 shadow-sm border border-white/40 shrink-0 w-full md:w-auto">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Current Phase</div>
                <div className="font-bold text-gray-900 mb-0.5">{isNewUser ? 'Phase 1: Basics' : 'Phase 2: DSA'}</div>
                <div className="text-xs text-gray-600">Keep going! You're doing great.</div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#6225E6]/20 flex items-center justify-center bg-white shadow-sm shrink-0">
                <Trophy size={20} className="text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </section>

          {/* CAREER ROADMAP */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <Map className="text-[#6225E6]" size={22} />
                  Your Roadmap
                </h3>
                <p className="text-sm text-gray-500">Follow your personalized path and become unstoppable.</p>
              </div>
              <button className="text-sm font-medium text-[#6225E6] hover:text-[#501ac4] flex items-center gap-1 transition-colors">
                View Full Roadmap <ChevronRight size={16} />
              </button>
            </div>

            <div className="relative">
              {/* Vertical connection line */}
              <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-gray-200 z-0"></div>

              <div className="space-y-4 relative z-10">
                {phases.map((phase) => {
                  const isCompleted = phase.status === 'Completed';
                  const isActive = phase.status === 'In Progress';
                  const isLocked = phase.status === 'Locked';
                  const isExpanded = expandedPhase === phase.id;

                  return (
                    <div key={phase.id} className="relative flex gap-6 group">
                      
                      {/* Node Indicator */}
                      <div className="relative mt-6 shrink-0">
                        {isCompleted && (
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-white shadow-sm z-10 relative">
                            <Check size={18} strokeWidth={3} />
                          </div>
                        )}
                        {isActive && (
                          <div className="w-8 h-8 rounded-full bg-[#f4effd] border-2 border-[#6225E6] flex items-center justify-center ring-4 ring-white shadow-sm z-10 relative">
                            <div className="w-2.5 h-2.5 bg-[#6225E6] rounded-full"></div>
                          </div>
                        )}
                        {isLocked && (
                          <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 ring-4 ring-white shadow-sm z-10 relative group-hover:border-gray-300 transition-colors">
                            <Lock size={14} />
                          </div>
                        )}
                        {/* Fill the line above if active */}
                        {isActive && <div className="absolute top-0 bottom-full left-1/2 w-0.5 bg-green-500 -translate-x-1/2 -mt-16 h-16 z-0"></div>}
                      </div>

                      {/* Card */}
                      <div className={`flex-1 bg-white rounded-2xl border transition-all duration-200
                        ${isActive ? 'border-[#6225E6] shadow-md shadow-[#6225E6]/10' : 'border-gray-200 shadow-sm'}
                        ${isLocked ? 'opacity-70 grayscale-[0.2]' : ''}
                      `}>
                        {/* Card Header */}
                        <div 
                          className={`p-6 flex flex-wrap lg:flex-nowrap items-center gap-6 cursor-pointer ${isActive ? 'bg-[#f4effd]/30 rounded-t-2xl' : ''}`}
                          onClick={() => {
                            if (!isLocked) {
                              setExpandedPhase(isExpanded ? null : phase.id);
                            }
                          }}
                        >
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                            ${isCompleted ? 'bg-green-50 text-green-600' : 
                              isActive ? 'bg-[#f4effd] text-[#6225E6]' : 'bg-gray-50 text-gray-400'}`}>
                            <phase.icon size={28} />
                          </div>
                          
                          <div className="flex-1 min-w-[200px]">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{phase.title}</div>
                            <h4 className={`text-lg font-bold mb-1 ${isActive ? 'text-[#6225E6]' : 'text-gray-900'}`}>{phase.subtitle}</h4>
                            <p className="text-sm text-gray-500">{phase.description}</p>
                          </div>

                          <div className="flex flex-wrap items-center gap-6 xl:gap-12 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                            {/* Progress bar */}
                            <div className="w-32 hidden sm:block">
                              <div className="flex justify-between text-xs font-semibold mb-1.5">
                                <span className={isCompleted ? 'text-green-600' : isActive ? 'text-[#6225E6]' : 'text-gray-500'}>{phase.status}</span>
                                <span className="text-gray-900">{phase.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-[#6225E6]'}`} style={{ width: `${phase.progress}%` }}></div>
                              </div>
                            </div>

                            <div className="flex gap-8 lg:gap-12">
                              <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Milestones</div>
                                <div className="font-bold text-gray-900">{phase.completedMilestones} <span className="text-gray-400 font-medium">/ {phase.totalMilestones}</span></div>
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">XP Earned</div>
                                <div className="font-bold text-gray-900 flex items-center gap-1">{phase.xpEarned} <span className="text-xs font-semibold text-gray-500">XP</span></div>
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status</div>
                                <div className={`font-bold ${isCompleted ? 'text-green-600' : isActive ? 'text-[#6225E6]' : 'text-gray-500'}`}>
                                  {phase.statusText}
                                </div>
                              </div>
                            </div>

                            {!isLocked && (
                              <div className="ml-auto lg:ml-0 text-gray-400">
                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expanded Milestones */}
                        {isExpanded && phase.milestones && (
                          <div className="border-t border-gray-100 p-6 bg-white rounded-b-2xl animate-in slide-in-from-top-2 duration-200">
                            <div className="pl-[80px] space-y-4">
                              {phase.milestones.map((milestone, idx) => (
                                <div key={milestone.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-colors
                                  ${milestone.completed ? 'bg-green-50/30 border-green-100' : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 hover:bg-white'}
                                `}>
                                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-sm text-gray-500 shrink-0">
                                      {idx + 1}
                                    </div>
                                    <div>
                                      <div className={`font-semibold text-sm mb-1 ${milestone.completed ? 'text-green-800' : 'text-gray-900'}`}>{milestone.title}</div>
                                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                                        <span className="flex items-center gap-1"><PlayCircle size={14} /> Video: {milestone.videos}</span>
                                        <span className="flex items-center gap-1"><Code size={14} /> Problems: {milestone.problems}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-[#f4effd] hover:text-[#6225E6] hover:border-[#e7defa] transition-colors flex items-center justify-center gap-1.5">
                                      <PlayCircle size={14} /> Watch
                                    </button>
                                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-[#f4effd] hover:text-[#6225E6] hover:border-[#e7defa] transition-colors flex items-center justify-center gap-1.5">
                                      <Code size={14} /> Practise
                                    </button>
                                    <button 
                                      onClick={() => !milestone.completed && handleCompleteMilestone(phase.id, milestone.id)}
                                      disabled={milestone.completed}
                                      className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5
                                        ${milestone.completed 
                                          ? 'bg-green-500 text-white border border-green-500 shadow-sm' 
                                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                      {milestone.completed ? <CheckCircle size={14} className="fill-white text-green-500" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-400"></div>}
                                      Done
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show More Phases */}
              <div className="relative flex justify-center mt-8 z-10">
                <button className="bg-white border border-gray-200 text-gray-500 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-gray-50 hover:text-[#6225E6] transition-colors shadow-sm flex items-center gap-2">
                  Show More Phases <ChevronDown size={16} />
                </button>
              </div>

            </div>
          </section>

          {/* TWO COLUMNS: ACHIEVEMENTS & LEADERBOARD */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4">
            
            {/* ACHIEVEMENTS */}
            <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                    <Trophy className="text-[#6225E6]" size={20} />
                    Achievements
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Every milestone brings you closer to your next badge.</p>
                </div>
                <button className="text-xs font-bold text-[#6225E6] hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map(ach => (
                  <div key={ach.id} className={`p-4 rounded-2xl border text-center relative overflow-hidden transition-all
                    ${ach.completed ? 'bg-white border-green-200 shadow-sm' : 'bg-gray-50/50 border-gray-100'}
                  `}>
                    {ach.completed && <div className="absolute top-2 right-2 text-green-500"><CheckCircle size={16} className="fill-current text-white" /></div>}
                    
                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 ${ach.color} ${!ach.completed ? 'opacity-80' : 'ring-4 ring-green-50 shadow-inner'}`}>
                      <ach.icon size={28} className={ach.completed ? 'fill-current' : ''} />
                    </div>
                    <div className={`font-bold text-sm mb-1 ${ach.completed ? 'text-gray-900' : 'text-gray-700'}`}>{ach.title}</div>
                    <div className="text-[10px] text-gray-500 mb-3 h-8">{ach.desc}</div>
                    
                    {!ach.completed ? (
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1.5 overflow-hidden">
                          <div className={`h-full rounded-full ${ach.color.split(' ')[0]}`} style={{ width: `${(ach.progress/ach.total)*100}%` }}></div>
                        </div>
                        <div className="text-[10px] font-semibold text-gray-500">{ach.progress.toLocaleString()} / {ach.total.toLocaleString()}</div>
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold text-green-600 bg-green-50 py-1 rounded-full w-full">✓ Completed</div>
                    )}
                  </div>
                ))}
                
                {/* View More Card */}
                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-2 shadow-sm">
                    <ChevronRight size={20} />
                  </div>
                  <div className="text-xs font-bold text-gray-600">View 15 More</div>
                </div>
              </div>
            </section>

            {/* LEADERBOARD */}
            <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Users className="text-[#6225E6]" size={20} />
                  Leaderboard
                </h3>
                <select className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>All Time</option>
                </select>
              </div>

              <div className="flex-1 space-y-1">
                {LEADERBOARD.map((user) => (
                  <div key={user.rank} className={`flex items-center gap-4 p-3 rounded-xl transition-colors
                    ${user.isUser ? 'bg-[#f4effd] border border-[#e7defa] shadow-sm' : 'hover:bg-gray-50 border border-transparent'}
                  `}>
                    <div className="w-6 text-center font-bold text-sm text-gray-400 shrink-0">
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm shrink-0
                      ${user.isUser ? 'bg-[#6225E6] text-white font-bold text-sm' : 'bg-gray-100'}`}
                    >
                      {user.avatar}
                    </div>
                    <div className={`font-semibold text-sm flex-1 ${user.isUser ? 'text-[#6225E6]' : 'text-gray-900'}`}>
                      {user.name}
                    </div>
                    <div className="font-bold text-gray-900 text-sm bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">
                      {user.xp.toLocaleString()} <span className="text-xs text-gray-400 font-medium">XP</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 mt-auto border-t border-gray-100 text-center">
                <button className="text-sm font-bold text-[#6225E6] hover:underline flex items-center justify-center gap-1 mx-auto w-full">
                  View Full Leaderboard <ChevronRight size={16} />
                </button>
              </div>
            </section>

          </div>
          
        </div>
      </main>
    </div>
  );
}
