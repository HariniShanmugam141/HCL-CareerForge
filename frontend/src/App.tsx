import { useState } from 'react';
import Dashboard from './Dashboard';
import Auth from './Auth';
import Onboarding from './Onboarding';
import CreatorOnboarding from './CreatorOnboarding';
import CreatorDashboard from './CreatorDashboard';
import CreatorMyVideos from './CreatorMyVideos';
import CreatorAddVideo from './CreatorAddVideo';
import CreatorPromotions from './CreatorPromotions';
import CreatorAnalytics from './CreatorAnalytics';
import CreatorLearners from './CreatorLearners';
import CreatorProfile from './CreatorProfile';
import PromotionsPage from './PromotionsPage';
import AdminDashboard from './AdminDashboard';
import PracticePage from './PracticePage';
import ProgressPage from './ProgressPage';

export default function App() {
  const [view, setView] = useState<'auth' | 'onboarding' | 'dashboard' | 'creator_my_videos' | 'creator_add_video' | 'creator_promotions' | 'creator_analytics' | 'creator_learners' | 'creator_profile' | 'promotions' | 'admin' | 'practice' | 'progress'>('dashboard');
  const [userName, setUserName] = useState('Bhavya Shree D'); // Default for mockup
  const [isNewUser, setIsNewUser] = useState(false);
  const [role, setRole] = useState('Learner');

  const handleLogin = (isNew: boolean, name: string, userRole: string) => {
    setUserName(name);
    setIsNewUser(isNew);
    setRole(userRole);
    if (isNew) {
      localStorage.removeItem('careerforge_onboarding');
      setView('onboarding');
    } else {
      setView(userRole === 'Admin' ? 'admin' : 'dashboard');
    }
  };

  const handleLogout = () => {
    setView('auth');
  };

  const handleNavigate = (newView: string) => {
    if (['dashboard', 'creator_my_videos', 'creator_add_video', 'creator_promotions', 'creator_analytics', 'creator_learners', 'creator_profile', 'promotions', 'admin', 'practice', 'progress'].includes(newView)) {
      setView(newView as any);
    }
  };

  if (view === 'onboarding') {
    if (role === 'Creator') {
      return <CreatorOnboarding onComplete={() => setView('dashboard')} initialName={userName} />;
    }
    return <Onboarding onComplete={() => setView('dashboard')} />;
  }

  if (view === 'dashboard') {
    if (role === 'Creator') {
      return <CreatorDashboard onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
    }
    return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} isNewUser={isNewUser} />;
  }

  if (view === 'practice') {
    return <PracticePage onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'progress') {
    return <ProgressPage onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'creator_my_videos') {
    return <CreatorMyVideos onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'creator_add_video') {
    return <CreatorAddVideo onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'creator_promotions') {
    return <CreatorPromotions onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'creator_analytics') {
    return <CreatorAnalytics onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'creator_learners') {
    return <CreatorLearners onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'creator_profile') {
    return <CreatorProfile onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'promotions') {
    return <PromotionsPage />;
  }

  if (view === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <Auth onLogin={handleLogin} />;
}
