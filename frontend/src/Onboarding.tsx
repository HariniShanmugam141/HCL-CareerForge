import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Code, 
  BrainCircuit, 
  BarChart3, 
  Shield, 
  UploadCloud, 
  FileText,
  PlaySquare,
  TerminalSquare,
  BookOpen,
  FolderKanban,
  LayoutGrid,
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Sparkles,
  Info
} from 'lucide-react';
import Confetti from 'react-confetti';
import { auth, db } from './firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// --- TYPES ---
type CareerInterest = 'Software Development' | 'AI / ML' | 'Data Science' | 'Cybersecurity' | '';
type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | '';
type Timeline = '3 MONTHS' | '6 MONTHS' | '1 YEAR' | '';

interface OnboardingState {
  currentStep: number;
  isCompleted: boolean;
  careerInterest: CareerInterest;
  existingSkills: string[];
  experienceLevel: ExperienceLevel;
  learningStyles: string[];
  timeline: Timeline;
}

const initialState: OnboardingState = {
  currentStep: 1,
  isCompleted: false,
  careerInterest: '',
  existingSkills: [],
  experienceLevel: '',
  learningStyles: [],
  timeline: ''
};

const SKILLS_LIST = [
  'Python', 'Java', 'JavaScript', 'SQL', 'HTML / CSS', 
  'Git', 'React', 'Node.js', 'Pandas', 'NumPy', 
  'Machine Learning', 'DSA'
];

export default function Onboarding({ onComplete }: { onComplete?: () => void }) {
  const [state, setState] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem('careerforge_onboarding');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialState;
      }
    }
    return initialState;
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    localStorage.setItem('careerforge_onboarding', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<OnboardingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (state.currentStep < 5) {
      updateState({ currentStep: state.currentStep + 1 });
    } else if (state.currentStep === 5) {
      setIsGenerating(true);
      updateState({ isCompleted: true });
      setTimeout(() => {
        setIsGenerating(false);
      }, 2500);
    }
  };

  const handleComplete = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          careerInterest: state.careerInterest,
          existingSkills: state.existingSkills,
          experienceLevel: state.experienceLevel,
          learningStyles: state.learningStyles,
          timeline: state.timeline,
          onboardingCompleted: true,
          onboardingCompletedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Failed to save learner onboarding to Firestore:', err);
    } finally {
      if (onComplete) {
        onComplete();
      } else {
        window.location.reload();
      }
    }
  };

  const handleBack = () => {
    if (state.currentStep > 1) {
      updateState({ currentStep: state.currentStep - 1 });
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: return state.careerInterest !== '';
      case 2: return state.existingSkills.length > 0; // Or if they uploaded a resume, but we'll just check skills for now
      case 3: return state.experienceLevel !== '';
      case 4: return state.learningStyles.length > 0;
      case 5: return state.timeline !== '';
      default: return false;
    }
  };

  const canProceed = isStepComplete(state.currentStep);

  const steps = [
    { num: 1, title: 'Career Interest', subtitle: 'Choose where you want to grow' },
    { num: 2, title: 'Existing Skills', subtitle: 'Tell us what you already know' },
    { num: 3, title: 'Experience Level', subtitle: 'Help us understand your starting point' },
    { num: 4, title: 'Learning Style', subtitle: 'Tell us how you learn best' },
    { num: 5, title: 'Career Timeline', subtitle: 'Set your target timeframe' }
  ];

  if (state.isCompleted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {!isGenerating && (
          <Confetti 
            width={typeof window !== 'undefined' ? window.innerWidth : 1920} 
            height={typeof window !== 'undefined' ? window.innerHeight : 1080}
            recycle={false}
            numberOfPieces={800}
            gravity={0.15}
            colors={['#6225E6', '#7E4BEE', '#22c55e', '#F59E0B', '#3B82F6', '#EC4899']}
          />
        )}
        <div className="max-w-md w-full relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-[#f4effd] rounded-2xl flex items-center justify-center text-[#6225E6]">
              {isGenerating ? <Loader2 size={32} className="animate-spin" /> : <Sparkles size={32} />}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {isGenerating ? 'Generating your personalized roadmap...' : 'Your CareerForge journey is ready. 🚀'}
          </h1>
          <p className="text-gray-500 mb-10">
            {isGenerating 
              ? 'Analyzing your goals, skills, and experience...'
              : "We've captured your goals, skills, experience and learning preferences."}
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Career Goal</div>
                <div className="text-gray-900 font-medium">{state.careerInterest}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Experience</div>
                <div className="text-gray-900 font-medium capitalize">{state.experienceLevel.toLowerCase()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Learning Style</div>
                <div className="text-gray-900 font-medium">{state.learningStyles[0]}{state.learningStyles.length > 1 ? ' + more' : ''}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Timeline</div>
                <div className="text-gray-900 font-medium">{state.timeline}</div>
              </div>
            </div>
          </div>

          {!isGenerating && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-gray-900 font-medium mb-6">Your roadmap is ready.</p>
              <button 
                onClick={handleComplete}
                className="w-full bg-[#6225E6] hover:bg-[#501ac4] text-white py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                Enter My CareerForge Dashboard <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">Career<span className="text-[#6225E6]">Forge</span></h1>
        </div>
        <div className="text-sm font-medium text-gray-500 hidden sm:block">
          Your journey begins here.
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        
        {/* Mobile Progress Bar */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-16 z-10">
           <div className="flex justify-between items-center max-w-md mx-auto">
              {steps.map((s, idx) => {
                const isPast = state.currentStep > s.num || isStepComplete(s.num);
                const isCurrent = state.currentStep === s.num;
                return (
                  <div key={s.num} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                      ${isPast ? 'bg-green-500 text-white' : 
                        isCurrent ? 'bg-[#6225E6] text-white' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {isPast ? <Check size={16} /> : s.num}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`w-8 sm:w-12 h-1 mx-1 rounded ${isPast ? 'bg-green-500' : 'bg-gray-100'}`} />
                    )}
                  </div>
                );
              })}
           </div>
        </div>

        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex w-80 shrink-0 flex-col py-10 px-8 border-r border-gray-200 bg-white min-h-[calc(100vh-64px)]">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Build Your Career Path</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tell us a little about where you are and where you want to go. CareerForge will use this to shape your learning roadmap.
            </p>
          </div>

          <div className="space-y-6 flex-1 relative">
            {steps.map((step, idx) => {
              const isPast = state.currentStep > step.num || isStepComplete(step.num);
              const isCurrent = state.currentStep === step.num;
              
              return (
                <div 
                  key={step.num} 
                  className={`flex gap-4 relative ${isPast ? 'cursor-pointer hover:opacity-80' : ''}`}
                  onClick={() => {
                    if (isPast || (step.num < state.currentStep)) {
                      updateState({ currentStep: step.num });
                    }
                  }}
                >
                  {/* Connection Line */}
                  {idx < steps.length - 1 && (
                    <div className={`absolute left-4 top-10 bottom-[-24px] w-0.5 
                      ${(state.currentStep > step.num) ? 'bg-green-500' : 'bg-gray-200'}`} 
                    />
                  )}

                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center z-10 transition-colors duration-300
                    ${isPast ? 'bg-green-500 text-white' : 
                      isCurrent ? 'bg-[#f4effd] border-2 border-[#6225E6] text-[#6225E6]' : 
                      'bg-white border-2 border-gray-200 text-gray-400'}`}
                  >
                    {isPast ? <Check size={16} strokeWidth={3} /> : <span className="text-sm font-semibold">{`0${step.num}`}</span>}
                  </div>
                  
                  <div className="pb-4">
                    <div className={`font-semibold text-sm mb-1 transition-colors
                      ${isPast ? 'text-green-700' : 
                        isCurrent ? 'text-[#6225E6]' : 'text-gray-500'}`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{isPast ? 'Completed' : step.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
              <Info size={16} className="text-gray-400" />
              Why CareerForge asks
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              These answers help us identify your starting point and create a roadmap that matches your career goal.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 py-8 px-4 sm:px-8 lg:py-12 lg:px-16 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-10 min-h-[600px] flex flex-col">
            
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-4">
                Step {state.currentStep} of 5
              </span>
              
              {/* Step 1 Header */}
              {state.currentStep === 1 && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Where do you want your career to go?</h2>
                  <p className="text-gray-500 text-sm sm:text-base">Choose the career domain you're interested in. We'll use this as the foundation for your CareerForge roadmap.</p>
                </>
              )}

              {/* Step 2 Header */}
              {state.currentStep === 2 && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">What skills do you already have?</h2>
                  <p className="text-gray-500 text-sm sm:text-base">CareerForge won't make you relearn what you already know.</p>
                </>
              )}

              {/* Step 3 Header */}
              {state.currentStep === 3 && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Where are you starting from?</h2>
                  <p className="text-gray-500 text-sm sm:text-base">This helps CareerForge decide whether you need a complete roadmap or a skill-gap-focused roadmap.</p>
                </>
              )}

              {/* Step 4 Header */}
              {state.currentStep === 4 && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">How do you learn best?</h2>
                  <p className="text-gray-500 text-sm sm:text-base">Choose the learning formats that help you make progress consistently.</p>
                </>
              )}

              {/* Step 5 Header */}
              {state.currentStep === 5 && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">When do you want to reach your next career milestone?</h2>
                  <p className="text-gray-500 text-sm sm:text-base">Choose a realistic timeframe so CareerForge can pace your roadmap.</p>
                </>
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 mb-10">
              
              {/* STEP 1: CAREER INTEREST */}
              {state.currentStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'Software Development', icon: Code, desc: 'Build applications, solve problems and create impactful software.' },
                    { id: 'AI / ML', icon: BrainCircuit, desc: 'Build intelligent systems that learn, predict and make decisions.' },
                    { id: 'Data Science', icon: BarChart3, desc: 'Turn data into insights and drive better decisions.' },
                    { id: 'Cybersecurity', icon: Shield, desc: 'Protect systems, applications and data from digital threats.' }
                  ].map(item => {
                    const isSelected = state.careerInterest === item.id;
                    const Icon = item.icon;
                    return (
                      <div 
                        key={item.id}
                        onClick={() => updateState({ careerInterest: item.id as CareerInterest })}
                        className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 
                          ${isSelected 
                            ? 'border-[#6225E6] bg-[#f4effd]' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-[#6225E6]">
                            <CheckCircle2 size={20} className="fill-current text-white" />
                          </div>
                        )}
                        <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center 
                          ${isSelected ? 'bg-[#6225E6] text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <Icon size={20} />
                        </div>
                        <h3 className={`font-semibold mb-2 ${isSelected ? 'text-[#6225E6]' : 'text-gray-900'}`}>{item.id}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed pr-6">{item.desc}</p>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* STEP 2: EXISTING SKILLS */}
              {state.currentStep === 2 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div>
                    <div className="flex flex-wrap gap-3">
                      {SKILLS_LIST.map(skill => {
                        const isSelected = state.existingSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            onClick={() => {
                              if (isSelected) {
                                updateState({ existingSkills: state.existingSkills.filter(s => s !== skill) });
                              } else {
                                updateState({ existingSkills: [...state.existingSkills, skill] });
                              }
                            }}
                            className={`px-4 py-2.5 rounded-xl border font-medium text-sm transition-all
                              ${isSelected 
                                ? 'border-[#6225E6] bg-[#f4effd] text-[#6225E6]' 
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
                          >
                            {skill} {isSelected && <Check size={14} className="inline ml-1" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-3 text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Upload Resume</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Already have experience? Upload your resume and CareerForge can use it to understand your existing skills, tools, projects and experience.
                    </p>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#6225E6] mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      <div className="font-medium text-gray-900 mb-1">Click to upload or drag and drop</div>
                      <div className="text-xs text-gray-500">PDF, DOC or DOCX (Max 5 MB)</div>
                      
                      {/* For demo purposes, clicking here could just add some dummy skills */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateState({ existingSkills: [...new Set([...state.existingSkills, 'JavaScript', 'React', 'HTML / CSS'])] });
                        }}
                        className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Simulate Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: EXPERIENCE LEVEL */}
              {state.currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {[
                    { id: 'BEGINNER', label: 'Beginner', desc: 'Start from the fundamentals and build your skills step by step.' },
                    { id: 'INTERMEDIATE', label: 'Intermediate', desc: 'I already have foundational skills and want to close my remaining gaps.' },
                    { id: 'ADVANCED', label: 'Advanced', desc: 'I have strong experience and want to sharpen advanced skills and career readiness.' }
                  ].map(level => {
                    const isSelected = state.experienceLevel === level.id;
                    return (
                      <div 
                        key={level.id}
                        onClick={() => updateState({ experienceLevel: level.id as ExperienceLevel })}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4
                          ${isSelected 
                            ? 'border-[#6225E6] bg-[#f4effd]' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                          ${isSelected ? 'border-[#6225E6]' : 'border-gray-300'}`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#6225E6] rounded-full" />}
                        </div>
                        <div>
                          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-[#6225E6]' : 'text-gray-900'}`}>{level.label}</h3>
                          <p className="text-sm text-gray-500">{level.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                  
                  <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3">
                    <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-blue-900 mb-1">Why this matters</div>
                      <div className="text-sm text-blue-800/80">Your experience level helps CareerForge avoid unnecessary learning and focus your roadmap on what you actually need.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: LEARNING STYLE */}
              {state.currentStep === 4 && (
                <div className="grid grid-cols-1 gap-3 animate-in fade-in duration-300">
                  {[
                    { id: 'Video Learning', icon: PlaySquare, desc: 'Learn through guided explanations and visual lessons.' },
                    { id: 'Hands-on Practice', icon: TerminalSquare, desc: 'Learn by solving problems and applying concepts.' },
                    { id: 'Reading & Documentation', icon: BookOpen, desc: 'Learn through articles, documentation and references.' },
                    { id: 'Projects', icon: FolderKanban, desc: 'Learn by building real-world applications.' },
                    { id: 'Mixed Learning', icon: LayoutGrid, desc: 'A balanced combination of different learning formats.' }
                  ].map(style => {
                    const isSelected = state.learningStyles.includes(style.id);
                    const Icon = style.icon;
                    return (
                      <div 
                        key={style.id}
                        onClick={() => {
                          if (style.id === 'Mixed Learning') {
                            updateState({ learningStyles: ['Mixed Learning'] });
                          } else {
                            const newStyles = isSelected 
                              ? state.learningStyles.filter(s => s !== style.id)
                              : [...state.learningStyles.filter(s => s !== 'Mixed Learning'), style.id];
                            updateState({ learningStyles: newStyles });
                          }
                        }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                          ${isSelected 
                            ? 'border-[#6225E6] bg-[#f4effd]' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                            ${isSelected ? 'bg-[#6225E6] text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h3 className={`font-medium mb-0.5 ${isSelected ? 'text-[#6225E6]' : 'text-gray-900'}`}>{style.id}</h3>
                            <p className="text-sm text-gray-500">{style.desc}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded border flex items-center justify-center
                          ${isSelected ? 'bg-[#6225E6] border-[#6225E6] text-white' : 'border-gray-300 bg-white'}`}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* STEP 5: CAREER TIMELINE */}
              {state.currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {[
                    { id: '3 MONTHS', label: '3 Months', desc: 'Fast-track your learning journey.' },
                    { id: '6 MONTHS', label: '6 Months', desc: 'Build skills with a balanced learning pace.' },
                    { id: '1 YEAR', label: '1 Year', desc: 'Take a steady path with deeper learning and projects.' }
                  ].map(time => {
                    const isSelected = state.timeline === time.id;
                    return (
                      <div 
                        key={time.id}
                        onClick={() => updateState({ timeline: time.id as Timeline })}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4
                          ${isSelected 
                            ? 'border-[#6225E6] bg-[#f4effd]' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                          ${isSelected ? 'border-[#6225E6]' : 'border-gray-300'}`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#6225E6] rounded-full" />}
                        </div>
                        <div>
                          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-[#6225E6]' : 'text-gray-900'}`}>{time.label}</h3>
                          <p className="text-sm text-gray-500">{time.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                  
                  <div className="mt-6 bg-[#f4effd] border border-[#e1d4fb] rounded-xl p-5">
                    <h4 className="font-semibold text-[#6225E6] mb-2">Your roadmap will adapt to your timeline.</h4>
                    <p className="text-sm text-gray-600">CareerForge will organize milestones and learning tasks around the timeframe you choose.</p>
                  </div>
                </div>
              )}

            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
              {state.currentStep > 1 ? (
                <button 
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft size={18} /> Back
                </button>
              ) : (
                <div /> // Placeholder for layout
              )}
              
              <button 
                onClick={handleNext}
                disabled={!canProceed}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
                  ${canProceed 
                    ? 'bg-[#6225E6] hover:bg-[#501ac4] text-white shadow-md shadow-[#6225E6]/20' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                {state.currentStep === 5 ? 'Build My Career Roadmap' : `Continue to ${steps[state.currentStep]?.title || 'Next'}`}
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
