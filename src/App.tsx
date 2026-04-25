import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Mic, 
  X, 
  ChevronRight, 
  Info, 
  MessageSquare, 
  LayoutGrid, 
  Bell, 
  User, 
  Globe, 
  Filter,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Landmark,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SCHEMES, Scheme } from './data/schemes';
import { LANGUAGES, CATEGORIES, STATES } from './constants';
import { getChatResponse } from './services/geminiService';

// --- Types ---
interface Message {
  role: 'user' | 'model';
  content: string;
}

interface UserProfile {
  age: number;
  income: number;
  state: string;
  category: string;
  gender: string;
  occupation: string;
}

// --- Main App ---
export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'recommendations'>('chat');
  const [lang, setLang] = useState('English');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 28,
    income: 240000,
    state: 'Karnataka',
    category: 'Rural',
    gender: 'All',
    occupation: 'Farmer'
  });
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const isComparing = compareIds.length > 0;

  const toggleCompare = (id: string) => {
    setCompareIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 2 ? [...prev, id] : [prev[1], id]
    );
  };

  const getRecommendations = () => {
    return SCHEMES.filter(scheme => {
      const { eligibility_criteria: ec } = scheme;
      if (ec.min_age && userProfile.age < ec.min_age) return false;
      if (ec.max_age && userProfile.age > ec.max_age) return false;
      if (ec.income_limit && userProfile.income > ec.income_limit) return false;
      if (ec.gender && ec.gender !== 'All' && userProfile.gender !== 'All' && ec.gender !== userProfile.gender) return false;
      if (ec.state && ec.state !== 'All' && userProfile.state !== 'All' && ec.state !== userProfile.state) return false;
      if (ec.urban_rural && ec.urban_rural !== 'All' && userProfile.category !== 'All' && ec.urban_rural !== userProfile.category) return false;
      return true;
    });
  };

  const recommendedSchemes = getRecommendations();

  return (
    <div className="min-h-screen bg-[#F9FBFF] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Section */}
      <nav className="sticky top-0 z-50 bg-[#F9FBFF]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Landmark size={22} strokeWidth={2.5} />
            </div>
            <div>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-white border-2 border-slate-200 rounded-full px-4 py-2 gap-3 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Database: v2.4 (Grounded RAG)</span>
            <div className="w-px h-4 bg-slate-200 mx-2"></div>
            <div className="flex items-center bg-slate-100 rounded-lg px-2 py-1">
              <NavButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} label="Assistant" />
              <NavButton active={activeTab === 'recommendations'} onClick={() => setActiveTab('recommendations')} label="Recommended" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-600 transition-all shadow-sm font-bold text-sm"
            >
              <User size={18} />
              <span className="hidden sm:block">Active Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-2">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]"
            >
              {/* Left Column: Chat (Bento Primary) */}
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                <div className="flex-1 bg-white border-2 border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Grounded Assistant</span>
                    <div className="flex gap-2">
                       <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-bold">8 Languages</span>
                       <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-[10px] font-bold">No Hallucination</span>
                    </div>
                  </div>
                  <ChatInterface lang={lang} />
                </div>
                
                {/* Language Bar (Small Horizontal Bento Card) */}
                <div className="bg-white border-2 border-slate-200 rounded-[1.5rem] p-3 shadow-sm flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Language:</span>
                  <div className="flex gap-2">
                    {LANGUAGES.slice(0, 8).map(l => (
                      <button 
                        key={l.code}
                        onClick={() => setLang(l.code)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          lang === l.code ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Info Cards (Bento Secondary) */}
              <div className="hidden lg:flex lg:col-span-4 flex-col gap-6">
                {/* Persona Card */}
                <div className="bg-indigo-900 border-2 border-indigo-700 rounded-[2.5rem] p-6 text-white shadow-xl flex flex-col justify-between h-48 group">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Active Profile</span>
                    <button onClick={() => setSidebarOpen(true)} className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition-colors font-bold">Edit Profile</button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{userProfile.occupation}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-bold">{userProfile.state}</span>
                      <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-bold">Income: ₹{userProfile.income.toLocaleString()}</span>
                      <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-bold">{userProfile.category}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[11px] opacity-70 font-medium">Automatic eligibility matching enabled for 3,450+ central & state schemes.</p>
                  </div>
                </div>

                {/* Categories Card */}
                <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-6 shadow-sm flex-1">
                  <h3 className="text-[10px] font-black mb-4 uppercase tracking-[0.2em] text-slate-400">Browse by Persona</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <CategoryTag emoji="🚜" label="Farmers" color="orange" />
                    <CategoryTag emoji="🎓" label="Students" color="blue" />
                    <CategoryTag emoji="👩" label="Women" color="pink" />
                    <CategoryTag emoji="👴" label="Seniors" color="purple" />
                    <CategoryTag emoji="🏥" label="Health" color="green" />
                    <CategoryTag emoji="💼" label="Employment" color="indigo" />
                  </div>
                </div>

                {/* Live Alert Card */}
                <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] p-5 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-200">
                    <Bell size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-none mb-1">Live Alert</h4>
                    <p className="text-xs text-emerald-700 leading-tight truncate font-bold">PM-Kisan 17th installment released! Check portal now.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div 
              key="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Best Matches for <span className="text-indigo-600">You</span></h2>
                  <p className="text-slate-500 font-medium">Personalized recommendations based on your verified profile.</p>
                </div>
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="px-6 py-3 bg-white border-2 border-slate-200 rounded-2xl text-sm font-bold hover:border-indigo-600 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Filter size={18} /> Update Profile
                </button>
              </div>

              {recommendedSchemes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedSchemes.map(scheme => (
                    <SchemeCard 
                      key={scheme.id} 
                      scheme={scheme} 
                      onCompare={() => toggleCompare(scheme.id)}
                      isComparing={compareIds.includes(scheme.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-16 rounded-[3rem] border-2 border-slate-200 text-center shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <AlertCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">No direct matches found</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">Your profile criteria might be too specific. Try expanding your income limit or state scope.</p>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="px-10 py-4 bg-indigo-700 text-white rounded-[1.5rem] font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-800 transition-all"
                  >
                    Back to Assistant
                  </button>
                </div>
              )}
            </motion.div>
          )}


        </AnimatePresence>
      </main>

      {/* Footer / Compliance */}
      <footer className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
      </footer>

      {/* Comparison Drawer */}
      <AnimatePresence>
        {isComparing && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-indigo-900 text-white p-4 md:p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] border-t border-indigo-800"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <LayoutGrid size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">Comparison Mode</h4>
                    <p className="text-[10px] uppercase tracking-widest text-indigo-300">Select 2 schemes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {compareIds.map(id => {
                    const s = SCHEMES.find(x => x.id === id);
                    return (
                      <div key={id} className="px-4 py-2 bg-indigo-800 rounded-xl border border-indigo-700 flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold line-clamp-1">{s?.name}</span>
                        <button onClick={() => toggleCompare(id)} className="hover:text-orange-400">
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                  {compareIds.length < 2 && (
                    <div className="px-4 py-2 bg-indigo-800/50 border border-indigo-700/50 border-dashed rounded-xl flex items-center gap-2 text-indigo-400 italic text-xs">
                      Select {2 - compareIds.length} more...
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setCompareIds([])}
                  className="flex-1 md:flex-none px-6 py-3 font-bold text-indigo-300 hover:text-white transition-colors text-sm"
                >
                  Clear All
                </button>
                <ComparisonModal compareIds={compareIds} onClose={() => setCompareIds([])} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for Profile & Settings */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[120] p-8 border-l border-slate-100 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">User Profile</h2>
                  <p className="text-sm text-slate-500 font-medium">Configure your eligibility criteria</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2.5rem] relative overflow-hidden group">
                  <User size={80} className="absolute -bottom-4 -right-4 text-indigo-100/50 group-hover:scale-110 transition-transform" />
                  <div className="relative z-10">
                    <h3 className="font-black text-indigo-900 text-lg">Citizen Profile</h3>
                    <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mt-1">Ready for verification</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ProfileInput label="Age" value={userProfile.age} type="number" onChange={(v) => setUserProfile({...userProfile, age: parseInt(v) || 0})} />
                  <ProfileInput label="Income (₹)" value={userProfile.income} type="number" onChange={(v) => setUserProfile({...userProfile, income: parseInt(v) || 0})} />
                  <ProfileSelect label="State" value={userProfile.state} options={STATES} onChange={(v) => setUserProfile({...userProfile, state: v})} />
                  <ProfileSelect label="Gender" value={userProfile.gender} options={['All', 'Male', 'Female']} onChange={(v) => setUserProfile({...userProfile, gender: v})} />
                  <ProfileSelect label="Area" value={userProfile.category} options={['All', 'Urban', 'Rural']} onChange={(v) => setUserProfile({...userProfile, category: v})} />
                  <ProfileInput label="Occupation" value={userProfile.occupation} type="text" onChange={(v) => setUserProfile({...userProfile, occupation: v})} />
                </div>

                <div className="p-6 bg-orange-50 border border-orange-100 rounded-[2.5rem]">
                  <h4 className="flex items-center gap-2 text-orange-800 font-bold mb-3">
                    <img src="https://img.icons8.com/color/48/india.png" className="w-5 h-5" referrerPolicy="no-referrer" /> Why this matters?
                  </h4>
                  <p className="text-xs text-orange-700/80 leading-relaxed font-semibold">
                    We use this data to match you with valid schemes. Your data is processed locally and never stored on our servers.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => { setSidebarOpen(false); setActiveTab('recommendations'); }}
                  className="flex-1 py-4 bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-800 transition-all active:scale-95"
                >
                  Update & Match
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components ---

function ProfileField({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

function CategoryTag({ emoji, label, color }: { emoji: string, label: string, color: string }) {
  const colors: Record<string, string> = {
    orange: 'bg-orange-50 border-orange-100 text-orange-800 hover:bg-orange-100',
    blue: 'bg-blue-50 border-blue-100 text-blue-800 hover:bg-blue-100',
    pink: 'bg-pink-50 border-pink-100 text-pink-800 hover:bg-pink-100',
    purple: 'bg-purple-50 border-purple-100 text-purple-800 hover:bg-purple-100',
    green: 'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100',
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-800 hover:bg-indigo-100',
  };

  return (
    <div className={`p-4 border rounded-2xl flex items-center gap-3 cursor-pointer transition-all active:scale-95 ${colors[color] || colors.indigo}`}>
      <span className="text-xl">{emoji}</span>
      <span className="text-xs font-bold whitespace-nowrap">{label}</span>
    </div>
  );
}

function NavButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
        active 
          ? 'bg-white text-indigo-700 shadow-sm' 
          : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  );
}

function ProfileInput({ label, value, type, onChange }: { label: string, value: string | number, type: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none"
      />
    </div>
  );
}

function ProfileSelect({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none appearance-none"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function ComparisonModal({ compareIds, onClose }: { compareIds: string[], onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const schemes = compareIds.map(id => SCHEMES.find(s => s.id === id)).filter(Boolean) as Scheme[];

  if (compareIds.length < 2) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-8 py-3 bg-orange-500 text-white rounded-2xl font-black shadow-xl shadow-orange-900/20 hover:bg-orange-600 transition-all active:scale-95 text-sm"
      >
        Compare {schemes.length} Schemes
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-5xl bg-slate-50 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Scheme Comparison</h2>
                  <p className="text-slate-500 font-medium">Detailed side-by-side analysis of selected policies</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-x-auto p-4 md:p-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-4 w-48 shrink-0"></th>
                      {schemes.map(s => (
                        <th key={s.id} className="p-6 text-left bg-white rounded-t-3xl border-x border-t border-slate-100 min-w-[300px]">
                          <div className="flex items-center gap-2 mb-2">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${s.state === 'Central' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{s.state}</span>
                             <span className="px-3 py-1 bg-slate-100 text-slate-400 rounded-full text-[10px] font-extrabold uppercase">{s.category}</span>
                          </div>
                          <h3 className="text-xl font-black text-slate-900 leading-tight">{s.name}</h3>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <ComparisonRow label="Description" icon={<Info size={16} />} data={schemes.map(s => s.description)} />
                    <ComparisonRow label="Eligibility" icon={<CheckCircle2 size={16} />} data={schemes.map(s => s.eligibility_brief)} />
                    <ComparisonRow label="Benefits" icon={<Sparkles size={16} />} data={schemes.map(s => s.benefits)} highlight />
                    <ComparisonRow label="Application" icon={<ArrowRight size={16} />} data={schemes.map(s => s.how_to_apply)} />
                  </tbody>
                </table>
              </div>
              
              <div className="p-8 bg-white border-t border-slate-100 flex justify-end gap-4">
                <button 
                  onClick={() => { setIsOpen(false); onClose(); }} 
                  className="px-8 py-3 font-bold text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Clear Selection
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200"
                >
                  Close Comparison
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ComparisonRow({ label, data, icon, highlight }: { label: string, data: string[], icon: any, highlight?: boolean }) {
  return (
    <tr className="border-t border-slate-100">
      <td className="p-6 bg-slate-50/50">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {icon}
          {label}
        </div>
      </td>
      {data.map((item, i) => (
        <td key={i} className={`p-6 text-sm leading-relaxed border-x border-slate-100 align-top ${highlight ? 'bg-orange-50/30 font-semibold text-slate-900' : 'text-slate-600'}`}>
          {item}
        </td>
      ))}
    </tr>
  );
}


function HeroSection({ lang }: { lang: string }) {
  return (
    <div className="text-center mb-6 py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-widest mb-4"
      >
        <Sparkles size={12} />
        RAG-Powered Civic Intelligence
      </motion.div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
        Find Your Welfare, <span className="text-orange-500 italic">Simplified.</span>
      </h2>
      <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
        Speak in your native language to discover schemes like PM-Kisan, PM-JAY, and 100+ others tailored to your profile.
      </p>
    </div>
  );
}

function VoiceVisualizer() {
  return (
    <div className="flex items-center gap-1 h-6">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: [8, 24, 12, 20, 8],
            backgroundColor: ['#ffffff', '#818cf8', '#ffffff']
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className="w-1 bg-white rounded-full"
        />
      ))}
    </div>
  );
}

function ChatInterface({ lang }: { lang: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Namaste! I can help you find government schemes you are eligible for. You can ask me things like 'I am a woman farmer in Karnataka, what are the schemes for me?' or 'Tell me about Sukanya Samriddhi Yojana'." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    // This is a bit hacky as speechSynthesis doesn't have a reliable global listener for start/end
    // but we can monitor the queue
    const interval = setInterval(() => {
      setIsSpeaking(window.speechSynthesis.speaking);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    
    // Map language names to BCP 47 codes
    const langMap: Record<string, string> = {
      'English': 'en-IN',
      'Hindi': 'hi-IN',
      'Bengali': 'bn-IN',
      'Telugu': 'te-IN',
      'Marathi': 'mr-IN',
      'Tamil': 'ta-IN',
      'Gujarati': 'gu-IN',
      'Kannada': 'kn-IN'
    };
    
    recognition.lang = langMap[lang] || 'en-IN';
    recognition.onstart = () => {
      setIsListening(true);
      setIsProcessing(false);
      // Cancel any ongoing speech when user starts talking
      window.speechSynthesis.cancel();
    };
    recognition.onresult = (event: any) => {
      setIsListening(false);
      setIsProcessing(true);
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setTimeout(() => {
        setIsProcessing(false);
        // Automatically submit if input was updated from voice
        if (transcript.trim()) {
          const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
          handleSubmitInternal(transcript.trim());
        }
      }, 500);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setIsProcessing(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  const speak = (text: string, forceLang?: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel existing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    const targetLang = forceLang || lang;
    const langMap: Record<string, string> = {
      'English': 'en-IN',
      'Hindi': 'hi-IN',
      'Bengali': 'bn-IN',
      'Telugu': 'te-IN',
      'Marathi': 'mr-IN',
      'Tamil': 'ta-IN',
      'Gujarati': 'gu-IN',
      'Kannada': 'kn-IN'
    };
    
    const bcp47 = langMap[targetLang] || 'en-IN';
    utterance.lang = bcp47;
    
    // Try to find a high-quality voice for the target language
    const voices = window.speechSynthesis.getVoices();
    // Prefer "Google" voices as they are often better quality in Chrome
    const bestVoice = voices.find(v => v.lang.startsWith(bcp47.split('-')[0]) && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Neural'))) 
                    || voices.find(v => v.lang.startsWith(bcp47.split('-')[0]))
                    || voices.find(v => v.lang.includes(bcp47));
    
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmitInternal = async (userMessage: string) => {
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages([...newMessages, { role: 'model', content: '' }]);
    setIsLoading(true);

    try {
      let fullResponse = '';
      await getChatResponse(newMessages, lang, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { role: 'model', content: fullResponse };
          }
          return updated;
        });
      });
      speak(fullResponse);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmitInternal(input.trim());
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-6 px-2 pb-6 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}>
            {m.role === 'model' && <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-100"><Sparkles size={14} /></div>}
            <div 
              className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm relative group/msg ${
                m.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-br-none font-medium' 
                  : 'bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-bl-none font-bold'
              }`}
            >
              {m.role === 'model' && (
                <div className="flex flex-col gap-2 absolute -right-12 top-0">
                  <button 
                    onClick={() => speak(m.content)}
                    className="p-2 bg-white border border-slate-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 rounded-xl transition-all shadow-sm group-hover/msg:opacity-100 opacity-0 md:opacity-100"
                    title="Read aloud"
                  >
                    <Volume2 size={16} />
                  </button>
                  {isSpeaking && (
                    <button 
                      onClick={() => window.speechSynthesis.cancel()}
                      className="p-2 bg-white border border-slate-200 text-rose-500 hover:text-rose-600 hover:border-rose-300 rounded-xl transition-all shadow-sm"
                      title="Stop speaking"
                    >
                      <VolumeX size={16} />
                    </button>
                  )}
                </div>
              )}
              {m.content.split('\n').map((line, j) => {
                const isBullet = line.startsWith('-') || line.startsWith('•');
                // Very basic markdown link support: [text](url) -> <a href="url">text</a>
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = [];
                let lastIndex = 0;
                let match;
                
                while ((match = linkRegex.exec(line)) !== null) {
                  if (match.index > lastIndex) {
                    parts.push(line.substring(lastIndex, match.index));
                  }
                  parts.push(
                    <a 
                      key={match.index}
                      href={match[2]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 underline font-black hover:text-indigo-800 decoration-2 underline-offset-2"
                    >
                      {match[1]}
                    </a>
                  );
                  lastIndex = match.index + match[0].length;
                }
                
                if (lastIndex < line.length) {
                  parts.push(line.substring(lastIndex));
                }

                return (
                  <p key={j} className={`${isBullet ? 'ml-4 flex gap-2' : 'mb-2'}`}>
                    {isBullet && <span className="shrink-0">•</span>}
                    <span>{parts.length > 0 ? parts : line}</span>
                  </p>
                );
              })}
            </div>
            {m.role === 'user' && <div className="w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500 shrink-0 font-black text-[10px]">U</div>}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl rounded-tl-none">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="relative mt-4 flex flex-col gap-2">
        {(isListening || isProcessing || isSpeaking) && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-full">
            <AnimatePresence>
              {isSpeaking && !isListening && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200 shadow-sm flex items-center gap-3"
                >
                  <div className="flex gap-0.5 items-center h-4">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 12, 6, 10, 4] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="w-0.5 bg-indigo-600 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">AI is speaking...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(isListening || isProcessing) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow-xl flex items-center gap-3 z-10"
                >
                  {isListening ? (
                    <>
                      <VoiceVisualizer />
                      <span className="text-xs font-black uppercase tracking-widest">Listening...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-xs font-black uppercase tracking-widest">Processing...</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="flex gap-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-[2rem]">
          <button 
            type="button" 
            onClick={startVoiceSearch}
            disabled={isLoading}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative overflow-hidden ${
              isListening 
                ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-100' 
                : 'bg-white border border-slate-200 text-indigo-600 hover:bg-slate-100'
            }`}
          >
            {isListening && (
              <motion.div 
                layoutId="mic-bg"
                className="absolute inset-0 bg-indigo-600"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
            <Mic size={20} className="relative z-10" />
          </button>
          
          <div className="flex-1 flex items-center gap-2">
            <input 
              placeholder={isListening ? "Listening to you..." : isProcessing ? "Transcribing..." : isSpeaking ? "AI is replying..." : `Ask anything in ${LANGUAGES.find(l => l.code === lang)?.name}... (e.g. 'Show links for PM-Kisan')`}
              value={input}
              readOnly={isListening || isProcessing}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 bg-transparent px-2 text-sm font-bold placeholder:text-slate-400 outline-none"
            />
            {isSpeaking && (
              <button 
                onClick={() => window.speechSynthesis.cancel()}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="Stop speaking"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





function Select({ value, options, onChange, icon }: { value: string, options: string[], onChange: (v: string) => void, icon?: any }) {
  return (
    <div className="relative group w-full md:w-48">
      <button className="w-full flex items-center justify-between px-4 h-12 rounded-2xl bg-white border-2 border-slate-200 text-sm font-bold hover:border-indigo-400 transition-all text-slate-700">
        <div className="flex items-center gap-2">
          {icon}
          {value}
        </div>
        <ChevronDown size={16} className="text-slate-400" />
      </button>
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 max-h-48 overflow-y-auto py-2">
        {options.map(opt => (
          <button 
            key={opt}
            onClick={() => onChange(opt)}
            className="w-full px-4 py-2 text-left text-sm font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

interface SchemeCardProps {
  key?: string;
  scheme: Scheme;
  onCompare?: () => void;
  isComparing?: boolean;
}

function SchemeCard({ scheme, onCompare, isComparing }: SchemeCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`bg-white border-2 rounded-[2.5rem] p-7 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative flex flex-col h-full ${
        isComparing ? 'border-indigo-600 ring-8 ring-indigo-50' : 'border-slate-200 hover:border-indigo-400'
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${scheme.state === 'Central' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{scheme.state}</span>
          <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">{scheme.category}</span>
        </div>
        <button 
          onClick={onCompare}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-90 ${
            isComparing ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
          }`}
        >
          {isComparing ? 'Selected' : 'Compare'}
        </button>
      </div>
      
      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors leading-tight tracking-tight">
        {scheme.name}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed font-medium">
        {scheme.description}
      </p>

      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
          <Sparkles size={16} />
          <span className="line-clamp-1">{scheme.benefits.split(',')[0]}</span>
        </div>
        {scheme.portal_url && (
          <a 
            href={scheme.portal_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 h-12 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 text-xs font-black uppercase"
          >
            Apply Now
            <ArrowRight size={18} />
          </a>
        )}
        {!scheme.portal_url && (
          <button className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center cursor-not-allowed">
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

