
import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import PublicView from './views/PublicView';
import AdminView from './views/AdminView';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PUBLIC);

  const toggleView = () => {
    setViewMode(prev => prev === ViewMode.PUBLIC ? ViewMode.ADMIN : ViewMode.PUBLIC);
  };

  useEffect(() => {
    document.title = viewMode === ViewMode.PUBLIC 
      ? "SID Maju Jaya - Desa Terpadu" 
      : "Admin Dashboard - SID Maju Jaya";
  }, [viewMode]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {viewMode === ViewMode.PUBLIC ? (
        <PublicView onLoginClick={toggleView} />
      ) : (
        <AdminView onLogoutClick={toggleView} />
      )}

      {/* Floating View Switcher (Helper for development/demo) */}
      <div className="fixed bottom-6 right-6 z-[60] group">
        <button 
          onClick={toggleView}
          className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-bold border-2 border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-500"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
          {viewMode === ViewMode.PUBLIC ? 'Switch to Admin' : 'Switch to Citizen'}
        </button>
      </div>
    </div>
  );
};

export default App;
