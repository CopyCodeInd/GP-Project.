import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Radio,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  AlertCircle,
  Volume2,
  Droplets,
  Route,
  Trash2,
  Sun,
  CloudRain,
  Home,
  Briefcase,
  ChevronRight,
  Hand,
  Users,
} from 'lucide-react';
import { GramPanchayat, CitizenNeed, ServiceCategory, PriorityLevel, LSDGTheme } from '../types';

interface Screen1ConsultationProps {
  selectedGp: GramPanchayat;
  needs: CitizenNeed[];
  onAddNeed: (need: CitizenNeed) => void;
  onNavigateToScreen: (screenId: '01' | '02' | '03' | '04' | '05' | '06' | '07') => void;
}

const CATEGORIES: { id: ServiceCategory; title: string; icon: React.ReactNode; defaultLsdg: LSDGTheme; desc: string }[] = [
  { id: 'Drinking water', title: 'Piped Water Supply (Saat Nischay)', icon: <Droplets className="w-4 h-4 text-sky-600" />, defaultLsdg: 'Water sufficiency', desc: 'Trunk line extension, mini water tower, leak fixes, FHTC tap connections' },
  { id: 'Road / access', title: 'Paved Concrete Streets & Culverts', icon: <Route className="w-4 h-4 text-amber-600" />, defaultLsdg: 'Self-sufficient infrastructure', desc: 'PCC roads, inter-tola brick pavers, culverts, MMGSY connectivity' },
  { id: 'Drainage / sanitation', title: 'Covered Storm Drains & Soakpits', icon: <Trash2 className="w-4 h-4 text-emerald-600" />, defaultLsdg: 'Clean and green villages', desc: 'Covered concrete drains, soakpit clusters, solid & liquid waste centers' },
  { id: 'Solar / public lighting', title: 'Solar LED Street Lights & Rooftops', icon: <Sun className="w-4 h-4 text-orange-500" />, defaultLsdg: 'Clean and green villages', desc: 'BREDA rural solar street lights, PM Surya Ghar rooftop solar' },
  { id: 'Rainwater / other', title: 'Water Body & Ahar-Pyne Rejuvenation', icon: <CloudRain className="w-4 h-4 text-teal-600" />, defaultLsdg: 'Water sufficiency', desc: 'Traditional Ahar-Pyne desilting, check dams, Jal-Jeevan-Hariyali' },
  { id: 'Rural housing', title: 'Pradhan Mantri Awaas (PMAY-G)', icon: <Home className="w-4 h-4 text-indigo-600" />, defaultLsdg: 'Self-sufficient infrastructure', desc: 'BPL shelter upgrade, Awaas+ waitlist validation, pucca construction' },
  { id: 'Livelihood / SHG', title: 'JEEViKA Enterprise & Livelihoods', icon: <Briefcase className="w-4 h-4 text-purple-600" />, defaultLsdg: 'Good governance', desc: 'Women SHG federation, Lakhpati Didi enterprise incubation, micro-credit' },
];

export const Screen1Consultation: React.FC<Screen1ConsultationProps> = ({
  selectedGp,
  needs,
  onAddNeed,
  onNavigateToScreen,
}) => {
  // Consultation call state
  const [selectedVillage, setSelectedVillage] = useState(selectedGp.villages[0] || 'Dharnai Main');
  const [selectedWard, setSelectedWard] = useState(selectedGp.wards[1] || 'Ward 2 (Central Tola)');
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(`${selectedGp.sarpanchName} (Presiding)`);
  const [speakingQueue, setSpeakingQueue] = useState([
    { name: 'Sunita Devi (JEEViKA Federation Leader, Ward 4)', role: 'SHG Cluster Leader', status: 'Waiting' },
    { name: 'Ramnaresh Mahto (Ward Member, Ward 2)', role: 'Ward Member', status: 'Waiting' },
    { name: 'Santosh Paswan (Welfare Officer, Ward 3)', role: 'Welfare Worker', status: 'Waiting' },
    { name: 'Kishori Lal (Farmer Collective Rep, Ward 5)', role: 'Farmer Delegate', status: 'Waiting' },
  ]);

  // Selected requirement form state
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Drinking water');
  const [customTitle, setCustomTitle] = useState('Ward 2 Central Tola tap water network extension (300m new line)');
  const [customDesc, setCustomDesc] = useState('Under Saat Nischay-2, 45 households require piped connections and pressure boost along the PHED trunk line.');
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [estimatedCost, setEstimatedCost] = useState<number>(380000);
  const [khesraNo, setKhesraNo] = useState('412');
  const [khataNo, setKhataNo] = useState('88');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const callId = `GRAMSABHA-${selectedGp.lgdCode}-2026`;

  const handleSubmitRequirement = () => {
    const categoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);
    const newNeedId = `NEED-${Date.now().toString().slice(-4)}`;
    const newNeed: CitizenNeed = {
      id: newNeedId,
      callId,
      gpId: selectedGp.id,
      village: selectedVillage,
      ward: selectedWard,
      category: selectedCategory,
      title: customTitle || `${selectedCategory} in ${selectedWard}`,
      description: customDesc || `Registered during Digital Gram Sabha consultation ${callId}`,
      locationDetails: `${selectedVillage}, ${selectedWard} (Cadastral Plot: ${khesraNo}, Khata: ${khataNo})`,
      priority,
      estimatedCost: Number(estimatedCost) || 250000,
      status: 'Pending Review',
      submittedBy: currentSpeaker,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lsdgTheme: categoryInfo ? categoryInfo.defaultLsdg : 'Water sufficiency',
      khesraNo,
      khataNo,
      aiSuggestedScheme:
        selectedCategory === 'Drinking water'
          ? 'Saat Nischay-2 (Har Ghar Nal Ka Jal) / PHED'
          : selectedCategory === 'Road / access'
          ? 'Mukhya Mantri Gram Sampark Yojana (MMGSY) / 15th FC'
          : selectedCategory === 'Drainage / sanitation'
          ? 'Saat Nischay-2 (Pakki Nali-Gali) / LSBA'
          : selectedCategory === 'Solar / public lighting'
          ? 'BREDA Chief Minister Rural Solar Lighting'
          : selectedCategory === 'Rainwater / other'
          ? 'Jal-Jeevan-Hariyali Mission + MGNREGS'
          : selectedCategory === 'Rural housing'
          ? 'Pradhan Mantri Awaas Yojana - Gramin (PMAY-G)'
          : 'JEEViKA Sustainable Livelihood Program (BRLPS)',
    };

    onAddNeed(newNeed);
    setSubmissionSuccess(`Proposal registered: ${newNeedId} (Added to GPDP Agenda)`);
    setTimeout(() => setSubmissionSuccess(null), 4500);
  };

  const grantSpeakingRole = (name: string, index: number) => {
    setCurrentSpeaker(name);
    setSpeakingQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const addHandRaise = () => {
    const newSpeaker = {
      name: `Citizen Delegate (Ward ${Math.floor(Math.random() * 5) + 1})`,
      role: 'Citizen',
      status: 'Waiting',
    };
    setSpeakingQueue((prev) => [...prev, newSpeaker]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                Screen 01 • Consultation & Intake
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                Saat Nischay-2 & e-GramSwaraj Aligned
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Digital Gram Sabha & Live Demand Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {selectedGp.name} • Block: {selectedGp.block}, District: {selectedGp.district}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-slate-700 border border-slate-200 font-semibold">
              Session: {callId}
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-semibold shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              Live Sabha Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Call Interface + Right Agenda Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7 Columns - Virtual Gram Sabha Room */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            {/* Call Controls and Village/Ward selection */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-700">Location:</span>
                <select
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {selectedGp.villages.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {selectedGp.wards.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mic and Hand Raise Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors ${
                    isMuted ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 animate-pulse" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <button
                  onClick={addHandRaise}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  title="Raise hand to request speaking turn"
                >
                  <Hand className="w-3.5 h-3.5 text-amber-600" />
                  <span>Raise Hand</span>
                </button>
              </div>
            </div>

            {/* Current Active Speaker Spotlight */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-xl shadow-xs space-y-3 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Active Speaker
                </span>
                <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                  Presiding Officer
                </span>
              </div>
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center text-lg">
                  🎙️
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold leading-tight text-white">
                    {currentSpeaker}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Gram Sabha Chair • {selectedGp.name} • Panchayat Sarkar Bhawan Hall
                  </p>
                </div>
              </div>
              <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span className="italic">
                  "Ward 2 representatives, please table the drinking water and drainage proposals now..."
                </span>
                <div className="flex items-center space-x-1 text-emerald-400 font-mono text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Audio Feed</span>
                </div>
              </div>
            </div>

            {/* Speaking Queue */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  Speaking Queue ({speakingQueue.length} participants):
                </span>
                <span className="text-[11px] text-slate-400">Click to grant microphone turn</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {speakingQueue.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100/80 transition-all text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-500">{item.role}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => grantSpeakingRole(item.name, idx)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                    >
                      Allow Speak
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: 5 Columns - Live Requirement Registration Drawer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Agenda Intake Drawer
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Record live demand directly into GPDP resolution
                  </p>
                </div>
              </div>
            </div>

            {submissionSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{submissionSuccess}</span>
              </div>
            )}

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Scheme Category:
              </label>
              <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      if (cat.id === 'Drinking water') {
                        setCustomTitle('Ward 2 Central Tola tap water network extension (300m new line)');
                        setEstimatedCost(380000);
                      } else if (cat.id === 'Road / access') {
                        setCustomTitle('Ambedkar Nagar main junction 350m PCC concrete pavement');
                        setEstimatedCost(480000);
                      } else if (cat.id === 'Drainage / sanitation') {
                        setCustomTitle('Central Tola covered storm drainage & soakpit cluster');
                        setEstimatedCost(320000);
                      } else if (cat.id === 'Solar / public lighting') {
                        setCustomTitle('North Tola weekly market 12 BREDA standalone solar street lights');
                        setEstimatedCost(290000);
                      } else if (cat.id === 'Rainwater / other') {
                        setCustomTitle('South public Ahar-Pyne & pond rejuvenation (Jal-Jeevan-Hariyali)');
                        setEstimatedCost(650000);
                      }
                    }}
                    className={`p-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center space-x-2.5 ${
                      selectedCategory === cat.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="shrink-0">{cat.icon}</span>
                    <span className="truncate">{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Desc */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Proposed Work Title:
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full text-xs font-medium p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                placeholder="Enter proposed work title..."
              />
            </div>

            {/* Land Records Cadastral Plot & Khata */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700">Cadastral Plot (Plot/Khesra):</label>
                <input
                  type="text"
                  value={khesraNo}
                  onChange={(e) => setKhesraNo(e.target.value)}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                  placeholder="e.g. 412"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700">Khata Record No:</label>
                <input
                  type="text"
                  value={khataNo}
                  onChange={(e) => setKhataNo(e.target.value)}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                  placeholder="e.g. 88"
                />
              </div>
            </div>

            {/* Estimated Cost & Priority */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700">Estimated Cost (₹):</label>
                <input
                  type="number"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(Number(e.target.value))}
                  className="w-full text-xs font-bold font-mono p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700">Priority Level:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Submit to GP Agenda Button */}
            <button
              onClick={handleSubmitRequirement}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Add to GPDP Plan</span>
            </button>
          </div>

          {/* Quick link to Screen 2 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              Ready to verify scheme funding & avoid duplication?
            </span>
            <button
              onClick={() => onNavigateToScreen('02')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg shrink-0 flex items-center space-x-1"
            >
              <span>View Screen 02</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
