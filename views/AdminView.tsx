
import React, { useState } from 'react';
import { LetterType, LetterStatus, LetterRequest } from '../types';
import { Icons, COLORS } from '../constants';
import { generateNewsDraft } from '../services/geminiService';

interface AdminViewProps {
  onLogoutClick: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onLogoutClick }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newsTopic, setNewsTopic] = useState('');
  const [newsContent, setNewsContent] = useState('Tulis isi berita di sini...');
  const [isGenerating, setIsGenerating] = useState(false);

  const initialRequests: LetterRequest[] = [
    { id: '1', residentName: 'Budi Santoso', type: LetterType.SKTM, status: LetterStatus.PENDING, date: '2026-05-23', description: 'Beasiswa Kuliah' },
    { id: '2', residentName: 'Siti Aminah', type: LetterType.DOMISILI, status: LetterStatus.COMPLETED, date: '2026-05-22', description: 'Pindah Domisili' },
    { id: '3', residentName: 'Agus Pratama', type: LetterType.SKU, status: LetterStatus.PENDING, date: '2026-05-23', description: 'Kredit KUR' },
  ];

  const handleGenerateAI = async () => {
    if (!newsTopic) return;
    setIsGenerating(true);
    const draft = await generateNewsDraft(newsTopic);
    if (draft) setNewsContent(draft);
    setIsGenerating(false);
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-50">
        <div className="h-24 flex items-center px-8 border-b border-white/5">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight">SID ADMIN</h2>
        </div>
        
        <nav className="flex-1 py-10 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <SidebarItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<Icons.TrendingUp />} label="Ringkasan Utama" />
          <SidebarItem active={activeTab === 'citizens'} onClick={() => setActiveTab('citizens')} icon={<Icons.Users />} label="Data Kependudukan" />
          <SidebarItem active={activeTab === 'letters'} onClick={() => setActiveTab('letters')} icon={<Icons.FileText />} label="Layanan Surat" badge={3} />
          <SidebarItem active={activeTab === 'news'} onClick={() => setActiveTab('news')} icon={<Icons.MessageCircle />} label="Publikasi Berita" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onLogoutClick}
            className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl transition-all font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10">
          <h1 className="text-2xl font-black text-slate-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-blue-600 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 bg-slate-50 pl-4 pr-1 py-1 rounded-full border border-slate-200">
              <span className="text-sm font-bold text-slate-600">Admin Sekdes</span>
              <img src="https://ui-avatars.com/api/?name=Sekretaris+Desa&background=1e3a8a&color=fff" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StatCard label="Total Warga" val="3.420" icon={<Icons.Users />} color="blue" />
                <StatCard label="Permohonan Pending" val="3" icon={<Icons.FileText />} color="amber" />
                <StatCard label="Anggaran Terserap" val="45%" icon={<Icons.TrendingUp />} color="emerald" />
                <StatCard label="Aduan Baru" val="1" icon={<Icons.MessageCircle />} color="red" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 text-lg">Permohonan Surat Terbaru</h3>
                    <button className="text-blue-600 text-sm font-bold hover:underline">Kelola Semua</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                          <th className="px-8 py-5">Nama Warga</th>
                          <th className="px-8 py-5">Jenis Surat</th>
                          <th className="px-8 py-5">Status</th>
                          <th className="px-8 py-5 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {initialRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6 font-bold text-slate-700">{req.residentName}</td>
                            <td className="px-8 py-6 text-slate-500">{req.type}</td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                req.status === LetterStatus.PENDING ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {req.status}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20"><Icons.Check /></button>
                              <button className="bg-slate-200 text-slate-600 p-2 rounded-lg hover:bg-slate-300"><Icons.FileText /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                      AI Berita Desa
                    </h3>
                  </div>
                  <div className="p-8 space-y-6 flex-1">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Topik Utama</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={newsTopic}
                          onChange={(e) => setNewsTopic(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                          placeholder="Misal: Peresmian Pasar Desa..." 
                        />
                        <button 
                          onClick={handleGenerateAI}
                          disabled={isGenerating}
                          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          {isGenerating ? '...' : <><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg> Draft AI</>}
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 border border-slate-200 rounded-2xl p-6 bg-slate-50/30 overflow-y-auto custom-scrollbar max-h-[300px] whitespace-pre-wrap text-sm text-slate-600 leading-relaxed italic">
                      {newsContent}
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20">
                      Terbitkan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white p-20 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4">Fitur Segera Hadir</h2>
              <p className="text-slate-500 max-w-md">Modul manajemen {activeTab} sedang dalam pengembangan tahap lanjut untuk versi berikutnya.</p>
              <button onClick={() => setActiveTab('dashboard')} className="mt-8 text-blue-600 font-bold hover:underline">&larr; Kembali ke Dashboard</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const SidebarItem: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string, badge?: number}> = ({active, onClick, icon, label, badge}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
      active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
    }`}
  >
    <div className="flex items-center gap-4">
      <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
      <span className="font-bold tracking-tight">{label}</span>
    </div>
    {badge && (
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
        active ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

const StatCard: React.FC<{label: string, val: string, icon: React.ReactNode, color: 'blue' | 'amber' | 'emerald' | 'red'}> = ({label, val, icon, color}) => {
  const colorMap = {
    blue: 'border-blue-500 bg-blue-50/50 text-blue-600',
    amber: 'border-amber-500 bg-amber-50/50 text-amber-600',
    emerald: 'border-emerald-500 bg-emerald-50/50 text-emerald-600',
    red: 'border-red-500 bg-red-50/50 text-red-600'
  };

  return (
    <div className={`bg-white p-8 rounded-3xl shadow-sm border-l-[6px] ${colorMap[color].split(' ')[0]} border border-slate-200 hover:shadow-lg transition-all`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{label}</p>
          <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{val}</h3>
        </div>
        <div className={`p-4 rounded-2xl ${colorMap[color].split(' ')[1]} ${colorMap[color].split(' ')[2]}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <span className="text-emerald-500 flex items-center gap-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          12%
        </span>
        Sejak bulan lalu
      </div>
    </div>
  );
};

export default AdminView;
