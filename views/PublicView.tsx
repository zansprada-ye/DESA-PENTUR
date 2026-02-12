
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { VILLAGE_INFO, Icons, COLORS } from '../constants';
import VillageChat from '../components/VillageChat';

interface PublicViewProps {
  onLoginClick: () => void;
}

const PublicView: React.FC<PublicViewProps> = ({ onLoginClick }) => {
  const budgetData = [
    { name: 'Dana Desa', value: 60, color: COLORS.primary },
    { name: 'PADes', value: 25, color: COLORS.accent },
    { name: 'Bantuan Provinsi', value: 15, color: COLORS.secondary },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Navigation */}
      <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-blue-900 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">DESA {VILLAGE_INFO.name}</h1>
              <p className="text-xs text-blue-200">{VILLAGE_INFO.regency}</p>
            </div>
          </div>
          <ul className="hidden md:flex space-x-8 font-medium">
            <li><a href="#" className="hover:text-yellow-400 transition">Beranda</a></li>
            <li><a href="#layanan" className="hover:text-yellow-400 transition">Layanan</a></li>
            <li><a href="#transparansi" className="hover:text-yellow-400 transition">Transparansi</a></li>
            <li><a href="#berita" className="hover:text-yellow-400 transition">Kabar Desa</a></li>
          </ul>
          <button 
            onClick={onLoginClick}
            className="bg-yellow-500 text-blue-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition shadow-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Login Admin
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-slate-900 h-[550px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-blue-900/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1518134346397-28d8b6719b33?auto=format&fit=crop&w=1920&q=80" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Desa Maju Jaya Landscape"
        />
        
        <div className="relative z-20 px-6 max-w-4xl animate-in slide-in-from-bottom duration-700">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">Pelayanan Cepat,<br/><span className="text-yellow-400 underline decoration-blue-500/30">Transparan</span> & Modern</h2>
          <p className="text-xl mb-10 text-slate-100 max-w-2xl mx-auto font-light leading-relaxed">Mengurus administrasi desa kini jauh lebih mudah. Dari rumah, kapan saja, untuk kesejahteraan bersama.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#layanan" className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition transform hover:scale-105 shadow-xl">Buat Surat Online</a>
            <a href="#transparansi" className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition">Lihat Realisasi APBDes</a>
          </div>
        </div>
      </header>

      {/* Stats Quick Info */}
      <section className="py-12 bg-white shadow-2xl -mt-16 relative z-30 container mx-auto rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 px-8 border border-slate-100">
        {VILLAGE_INFO.stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4">
            <h3 className="text-4xl font-black text-blue-900 tracking-tighter mb-1">{stat.value}</h3>
            <p className="text-slate-500 font-medium uppercase text-xs tracking-widest">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Layanan Mandiri</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Digitalisasi Administrasi</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">Pilih jenis surat yang ingin Anda ajukan. Petugas kami akan memprosesnya dalam waktu maksimal 1x24 jam.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceCard 
              title="Surat Keterangan Usaha" 
              desc="Untuk keperluan pengajuan KUR bank atau izin usaha mikro di wilayah desa."
              icon={<Icons.FileText />}
              borderColor="border-blue-500"
              bgColor="bg-blue-50"
              iconColor="text-blue-600"
            />
            <ServiceCard 
              title="Surat Domisili" 
              desc="Keterangan tempat tinggal sementara bagi warga pendatang atau pindah."
              icon={<Icons.Home />}
              borderColor="border-emerald-500"
              bgColor="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <ServiceCard 
              title="Surat Ket. Tidak Mampu" 
              desc="Digunakan untuk keperluan beasiswa, bantuan sosial, atau jaminan kesehatan."
              icon={<Icons.Check />}
              borderColor="border-amber-500"
              bgColor="bg-amber-50"
              iconColor="text-amber-600"
            />
          </div>
        </div>
      </section>

      {/* Transparansi Section */}
      <section id="transparansi" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Transparansi Anggaran</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-8">Realisasi APBDes 2026</h2>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg">Pemerintah Desa berkomitmen menjunjung tinggi nilai akuntabilitas. Masyarakat berhak mengetahui setiap rupiah yang dikelola demi pembangunan Maju Jaya.</p>
              
              <div className="space-y-8">
                <ProgressItem label="Pembangunan Infrastruktur" percent={75} color="bg-blue-600" />
                <ProgressItem label="Pemberdayaan Masyarakat" percent={45} color="bg-emerald-500" />
                <ProgressItem label="Ketahanan Pangan" percent={20} color="bg-amber-500" />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl">
              <h4 className="font-bold text-slate-800 text-center text-xl mb-6">Distribusi Sumber Pendapatan</h4>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kabar Desa / News */}
      <section id="berita" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">Kabar Terbaru Maju Jaya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <NewsCard 
              img="https://picsum.photos/seed/desa1/600/400" 
              date="22 Mei 2026" 
              title="Gotong Royong Perbaikan Saluran Irigasi"
              category="Kegiatan"
            />
            <NewsCard 
              img="https://picsum.photos/seed/desa2/600/400" 
              date="18 Mei 2026" 
              title="Pelatihan Digital Marketing UMKM Desa"
              category="Ekonomi"
            />
            <NewsCard 
              img="https://picsum.photos/seed/desa3/600/400" 
              date="15 Mei 2026" 
              title="Lomba Kebersihan Antar Dusun"
              category="Sosial"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-slate-300 py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white text-2xl font-bold mb-6">Pemerintah Desa Maju Jaya</h4>
            <p className="max-w-md leading-relaxed mb-6">Sistem Informasi Desa (SID) ini dikelola oleh Pemerintah Desa Maju Jaya untuk mewujudkan pelayanan publik yang prima dan transparan.</p>
            <div className="flex gap-4">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="instagram" />
              <SocialIcon icon="youtube" />
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Tautan Cepat</h5>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-yellow-400 transition">Beranda</a></li>
              <li><a href="#layanan" className="hover:text-yellow-400 transition">Layanan</a></li>
              <li><a href="#transparansi" className="hover:text-yellow-400 transition">Transparansi</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Hubungi Kami</h5>
            <p className="mb-2">Jl. Raya Maju Jaya No. 1</p>
            <p className="mb-2">Email: info@majujaya.desa.id</p>
            <p>Telp: (021) 555-0123</p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-sm">
          <p>&copy; 2026 Pemerintah Desa Maju Jaya. Dikembangkan dengan ❤️ untuk masyarakat.</p>
        </div>
      </footer>

      {/* AI Assistant Button & Drawer */}
      <VillageChat />
    </div>
  );
};

const ServiceCard: React.FC<{title: string, desc: string, icon: React.ReactNode, borderColor: string, bgColor: string, iconColor: string}> = ({title, desc, icon, borderColor, bgColor, iconColor}) => (
  <div className={`bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-t-[6px] ${borderColor}`}>
    <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center ${iconColor} mb-6 shadow-inner`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-slate-800">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">{desc}</p>
    <button className={`${iconColor} font-bold flex items-center gap-2 group`}>
      Ajukan Sekarang 
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </button>
  </div>
);

const ProgressItem: React.FC<{label: string, percent: number, color: string}> = ({label, percent, color}) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-slate-700 font-semibold">{label}</span>
      <span className="text-slate-900 font-black">{percent}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
      <div className={`${color} h-4 rounded-full transition-all duration-1000 ease-out`} style={{width: `${percent}%`}}></div>
    </div>
  </div>
);

const NewsCard: React.FC<{img: string, date: string, title: string, category: string}> = ({img, date, title, category}) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer border border-slate-100">
    <div className="relative overflow-hidden h-52">
      <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={title} />
      <span className="absolute top-4 left-4 bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase">{category}</span>
    </div>
    <div className="p-8">
      <p className="text-slate-400 text-sm mb-2">{date}</p>
      <h4 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">{title}</h4>
    </div>
  </div>
);

const SocialIcon: React.FC<{icon: string}> = ({icon}) => (
  <div className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center cursor-pointer transition-colors">
    <span className="capitalize text-xs font-bold">{icon[0]}</span>
  </div>
);

export default PublicView;
