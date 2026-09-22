import React, { useState } from 'react';
import {
  CloudRain,
  Droplets,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Compass,
  FileCheck,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  Filter,
  Trees,
} from 'lucide-react';
import { GramPanchayat, RainwaterCandidate, CitizenNeed } from '../types';

interface Screen5RainwaterHarvestingProps {
  selectedGp: GramPanchayat;
  candidates: RainwaterCandidate[];
  onAddNeed: (need: CitizenNeed) => void;
  onNavigateToScreen: (screenId: '01' | '02' | '03' | '04' | '05' | '06' | '07') => void;
}

export const Screen5RainwaterHarvesting: React.FC<Screen5RainwaterHarvestingProps> = ({
  selectedGp,
  candidates,
  onAddNeed,
  onNavigateToScreen,
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('Candidate R-01');
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const handleAddCandidateToAgenda = () => {
    if (!selectedCandidate) return;

    const newNeed: CitizenNeed = {
      id: `NEED-RWH-${Date.now().toString().slice(-4)}`,
      gpId: selectedGp.id,
      village: selectedGp.villages[0] || 'Dharnai Main',
      ward: selectedCandidate.ward,
      category: 'Rainwater / other',
      title: `Jal-Jeevan-Hariyali: ${selectedCandidate.name}`,
      titleHindi: `Water conservation: ${selectedCandidate.suggestedStructure} (${selectedCandidate.locationName})`,
      description: `Identified via Digital Elevation Model (DEM) and 1,040mm annual rainfall runoff (${selectedCandidate.id}). Catchment Area: ${selectedCandidate.catchmentAreaHa} Ha, Storage Potential: ${selectedCandidate.estStorageCapacityKL.toLocaleString()} kL. Infiltration profile: ${selectedCandidate.soilInfiltrationRate}.`,
      locationDetails: selectedCandidate.locationName,
      priority: 'High',
      estimatedCost: selectedCandidate.estCostInr,
      status: 'Field Check Required',
      submittedBy: 'Jal-Jeevan-Hariyali Hydrological Engine',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lsdgTheme: 'Water sufficiency',
      aiSuggestedScheme: 'Jal-Jeevan-Hariyali Mission + MGNREGS Convergence',
      khesraNo: '740',
      khataNo: '15',
    };

    onAddNeed(newNeed);
    setAddedMessage(`${selectedCandidate.id} successfully incorporated into GPDP deliberation plan!`);
    setTimeout(() => setAddedMessage(null), 4500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                Screen 05 • Jal-Jeevan-Hariyali & Ahar-Pyne Water Catchment
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                Rural Development & Minor Water Resources
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Traditional Ahar-Pyne Networks, Ponds & Rainwater Harvesting Sites
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {selectedGp.name} • Ridge-to-Valley Scientific Topography • Infiltration & Runoff Modeling
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200 font-mono">
              Mean Rainfall: 1,040 mm/yr
            </span>
          </div>
        </div>
      </div>

      {addedMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{addedMessage}</span>
        </div>
      )}

      {/* Main Grid: Left Hydrological GIS Map + Right Selected Site Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7 Columns - Hydrological GIS Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-sky-400" />
                  Hydrological Watershed Map
                </span>
                <div className="text-[11px] text-slate-400">
                  Digital Elevation Model (DEM) & Natural Drainage Inflow
                </div>
              </div>
              <span className="text-xs font-mono bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg border border-slate-700 font-semibold">
                Ridge-to-Valley GIS
              </span>
            </div>

            <div className="p-4 space-y-4">
              {/* GIS Terrain Canvas */}
              <div className="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
                {/* Elevation Contours SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                  <path d="M 0 40 Q 200 20 450 50" fill="none" stroke="#10B981" strokeWidth="1.5" />
                  <path d="M 0 90 Q 200 60 450 100" fill="none" stroke="#10B981" strokeWidth="1.5" />
                  <path d="M 0 150 Q 200 120 450 160" fill="none" stroke="#10B981" strokeWidth="1.5" />
                  <path d="M 0 210 Q 200 180 450 220" fill="none" stroke="#10B981" strokeWidth="1.5" />
                  {/* Blue Water Runoff Inflow Lines */}
                  <path d="M 20 30 Q 180 140 380 180" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6,3" />
                  <path d="M 90 200 Q 220 160 380 180" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5,2" />
                </svg>

                {/* Candidates on Map */}
                {candidates.map((cand) => {
                  const isSelected = cand.id === selectedCandidateId;
                  return (
                    <button
                      key={cand.id}
                      onClick={() => setSelectedCandidateId(cand.id)}
                      style={{ left: `${cand.x}%`, top: `${cand.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl cursor-pointer transition-all duration-200 border shadow-lg flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-white ring-4 ring-emerald-500/30 scale-110 z-20'
                          : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:scale-105 z-10'
                      }`}
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold whitespace-nowrap">
                        {cand.id} ({cand.suggestedStructure})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Candidates List selector */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700">
                  Target Water Conservation Sites ({candidates.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {candidates.map((cand) => (
                    <button
                      key={cand.id}
                      onClick={() => setSelectedCandidateId(cand.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                        cand.id === selectedCandidateId
                          ? 'bg-emerald-50 border-emerald-600 font-semibold ring-1 ring-emerald-500'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 truncate">{cand.id}</div>
                      <div className="text-[10px] text-slate-500 truncate">{cand.suggestedStructure}</div>
                      <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                        ₹{(cand.estCostInr / 100000).toFixed(2)}L
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 5 Columns - Engineering Dossier */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Droplets className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedCandidate.name}
                </h3>
                <p className="text-[11px] text-slate-500">{selectedCandidate.id} • {selectedCandidate.ward}</p>
              </div>
            </div>

            {/* Engineering Metrics */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block font-medium">Catchment Area:</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedCandidate.catchmentAreaHa} Hectares</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Terrain Slope:</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedCandidate.slopePercentage}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Storage Potential:</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedCandidate.estStorageCapacityKL.toLocaleString()} kL</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Estimated Budget:</span>
                  <span className="font-semibold font-mono text-emerald-800">₹{(selectedCandidate.estCostInr / 100000).toFixed(2)}L</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-200 text-[11px] text-slate-700">
                <strong>Soil Strata:</strong> {selectedCandidate.soilInfiltrationRate}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
              <div className="font-semibold text-emerald-900">Jal-Jeevan-Hariyali Impact:</div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Restoring this traditional Ahar-Pyne will replenish surrounding agricultural aquifers and provide gravity-fed supplementary irrigation for over 80 hectares of Rabi crops.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleAddCandidateToAgenda}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Add to GPDP Annual Action Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
