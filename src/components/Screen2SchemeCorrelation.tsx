import React, { useState } from 'react';
import {
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  GitMerge,
  ExternalLink,
  Plus,
  Eye,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building,
  RefreshCw,
  IndianRupee,
} from 'lucide-react';
import {
  GramPanchayat,
  SanctionedSchemeWork,
  CitizenNeed,
  OverlapItem,
} from '../types';

interface Screen2SchemeCorrelationProps {
  selectedGp: GramPanchayat;
  sanctionedWorks: SanctionedSchemeWork[];
  needs: CitizenNeed[];
  overlaps: OverlapItem[];
  onAddWorkLink: (workId: string, needId: string) => void;
  onRunOverlapCheck: () => void;
  onNavigateToScreen: (screenId: '01' | '02' | '03' | '04' | '05' | '06' | '07') => void;
}

export const Screen2SchemeCorrelation: React.FC<Screen2SchemeCorrelationProps> = ({
  selectedGp,
  sanctionedWorks,
  needs,
  overlaps,
  onAddWorkLink,
  onRunOverlapCheck,
  onNavigateToScreen,
}) => {
  const [selectedFy, setSelectedFy] = useState<string>('FY 2025-26');
  const [overlapCheckRunning, setOverlapCheckRunning] = useState<boolean>(false);
  const [overlapResultSummary, setOverlapResultSummary] = useState<string | null>(null);

  // Selected scheme linkages in progress
  const [selectedLinks] = useState<{ needTitle: string; schemeName: string; needId: string; workId: string }[]>([
    { needTitle: 'Ward 2 Tap Water Network Extension', schemeName: 'Saat Nischay-2 (Piped Water)', needId: 'NEED-BHR-01', workId: 'W-BHR-NAL-01' },
    { needTitle: 'North Tola BREDA Solar Lighting', schemeName: 'Chief Minister Solar Street Lights', needId: 'NEED-BHR-03', workId: 'W-BHR-SOLAR-03' },
  ]);

  // Filter works by GP
  const gpWorks = sanctionedWorks.filter((w) => w.gpId === selectedGp.id);

  // Budget totals calculation
  const totalSanctioned = gpWorks.reduce((sum, w) => sum + w.sanctionedAmount, 0);
  const totalReleased = gpWorks.reduce((sum, w) => sum + w.releasedAmount, 0);
  const totalSpent = gpWorks.reduce((sum, w) => sum + w.spentAmount, 0);
  const totalCommitted = gpWorks.reduce((sum, w) => sum + w.committedAmount, 0);

  const handleRunOverlap = () => {
    setOverlapCheckRunning(true);
    setTimeout(() => {
      onRunOverlapCheck();
      setOverlapCheckRunning(false);
      setOverlapResultSummary(
        'Convergence Engine audited 4 active departmental works: Flagged 1 duplicate tender (RWD roadside drain vs 15th FC) and identified ₹2.4 Lakhs in convergence savings under Jal Jeevan Mission.'
      );
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with 4-Tier Budget Overview */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                Screen 02 • Scheme & Budget Correlation
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                PFMS & Single Nodal Account (SNA)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Active Government Schemes & 4-Tier Financial Tracking
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {selectedGp.name} • Financial Year: {selectedFy}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-600 font-medium">Fiscal Year:</span>
            <select
              value={selectedFy}
              onChange={(e) => setSelectedFy(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="FY 2025-26">FY 2025-26 (Current)</option>
              <option value="FY 2024-25">FY 2024-25</option>
            </select>
          </div>
        </div>

        {/* 4-Tier Budget KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Sanctioned Budget</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              ₹{(totalSanctioned / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Administrative Approval (AS)</div>
          </div>
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5">
            <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Released to SNA</div>
            <div className="text-lg font-bold font-mono text-emerald-950 mt-1">
              ₹{(totalReleased / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Liquid in Bank Account</div>
          </div>
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
            <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Spent & Paid</div>
            <div className="text-lg font-bold font-mono text-amber-950 mt-1">
              ₹{(totalSpent / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-amber-700 mt-0.5">Measurement Book (MB) Cleared</div>
          </div>
          <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-3.5">
            <div className="text-[10px] uppercase font-bold text-sky-800 tracking-wider">Committed Liabilities</div>
            <div className="text-lg font-bold font-mono text-sky-950 mt-1">
              ₹{(totalCommitted / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-sky-700 mt-0.5">In-transit Invoices / Work Orders</div>
          </div>
        </div>
      </div>

      {/* AI Overlap Warning / Convergence banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 shadow-xs border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
              Zero-Duplication & Inter-Departmental Convergence Audit
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Cross-checks local 15th FC / State Finance Commission plans against active PHED, RWD, and BREDA departmental work orders to eliminate double billing.
          </p>
        </div>
        <button
          onClick={handleRunOverlap}
          disabled={overlapCheckRunning}
          className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer active:scale-98"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${overlapCheckRunning ? 'animate-spin' : ''}`} />
          <span>{overlapCheckRunning ? 'Auditing Schemes...' : 'Run Convergence Audit'}</span>
        </button>
      </div>

      {overlapResultSummary && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-semibold flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
          <span>{overlapResultSummary}</span>
        </div>
      )}

      {/* Main Grid: Left Schemes List + Right Linked Funding Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 8 Columns - Sanctioned Works in GP */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                Sanctioned Works & Contracting Agencies ({gpWorks.length})
              </h3>
              <span className="text-[11px] text-slate-400">Synced with e-GramSwaraj & PFMS</span>
            </div>

            <div className="space-y-3">
              {gpWorks.map((work) => (
                <div
                  key={work.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100/60 transition-all space-y-2.5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                          {work.id}
                        </span>
                        <span className="text-xs font-semibold text-emerald-800">
                          {work.schemeName}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {work.workName}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Sanction Ref: {work.sanctionReference} • Executing Agency: {work.contractorOrAgency}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        work.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {work.status}
                    </span>
                  </div>

                  {/* Components */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {work.components.map((comp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                      >
                        ✓ {comp}
                      </span>
                    ))}
                  </div>

                  {/* Financial Bar */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Sanctioned:</span>
                      <span className="font-bold font-mono text-slate-900">₹{(work.sanctionedAmount / 100000).toFixed(2)}L</span>
                    </div>
                    <div>
                      <span className="text-emerald-700 block text-[9px] uppercase font-bold">Released:</span>
                      <span className="font-bold font-mono text-emerald-800">₹{(work.releasedAmount / 100000).toFixed(2)}L</span>
                    </div>
                    <div>
                      <span className="text-amber-700 block text-[9px] uppercase font-bold">Spent:</span>
                      <span className="font-bold font-mono text-amber-800">₹{(work.spentAmount / 100000).toFixed(2)}L</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Committed:</span>
                      <span className="font-bold font-mono text-slate-800">₹{(work.committedAmount / 100000).toFixed(2)}L</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 4 Columns - Linked Funding Options Drawer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <GitMerge className="w-4 h-4 text-emerald-700" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Approved Scheme Linkages
                </h3>
                <p className="text-[11px] text-slate-500">
                  Community demands linked to departmental budgets
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {selectedLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-emerald-200/90 bg-emerald-50/50 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 truncate">{link.needTitle}</span>
                    <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded">
                      {link.workId}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-800">
                    Scheme: <strong>{link.schemeName}</strong>
                  </div>
                  <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tied grant allocated & synced to GPDP</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Button to Screen 3 */}
            <div className="pt-2">
              <button
                onClick={() => onNavigateToScreen('03')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 active:scale-98"
              >
                <span>Screen 03: SVAMITVA 3D Digital Twin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
