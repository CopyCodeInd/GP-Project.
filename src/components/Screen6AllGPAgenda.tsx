import React, { useState } from 'react';
import {
  FileStack,
  GitCompare,
  AlertTriangle,
  CheckCircle2,
  GitMerge,
  ShieldCheck,
  Building2,
  Sparkles,
  Camera,
  Users,
  Eye,
  ArrowRight,
  Filter,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { OverlapItem, GramPanchayat, CitizenNeed } from '../types';

interface Screen6AllGPAgendaProps {
  selectedGp: GramPanchayat;
  allGps: GramPanchayat[];
  overlaps: OverlapItem[];
  needs: CitizenNeed[];
  onUpdateOverlapDecision: (
    overlapId: string,
    decision: 'Keep Separate' | 'Link as Duplicate' | 'Propose Convergence Package',
    reason: string,
    omOwner: string,
    lifecycleCost: number
  ) => void;
  onNavigateToScreen: (screenId: '01' | '02' | '03' | '04' | '05' | '06' | '07') => void;
}

export const Screen6AllGPAgenda: React.FC<Screen6AllGPAgendaProps> = ({
  selectedGp,
  allGps,
  overlaps,
  needs,
  onUpdateOverlapDecision,
  onNavigateToScreen,
}) => {
  const [selectedOverlapId, setSelectedOverlapId] = useState<string>(overlaps[0]?.id || 'OVL-BHR-01');

  // Decision form inside inspector
  const [selectedDecision, setSelectedDecision] = useState<
    'Keep Separate' | 'Link as Duplicate' | 'Propose Convergence Package'
  >('Propose Convergence Package');
  const [decisionReason, setDecisionReason] = useState(
    'Joint convergence packaging recommended between Saat Nischay-2 and 15th Finance Commission untied grants.'
  );
  const [omOwner, setOmOwner] = useState('Village Water & Sanitation Committee (VWSC Dharnai)');
  const [lifecycleCost, setLifecycleCost] = useState(380000);
  const [decisionSavedNotice, setDecisionSavedNotice] = useState<string | null>(null);

  const activeOverlap = overlaps.find((o) => o.id === selectedOverlapId) || overlaps[0];

  const handleSaveDecision = () => {
    if (!activeOverlap) return;
    onUpdateOverlapDecision(
      activeOverlap.id,
      selectedDecision,
      decisionReason,
      omOwner,
      lifecycleCost
    );
    setDecisionSavedNotice(`Administrative determination recorded for ${activeOverlap.id}!`);
    setTimeout(() => setDecisionSavedNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                Screen 06 • Block & District Scrutiny
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                Zero-Duplication Statutory Compliance
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Block-Level Review, Inter-Panchayat Audit & Fund Convergence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Block: {selectedGp.block} • District: {selectedGp.district} • Cross-referencing Saat Nischay, 15th FC & MGNREGS
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-slate-700 border border-slate-200 font-semibold">
              Makhdumpur Block (3 Panchayats Synced)
            </span>
          </div>
        </div>
      </div>

      {decisionSavedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{decisionSavedNotice}</span>
        </div>
      )}

      {/* Main Grid: Left Overlaps Queue + Right Statutory Decision Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6 Columns - Overlap & Convergence Queue */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                AI-Flagged Duplication & Convergence Alerts ({overlaps.length})
              </h3>
              <span className="text-[11px] text-slate-400">Select to review & adjudicate</span>
            </div>

            <div className="space-y-3">
              {overlaps.map((item) => {
                const isSelected = item.id === selectedOverlapId;
                const isDup = item.type === 'DUPLICATE_WORK';
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedOverlapId(item.id);
                      if (item.officerDecision) setSelectedDecision(item.officerDecision);
                      if (item.officerReason) setDecisionReason(item.officerReason);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              isDup ? 'bg-rose-100 text-rose-900' : 'bg-teal-100 text-teal-900'
                            }`}
                          >
                            {isDup ? 'Duplicate Risk' : 'Convergence Potential'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Confidence: {Math.round(item.confidenceScore * 100)}%
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-1">
                          Proposed: {item.proposedTitle}
                        </h4>
                        <div className="text-[11px] text-slate-600">
                          Matched Record: <strong className="text-slate-800">{item.matchedSchemeName}</strong> ({item.matchedWorkId})
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      💡 {item.aiExplanation}
                    </p>

                    {item.officerDecision && (
                      <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Executive Determination: {item.officerDecision}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: 6 Columns - Statutory Decision Console */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-slate-900 text-white shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Block Development Officer (BDO) Console
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  {activeOverlap?.id} • {activeOverlap?.gpName}
                </p>
              </div>
            </div>

            {/* Decision Radio selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Statutory Administrative Decision:
              </label>
              <div className="space-y-1.5">
                {[
                  {
                    id: 'Propose Convergence Package',
                    label: 'Package Convergence (Combine Tied & Untied Grants)',
                    desc: 'Pool matching scheme heads to issue a consolidated tender, saving ₹2.4L in public exchequer funds.',
                  },
                  {
                    id: 'Keep Separate',
                    label: 'Maintain Independent Tenders (No Spatial Conflict)',
                    desc: 'Works serve distinct ward beneficiaries or cadastral plots; proceed with dual execution.',
                  },
                  {
                    id: 'Link as Duplicate',
                    label: 'Cancel Duplicate Tender (Zero-Duplication Enforcement)',
                    desc: 'Identified identical work already funded under state line department; nullify local GP tender immediately.',
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`block p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                      selectedDecision === opt.id
                        ? 'bg-emerald-50 border-emerald-600 font-semibold ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="statutory_action"
                        value={opt.id}
                        checked={selectedDecision === opt.id}
                        onChange={() => setSelectedDecision(opt.id as any)}
                        className="accent-emerald-600"
                      />
                      <span className="text-slate-900">{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 pl-5 font-normal">
                      {opt.desc}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Officer Reason Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Administrative Justification & Remarks:
              </label>
              <textarea
                rows={2}
                value={decisionReason}
                onChange={(e) => setDecisionReason(e.target.value)}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* O&M Assignment */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-700">Operations & Maintenance Owner:</label>
                <select
                  value={omOwner}
                  onChange={(e) => setOmOwner(e.target.value)}
                  className="w-full text-xs font-medium p-2 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Village Water & Sanitation Committee (VWSC Dharnai)">Village Water & Sanitation Committee (VWSC)</option>
                  <option value="JEEViKA Women Cluster Level Federation (CLF)">JEEViKA Women Federation (CLF)</option>
                  <option value="Gram Panchayat General Maintenance Fund">Gram Panchayat General Fund</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700">5-Yr Lifecycle Maintenance (₹):</label>
                <input
                  type="number"
                  value={lifecycleCost}
                  onChange={(e) => setLifecycleCost(Number(e.target.value))}
                  className="w-full text-xs font-mono font-bold p-2 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Save Decision Button */}
            <button
              onClick={handleSaveDecision}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Record Executive Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
