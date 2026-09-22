import React from 'react';
import {
  FileCheck2,
  Building2,
  ChevronDown,
  BookOpen,
  Trees,
  HelpCircle,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { GramPanchayat } from '../types';

export type ScreenId = '01' | '02' | '03' | '04' | '05' | '06' | '07';
export type UserRole = 'gp_official' | 'citizen' | 'block_officer' | 'jeevika';

interface HeaderProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  selectedGp: GramPanchayat;
  allGps: GramPanchayat[];
  onSelectGp: (gp: GramPanchayat) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenGpdpExport: () => void;
  onOpenHelp: () => void;
  onOpenTutorial: () => void;
}

const SCREENS: { id: ScreenId; num: string; title: string; subtitle: string }[] = [
  { id: '01', num: '01', title: 'Digital Gram Sabha', subtitle: 'Consultation & Needs' },
  { id: '02', num: '02', title: 'Schemes & Budgets', subtitle: '4-Tier Financials' },
  { id: '03', num: '03', title: 'SVAMITVA 3D Twin', subtitle: 'Parcels & Solar Rooftops' },
  { id: '04', num: '04', title: 'Citizen Voice AI', subtitle: 'DGPS Speech Geotag' },
  { id: '05', num: '05', title: 'Rainwater & Ahar-Pyne', subtitle: 'Hydrological GIS' },
  { id: '06', num: '06', title: 'Convergence Console', subtitle: 'BDO Duplicate Audit' },
  { id: '07', num: '07', title: 'Citizen Schemes', subtitle: 'Eligibility & Grievance' },
];

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  selectedGp,
  allGps,
  onSelectGp,
  userRole,
  onChangeRole,
  onOpenGpdpExport,
  onOpenHelp,
  onOpenTutorial,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Bar with Aesthetic Styling */}
      <div className="px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
        {/* Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-400/30 shrink-0">
            <Trees className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase font-mono">
                Govt. of Bihar • Panchayati Raj
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                Saat Nischay-2
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/20">
                SVAMITVA PAI 2.0
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span>Gram Panchayat Planning Platform</span>
              <span className="text-xs font-normal text-slate-400 hidden lg:inline">
                (GPDP Evidence & Convergence Engine)
              </span>
            </h1>
          </div>
        </div>

        {/* GP Selector, Role Switcher, Quick Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* GP Selector Dropdown */}
          <div className="relative inline-flex items-center bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 transition-colors shadow-xs">
            <Building2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" />
            <select
              id="header-gp-select"
              value={selectedGp.id}
              onChange={(e) => {
                const found = allGps.find((g) => g.id === e.target.value);
                if (found) onSelectGp(found);
              }}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-4"
            >
              {allGps.map((gp) => (
                <option key={gp.id} value={gp.id} className="bg-slate-900 text-slate-100">
                  {gp.name} • {gp.block}, {gp.district}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Role Switcher */}
          <div className="inline-flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-0.5 text-xs">
            <button
              id="role-gp-btn"
              onClick={() => onChangeRole('gp_official')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                userRole === 'gp_official'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mukhiya & Panchayat Secretary View"
            >
              Mukhiya / GP
            </button>
            <button
              id="role-jeevika-btn"
              onClick={() => {
                onChangeRole('jeevika');
                if (currentScreen !== '04' && currentScreen !== '07') {
                  onSelectScreen('04');
                }
              }}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                userRole === 'jeevika' || userRole === 'citizen'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="JEEViKA Didi & Rural Citizen View"
            >
              JEEViKA / Citizen
            </button>
            <button
              id="role-officer-btn"
              onClick={() => {
                onChangeRole('block_officer');
                if (currentScreen !== '02' && currentScreen !== '06') {
                  onSelectScreen('06');
                }
              }}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                userRole === 'block_officer'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Block Development Officer (BDO) & DPRO View"
            >
              BDO / Officer
            </button>
          </div>

          {/* Quick Tour Guide */}
          <button
            id="open-tutorial-btn"
            onClick={onOpenTutorial}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-amber-500/30 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tour Guide</span>
          </button>

          {/* Help & FAQs */}
          <button
            id="open-help-btn"
            onClick={onOpenHelp}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-700 transition-all cursor-pointer"
            title="Operational Help Guide & Manual"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Help</span>
          </button>

          {/* Export GPDP Resolution */}
          <button
            id="export-gpdp-plan-btn"
            onClick={onOpenGpdpExport}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs border border-emerald-500 transition-all cursor-pointer active:scale-98"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export GPDP</span>
            <span className="text-[10px] bg-emerald-900/80 px-1 py-0.2 rounded text-emerald-200 font-mono">
              PAI 2.0
            </span>
          </button>
        </div>
      </div>

      {/* Primary 7-Screen Navigation Bar */}
      <nav className="bg-slate-950 px-3 sm:px-6 py-2 overflow-x-auto border-t border-slate-800 scrollbar-none">
        <div className="flex items-center space-x-1 sm:space-x-1.5 min-w-max">
          {SCREENS.map((screen) => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                id={`nav-screen-${screen.id}`}
                onClick={() => onSelectScreen(screen.id)}
                className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs ring-1 ring-emerald-400/40'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                    isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {screen.num}
                </span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="whitespace-nowrap">{screen.title}</span>
                  <span className="text-[10px] opacity-70 whitespace-nowrap">
                    {screen.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
