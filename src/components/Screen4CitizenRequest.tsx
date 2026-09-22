import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  MapPin,
  Camera,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Send,
  Volume2,
  FileText,
  Navigation,
  Clock,
  RotateCcw,
  ArrowRight,
  Upload,
  Radio,
} from 'lucide-react';
import { GramPanchayat, CitizenNeed, ServiceCategory } from '../types';

interface Screen4CitizenRequestProps {
  selectedGp: GramPanchayat;
  existingNeeds: CitizenNeed[];
  onAddNeed: (need: CitizenNeed) => void;
  onNavigateToScreen: (screenId: '01' | '02' | '03' | '04' | '05' | '06' | '07') => void;
}

const QUICK_VOICE_SAMPLES = [
  'Drinking water pipeline in Ward 2 Central Tola is leaking, pressure is critically low.',
  'Stormwater overflow on Ambedkar Nagar main street, urgently need covered drainage and soakpits.',
  'North Tola market junction is completely dark at night, install BREDA solar street lights.',
  'South community reservoir has accumulated silt, desilt and deepen under Jal-Jeevan-Hariyali.',
  'Need 200m concrete paved street with interlocking pavers near JEEViKA Women Federation building.',
];

export const Screen4CitizenRequest: React.FC<Screen4CitizenRequestProps> = ({
  selectedGp,
  existingNeeds,
  onAddNeed,
  onNavigateToScreen,
}) => {
  const [inputText, setInputText] = useState('Drinking water pipeline in Ward 2 Central Tola is leaking, pressure is critically low.');
  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Drinking water');
  const [selectedVillage, setSelectedVillage] = useState(selectedGp.villages[0] || 'Dharnai Main');
  const [selectedWard, setSelectedWard] = useState(selectedGp.wards[1] || 'Ward 2 (Central Tola)');
  const [khesraNo, setKhesraNo] = useState('412');
  const [khataNo, setKhataNo] = useState('88');

  const [pinCoords, setPinCoords] = useState<{ x: number; y: number; lat: number; lng: number }>({
    x: 48,
    y: 35,
    lat: 25.0452,
    lng: 85.0124,
  });
  const [gpsAccuracy, setGpsAccuracy] = useState<number>(2.8);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [hasPhotoAttached, setHasPhotoAttached] = useState(true);
  const [hasVoiceNoteAttached, setHasVoiceNoteAttached] = useState(true);
  const [isClassifyingAi, setIsClassifyingAi] = useState(false);

  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    scheme: string;
    priority: string;
    lsdg: string;
    explanation: string;
  }>({
    category: 'Drinking water',
    scheme: 'Saat Nischay-2 (Har Ghar Nal Ka Jal) / PHED',
    priority: 'High',
    lsdg: 'Water sufficiency',
    explanation: 'Detected "water pipeline" and "leakage" keywords. Mapped to Saat Nischay-2 Jal Jeevan Mission convergence for rapid pipeline repair and pressure stabilization.',
  });

  const [submittedRequest, setSubmittedRequest] = useState<CitizenNeed | null>(null);
  const [nearbyDuplicateWarning, setNearbyDuplicateWarning] = useState<CitizenNeed | null>(null);

  // Live Web Speech Recognition
  const handleToggleVoiceRecording = () => {
    setSpeechError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser fallback simulation
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        const randomSample = QUICK_VOICE_SAMPLES[Math.floor(Math.random() * QUICK_VOICE_SAMPLES.length)];
        handleAnalyzeText(randomSample);
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleAnalyzeText(transcript);
        }
        setIsRecording(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        setSpeechError('Speech recognition unavailable or muted. Please try clicking a sample prompt below or typing directly.');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err: any) {
      console.warn('Speech recognition error:', err);
      setIsRecording(false);
      setSpeechError('Microphone permission blocked. You can type your request directly below.');
    }
  };

  // Real GPS Geolocation
  const handleFetchCurrentGps = () => {
    if (!navigator.geolocation) {
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setPinCoords({
          x: 48,
          y: 40,
          lat: Number(pos.coords.latitude.toFixed(5)),
          lng: Number(pos.coords.longitude.toFixed(5)),
        });
        setGpsAccuracy(Number(pos.coords.accuracy.toFixed(1)));
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err.message);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Trigger AI classification (client + server endpoint)
  const handleAnalyzeText = async (text: string) => {
    setInputText(text);
    setIsClassifyingAi(true);

    try {
      const res = await fetch('/api/ai/classify-need', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, location: `${selectedVillage}, ${selectedWard}` }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiSuggestion({
          category: data.category || 'Drinking water',
          scheme: data.suggestedScheme || 'Saat Nischay-2 (Har Ghar Nal Ka Jal)',
          priority: data.priority || 'High',
          lsdg: data.lsdgTheme || 'Water sufficiency',
          explanation: data.aiExplanation || 'Categorized automatically by Panchayat Raj AI Engine.',
        });
        setSelectedCategory(data.category || 'Drinking water');
      }
    } catch (err) {
      console.warn('Classification network fallback');
    } finally {
      setIsClassifyingAi(false);
    }

    // Check for nearby duplicates
    const lower = text.toLowerCase();
    const dup = existingNeeds.find(
      (n) =>
        n.gpId === selectedGp.id &&
        ((lower.includes('water') && n.category === 'Drinking water') ||
          (lower.includes('road') && n.category === 'Road / access') ||
          (lower.includes('drain') && n.category === 'Drainage / sanitation'))
    );
    setNearbyDuplicateWarning(dup || null);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    const lat = Number((25.045 + y / 1000).toFixed(4));
    const lng = Number((85.012 + x / 1000).toFixed(4));
    setPinCoords({ x, y, lat, lng });
    setGpsAccuracy(2.5);
  };

  const handleSubmit = () => {
    const newNeedId = `NEED-CITIZEN-${Date.now().toString().slice(-4)}`;
    const newNeed: CitizenNeed = {
      id: newNeedId,
      gpId: selectedGp.id,
      village: selectedVillage,
      ward: selectedWard,
      category: selectedCategory as any,
      title: inputText.length > 55 ? inputText.slice(0, 55) + '...' : inputText,
      titleHindi: inputText,
      description: inputText,
      locationDetails: `${selectedVillage}, ${selectedWard} (Plot: ${khesraNo}, Khata: ${khataNo})`,
      coordinates: { lat: pinCoords.lat, lng: pinCoords.lng },
      gpsAccuracyMeters: gpsAccuracy,
      priority: (aiSuggestion.priority as any) || 'High',
      estimatedCost: 280000,
      status: 'Pending Review',
      submittedBy: 'Ramnaresh Mahto (Ward 2 Citizen)',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lsdgTheme: (aiSuggestion.lsdg as any) || 'Water sufficiency',
      aiSuggestedScheme: aiSuggestion.scheme,
      aiConfidence: 0.94,
      hasVoiceNote: hasVoiceNoteAttached,
      hasPhoto: hasPhotoAttached,
      khesraNo,
      khataNo,
    };

    onAddNeed(newNeed);
    setSubmittedRequest(newNeed);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                Screen 04 • Citizen & JEEViKA Voice Intake
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                Speech-to-Text & Geotagged DGPS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Voice-Enabled Citizen Demand Submission & Spatial Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {selectedGp.name} • Speak in English or local dialect with automated scheme matching
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-slate-700 border border-slate-200 font-semibold">
              GPS Precision: ±{gpsAccuracy}m
            </span>
          </div>
        </div>
      </div>

      {submittedRequest && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 shadow-xs">
          <div className="flex items-center space-x-2 font-semibold text-sm text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Demand registered successfully! (Tracking Token: {submittedRequest.id})</span>
          </div>
          <p className="text-xs text-emerald-800">
            Classified under <strong>{submittedRequest.aiSuggestedScheme}</strong> and added to the official GPDP deliberation agenda.
          </p>
        </div>
      )}

      {/* Main Grid: Left Citizen Mobile Form + Right Map Pin Dropper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6 Columns - Voice Input & Smart Classifier */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Voice-Assisted Demand Intake
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Tap the microphone button to record your proposal or grievance
                  </p>
                </div>
              </div>
            </div>

            {/* Voice Recording Button */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
              <button
                type="button"
                onClick={handleToggleVoiceRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xs cursor-pointer transition-all active:scale-95 ${
                  isRecording
                    ? 'bg-rose-600 animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <div className="text-center">
                <span className="text-xs font-semibold text-slate-800 block">
                  {isRecording ? 'Listening to your voice...' : 'Click to Speak'}
                </span>
                <span className="text-[11px] text-slate-400">
                  e.g., "Drinking water pipeline in Ward 2 is damaged"
                </span>
              </div>
            </div>

            {speechError && (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                {speechError}
              </div>
            )}

            {/* Quick Sample Prompts */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-700 block">
                Or select an authentic village scenario:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_VOICE_SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnalyzeText(sample)}
                    className="text-[11px] text-left p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    💬 {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Transcribed Text Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Detailed Proposal Description:
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => handleAnalyzeText(e.target.value)}
                className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                placeholder="Type your civic demand or grievance here..."
              />
            </div>

            {/* AI Classification Card */}
            <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 font-mono uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Automated Scheme Alignment
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-semibold">
                  {aiSuggestion.priority} Priority
                </span>
              </div>
              <div className="text-xs font-semibold text-white">
                Matched Scheme: <span className="text-emerald-300">{aiSuggestion.scheme}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {aiSuggestion.explanation}
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Submit Civic Demand</span>
            </button>
          </div>
        </div>

        {/* Right: 6 Columns - DGPS Map Pin Drop & Location Details */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Geotagged Location Selection
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Click anywhere on the cadastral canvas to pin the exact site
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFetchCurrentGps}
                disabled={isLocating}
                className="flex items-center space-x-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Navigation className={`w-3 h-3 text-slate-700 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Fetching GPS...' : 'Use My GPS'}</span>
              </button>
            </div>

            {/* Interactive Village Map Canvas */}
            <div
              onClick={handleMapClick}
              className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden cursor-crosshair shadow-inner"
            >
              {/* Plot Grid */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Water body */}
              <div className="absolute right-4 bottom-4 w-28 h-20 rounded-xl bg-sky-950/70 border border-sky-400/40 flex items-center justify-center text-center text-white text-[9px] font-semibold">
                South Pond
              </div>

              {/* Dropped Pin */}
              <div
                style={{ left: `${pinCoords.x}%`, top: `${pinCoords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full transition-all duration-200 pointer-events-none z-20 flex flex-col items-center"
              >
                <div className="bg-slate-900 text-slate-200 text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-slate-700 shadow-md whitespace-nowrap mb-0.5">
                  Lat: {pinCoords.lat}, Lng: {pinCoords.lng}
                </div>
                <div className="w-7 h-7 rounded-full bg-rose-600 border-2 border-white text-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Land Record inputs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-700">Cadastral Plot (Khesra):</label>
                <input
                  type="text"
                  value={khesraNo}
                  onChange={(e) => setKhesraNo(e.target.value)}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700">Khata Record No:</label>
                <input
                  type="text"
                  value={khataNo}
                  onChange={(e) => setKhataNo(e.target.value)}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Photo & Voice note attachment checkboxes */}
            <div className="flex items-center space-x-4 pt-1 text-xs">
              <label className="flex items-center space-x-1.5 text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPhotoAttached}
                  onChange={(e) => setHasPhotoAttached(e.target.checked)}
                  className="rounded accent-emerald-600"
                />
                <span>Site Photo Geo-tagged</span>
              </label>
              <label className="flex items-center space-x-1.5 text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasVoiceNoteAttached}
                  onChange={(e) => setHasVoiceNoteAttached(e.target.checked)}
                  className="rounded accent-emerald-600"
                />
                <span>Audio Memo Attached</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
