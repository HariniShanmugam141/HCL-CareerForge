import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, ChevronRight, GraduationCap, MonitorPlay, ShieldAlert, UserPlus, LogIn, Loader2 } from 'lucide-react';
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile,
  getAdditionalUserInfo
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export default function Auth({ onLogin }: { onLogin: (isNewUser: boolean, userName: string, role: string) => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'Learner' | 'Creator' | 'Admin'>('Learner');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // --- SIGN UP ---
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uName = fullName || email.split('@')[0];

        // Update Firebase Auth display name
        await updateProfile(user, { displayName: uName });

        // Save user profile + role to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: uName,
          email: user.email,
          role: selectedRole,
          createdAt: serverTimestamp(),
        });

        onLogin(true, uName, selectedRole);

      } else {
        // --- SIGN IN ---
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uName = user.displayName || email.split('@')[0];

        // Read role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role : selectedRole;

        onLogin(false, uName, role);
      }
    } catch (err: any) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const details = getAdditionalUserInfo(userCredential);
      const isNew = details?.isNewUser || false;
      const uName = user.displayName || user.email?.split('@')[0] || 'Learner';

      if (isNew) {
        // New Google user — save their profile + role to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: uName,
          email: user.email,
          role: selectedRole,
          createdAt: serverTimestamp(),
        });
        onLogin(true, uName, selectedRole);
      } else {
        // Existing Google user — read their role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role : selectedRole;
        onLogin(false, uName, role);
      }
    } catch (err: any) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden min-h-[700px]">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-[#fdfcfd] border-r border-gray-100 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Career<span className="text-[#6225E6]">Forge</span></h1>
            </div>
            
            <p className="text-gray-600 mb-10 text-sm leading-relaxed">
              Plan. Learn. Practice.<br />Progress. <span className="text-[#6225E6] font-medium">Succeed.</span>
            </p>

            <div className="mb-4 text-xs font-bold text-[#6225E6] tracking-wider uppercase">
              {isSignUp ? 'SIGN UP AS' : 'SIGN IN AS'}
            </div>

            <div className="space-y-3">
              {[
                { id: 'Learner', icon: GraduationCap, desc: 'Follow your roadmap, learn skills and achieve your goals.' },
                { id: 'Creator', icon: MonitorPlay, desc: 'Share knowledge, inspire learners and grow your impact.' },
                { id: 'Admin', icon: ShieldAlert, desc: 'Manage the platform, users and ensure everything runs smoothly.' }
              ].map(role => {
                const isActive = selectedRole === role.id;
                const Icon = role.icon;
                return (
                  <button 
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id as any)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group relative
                      ${isActive 
                        ? 'border-[#6225E6] bg-[#f4effd]' 
                        : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className={`p-2 rounded-full shrink-0 transition-colors
                      ${isActive ? 'bg-[#6225E6] text-white' : 'bg-white border border-gray-200 text-[#6225E6]'}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className={`font-semibold mb-1 transition-colors
                        ${isActive ? 'text-[#6225E6]' : 'text-gray-900 group-hover:text-[#6225E6]'}`}>{role.id}</div>
                      <div className="text-xs text-gray-500 pr-4">{role.desc}</div>
                    </div>
                    <ChevronRight 
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors
                        ${isActive ? 'text-[#6225E6]' : 'text-gray-400 group-hover:text-[#6225E6]'}`} 
                      size={18} 
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-3 text-sm">
              <div className="text-[#6225E6] mt-1 shrink-0">
                {isSignUp ? <MonitorPlay size={18} /> : <div className="text-xl">📈</div>}
              </div>
              <div>
                <div className="font-semibold text-[#6225E6] mb-1">
                  {isSignUp ? 'Your journey starts here.' : 'Every step counts.'}
                </div>
                <div className="text-xs text-gray-500">
                  {isSignUp ? 'One account. Endless opportunities.' : 'Track your progress today, build your future tomorrow.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="flex items-center gap-2 text-[#6225E6] font-medium text-sm mb-4">
              <span>{isSignUp ? '✨' : '👋'}</span>
              <span>{isSignUp ? "Let's build your future together!" : "Welcome back, future achiever!"}</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {isSignUp ? (
                <>Create your <br /><span className="text-[#6225E6]">CareerForge</span> account</>
              ) : (
                <>Sign in to continue <br />your <span className="text-[#6225E6]">career journey</span></>
              )}
            </h2>
            
            <p className="text-gray-500 mb-6 text-sm">
              {isSignUp 
                ? "Join a smart learning ecosystem and unlock personalized roadmaps, resources and more." 
                : "Access your personalized roadmap, continue learning, track progress and stay consistent."}
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="relative flex py-4 items-center mb-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 bg-white px-2">
                <ShieldCheck size={20} className="text-[#6225E6]" />
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6225E6]/50 focus:border-[#6225E6] text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{isSignUp ? 'Email' : 'Email'}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6225E6]/50 focus:border-[#6225E6] text-sm"
                    placeholder={isSignUp ? "Enter your email address" : "Enter your email"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-32 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6225E6]/50 focus:border-[#6225E6] text-sm"
                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  />
                  {isSignUp ? (
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  ) : (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <a href="#" className="text-xs text-[#6225E6] font-medium hover:underline">Forgot Password?</a>
                    </div>
                  )}
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Re-enter Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6225E6]/50 focus:border-[#6225E6] text-sm"
                      placeholder="Re-enter your password"
                    />
                     <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center pt-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-[#6225E6] bg-gray-100 border-gray-300 rounded focus:ring-[#6225E6] accent-[#6225E6]" 
                  defaultChecked
                />
                <label className="ml-2 text-sm text-gray-600">
                  {isSignUp ? (
                    <>I agree to the <a href="#" className="text-[#6225E6] hover:underline">Terms of Service</a> and <a href="#" className="text-[#6225E6] hover:underline">Privacy Policy</a></>
                  ) : (
                    "Remember me on this device"
                  )}
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-[#6225E6] hover:bg-[#501ac4] text-white py-3 rounded-lg font-medium transition-colors mt-6 flex justify-center items-center gap-2 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isSignUp ? (
                  <>
                    <UserPlus size={18} />
                    Create My CareerForge Account
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign in to CareerForge
                  </>
                )}
              </button>
            </form>

            <div className="relative flex py-6 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-gray-400">
                {isSignUp ? 'or sign up with' : 'or continue with'}
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleSignIn} 
              disabled={loading}
              className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors flex justify-center items-center gap-2 text-sm shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.01 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17 18.63 6.78 16.72 5.92 14.17H2.23V17.03C4.03 20.61 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.92 14.17C5.7 13.51 5.58 12.77 5.58 12C5.58 11.23 5.7 10.49 5.92 9.83V6.97H2.23C1.49 8.44 1.05 10.15 1.05 12C1.05 13.85 1.49 15.56 2.23 17.03L5.92 14.17Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1 12 1C7.7 1 4.03 3.39 2.23 6.97L5.92 9.83C6.78 7.28 9.17 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-8 text-sm text-gray-600">
              {isSignUp ? (
                <>Already have an account? <button onClick={() => {setIsSignUp(false); setError('');}} className="text-[#6225E6] font-medium hover:underline">Sign in here</button></>
              ) : (
                <>New here? <button onClick={() => {setIsSignUp(true); setError('');}} className="text-[#6225E6] font-medium hover:underline">Sign up as a Learner / Creator / Admin</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
