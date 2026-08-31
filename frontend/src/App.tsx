import { useState } from 'react';
import Dashboard from './Dashboard';
import Auth from './Auth';
import Onboarding from './Onboarding';
import CreatorOnboarding from './CreatorOnboarding';
import CreatorDashboard from './CreatorDashboard';
import CreatorMyVideos from './CreatorMyVideos';
import PromotionsPage from './PromotionsPage';
import AdminDashboard from './AdminDashboard';

export default function App() {
  const [view, setView] = useState<'auth' | 'onboarding' | 'dashboard' | 'creator_my_videos' | 'promotions' | 'admin'>('admin');
  const [userName, setUserName] = useState('Arjun Raj'); // Default for mockup
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
    if (['dashboard', 'creator_my_videos', 'promotions', 'admin'].includes(newView)) {
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
    return <Dashboard onLogout={handleLogout} userName={userName} isNewUser={isNewUser} />;
  }

  if (view === 'creator_my_videos') {
    return <CreatorMyVideos onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} />;
  }

  if (view === 'promotions') {
    return <PromotionsPage />;
  }

  if (view === 'admin') {
    return <AdminDashboard />;
  }

  return <Auth onLogin={handleLogin} />;
}
