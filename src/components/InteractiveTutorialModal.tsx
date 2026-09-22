import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Layers,
  PhoneCall,
  FileSpreadsheet,
  MapPin,
  CloudRain,
  ShieldAlert,
  Award,
  BookOpen,
  ArrowRight,
  Landmark,
} from 'lucide-react';
import { ScreenId } from './Header';

interface InteractiveTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen: (screenId: ScreenId) => void;
}

interface TutorialStep {
  stepNumber: number;
  screenId?: ScreenId;
  badge: string;
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  keyPoints: string[];
  actionLabel?: string;
  iconBg: string;
  icon: React.ReactNode;
}

export const InteractiveTutorialModal: React.FC<InteractiveTutorialModalProps> = ({
  isOpen,
  onClose,
  onNavigateToScreen,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const TUTORIAL_STEPS: TutorialStep[] = [
    {
      stepNumber: 1,
      badge: 'Platform Introduction',
      title: 'Welcome to the Bihar Gram Panchayat Digital Planning Platform',
      subtitle: 'Modern Decision-Support for Mukhiyas, Panchayat Secretaries & Field Officers',
      highlight: 'End-to-end convergence linking ground demands, budget allocations, and SVAMITVA spatial records.',
      description:
        'This enterprise platform bridges rural civic aspirations in Bihar with state and central welfare schemes (Saat Nischay-2, Jal-Jeevan-Hariyali, 15th FC, BREDA, and MGNREGS). Follow this quick 2-minute tour to explore the integrated modules.',
      keyPoints: [
        'Aligned with Bihar Panchayati Raj Directorate and Ministry of Panchayati Raj GPDP guidelines.',
        'Real-time convergence linking public demands to sanctioned engineering works.',
        'Zero-duplication safeguards preventing redundant tenders across line departments.',
      ],
      iconBg: 'bg-emerald-600',
      icon: <Landmark className="w-5 h-5 text-white" />,
    },
    {
      stepNumber: 2,
      screenId: '01',
      badge: 'Screen 01 • Consultation',
      title: 'Virtual Gram Sabha & Ward Demand Capture',
      subtitle: 'Live Deliberation Console with Instant Agenda Sync',
      highlight: 'Direct citizen audio participation and instant requirement ledger logging.',
      description:
        'Moderated participatory planning allowing Mukhiyas and Panchayat Secretaries to chair community deliberations. Calls from ward representatives can be accepted live and added to the official GPDP agenda with a single click.',
      keyPoints: [
        'Live Web Audio simulation for participatory meetings with ward members.',
        'Dynamic requirement intake drawer with real-time budget and LSDG thematic tagging.',
        'Seamless handoff into statutory deliberative queues.',
      ],
      actionLabel: 'Explore Screen 01',
      iconBg: 'bg-emerald-600',
      icon: <PhoneCall className="w-5 h-5 text-white" />,
    },
    {
      stepNumber: 3,
      screenId: '02',
      badge: 'Screen 02 • Financial Correlation',
      title: 'Scheme Correlation & 4-Tier Fiscal Tracking',
      subtitle: 'Transparent Public Finance Accounting across Saat Nischay-2 & 15th FC',
      highlight: 'Clear ledger metrics tracking Sanctioned, Released, Spent, and Committed funds.',
      description:
        'Comprehensive breakdown of central and state grants. Correlate unbudgeted citizen requests with active line-item grants to ensure tenders are backed by authentic fiscal provisions.',
      keyPoints: [
        'Real-time fund tracking for Mukhyamantri Gramin Peyjal, Nali-Gali, and MGNREGS.',
        'Automated component matching pairing pending demands to available balance.',
        'PFMS and e-GramSwaraj compliance reporting.',
      ],
      actionLabel: 'Explore Screen 02',
      iconBg: 'bg-teal-600',
      icon: <FileSpreadsheet className="w-5 h-5 text-white" />,
    },
    {
      stepNumber: 4,
      screenId: '03',
      badge: 'Screen 03 • Spatial Twin',
      title: 'SVAMITVA 3D Digital Twin & Clean Energy Analytics',
      subtitle: 'Interactive Drone Photogrammetry with Rooftop Solar Calculations',
      highlight: 'Cadastral Khesra/Khata parcel identification and BREDA clean power simulations.',
      description:
        'Interactive 3D model generated from SVAMITVA drone surveys. Inspect government infrastructure, assess rooftop shadow profiles, and compute annual revenue savings from grid-tied solar installations.',
      keyPoints: [
        'Cadastral parcel inspection with legal Khesra plot numbers and property registry data.',
        'BREDA 15 kWp simulation projecting ₹1.42L annual electricity savings.',
        'One-click infrastructure gap logging into the Panchayat development ledger.',
      ],
      actionLabel: 'Explore Screen 03',
      iconBg: 'bg-amber-600',
      icon: <Layers className="w-5 h-5 text-white" />,
    },
    {
      stepNumber: 5,
      screenId: '04',
      badge: 'Screen 04 • Citizen Intake',
      title: 'Voice AI Demands & Geotagged Pin Dropper',
      subtitle: 'Accessible Speech-to-Text & Sub-3m Cadastral Verification',
      highlight: 'Voice intake designed for grassroots citizens with automated scheme classification.',
      description:
        'Citizens and JEEViKA Self Help Group coordinators can speak proposals naturally. The onboard classifier maps statements to official schemes while dropping precise DGPS coordinates onto the cadastral village map.',
      keyPoints: [
        'In-browser Web Speech API processing verbal demand recordings.',
        'High-precision GPS geolocation with optional site photo and audio attachment.',
        'Instant duplicate detection cross-checking existing municipal records.',
      ],
      actionLabel: 'Explore Screen 04',
      iconBg: 'bg-emerald-600',
      icon: <MapPin className="w-5 h-5 text-white" />,
    },
    {
      stepNumber: 6,
      screenId: '05',
      badge: 'Screen 05 • Watershed Hydrology',
      title: 'Jal-Jeevan-Hariyali & Ahar-Pyne Conservation Map',
      subtitle: 'Scientific Ridge-to-Valley Inflow & Runoff Topography',
      highlight: 'Restoring traditional indigenous rainwater networks using Digital Elevation Models.',
      description:
        'Leveraging Bihar’s 1,040 mm annual rainfall with hydrological elevation modeling. Identify optimal sites for checkdams, percolation tanks, and traditional Ahar-Pyne desiltation to recharge agricultural aquifers.',
      keyPoints: [
        'Digital Elevation Model (DEM) slope profiling and soil infiltration analysis.',
        'Engineering metrics detailing catchment acreage and storage capacity in kilo-litres.',
        'One-click inclusion into the annual GPDP water conservation shelf of projects.',
      ],
      actionLabel: 'Explore Screen 05',
      iconBg: 'bg-sky-600',
      icon: <CloudRain className="w-5 h-5 text-white" />,
    },
    {
      stepNumber: 7,
      screenId: '06',
      badge: 'Screen 06 • Audit & Scrutiny',
      title: 'Block-Level Review & Zero-Duplication Compliance',
      subtitle: 'Executive Review Console for Block Development Officers (BDO)',
      highlight: 'Automated cross-departmental fraud detection preventing double billing.',
      description:
        'Scrutinizes overlapping tenders across Rural Works (RWD), PHED, and Gram Panchayat ledgers. Empowers executive officers to issue legally binding convergence or cancellation orders.',
      keyPoints: [
        'Spatial and textual similarity engine flagging duplicate civil works.',
        'Statutory determinations: Convergence Packaging, Spatial Separation, or Cancellation.',
        'Enforces long-term Operations & Maintenance (O&M) ownership with VWSC and JEEViKA.',
      ],
      actionLabel: 'Explore Screen 06',
      iconBg: 'bg-rose-600',
      icon: <ShieldAlert className="w-5 h-5 text-white" />,
    },
    {
      stepNumber: 8,
      screenId: '07',
      badge: 'Screen 07 • Entitlements & Export',
      title: 'Citizen Scheme Eligibility & Resolution Dossier',
      subtitle: 'Direct Benefit Transfer (DBT) Scoring & Official GPDP Resolution Export',
      highlight: 'Individual welfare matching and authenticated Gram Sabha resolution generation.',
      description:
        'Enables households to determine eligibility for housing, solar, and JEEViKA enterprise credit. Mukhiyas and Secretaries can export the authenticated annual Gram Sabha development resolution with digital stamps.',
      keyPoints: [
        'Dynamic household scoring for PM Surya Ghar, PMAY-G, and Lakhpati Didi.',
        'Integrated Bihar Public Grievance Redressal (BPGRS) ticket creation.',
        'One-click official GPDP Resolution export with Panchayat Raj seals.',
      ],
      actionLabel: 'Explore Screen 07',
      iconBg: 'bg-emerald-700',
      icon: <Award className="w-5 h-5 text-white" />,
    },
  ];

  const currentStep = TUTORIAL_STEPS[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / TUTORIAL_STEPS.length) * 100);

  const handleNext = () => {
    if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleJumpToScreen = () => {
    if (currentStep.screenId) {
      onNavigateToScreen(currentStep.screenId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 my-auto overflow-hidden relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                Interactive Guided Walkthrough ({currentStepIndex + 1} of {TUTORIAL_STEPS.length})
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {currentStep.badge}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Content Card */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3.5">
            <div className={`p-2.5 rounded-xl ${currentStep.iconBg} shrink-0 shadow-xs`}>
              {currentStep.icon}
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentStep.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium">{currentStep.subtitle}</p>
              <div className="inline-block mt-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                💡 {currentStep.highlight}
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/90">
            {currentStep.description}
          </p>

          {/* Key Bullet Points */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Key Capabilities:
            </div>
            <ul className="space-y-1.5">
              {currentStep.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'hover:bg-slate-100 border-slate-300 text-slate-700 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentStep.screenId && (
              <button
                onClick={handleJumpToScreen}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-pointer transition-colors"
              >
                <span>{currentStep.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Skip
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-all active:scale-98"
            >
              <span>{currentStepIndex === TUTORIAL_STEPS.length - 1 ? 'Finish & Open App' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
