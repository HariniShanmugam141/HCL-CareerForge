import { useState } from 'react';
import Dashboard from './Dashboard';
import Auth from './Auth';
import Onboarding from './Onboarding';
import CreatorOnboarding from './CreatorOnboarding';
import CreatorDashboard from './CreatorDashboard';

export default function App() {
  const [view, setView] = useState<'auth' | 'onboarding' | 'dashboard'>('auth');
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
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setView('auth');
  };

  if (view === 'onboarding') {
    if (role === 'Creator') {
      return <CreatorOnboarding onComplete={() => setView('dashboard')} initialName={userName} />;
    }
    return <Onboarding onComplete={() => setView('dashboard')} />;
  }

  if (view === 'dashboard') {
    if (role === 'Creator') {
      return <CreatorDashboard onLogout={handleLogout} userName={userName} />;
    }
    return <Dashboard onLogout={handleLogout} userName={userName} isNewUser={isNewUser} />;
  }

  return <Auth onLogin={handleLogin} />;
}
